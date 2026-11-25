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
  <p>I have recently been creating and training "small" transformer models for fun based on Andrej Karpathy's <a href="https://youtu.be/kCc8FmEb1nY?si=FyQzfy1j7aeBeog3" target="_blank" rel="noopener noreferrer">awesome video tutorials</a>. For me, coding these models from scratch is a great exercise that helps me understand how each component works and what purpose each one serves. Still, there was one aspect of the attention mechanism that I had trouble grasping intuitively. In a decoder-only transformer model, how does attention know to attend only to previous tokens in the sequence? And how does the triangular mask applied to the attention matrix make that happen? I did some research and wrote this post to build a clearer intuition.</p>
  <p>If you want to follow along with the code, check out this Google Colab notebook <a href="https://colab.research.google.com/drive/1ANxfs1t-ECoQ96yxtUfiUFYIdiMiNK_h?usp=sharing" target="_blank" rel="noopener noreferrer" class="inline-block align-middle"><img src="https://colab.research.google.com/assets/colab-badge.svg" alt="Open In Colab" /></a></p>
  <p><em>Note: some of the results may be different from below due to the random initialization of the parameters.</em></p>
  <hr />
  <ProseHeading id="helpful-starting-notes" :level="2">Helpful starting notes</ProseHeading>
  <p>While researching this topic, I came across <a href="https://medium.com/@jinoo/a-simple-example-of-attention-masking-in-transformer-decoder-a6c66757bc7d" target="_blank" rel="noopener noreferrer">this post</a> from Jinoo Baek that was very helpful for understanding attention masking. In that post, they share simple handwritten notes of the attention mechanism for a tiny model with only two words and an embedding size of 3. In particular, the handwritten notes placed directly inside the attention calculations made the math much clearer. In this post, I build on those notes by coding simple examples.</p>
  <hr />
  <ProseHeading id="what-we-are-focusing-on" :level="2">What we are focusing on</ProseHeading>
  <BlogImage eager image-path="/img/causal-attn/attn_diagram.png" alt="Multi-head attention and scaled dot-product attention diagrams" width="600px">
    <template #caption>A diagram of the multi-head attention mechanism and the scaled dot-product attention from <a href="https://arxiv.org/pdf/1706.03762.pdf" target="_blank" rel="noopener noreferrer">Vaswani et al. (2017)</a>.</template>
  </BlogImage>
  <p>Specifically, we will focus on taking an input, creating the keys, queries, and values, and calculating scaled dot-product attention. We will not cover multi-head attention in this simple example. If you are not familiar with these concepts, I recommend watching Andrej Karpathy's <a href="https://youtu.be/kCc8FmEb1nY?si=FyQzfy1j7aeBeog3" target="_blank" rel="noopener noreferrer">video</a>, where he builds a transformer model from scratch and explains the intuition behind each component.</p>
  <hr />
  <ProseHeading id="simple-example" :level="2">Simple Example</ProseHeading>
  <p>Let's start with a simple example, much like the one provided by Jinoo Baek. We will start with a sequence of two words, "Hello World".</p>
  <ProseHeading id="tokenization" :level="3">Tokenization</ProseHeading>
  <p>For this task, we will encode the sequence using the byte-pair encoding (BPE) algorithm used for GPT-2. We can access this through the <code>tiktoken</code> Python package. Let's start by importing the package and encoding our sequence.</p>
  <CodeBlock language="python" :code="code0" />
  <p>The tokenizer turns the sequence into a list of integers, which the computer can process.</p>
  <ProseHeading id="token-embedding" :level="3">Token Embedding</ProseHeading>
  <p>Our vocabulary size with the GPT-2 tokenizer is 50257. We could represent our words as one-hot vectors, but those vectors carry no information beyond identifying which word or word piece is present. They hold no contextual meaning. Instead, we want to represent these integers as smaller dense vectors that carry more information than a single 1 in a sea of 0s. That lets the model learn more useful representations of these tokens or word parts (for a great post on this, check out <a href="https://lena-voita.github.io/nlp_course/word_embeddings.html" target="_blank" rel="noopener noreferrer">Lena Voita's post on Word Embeddings</a>).</p>
  <p>For our simple example, we will create embeddings of size 3 using PyTorch.</p>
  <CodeBlock language="python" :code="code1" />
  <p>Visualizing the embeddings, we can see that they are 2 vectors of size 3.</p>
  <BlogImage image-path="/img/causal-attn/basic_et.png" alt="Token embeddings for Hello World as three-element vectors" caption="Token embedding of Hello World. Each word is represented by a vector of size 3." width="600px" />
  <ProseHeading id="position-embedding" :level="3">Position Embedding</ProseHeading>
  <p>Now we need to represent the position of each token in the sequence. For our simple example, we will create another learnable embedding of size 3.</p>
  <CodeBlock language="python" :code="code2" />
  <p>This produces another vector of size 3 for each token in the sequence. The y labels in the following image show the position index of each token in the sequence.</p>
  <BlogImage image-path="/img/causal-attn/basic_ep.png" alt="Position embeddings for Hello World as three-element vectors" caption="Position embedding of Hello World. Each word is represented by a vector of size 3." width="600px" />
  <ProseHeading id="combined-embedding" :level="3">Combined Embedding</ProseHeading>
  <p>Now we can combine the token and position embeddings to create the input embeddings for our model. We will simply add the two embeddings together.</p>
  <CodeBlock language="python" :code="code3" />
  <BlogImage image-path="/img/causal-attn/basic_ec.png" alt="Combined token and position embeddings for Hello World" caption="Combined embedding of Hello World. Each word is represented by a vector of size 3." width="600px" />
  <ProseHeading id="queries-keys-and-values" :level="3">Queries, Keys, and Values</ProseHeading>
  <p>Now we can get to the core of the attention mechanism. We will use 3 simple linear layers to create the queries, keys, and values. These are learnable parameters that will be updated during training. Roughly speaking, the queries represent the word that we are asking about, the keys represent the other words in the sequence, and the values hold the information that we want to pass forward for each word. Let's create our queries, keys, and values.</p>
  <CodeBlock language="python" :code="code4" />
  <p>Here is what they look like visualized. Right now, these are random values, and they will be trained later.</p>
  <BlogImage image-path="/img/causal-attn/basic_qkv.png" alt="Query, key, and value vectors for the example sequence" caption="Queries, keys, and values for our sequence." width="800px" />
  <ProseHeading id="scaled-masked-causal-attention" :level="3">Scaled Masked Causal Attention</ProseHeading>
  <p>Now we can calculate the attention for each word in the sequence using our queries, keys, and values. First, we calculate the dot product between the queries and the keys, which measures how strongly each word in the sequence attends to every other word.</p>
  <CodeBlock language="python" :code="code5" />
  <BlogImage image-path="/img/causal-attn/basic_rawattn.png" alt="Raw attention matrix after the query and key dot product" caption="Raw attention values after the dot product." width="600px" />
  <p>Right now, these are the logits for how important each input word (y-axis) is to each target word (x-axis) in the sequence.</p>
  <p>Next, we apply a mask to the attention matrix. This triangular matrix prevents the attention mechanism from attending to future words in the sequence, which is one key to causal attention.</p>
  <CodeBlock language="python" :code="code6" />
  <BlogImage image-path="/img/causal-attn/basic_maskedrawattn.png" alt="Raw attention matrix masked to prevent attending to future words" caption="Masked raw attention values. Notice that we cannot attend to the target word 'World' from the input word 'Hello' because we have not reached that point in the sentence yet." width="600px" />
  <p>Lastly, we apply the softmax function. First, we scale the attention values by the square root of the embedding size. This step normalizes the variance, which helps reduce the chance of exploding gradients. Then we apply softmax to get the attention weights.</p>
  <CodeBlock language="python" :code="code7" />
  <BlogImage image-path="/img/causal-attn/basic_scaledattn.png" alt="Scaled attention probabilities for Hello World" caption="Scaled attention values. Softmax turns the logits into probabilities." width="600px" />
  <p>This is where the intuition becomes clear. Each cell shows the probability with which the input word (y-axis) attends to the target word (x-axis). We can see that the input word "Hello" attends to itself with a probability of 1.0, because it is the first word in the sequence and therefore cannot attend to any other word. With our randomly initialized parameters, however, "World" attends to the values of "Hello" slightly more than to itself.</p>
  <BlogImage image-path="/img/causal-attn/basic_scaledattnintuition.png" alt="Diagram illustrating scaled attention probabilities" caption="Intuition behind the scaled attention probabilities. Credit to Jinoo Baek's blog post for this framing." width="600px" />
  <p>We can see that the mask ensures that the attention mechanism assigns zero weight to future words. That is the core of causal attention.</p>
  <ProseHeading id="weighted-values" :level="3">Weighted Values</ProseHeading>
  <p>Now that we have the attention weights, we can scale our values proportionally by those weights. The values are also learnable parameters that will be trained to carry the information that helps the model predict the next word in the sequence.</p>
  <CodeBlock language="python" :code="code8" />
  <BlogImage image-path="/img/causal-attn/basic_weightedvalues.png" alt="Weighted value vectors for Hello and World" caption="Weighted values. The value vector for 'Hello' did not change, while the value vector for 'World' became a weighted combination of both value vectors." width="600px" />
  <p>These weighted combinations of the values are what let the model combine information from more than one earlier word when predicting the next word in the sequence. Keep in mind that all of the embeddings and linear layers are learnable parameters that will be updated from our dataset during training.</p>
  <hr />
  <ProseHeading id="lets-train-it" :level="2">Let's train it</ProseHeading>
  <p>OK, we now have the building blocks for a very basic transformer model. Let's put them together and train the model to do one thing: predict " World" when given "Hello". The following code is a PyTorch module that defines our model.</p>
  <CodeBlock language="python" :code="code9" />
  <p>You should see almost all of the same components that we introduced in the simple example. The only difference is that we are packaging them into a PyTorch module and adding a few attributes to store the intermediate values for inspection. Let's train this model to predict " World" when given "Hello".</p>
  <CodeBlock language="python" :code="code10" />
  <p>1000 steps is overkill, but this is a simple model and it trains very quickly. Here is the loss curve.</p>
  <BlogImage image-path="/img/causal-attn/basic_loss.png" alt="Loss curve during basic model training" caption="Loss curve for training the basic model." width="600px" />
  <p>Now we can predict the next word in the sequence given "Hello".</p>
  <CodeBlock language="python" :code="code11" />
  <p>Notice that our predicted word has a space in front of "World". That happens because the tokenizer has a single token that represents " World".</p>
  <ProseHeading id="visualizing-the-attention" :level="3">Visualizing the attention</ProseHeading>
  <p>The combined embeddings did not change much during training, but the queries, keys, and values did.</p>
  <BlogImage image-path="/img/causal-attn/basic_trained_qkv.png" alt="Trained query, key, and value vectors for the basic model" caption="Trained queries, keys, and values." width="800px" />
  <p>Compared to the untrained values, we can see that the weights changed during training. Still, it is hard to draw insights directly from embeddings because they are abstract vectors. Instead, let's look at the computed attention probabilities.</p>
  <BlogImage image-path="/img/causal-attn/basic_trained_scaledattn.png" alt="Trained attention probabilities for the basic model" caption="Trained attention probabilities." width="600px" />
  <p>OK, here is something concrete. We can clearly see that the model predicts the next word almost solely from the current word that it is looking at. This makes sense because we trained the model on one simple task: predict " World" when given "Hello". That exposes a limitation of our training data. We gave the model only one sequence, so it had no reason to look further back. If we give it more examples, it will have to learn that the next word is not always " World". Let's try that.</p>
  <hr />
  <ProseHeading id="training-with-more-complicated-data" :level="2">Training with more complicated data</ProseHeading>
  <p>Our new dataset should be a bit more complicated, so that the model has to learn to attend to a specific earlier word in order to predict the right next word. Here is what we will use.</p>
  <CodeBlock language="python" :code="code12" />
  <p>For this test, let's focus on getting the model to predict the last word in each sentence when given the first 4 words. To do that, the model must attend to the second word in the sequence. We will use the same model architecture as before, train it on this new dataset, and increase the embedding size to 5 so that it can learn richer representations of each token.</p>
  <CodeBlock language="python" :code="code13" />
  <p>This training run takes a bit longer because we increased both the sequence length and the embedding size. Here is the loss curve.</p>
  <BlogImage image-path="/img/causal-attn/adv_loss.png" alt="Training loss curve for the expanded dataset" caption="Training loss for the expanded dataset." width="600px" />
  <p>Now we can predict the next word in each of the training sequences given the first 4 words.</p>
  <CodeBlock language="python" :code="code14" />
  <ProseHeading id="visualizing-the-attention-complicated" :level="3">Visualizing the attention (complicated)</ProseHeading>
  <p>Now let's see whether we can get clearer insights by visualizing the trained parameters.</p>
  <BlogImage image-path="/img/causal-attn/adv_trained_qkv.png" alt="Trained query, key, and value vectors for the expanded dataset" caption="Trained queries, keys, and values for the more complicated dataset." width="800px" />
  <p>Look closely at the query vector for "a", because that is the vector used to attend to earlier words when predicting the last word. Each of its elements has a large magnitude compared to the other query vectors. Furthermore, if you compare the query vector for "a" with the key vectors, you can see that its signs and magnitudes line up closely with the key vector for "human". That makes sense, because the model needs to attend to "human" in order to predict "person". When we multiply the query matrix by the key matrix, we get the following attention matrix.</p>
  <BlogImage image-path="/img/causal-attn/adv_trained_rawattn.png" alt="Trained raw attention matrix for the expanded dataset" caption="Trained raw attention matrix for the more complicated dataset." width="600px" />
  <p>Again, focus on the row for "a". The logits are strongly positive for "human", which matches what we saw in the query and key matrices. The full picture becomes clear when we look at the resulting attention weights.</p>
  <BlogImage image-path="/img/causal-attn/adv_trained_scaledattn.png" alt="Trained attention probabilities for the expanded dataset" caption="Trained attention probabilities/weights for the more complicated dataset." width="600px" />
  <p>Now it is clear that the model attends to the second word in the sequence when predicting the last word. For row "a", the model assigns a probability of 1.0 to the second word in the sequence. As a result, it passes 100% of the value vector from that second word forward to the output layer to make its prediction, which is exactly what we wanted.</p>
  <p><em>Interestingly, the model also learned to attend only to the first word, "The", when predicting any other word in the sequence. For our purposes, this is fine, but if we wanted the model to predict words in the middle of the sequence, we would need to train it on more examples.</em></p>
  <ProseHeading id="conclusion" :level="2">Conclusion</ProseHeading>
  <ul>
    <li>The more complicated dataset showed how the attention mechanism can attend to specific earlier words in a sequence.</li>
    <li>This model and dataset are grossly oversimplified, but building them helped me understand the intuition behind causal attention.</li>
    <li>From here, it is easier to see how increasing the sequence length, embedding size, and other parameters lets a model attend to more than one word in a sequence.</li>
    <li>With multiple attention heads and multiple layers, the model can capture much more complex relationships between words as well.</li>
    <li>Training on a larger, more varied dataset lets the model learn those richer relationships across sequences.</li>
    <li>Play around with this code! <a href="https://colab.research.google.com/drive/1ANxfs1t-ECoQ96yxtUfiUFYIdiMiNK_h?usp=sharing" target="_blank" rel="noopener noreferrer" class="inline-block align-middle"><img src="https://colab.research.google.com/assets/colab-badge.svg" alt="Open In Colab" /></a></li>
  </ul>
</template>
