<script setup lang="ts">
import BlogImage from "@/components/BlogImage.vue";
import CodeBlock from "@/components/CodeBlock.vue";
import MathExpr from "@/components/MathExpr.vue";
import ProseHeading from "@/components/ProseHeading.vue";

const code0 = "from openai import OpenAI\nfrom dotenv import load_dotenv, find_dotenv\nfrom langchain_community.vectorstores import SKLearnVectorStore\nfrom langchain_community.embeddings import SentenceTransformerEmbeddings\nfrom langchain_community.document_loaders import TextLoader, DirectoryLoader\nfrom langchain_text_splitters import SentenceTransformersTokenTextSplitter\nfrom sentence_transformers import CrossEncoder\nimport os\nimport numpy as np\n";
const code1 = "loader = DirectoryLoader('transcripts/cleaned/', loader_cls=TextLoader)\ndocs = loader.load()\nlen(docs) # output: 214\n";
const code2 = "for i, doc in enumerate(docs):\n    docs[i].metadata['episode'] = doc.metadata['source'].split('/')[-1].split('.')[0].split('_')[-1]\n";
const code3 = "token_splitter = SentenceTransformersTokenTextSplitter(chunk_overlap=0, tokens_per_chunk=512, model_name='BAAI/bge-large-en-v1.5')\nsplit_docs = token_splitter.split_documents(docs)\nlen(split_docs) # output: 9251\n";
const code4 = "ef = SentenceTransformerEmbeddings(model_name='BAAI/bge-large-en-v1.5', model_kwargs={'device': 'cuda'})\npersist_path = os.path.join('storage', 'swapbot.parquet')\nvector_store = SKLearnVectorStore.from_documents(\n    documents=split_docs,\n    embedding=ef,\n    persist_path=persist_path,\n    serializer='parquet'\n)\nvector_store.persist()\n";
const code5 = "query = 'What are strides and why should I do them?'\nretrieved = vector_store.similarity_search(query, k=10)\n";
const code6 = "Document(metadata={'id': '6a982e9d-a5d5-4a55-a46e-bf385bae9466', 'episode': '149', 'source': 'transcripts/cleaned/episode_149.txt'}, page_content=\"strides, do them as repeats, do them in a focused way. and i think any listeners out there will see huge benefits...\nDocument(metadata={'id': '1f7ea6da-cfa4-412b-a6b2-573b64ba0f03', 'episode': '226', 'source': 'transcripts/cleaned/episode_226.txt'}, page_content=\"of you running strides are usually on slight downhills. but that being said, they're fast, but they're also smooth...\nDocument(metadata={'id': 'af168965-84ad-4e54-accd-1705590bcb82', 'episode': '162', 'source': 'transcripts/cleaned/episode_162.txt'}, page_content=\". that push can be at times. so like on a 20 or 30, let's say a 32nd hill stride, like i often do, hit 345 great adjusted pace or 330 great adjusted pace...\n";
const code7 = "reranker = CrossEncoder('BAAI/bge-reranker-large')\n\n# Retrieval with reranking\ntops = []\nprompt = ''\nprompt += f'Query: {query}\\n'\npairs = [[query, doc.page_content] for doc in retrieved]\nscores = reranker.predict(pairs)\ntop_2 = list(np.argsort(scores)[::-1][:2])\ntops.append(top_2)\nprompt += f\"Doc1: {retrieved[top_2[0]].page_content}\\n\"\nprompt += f\"Metadata1: {retrieved[top_2[0]].metadata}\\n\"\nprompt += f\"Doc2: {retrieved[top_2[1]].page_content}\\n\"\nprompt += f\"Metadata2: {retrieved[top_2[1]].metadata}\\n\\n\"\n\nprint(prompt)\n";
const code8 = "Query: What are strides and why should I do them?\nDoc1: only will your physiology change. but the way you think about yourself will too. so try to remember, remember us out there when you're running, like when it gets hard here, david and megan saying you're fucking awesome. and then when you stop be like, hear us and saying you're fucking awesome and that that's not going to change whether you stop and push through or or you push through that people are going to be like our that was was that david? i'm megan or was that cricket singing? definitely crickets. they're coming from within. okay, next question is on strides. forgive me if this has been addressed before, but i have a question about strides, how important is it to do them back - to - back? see, i aim to do for by 30 - second host rides on a 5 - mile. easy, run day, is it just as effective to pepper? then in whenever i hit a hill over the last two ish miles of my route or is it more beneficial to stop and go up and down the same hill four times mentally? it's easier for me to incorporate strides hill or flat this way this way so it continuously but or over the last two miles, but a stride should be done back - to - back for their physical benefits. i try to change my habits with them. this is a great one. i actually think it's a helpful primer for us to take a step back first. yeah, we like, what is a stride? so we did our interview with alex honnold and he flipped the interview on us. he came with a bunch of questions and his first one is, was his. first question was like, what the fuck is a strong? and it was really helpful for us as running. coach has to be like oh we should probably talk about this a little more. yes. eye - opening that like the smartest like one of the best athletes in human history is like what is the thing that you talked about almost every episode? okay. so a few principles first, a stride is an acceleration 30 seconds or less. not more than that on flats were up hills progressing to the fastest pace you can go while using long distance form. that's the terminology we use. essentially, this isn't a full sprint, where you're pumping your arms really hard. this is something where you're moving efficiently and eventually, you'll be able to get that really fast. something that\nMetadata1: {'id': '531d8b87-8891-429d-af0d-17afb6a0ef1c', 'episode': '149', 'source': 'transcripts/cleaned/episode_149.txt'}\nDoc2: of you running strides are usually on slight downhills. but that being said, they're fast, but they're also smooth. like, you know, you have worked your biomechanical output, you've worked this overtime to the point that you are running fast at smooth basis. and i think it that gets back to the crux of the question. like it should be a smooth form. like you don't look like you're sprinting, don't look like you're, you know, out of nfl combine going out and, you know, doing 40. and it's it's cool to see that like long distance form. yeah, and anyone who's ever sprinted before knows the difference here in that when you sprint, you're getting off the line as fast as you can, you're going into a dry phase and then you're pumping your arms and really going off your toes. in the form, it's totally different. a stride is your long distance form. so the correlation often ends up being to 800 meter or mile race pace for most people. and if you see those athletes racing, they, they look very relaxed. they're just moving fast with that type of effort. and there's a lot of reasons for this. i think the main 1 is just health because you want to make sure that you're not pulling muscles. and sprinters pull their hamstrings all the time, even with a million different rehab exercises before training. so you need to be careful of that. but # 2 is you actually want to work your slow twitch muscle fibers. and my favorite study of all time was in physiology reports in 2018. and it did a stride intervention for four to four, four to six weeks or something like that. and it found that the changes essentially made the slow twitch muscle fibers themselves stiffer. and that's kind of what we're trying to get out here. strides are so magic because they distribute to every pace because you're actually using the same muscle fibers you use in a marathon or in 100 miles. and yeah, so the effort level is just the fastest pace you can go while maintaining long distance form. ease into it then maybe hit close to your top speed and then ease back if you don't want to pull a muscle. and as you're talking about hitting close to your top speed, i think envision it kind of like the kick at the end of a 1500\nMetadata2: {'id': '1f7ea6da-cfa4-412b-a6b2-573b64ba0f03', 'episode': '226', 'source': 'transcripts/cleaned/episode_226.txt'}\n";
const code9 = "systemMsg = \"You are an intelligent and friendly assistant specialized in retrieving information from podcast transcripts, specifically from 'Some Work, All Play.' This podcast covers five to ten topics per episode, including running, training, races, scientific studies, pop culture, and more, all delivered with love, enthusiasm, and a strong science foundation. The hosts, Megan Roche, M.D., Ph.D., and David Roche, bring engaging and heartfelt discussions. Your goal is to provide accurate and relevant answers based on user questions, referencing or summarizing details from the transcripts. When possible, include context about the topics discussed, cite timestamps for detailed exploration, and align your tone with the warmth and energy of the podcast. If a question cannot be directly answered, explain this clearly and offer alternative suggestions or areas to explore.\"\n\nresponse = client.chat.completions.create(\n    model = 'gpt-4o-mini',\n    messages = [{'role': 'system', 'content': systemMsg},\n                {'role': 'user', 'content': prompt}\n    ]\n)\n";
const math0 = "k";
const math1 = "k";
const math2 = "k";
const math3 = "9251 \\times 512 \\approx 4.7";
</script>

