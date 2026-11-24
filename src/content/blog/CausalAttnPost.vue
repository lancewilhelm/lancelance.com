<script setup lang="ts">
import BlogImage from "@/components/BlogImage.vue";
import CodeBlock from "@/components/CodeBlock.vue";
import ProseHeading from "@/components/ProseHeading.vue";

const code0 = "import tiktoken\n\nenc = tiktoken.get_encoding('gpt2')\ns = \"Hello World\"\nx = enc.encode(s)\nprint(x) # [15496, 2159]\n";
const code1 = "import torch\nimport torch.nn as nn\n\ntok_emb = nn.Embedding(enc.n_vocab, 3)\net = tok_emb(torch.tensor(x))\n";
const code2 = "pos = torch.arange(len(x))\npos_emb = nn.Embedding(2, 3)\nep = pos_emb(pos)\n";
const code3 = "ec = et + ep\n";
const code4 = "q_wt = nn.Linear(3, 3)\nk_wt = nn.Linear(3, 3)\nv_wt = nn.Linear(3, 3)\nq = q_wt(ec)\nk = k_wt(ec)\nv = v_wt(ec)\n";
const code5 = "attn = q @ k.transpose(-1, -2)\n";
const code6 = "mask = torch.tril(torch.ones_like(attn))\nattn_masked = attn.masked_fill(mask == 0, float('-inf'))\n";
const code7 = "attn_scaled_softmax = F.softmax(attn_masked / np.sqrt(3), dim=-1)\n";
const code8 = "weighted_values = attn_scaled_softmax @ v\n";
const code9 = "class HelloWorldModel(nn.Module):\n    def __init__(self, n_embd=3):\n        super().__init__()\n        self.enc = tiktoken.get_encoding('gpt2')\n        self.tok_emb = nn.Embedding(self.enc.n_vocab, n_embd)\n        self.pos_emb = nn.Embedding(5, n_embd)\n        self.q_wt = nn.Linear(n_embd, n_embd, bias=False)\n        self.k_wt = nn.Linear(n_embd, n_embd, bias=False)\n        self.v_wt = nn.Linear(n_embd, n_embd, bias=False)\n        self.out = nn.Linear(n_embd, self.enc.n_vocab, bias=False)\n\n        # storage for inspection\n        self.et = None\n        self.ep = None\n        self.ec = None\n        self.q = None\n        self.k = None\n        self.v = None\n        self.attn = None\n        self.attn_masked = None\n        self.attn_scaled_softmax = None\n        self.weighted_values = None\n\n    def forward(self, x):\n        B, T = x.shape\n        # Embed the tokens\n        self.et = self.tok_emb(x) # B, T, C\n\n        # Get the positions\n        pos = torch.arange(T)   # T\n\n        # Embed the positions\n        self.ep = self.pos_emb(pos) # B, T, C\n\n        # Combine token and position embeddings\n        self.ec = self.et + self.ep # B, T, C\n\n        # Create query, key, and values\n        self.q = self.q_wt(self.ec) # B, T, C\n        self.k = self.k_wt(self.ec) # B, T, C\n        self.v = self.v_wt(self.ec) # B, T, C\n\n        # Calculate attention\n        self.attn = self.q @ self.k.transpose(-1, -2) # B, T, T\n\n        # Create attention mask\n        mask = torch.tril(torch.ones_like(self.attn)) # B, T, T\n        self.attn_masked = self.attn.masked_fill(mask == 0, float('-inf')) # B, T, T\n\n        # Scaled Softmax attention\n        self.attn_scaled_softmax = F.softmax(self.attn_masked / np.sqrt(3), dim=-1) # B, T, T\n\n        # Calculate the weighted values\n        self.weighted_values = self.attn_scaled_softmax @ self.v # B, T, C\n\n        # Calculate the output\n        out = self.out(self.weighted_values) # B, T, n_vocab\n\n        return out\n";
const code10 = "# Data\nx = torch.tensor(enc.encode_batch(['Hello World!']))\n\n# Model\nmodel = HelloWorldModel()\n\n# Training loop\nmax_iters = 1000\nlog_step = 100\nlossi = []\noptimizer = torch.optim.SGD(model.parameters(), lr=0.1)\n\nfor i in range(max_iters):\n    # Forward pass\n    xtr = x[:, :-1]\n    ytr = x[:, 1:]\n    out = model(xtr)\n\n    # Calculate loss\n    out = out.view(-1, out.shape[-1])\n    ytr = ytr.contiguous().view(-1)\n    loss = F.cross_entropy(out, ytr)\n    if i % log_step == 0:\n        print(f'{i}/{max_iters}: Loss: {loss.item()}')\n    lossi.append(loss.item())\n\n    # Backward pass\n    optimizer.zero_grad()\n    loss.backward()\n    optimizer.step()\n\nprint(f'{max_iters}/{max_iters}: Loss: {loss.item()}')\n";
const code11 = "new = torch.tensor([enc.encode('Hello')])\nprint(enc.decode(model(new).argmax(-1).tolist()[0])) # ' World'\n";
const code12 = "data = [\n    'The dog is an animal',\n    'The human is a person',\n    'The rock is a mineral',\n    'The tree is a plant',\n    'The car is a vehicle',\n    'The sun is a star',\n]\n";
const code13 = "# Encode the data\ndata_enc = torch.tensor(enc.encode_batch(data))\nxtr = data_enc[:, :-1]\nytr = data_enc[:, 1:]\n\nmodelv2 = HelloWorldModel(n_embd=5)\n\n# Training loop\nmax_iters = 10000\nlog_step = 1000\nlossi = []\noptimizer = torch.optim.AdamW(modelv2.parameters(), lr=1e-4)\n\nfor i in range(max_iters):\n    # Forward pass\n    xtr = data_enc[:, :-1]\n    ytr = data_enc[:, 1:]\n    out = modelv2(xtr)\n\n    # Calculate loss\n    out = out.view(-1, out.shape[-1])\n    ytr = ytr.contiguous().view(-1)\n    loss = F.cross_entropy(out, ytr)\n    if i % log_step == 0:\n        print(f'{i}/{max_iters}: Loss: {loss.item()}')\n    lossi.append(loss.item())\n\n    # Backward pass\n    optimizer.zero_grad()\n    loss.backward()\n    optimizer.step()\n\nprint(f'{max_iters}/{max_iters}: Loss: {loss.item()}')\n";
const code14 = "out = modelv2(xtr)\nfor i in range(len(xtr)):\n    print(enc.decode(out.argmax(-1).tolist()[i][-1:]))\n\n# output\n'''\nanimal\nperson\nmineral\nplant\nvehicle\nstar\n'''\n";
</script>

