<script setup lang="ts">
import BlogImage from "@/components/BlogImage.vue";
import ProseHeading from "@/components/ProseHeading.vue";
import ProseTable from "@/components/ProseTable.vue";
</script>

<template>
  <ProseHeading id="background" :level="2">Background</ProseHeading>
  <p>For my CS7643 Deep Learning final project at Georgia Tech, our team took on Facebook AI's Hateful Memes Challenge. The dataset is built around "benign confounders"—memes where the image alone is harmless and the caption alone is harmless, but putting them together makes the meme hateful (or vice versa). That forces a model to reason across both modalities instead of taking shortcuts on text or image features alone.</p>
  <p>The original dataset only has 10,000 labeled memes, and top models still trailed human accuracy (84.7%). Our hypothesis was straightforward: if we pull in unlabeled memes from the Memotion 7K dataset and pseudo-label them with a FixMatch-style semi-supervised loop, can we push a fine-tuned Visual BERT COCO model closer to human performance?</p>
  <ProseHeading id="approach" :level="2">Approach</ProseHeading>
  <p>We started from Team HateDetectron's baseline setup using Facebook AI's Multimodal Framework (MMF) and Visual BERT pretrained on COCO, inspired by Velioglu and Rose's winning approach. To expand the training data, we combined the Hateful Memes dataset with Memotion 7K (bringing the pool to 19,132 memes total) and adapted the FixMatch semi-supervised algorithm (Figure 1).</p>
  <BlogImage eager image-path="/img/hateful-memes/fig_2.jpg" alt="FixMatch algorithm diagram" caption="Figure 1. FixMatch algorithm" width="640px" />
  <p>For image features, we extracted region embeddings with a ResNeXT-152 Mask-RCNN model trained on VisualGenome (2048-dimensional visual embeddings) and projected them into the text embedding space before feeding both into Visual BERT's transformer layers (Figure 2).</p>
  <BlogImage image-path="/img/hateful-memes/fig_3.jpg" alt="Visual BERT process diagram" caption="Figure 2. Visual BERT process" width="640px" />
  <p>Our initial labeled training split had 8,928 memes—combining the Hateful Memes training set, Dev Seen, and 328 reliably labeled memes from Memotion 7K. After fine-tuning Visual BERT on that split, we ran inference on the remaining unlabeled Memotion 7K memes and kept high-confidence predictions as pseudo-labels, giving us 1,534 pseudo-labeled examples.</p>
  <p>Following FixMatch, we applied strong image augmentations like cutout (Figure 3) to those 1,534 pseudo-labeled memes and appended them to the training set for 10,462 training examples total.</p>
  <BlogImage image-path="/img/hateful-memes/fig_4.jpg" alt="Example image with cutout augmentation" caption="Figure 3. Example of an image with a cutout augmentation" width="640px" />
  <p>When retraining on the model-selected pseudo-labels actually hurt test metrics, we checked whether noisy pseudo-labels were the culprit. We manually audited 822 memes the model had pseudo-labeled as hateful and found that only 282 actually belonged in that class. We retrained a final time with just those 282 manually filtered examples.</p>
  <ProseHeading id="experiments-and-results" :level="2">Experiments and Results</ProseHeading>
  <p>We evaluated every stage on the unseen test split using accuracy and AUROC, training with cross-entropy loss and Adam. A grid search turned up two strong hyperparameter configurations (Table 1):</p>
  <ProseTable>
    <thead>
      <tr>
        <th><strong>Model Hyperparameters</strong></th>
        <th><strong>1</strong></th>
        <th><strong>2</strong></th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Steps</td>
        <td>3000</td>
        <td>3500</td>
      </tr>
      <tr>
        <td>Learning Rate</td>
        <td>0.3</td>
        <td>0.6</td>
      </tr>
      <tr>
        <td>Learning Rate Decay</td>
        <td>warmup linear</td>
        <td>warmup cosine</td>
      </tr>
      <tr>
        <td>Warm Up</td>
        <td>TRUE</td>
        <td>TRUE</td>
      </tr>
      <tr>
        <td>Warm Up Steps</td>
        <td>2000</td>
        <td>500</td>
      </tr>
      <tr>
        <td>Batch Size</td>
        <td>32</td>
        <td>80</td>
      </tr>
      <tr>
        <td>Optimizer Learning Rate</td>
        <td>5e-5</td>
        <td>5e-5</td>
      </tr>
    </tbody>
  </ProseTable>
  <div class="flex justify-center text-center"><b>Table 1:</b> Best model hyperparameters</div>
  <p>Adding the 328 clean, human-labeled Memotion examples consistently helped both models, bumping Model 2 from 76.84 to 78.45 test AUROC (Table 2). Once we added the 1,534 automatic pseudo-labels, however, both accuracy and AUROC dropped. Even swapping in our 282 hand-filtered pseudo-labels failed to beat the clean <code>HM + Memotion 328</code> run—and noticeably hurt Model 2.</p>
  <ProseTable>
    <thead>
      <tr>
        <th><strong>Dataset</strong></th>
        <th><strong>Model</strong></th>
        <th><strong>Validation Acc.</strong></th>
        <th><strong>Validation AUROC</strong></th>
        <th><strong>Test Acc.</strong></th>
        <th><strong>Test AUROC</strong></th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Hateful Memes (Baseline)</td>
        <td>1</td>
        <td>68.33</td>
        <td>73.59</td>
        <td>70.30</td>
        <td>75.23</td>
      </tr>
      <tr>
        <td></td>
        <td>2</td>
        <td>70.37</td>
        <td>72.91</td>
        <td>72.60</td>
        <td>76.84</td>
      </tr>
      <tr>
        <td>HM + Memotion 328</td>
        <td>1</td>
        <td>71.30</td>
        <td>74.07</td>
        <td>72.35</td>
        <td>76.87</td>
      </tr>
      <tr>
        <td></td>
        <td>2</td>
        <td>74.26</td>
        <td>74.57</td>
        <td>73.10</td>
        <td>78.45</td>
      </tr>
      <tr>
        <td>HM + Memotion 328 + Pseudo-labeled 1,534</td>
        <td>1</td>
        <td>69.07</td>
        <td>75.00</td>
        <td>69.80</td>
        <td>75.88</td>
      </tr>
      <tr>
        <td></td>
        <td>2</td>
        <td>70.00</td>
        <td>75.28</td>
        <td>72.30</td>
        <td>77.83</td>
      </tr>
      <tr>
        <td>HM + Memotion 328 + Filtered Pseudo-labeled 282</td>
        <td>1</td>
        <td>70.56</td>
        <td>75.14</td>
        <td>71.90</td>
        <td>76.55</td>
      </tr>
      <tr>
        <td></td>
        <td>2</td>
        <td>68.33</td>
        <td>73.50</td>
        <td>69.85</td>
        <td>74.28</td>
      </tr>
    </tbody>
  </ProseTable>
  <div class="flex justify-center text-center"><b>Table 2:</b> Model performance</div>
  <BlogImage image-path="/img/hateful-memes/fig_6.jpg" alt="Training and validation loss plots for the hateful memes model" caption="Figure 4. Training and validation losses" width="640px" />
  <ProseHeading id="takeaways" :level="2">Takeaways</ProseHeading>
  <p>It turned out to be a useful negative result:</p>
  <ul>
    <li><strong>Extra clean data helped, pseudo-labels did not.</strong> Adding 328 real labeled Memotion examples gave the biggest lift (+1.61 test AUROC on Model 2).</li>
    <li><strong>Unchecked pseudo-labeling breaks down on subtle multimodal tasks.</strong> Out of 822 high-confidence "hateful" pseudo-labels, only 282 held up under manual review—roughly two-thirds were false positives.</li>
    <li><strong>Distribution shift matters.</strong> Memotion memes look and read differently from Facebook's carefully constructed confounder test set, so even after manual filtering, the extra examples pushed the model slightly off-distribution.</li>
  </ul>
  <p>If I revisited this today, I would skip pseudo-labeling Memotion altogether and focus on stronger text/vision backbones, ensembling, or pulling external entity/context captions for the images.</p>
  <BlogImage image-path="/img/hateful-memes/paper.png" alt="Cover of the hateful memes classification project report" caption="Click to view the full report (PDF)" link="/pdf/cs7643-final-project.pdf" width="400px" />
</template>
