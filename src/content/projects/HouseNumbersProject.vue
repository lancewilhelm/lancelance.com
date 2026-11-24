<script setup lang="ts">
import BlogImage from "@/components/BlogImage.vue";
import ProseHeading from "@/components/ProseHeading.vue";
</script>

<template>
  <ProseHeading id="overview" :level="2">Overview</ProseHeading>
  <p>For my CS6476 Computer Vision final project at Georgia Tech, I built a two-stage pipeline to locate and read house numbers in real-world street photos. Reading digits in the wild is a lot messier than MNIST—lighting varies wildly, shadows cut across numbers, and brickwork or siding produces tons of false edges.</p>
  <p>I split the problem into two pieces: classical computer vision for finding candidate digit regions, and a convolutional neural network trained on the Street View House Numbers (SVHN) dataset (over 600,000 labeled digits) to classify those crops and reject non-digit noise.</p>
  <ProseHeading id="approach" :level="2">Approach</ProseHeading>
  <ProseHeading id="step-1-region-detection-mser-filtering" :level="3">Step 1: Region detection (MSER + filtering)</ProseHeading>
  <p>I used OpenCV's Maximally Stable Extremal Regions (MSER) detector tuned to pick out individual characters rather than full words. Before detection, images are normalized with CLAHE so uneven lighting and harsh shadows don't break region boundaries.</p>
  <p>Because MSER fires on plenty of background clutter, I filtered candidate bounding boxes in three passes:</p>
  <ol>
    <li><strong>Aspect ratio:</strong> drop anything with an aspect ratio below <code>1</code> or above <code>3.5</code>.</li>
    <li><strong>Edge density:</strong> drop regions where Canny edges cover 10% or less of the pixels.</li>
    <li><strong>Cleanup:</strong> run non-maximum suppression (NMS), pad the surviving boxes into squares, and sort them left-to-right by their top-left <code>x</code> coordinate.</li>
  </ol>
  <ProseHeading id="step-2-digit-classification-svhn-cnn" :level="3">Step 2: Digit classification (SVHN CNN)</ProseHeading>
  <p>I trained the classifier on the full SVHN dataset—589,736 training images, 14,652 validation images, and 26,032 test images—on a single Nvidia RTX 3090 Ti. Each candidate crop from Step 1 is passed through the network, which outputs raw logits for digits <code>0</code>–<code>9</code>. Taking the argmax gives the predicted digit, and any region whose max logit is <code>&lt;= 5.5</code> gets thrown out as background noise. The remaining digits are concatenated left-to-right into the final house number string.</p>
  <BlogImage eager image-path="/img/house-numbers/fig_1a.jpg" alt="Detected squares around house numbers" caption="Figure 1a. Detected candidate squares" width="640px" />
  <BlogImage image-path="/img/house-numbers/fig_1b.jpg" alt="Extracted house number image tiles" caption="Figure 1b. Extracted digit tiles passed to the classifier" width="640px" />
  <ProseHeading id="results-and-analysis" :level="2">Results and Analysis</ProseHeading>
  <p>The classifier itself worked great; the classical ROI detector was where things got brittle.</p>
  <ul>
    <li><strong>Detection:</strong> Bold, high-contrast digits on clean backgrounds worked well, and CLAHE normalization noticeably helped on shadowed tiles (like the <code>"1"</code> in Figure 1b split straight down the middle by shade). Thin fonts, blurry digits, and busy textures still tripped up MSER, and strict geometric filters occasionally dropped real digits.</li>
    <li><strong>Model comparison:</strong> Fine-tuning a pretrained <strong>ResNet18</strong> for 24 epochs beat VGG16 on both accuracy and speed—VGG16 took roughly six times longer per epoch and finished lower. Upscaling the original 32×32 SVHN crops to 224×224 outperformed native 32×32 color and grayscale models, and data augmentation gave a clear boost to generalization (Figure 2).</li>
  </ul>
  <BlogImage image-path="/img/house-numbers/fig_2.jpg" alt="Validation loss for house number CNN models" caption="Figure 2. Validation loss curves across CNN experiments" width="640px" />
  <p>All models used cross-entropy loss with a step learning-rate scheduler (dividing by 10 every 7 epochs), starting at <code>3e-4</code> for Adam and <code>1e-2</code> for SGD.</p>
  <p>On the SVHN test split, the final ResNet18 hit <strong>98.421% accuracy</strong>. Every digit scored 98% or better except <code>"5"</code> at 97.9% (Figure 3).</p>
  <BlogImage image-path="/img/house-numbers/fig_3.jpg" alt="Confusion matrix for house number classification results" caption="Figure 3. Confusion matrix on the SVHN test set. The final ResNet18 achieved 98.421% accuracy (n = 25,621)." width="640px" />
  <ProseHeading id="takeaways" :level="2">Takeaways</ProseHeading>
  <p>Almost every end-to-end failure happened in Step 1, not Step 2. With the classifier already above 98.4%, squeezing another fraction of a percent out of SVHN wouldn't move the needle nearly as much as replacing MSER with a learned text detector like EAST or CRAFT.</p>
  <BlogImage image-path="/img/house-numbers/paper.png" alt="Cover of the house number detection and classification project report" caption="Click to view the full report (PDF)" link="/pdf/CS6476-Final-Project.pdf" width="400px" />
</template>