<template>
  <p>I have recently been creating and training "small" transformer models for fun based on Andrej Karpathy's <a href="https://youtu.be/kCc8FmEb1nY?si=FyQzfy1j7aeBeog3" target="_blank" rel="noopener noreferrer">awesome video tutorials</a>. For me, coding these models from scratch is a great exercise that allows me to understand how each component works and how their purposes. But there was one aspect of the attention mechanism that I was having trouble grasping intuitively. Specifically, in a decoder-only transformer model, how does the attention mechanism know to only attend to the previous tokens in the sequence? Further, how does the triangular mask that is applied to the attention matrix make this work? I decided to do some research and write this post to help me understand this concept better.</p>
  <p>If you want to follow along with the code, check out this Google Colab notebook <a href="https://colab.research.google.com/drive/1ANxfs1t-ECoQ96yxtUfiUFYIdiMiNK_h?usp=sharing" target="_blank" rel="noopener noreferrer" class="inline-block align-middle"><img src="https://colab.research.google.com/assets/colab-badge.svg" alt="Open In Colab" /></a></p>
  <p><em>Note: some of the results may be different from below due to the random initialization of the parameters.</em></p>
  <hr />
  <ProseHeading id="helpful-starting-notes" :level="2">Helpful starting notes</ProseHeading>
  <p>In my research to understand this concept, I came across <a href="https://medium.com/@jinoo/a-simple-example-of-attention-masking-in-transformer-decoder-a6c66757bc7d" target="_blank" rel="noopener noreferrer">this post</a> from Jinoo Baek that was very helpful in understanding the concept of attention masking. In their post, they show their simple handwritten notes of the attention mechanism for a very simple model with only two words and an embedding size of 3. Specifically their handwritten notes written within attention calculations helped my intuition. In my post, I attempt to take these notes a step further by coding simple examples to help my understanding.</p>
  <hr />
  <ProseHeading id="what-we-are-focusing-on" :level="2">What we are focusing on</ProseHeading>
  <BlogImage eager image-path="/img/causal-attn/attn_diagram.png" alt="Multi-head attention and scaled dot-product attention diagrams" width="600px">
    <template #caption>A diagram of the multi-head attention mechanism and the scaled dot-product attention from <a href="https://arxiv.org/pdf/1706.03762.pdf" target="_blank" rel="noopener noreferrer">Vaswani et al. (2017)</a>.</template>
  </BlogImage>
  <p>Specifically we are going to focus on taking an input, creating the keys, queries, and values, and then calculating the scaled dot-product attention. We will not be focusing on the multi-head attention mechanism for our simple example. If you are not familiar with some of these concepts, I recommend watching Andrej Karpathy's <a href="https://youtu.be/kCc8FmEb1nY?si=FyQzfy1j7aeBeog3" target="_blank" rel="noopener noreferrer">video</a> where he builds a transformer model from scratch and explains the intuition behind each component.</p>
  <hr />
  <ProseHeading id="simple-example" :level="2">Simple Example</ProseHeading>
  <p>Let's start with a simple example, much like the one provided by Jinoo Baek. We will start with a sequence of two words, "Hello World".</p>
  <ProseHeading id="tokenization" :level="3">Tokenization</ProseHeading>
  <p>For this task we will encode the sequence using the byte-pair encoding (BPE) algorithm used for GPT-2. We can access this using the <code>tiktoken</code> Python package. Let's start by importing the package and encoding our sequence.</p>
  <CodeBlock language="python" :code="code0" />
  <p>The tokenizer takes the sequence and turns it into a list of integers, which is something that the computer can understand.</p>
  <ProseHeading id="token-embedding" :level="3">Token Embedding</ProseHeading>
  <p>Our vocabulary size with the GPT-2 tokenizer is 50257. We could represent our words as one-hot vectors, however they wouldn't contain any meaningful information in them besides exactly what word or word piece we are referring to. There is no contextual information in this type of representation. We would like to represent these integers rather as vectors of smaller dimensions that contain more information than a 1 in a sea of 0's. This allows the model to learn more meaningful representations of these tokens or word parts (for a great post on this, check out <a href="https://lena-voita.github.io/nlp_course/word_embeddings.html" target="_blank" rel="noopener noreferrer">Lena Voita's post on Word Embeddings</a>).</p>
  <p>For our simple example, we will create embeddings of size 3. We will leverage some PyTorch code to do this for us.</p>
  <CodeBlock language="python" :code="code1" />
  <p>Visualizing the embeddings, we can see that they are 2 vectors of size 3.</p>
  <BlogImage image-path="/img/causal-attn/basic_et.png" alt="Token embeddings for Hello World as three-element vectors" caption="Token embeding of Hello World. Each word is represented by a vector of size 3." width="600px" />
  <ProseHeading id="position-embedding" :level="3">Position Embedding</ProseHeading>
  <p>Now, we need to represent the position of each token in the sequence. For our simple example, we will create another learnable embedding of size 3.</p>
  <CodeBlock language="python" :code="code2" />
  <p>This will similarly be a vector of size 3 for each token in the sequence. The y labels in the following image are the position index of each token in the sequence.</p>
  <BlogImage image-path="/img/causal-attn/basic_ep.png" alt="Position embeddings for Hello World as three-element vectors" caption="Position embeding of Hello World. Each word is represented by a vector of size 3." width="600px" />
  <ProseHeading id="combined-embedding" :level="3">Combined Embedding</ProseHeading>
  <p>Now we can combine the token and position embeddings to create the input embeddings for our model. We will simply add the two embeddings together.</p>
  <CodeBlock language="python" :code="code3" />
  <BlogImage image-path="/img/causal-attn/basic_ec.png" alt="Combined token and position embeddings for Hello World" caption="Combined embedding of Hello World. Each word is represented by a vector of size 3." width="600px" />
  <ProseHeading id="queries-keys-and-values" :level="3">Queries, Keys, and Values</ProseHeading>
  <p>Now we can get to meat of the attention mechanism. We will use 3 simple linear layers to create the queries, keys, and values. These are learnable parameters that can be trained eventually. Roughly speaking, the queries represent the word that we are inquiring about, the keys represent the other words in the sequence, and the values represent information that we would like to pass forward in our network regarding each word in the sequence. Let's create our query, key, and values.</p>
  <CodeBlock language="python" :code="code4" />
  <p>Here is what they look like visualized. Right now, these are random values, but they will be trained later.</p>
  <BlogImage image-path="/img/causal-attn/basic_qkv.png" alt="Query, key, and value vectors for the example sequence" caption="Queries, keys, and values for our sequence." width="800px" />
  <ProseHeading id="scaled-masked-causal-attention" :level="3">Scaled Masked Causal Attention</ProseHeading>
  <p>Now we can calculate the attention for each word in the sequence using our queries, keys, and values. First we calculate the dot product between the queries and the keys. This is essentially looking at how much each of the words in the sequence should attend to each other.</p>
  <CodeBlock language="python" :code="code5" />
  <BlogImage image-path="/img/causal-attn/basic_rawattn.png" alt="Raw attention matrix after the query and key dot product" caption="Raw attention values after the dot product." width="600px" />
  <p>Right now, these are essentially the logits for how important each input word (y-axis) is to the target word (x-axis) in the sequence.</p>
  <p>Now we need to apply a mask to the attention matrix. This mask will be a triangular matrix that will prevent the attention mechanism from attending to future words in the sequence. This is one key to the causal attention mechanism.</p>
  <CodeBlock language="python" :code="code6" />
  <BlogImage image-path="/img/causal-attn/basic_maskedrawattn.png" alt="Raw attention matrix masked to prevent attending to future words" caption="Masked raw attention values. Notice that we cannot attend to the target word of 'World' from the input word of 'Hello' because we haven't made it that far in the sentence yet." width="600px" />
  <p>Lastly, we need to apply the softmax function. First, we will scale the attention values by the square root of the embedding size. This trick normalizes the variance which helps reduce the chance of exploding gradients. Then we apply the softmax function to get the attention weights.</p>
  <CodeBlock language="python" :code="code7" />
  <BlogImage image-path="/img/causal-attn/basic_scaledattn.png" alt="Scaled attention probabilities for Hello World" caption="Scaled attention values. Now we can see a little intuition here as the softmax turns the logits into probabilities." width="600px" />
  <p>Finally, intuition takes hold here. Each cell represents with what probability the input word (y-axis) should attend to the target word (x-axis). We can see that the input word of "Hello" should attend to itself with a probability of 1.0. This is because it is the first word in the sequence and therefor cannot attend to any other word. However, given our randomly initialized parameters, we can see that "World" should attend to the values of "Hello" slightly more than itself.</p>
  <BlogImage image-path="/img/causal-attn/basic_scaledattnintuition.png" alt="Diagram illustrating scaled attention probabilities" caption="Intuition to the scaled attention attention probabilities. Credit to Jinoo Baek's blog post for this thought." width="600px" />
  <p>We can see that the mask ensures that the attention mechanism cannot apply any level of importance to future words. This is another key to the causal attention mechanism.</p>
  <ProseHeading id="weighted-values" :level="3">Weighted Values</ProseHeading>
  <p>Now that we have the probabilities/attention weights, we can scale our values proportionally by the weights. The values are also learnable parameters that will be trained and will contain vital information that allows the model to help predict the next word in the sequence.</p>
  <CodeBlock language="python" :code="code8" />
  <BlogImage image-path="/img/causal-attn/basic_weightedvalues.png" alt="Weighted value vectors for Hello and World" caption="Weighted values. We see that the value vector for 'Hello' did not change, but the value vector for 'World' did as it is a weighted combination of both value vectors." width="600px" />
  <p>These weighted combinations of the values are important for the model to learn how to predict the next word in the sequence. It is the weighted combination that allows a model to pay attention to more than one word if needed. Also keep in mind that all the embeddings, and linear layers are learnable parameters that will be trained based on our dataset.</p>
  <hr />
  <ProseHeading id="lets-train-it" :level="2">Let's train it</ProseHeading>
  <p>OK, we now have the building blocks for a very basic transformer model. Let's put it all together and train it to do one thing, predict " World" if it is given "Hello". The following code is a PyTorch module that will make up our model</p>
  <CodeBlock language="python" :code="code9" />
  <p>You should see almost all the same components that we introduced in the simple example. The only difference is that we are packaging it all up into a PyTorch module. We also added a few lines to store the intermediate values for inspection. Let's train this model to predict " World" if it is given "Hello".</p>
  <CodeBlock language="python" :code="code10" />
  <p>1000 steps is a bit overkill, however it is a simple model and it trains very quickly. Here is the loss curve.</p>
  <BlogImage image-path="/img/causal-attn/basic_loss.png" alt="Loss curve during basic model training" caption="Loss curve for training the basic model." width="600px" />
  <p>Now we can predict the next word in the sequence given "Hello".</p>
  <CodeBlock language="python" :code="code11" />
  <p>Notice that our predicted word has a space in front of "World". This is because the model has a single token that represents " World".</p>
  <ProseHeading id="visualizing-the-attention" :level="3">Visualizing the attention</ProseHeading>
  <p>The combined embeddings did not change too drastically during training, however the queries, keys, and values did.</p>
  <BlogImage image-path="/img/causal-attn/basic_trained_qkv.png" alt="Trained query, key, and value vectors for the basic model" caption="Trained queries, keys, and values." width="800px" />
  <p>Compared to the untrained values, we can see that some learning happened. However, it is hard to make any insight from this because we are still dealing with embeddings, which are abstractions that are hard to interpret. Instead, let's look at the computed attention probabilities.</p>
  <BlogImage image-path="/img/causal-attn/basic_trained_scaledattn.png" alt="Trained attention probabilities for the basic model" caption="Trained attention probabilities." width="600px" />
  <p>OK, here is something. We can clearly see that the model believes that predicting the next word almost solely depends on the current word it is looking at. This makes sense because we trained the model to do one simple task, predict " World" if it is given "Hello". This shows a problem with our training data. We only gave the model one example of a sequence. If we gave it more examples, it would learn that the next word in the sequence is not always " World". Let's try that.</p>
  <hr />
  <ProseHeading id="training-with-more-complicated-data" :level="2">Training with more complicated data</ProseHeading>
  <p>Our new data should be a bit more complicated, something that it has to learn how to attend to a specific word in the sequence in order to predict the correct next word. Here is what we will use.</p>
  <CodeBlock language="python" :code="code12" />
  <p>For our test, let's just focus on getting the model to predict the last word in each sentence correctly if given the first 4 words. This means that the model will need to pay attention to the second word in the sequence to make the correct prediction. We will use the same model as before, but we will train it on this new data, and increase its embedding size to 5 in order to capture more meaningful representations of each word/token.</p>
  <CodeBlock language="python" :code="code13" />
  <p>This training takes a bit longer because we increased our sequence length and we increased our embedding size. Here is the loss curve.</p>
  <BlogImage image-path="/img/causal-attn/adv_loss.png" alt="Training loss curve for the expanded dataset" caption="Training loss for the expanded dataset." width="600px" />
  <p>Now we can predict the next word in each of the training sequences given the first 4 words.</p>
  <CodeBlock language="python" :code="code14" />
  <ProseHeading id="visualizing-the-attention-complicated" :level="3">Visualizing the attention (complicated)</ProseHeading>
  <p>Now let's see if there are any more meaningful insights that we can gain from visualizing the parameters.</p>
  <BlogImage image-path="/img/causal-attn/adv_trained_qkv.png" alt="Trained query, key, and value vectors for the expanded dataset" caption="Trained queries, keys, and values for the more complicated dataset." width="800px" />
  <p>Let's pay attention to the query vector for "a" as it is this vector that will be used to attend to the other words in the sequence to predict the last word. We see that that the magnitude for each of its elements are large in comparison to other query vectors. Furthermore, if you compare the query vector for "a" to the key vectors, we can see that the signs and magnitudes line up well for the key vector for "human". This makes sense because the model needs to attend to "human" in order to predict "person". When the queries are matrix multiplied with the keys we get the following attention matrix.</p>
  <BlogImage image-path="/img/causal-attn/adv_trained_rawattn.png" alt="Trained raw attention matrix for the expanded dataset" caption="Trained raw attention matrix for the more complicated dataset." width="600px" />
  <p>Again, let's focus on the row for "a". We can see that the logits are heavily positive for "human". This supports our observation from the query and key matrices. The story is complete when we observe the resulting attention probabilities/weights.</p>
  <BlogImage image-path="/img/causal-attn/adv_trained_scaledattn.png" alt="Trained attention probabilities for the expanded dataset" caption="Trained attention probabilities/weights for the more complicated dataset." width="600px" />
  <p>Now it is clear that the model is paying attention to the second word in the sequence when predicting the last word. This is because for row "a", the model has a probability of 1.0 for the second word in the sequence. What this will translate to is that the model will pass 100% of the value information from the second word in the sequence to the full-feedforward network to make its prediction, which is what we wanted it to do.</p>
  <p><em>Interestingly, the model also learned to only pay attention to the first word, "The", when predicting any other word in the sequence. For our purposes, this is fine, but if we wanted the model to learn to predict words in the middle of the sequence, we would need to train it on more examples.</em></p>
  <ProseHeading id="conclusion" :level="2">Conclusion</ProseHeading>
  <ul>
    <li>The more complicated dataset allowed us to see how the attention mechanism can be used to attend to specific words in the sequence.</li>
    <li>This model and dataset is grossly oversimplified, but it helped me understand the intuition behind the attention mechanism.</li>
    <li>With this, we should be able to imagine how scaling the sequence length, embedding size, and size of other the other parameters can help the model attend to more than one word in the sequence.</li>
    <li>Furthermore, with multiple attention heads or multiple layers, the model can attend to more complicated relationship between these words as well.</li>
    <li>Lastly, training the model on a more complicated dataset will allow the model to learn more complicated relationships between the words in the sequence.</li>
    <li>Play around with this code! <a href="https://colab.research.google.com/drive/1ANxfs1t-ECoQ96yxtUfiUFYIdiMiNK_h?usp=sharing" target="_blank" rel="noopener noreferrer" class="inline-block align-middle"><img src="https://colab.research.google.com/assets/colab-badge.svg" alt="Open In Colab" /></a></li>
  </ul>
</template>