<template>
  <p>AI chatbots are great, especially models that reportedly have trillions of parameters and compress a huge portion of the internet. Most of them can take your own documents as context for their responses. That works well up to a point, but they limit how many documents you can upload because they rely on the model's context window (for example, 128k tokens, or roughly 500 pages of text). If you have more documents than that, or if you do not want to upload personal notes to a company's servers, then you need another approach.</p>
  <p>This tutorial is nothing new—there are plenty of guides on building simple RAG-enabled chatbots like this one. I built it mostly as a learning exercise, and I hope that walking through each core component of RAG helps clarify how the architecture works. I use LangChain to manage the documents and the OpenAI API with GPT-4o-mini for generation, though once you understand the architecture, you can swap in any other model or API.</p>
  <hr />
  <ProseHeading id="brief-overview-of-rag" :level="2">Brief overview of RAG</ProseHeading>
  <BlogImage eager image-path="/img/rag-bot/rag_architecture.webp" alt="Retrieval augmented generation architecture showing retrieval of context for a language model" width="600px">
    <template #caption>Basic retrieval-augmented generation (RAG) architecture. <a href="https://truera.com/ai-quality-education/generative-ai-rags/what-is-retrieval-augmented-generation-rag-for-llms/" target="_blank" rel="noopener noreferrer">source</a></template>
  </BlogImage>
  <p>RAG is a generative AI method that involves finding relevant knowledge or documents from some source and then including that information in the prompt to the model. RAG was first introduced by <a href="https://arxiv.org/abs/2005.11401" target="_blank" rel="noopener noreferrer">Lewis et al.</a> in 2020. Most of the time this is exclusively text documents as this is where LLMs are strong. However, recent multi-modal breakthroughs are starting to change this.</p>
  <p>The RAG model is basically two parts:</p>
  <ol>
    <li><strong>Retrieval</strong>: This is responsible for finding the most relevant documents or knowledge from a source. This can be done using a variety of methods. In this tutorial we will use cosine similarity to find documents that have a similar embedding vector to the query vector. We return the top <MathExpr :expr="math0" /> documents to the next part.</li>
  </ol>
  <ol>
    <li><strong>Generation</strong>: This takes the top <MathExpr :expr="math1" /> documents and the prompt and generates a response. This can be done in a variety of ways. In this tutorial we will simply concatenate the top <MathExpr :expr="math2" /> documents to the prompt and send it to the model.</li>
  </ol>
  <p>In the figure, you can think of the left third as the retrieval step, and the right two-thirds as the generation step.</p>
  <ProseHeading id="ingesting-the-knowledge" :level="2">Ingesting the knowledge</ProseHeading>
  <BlogImage image-path="/img/rag-bot/rag_ingest.png" alt="RAG ingestion pipeline from source documents to a vector store" width="600px">
    <template #caption>Basic retrieval-augmented generation (RAG) ingestion scheme. <a href="https://python.langchain.com/docs/tutorials/rag/" target="_blank" rel="noopener noreferrer">source</a></template>
  </BlogImage>
  <p>However, I would argue that the most important part of building any RAG application is how you ingest the knowledge that you want to search. This involves a few steps as highlighted by the figure above:</p>
  <ProseHeading id="loading" :level="3">Loading</ProseHeading>
  <p>First we need to gather all of the raw documents from whatever source. This can be local files, a database, the web, social media, etc. For this tutorial, I manually scraped podcast transcripts from Spotify, cleaned them using BeautifulSoup, and saved the resulting text as text files. LangChain has a bunch of ingestion helpers, but you could use standard Python libraries to do this.</p>
  <p>Let's jump into some code for this. First let's load all of the relevant libraries that we are going to need (<code>OpenAI</code> for the generation step, <code>dotenv</code> to load API keys from the local <code>.env</code> file, <code>numpy</code> for some number stuff, <code>os</code> for some file stuff, and all of the <code>langchain</code> things for RAG stuff).</p>
  <CodeBlock language="python" :code="code0" />
  <p>Now, first thing to do is to load all of the documents. I have a directory of text files, which are the cleaned transcripts, so I will take advantage of the <code>DirectoryLoader</code> and <code>TextLoader</code> classes from LangChain to load all of the documents.</p>
  <CodeBlock language="python" :code="code1" />
  <p>What is helpful about LangChain's document loaders is that they attach a metadata dictionary to each document. By default, that dictionary includes a unique ID and the file path under <code>source</code>. I also want to store the podcast episode number so that we can reference it during generation later.</p>
  <CodeBlock language="python" :code="code2" />
  <p>Here we extract the episode number from the filename.</p>
  <ProseHeading id="splitting" :level="3">Splitting</ProseHeading>
  <p>Now that all of the documents are loaded, we need to split them into chunks that fit cleanly into our models. This is the first place where you need to make a design choice. You can split documents by word count, by sentence, or by paragraph. I prefer to split by token count so that the chunks match the fixed token length that the embedding model was trained on.</p>
  <p>This is also where you decide how much consecutive chunks should overlap. For example, you could use 512-token chunks that overlap by 256 tokens to preserve context across chunk boundaries. For simplicity, I will split the documents into 512-token chunks with 0 overlap.</p>
  <CodeBlock language="python" :code="code3" />
  <p>Notice that we pass a model name into this splitter even though we are not generating embeddings yet. The splitter uses that model's tokenizer to measure chunk sizes, which ensures that our chunks are tokenized the same way as the embeddings that we will create next.</p>
  <p>From the 214 original documents, we now have 9,251 chunks. With some back-of-the-envelope math, that works out to about 43 chunks per document, or roughly <MathExpr :expr="math3" /> million tokens across the entire corpus. For reference, the maximum input length at the time of writing was 128k tokens for GPT-4o, 200k tokens for Claude 3.5 Sonnet, and 1M tokens for Gemini 1.5 Pro. Our corpus is far too large to paste into a single prompt, so RAG is genuinely needed here.</p>
  <ProseHeading id="embedding-storage" :level="3">Embedding &amp; Storage</ProseHeading>
  <p>This is where natural language processing (NLP) comes in. We need to convert these text chunks into numbers that models can work with, while preserving the meaning of the text. That is what embeddings do.</p>
  <p>We will use an embedding model (<code>BAAI/bge-large-en-v1.5</code>, a strong open model that runs well on my GPU) to convert each text chunk into a vector, which is essentially a fixed-length array of numbers. Embedding models are trained on massive amounts of text so that similar passages produce similar vectors. When two pieces of text are close in meaning, the distance between their vectors is small. That is the core of retrieval in RAG: we compare the vector for a search query against the vectors for every chunk in our library to find the closest matches. There are many tutorials on embeddings, and one that I really like is from <a href="https://lena-voita.github.io/nlp_course/word_embeddings.html" target="_blank" rel="noopener noreferrer">Lena Voita's NLP Course For You</a> (a little math background helps).</p>
  <p>Next, we need to generate those embeddings and store them somewhere. In RAG systems, that storage layer is called a vector database or vector store, and there are many options that run either in the cloud or locally. To keep things simple, I am using LangChain's <code>SKLearnVectorStore</code>, which wraps <code>sklearn</code>. Other vector stores can be more convenient and much faster for large-scale retrieval.</p>
  <CodeBlock language="python" :code="code4" />
  <p>This step takes a while because we are converting 4.7 million tokens into vectors. The <code>persist</code> method saves those vectors to disk so that we can reload them later. On an NVIDIA RTX 3090 Ti, this took about 3 minutes; on a base-level M2 MacBook Air, I stopped it after 22 minutes.</p>
  <ProseHeading id="now-we-do-the-thing" :level="2">Now we do the thing</ProseHeading>
  <p>Now that our vector store holds representations of every text chunk, we can run retrieval. We compare the vector for a user query against the stored chunk vectors to find the closest matches, using LangChain's built-in similarity search instead of writing the math by hand.</p>
  <p>Since this corpus comes from a running training podcast, let's ask about a specific training technique called "strides."</p>
  <CodeBlock language="python" :code="code5" />
  <p>Let's look at a few of the 10 documents that were retrieved.</p>
  <CodeBlock language="text" :code="code6" />
  <p>The retrieved passages are already quite relevant to the query. This is great. To make sure that the strongest passages land at the top, let's add one more step.</p>
  <ProseHeading id="reranking" :level="2">Reranking</ProseHeading>
  <p>Reranking can be computationally expensive, but it helps push the most relevant passages to the top of the results. If you are running all of your models on a GPU or a cluster of GPUs, this step is barely noticeable; on a CPU, it can take a while.</p>
  <p>Let's use the reranking model <code>BAAI/bge-reranker-large</code> to score the retrieved chunks, select the top 2, and format them into a prompt for our language model.</p>
  <CodeBlock language="python" :code="code7" />
  <p>Here is the output:</p>
  <CodeBlock language="text" :code="code8" />
  <p>Now that we have the prompt, we can send it to a language model to generate a response. For speed, simplicity, and low cost (since we are already supplying the relevant context), we will use the OpenAI API with GPT-4o-mini.</p>
  <CodeBlock language="python" :code="code9" />
  <p>And here is the response generated by the model:</p>
  <hr />
  <ProseHeading id="sample-response" :level="2">Sample Response</ProseHeading>
  <p>Strides are a fantastic tool in a runner's training toolbox, and there's a lot of useful information about them discussed in the podcast!</p>
  <p><strong>What are strides?</strong> Strides are brief accelerations, typically lasting about 30 seconds or less, where you run at a fast pace while maintaining your long-distance running form. They're not full sprints characterized by intense arm pumping or extreme effort; instead, strides should feel smooth and controlled, almost like a relaxed version of sprinting (Episode 149, timestamp 00:45).</p>
  <p><strong>Why should you do them?</strong></p>
  <ol>
    <li><strong>Physiological Benefits</strong>: Strides can help improve the efficiency of your running as they engage your slow-twitch muscle fibers, which are essential for endurance. Interestingly, a study highlighted in the podcast noted that regular strides can make these muscle fibers stiffer, enhancing their performance over time (Episode 226, timestamp 02:30).</li>
  </ol>
  <ol>
    <li><strong>Form and Speed</strong>: By practicing strides, you develop your ability to maintain good running form at faster paces. This becomes particularly beneficial when you need to kick at the end of a race or when you're navigating varied terrain (Episode 226, timestamp 03:15).</li>
  </ol>
  <ol>
    <li><strong>Injury Prevention</strong>: Engaging in strides allows you to work on speed without the same risks associated with all-out sprints, like pulling muscles (Episode 226, timestamp 02:10).</li>
  </ol>
  <ol>
    <li><strong>Smooth Transition</strong>: Incorporating strides into your runs can ease your body into faster paces, contributing to overall speed development (Episode 226, timestamp 03:30).</li>
  </ol>
  <p><strong>How to do them?</strong> Strides can be integrated easily into your runs. You can execute them on flat terrain or slight downhills, gradually working up to your top speed while ensuring that you keep a relaxed and smooth form (Episode 149, timestamp 01:00).</p>
  <p>In summary, incorporating strides into your training can significantly enhance both your speed and efficiency as a runner, making them a valuable practice to include in your routine!</p>
  <hr />
  <p>Not bad! Comparing this against the passages that we supplied, the model summarized the key points accurately and wrote a coherent answer. There is still room to improve, though. For example, my system prompt asked for timestamps, so the model invented timestamps even though none were provided in the transcripts. We should fix that hallucination by either removing that instruction from the system prompt or supplying real timestamps.</p>
  <ProseHeading id="moving-forward" :level="2">Moving forward</ProseHeading>
  <p>This was a <strong>very</strong> simple example of how a RAG-enabled chatbot searches a knowledge base and generates an answer. There are plenty of ways to improve it:</p>
  <ol>
    <li><strong>Better Prompting</strong>: We can refine the system prompt to give the model clearer instructions and produce more accurate, relevant answers.</li>
  </ol>
  <ol>
    <li><strong>Providing More Documents</strong>: We passed only two documents after reranking. We could test different counts to find the sweet spot that improves answers without flooding the context window.</li>
  </ol>
  <ol>
    <li><strong>UI</strong>: Right now this runs as a Python script, so building a simple UI would make it much easier to use.</li>
  </ol>
  <ol>
    <li><strong>Error Handling</strong>: What if the model's answer is completely off? We could add checks to rerun retrieval or fall back gracefully.</li>
  </ol>
  <ol>
    <li><strong>Agents</strong>: We could build dedicated agents to manage the conversation—for example, one agent for searching, one for generating answers, and one for handling errors. One clear benefit is that if a user asks a follow-up about information that was already retrieved, the agent can skip retrieval and go straight to answering. That begins to add planning and reasoning to the chatbot.</li>
  </ol>
  <p>And I am sure there is plenty more that I am missing as well.</p>
</template>
