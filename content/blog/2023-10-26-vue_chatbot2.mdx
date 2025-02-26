---
title: "Vue.js Chatbot - Part 2: The Back-End"
date: 2023-10-26 20:00:00
description: In the second part we build the back-end for the chatbot using FastAPI
tags: Vue.js, FastAPI, chatbot, backend-end, websocket, LLM, ChatGPT
categories: Academic
---

It can be daunting to get started on creating your own custom webapp, especially if you're not a web developer. There are lots of nice design tools out there, but you lose some of the granular control if you don't code it yourself. As someone who's not a web developer, I've found that Vue.js is a great framework to get started with. It's easy to learn, and has a lot of great documentation and community support. In this series, I'll be showing you how to build a chatbot using Vue.js, and how to integrate it with a back-end API that will be interacting with the GPT-3.5 model. As a cherry on top, we will look at how to store the messages in a MongoDB database, so that we can use them later for other uses.

If you want to jump straight to the finished product, you can find it at the code repository here.

::github-repo-card
---
repo: lancewilhelm/vue-chatbot
---
::

In this part we will be working up to [this commit.](https://github.com/lancewilhelm/vue-chatbot/tree/d27449b1b159f8c6488ef96d1f6671ea9f6b977b)

---

If you missed part 1, you can find it [here](/blog/2023-10-25-vue_chatbot1)

---

## What is FastAPI?

[FastAPI](https://fastapi.tiangolo.com/) is a Python framework for building APIs. It is similar to [Flask](https://flask.palletsprojects.com/en/3.0.x/), but is asynchronous, which makes it nice for performing multiple tasks at once. It also has a lot of great documentation and community support, which makes it easy to learn. While in our end-case we may not need a back-end like FastAPI given that we will be making API calls to OpenAI's servers (all of which could be accomplished on the front end with JavaScript), it is a good exercise to learn how to build a back-end, and it will allow us to store the messages in a database for later use. This also sets up us for if we ever want to use a local large language model as the backbone of our chatbot.

## Setting up the Back-End

First, we need to install two dependencies to get FastAPI running. Run `pip install fastapi uvicorn` to install them. Next, we need to create a file to contain our server/API code. At the very root of your project, which is outside the `app/` folder from [part 1]({{ site.baserul }}{% link _posts/2023-10-25-vue_chatbot1.md %}), create a file `main.py` and add the following code:

```python[main.py]
from fastapi import FastAPI

app = FastAPI()

@app.get("/")
async def root():
    return {"message": "Hello World"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
```

Now, if you run `python main.py` in your terminal and following the link to the URL provided, you should see a python dictionary or JSON object with the key `message` and the value `Hello World`. Congratulations, you are now a back-end developer! 🎉

## Serving up our Front-End

OK, maybe not a back-end developer, but you are on your way! Now let's build our front-end and serve it up with the FastAPI backend server. First, navigate to your webapp directory, for me that is `app/`, and run `npm run build`. This will compile your website and place it in the `dist/` directory. Now, we can modify `main.py` to serve up our front-end. Replace the contents of `main.py` with the following:

```python[main.py]
from fastapi import FastAPI, Request
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates

app = FastAPI()

# Set static file location
app.mount("/assets", StaticFiles(directory="app/dist/assets", html=True), name="static")

# Setup Jinja2 templates to serve index.html
templates = Jinja2Templates(directory="app/dist")

@app.get("/")
async def root(request: Request):
    return templates.TemplateResponse("index.html", {"request": request})

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
```

You will need to install Jinja2 first with `pip install jinja2`. While we will not be taking advantage of Jinja templating in this project, serving the page with Jinja allows us to keep a simple GET route for the root, `/`. We also mounted our static files that we built, which are located at `app/dist/assets` so that the HTML file can access the actual page. Now, if you run `python main.py` and navigate to the URL provided, you should see all of your work from [part 1]({{ site.baserul }}{% link _posts/2023-10-25-vue_chatbot1.md %})!

## Adding a Websocket Connection

Now that our page is being served by FastAPI, let's take advantage of its true purpose, which is to create an API. In our case, we are going to create a websocket connection that will allow us to send messages to the server and also allows the server to send us updates without us having to make a request. This is particularly useful in our case because we will be sending messages to the GPT-3.5 model, which can take a few seconds to respond. We don't want to have to wait for the response before we do anything else on the front-end.

We are going to modify `main.py` again to add a websocket connection. Replace the contents of `main.py` with the following:

```python[main.py]
from fastapi import FastAPI, Request, WebSocket, WebSocketDisconnect
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
import json

messages = []

app = FastAPI()

# Set static file location
app.mount("/assets", StaticFiles(directory="app/dist/assets", html=True), name="static")

# Setup Jinja2 templates to serve index.html
templates = Jinja2Templates(directory="app/dist")

# Serve index.html template from the root path
@app.get("/")
async def root(request: Request):
    return templates.TemplateResponse("index.html", {"request": request})

# Create a websocket connection
@app.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):
    await websocket.accept()
    while True:
        data = await websocket.receive_text()
        message_data = json.loads(data)
        if message_data['type'] == 'get_messages':
            return_message = {'type': 'message_update', 'content': messages}
            await websocket.send_text(json.dumps(return_message))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
```

We added a new endpoint, `/ws`, which will be our websocket connection. We also added a list, `messages`, which will store all the messages that we send and receive from the GPT-3.5 model. Notice that our `websocket_endpoint()` function is an infinite while loop that is always waiting for a message to be sent to it. When it receives a message, it will check the type of message. In this first case, if `message_data['type']` is equal to `get_messages`, then it will send back a message with the type `message_update` and the content of the `messages` list. This will allow us to update the front end with the current list of messages. Using websockets in FastAPI requires the `websockets` package, so make sure you install it with `pip install websockets`.

Now we need to modify our front end to establish the websocket connection with the back-end. First, let's modify `App.vue` in our `app/src/` directory. Replace the contents of `App.vue` with the following:

```html[App.vue]
<script>
  import ChatContent from "./components/ChatContent.vue";
  import InputRow from "./components/InputRow.vue";
  import ReconnectingWebSocket from "reconnecting-websocket";

  export default {
    name: "App",
    components: {
      ChatContent,
      InputRow,
    },
    data() {
      return {
        messages: [],
        socket: null,
      };
    },
    mounted() {
      this.socket = new ReconnectingWebSocket("ws://localhost:8000/ws");
      this.getMessages();
    },
    methods: {
      getMessages() {},
    },
  };
</script>

<template>
  <div class="app">
    <div class="app-content">
      <ChatContent />
      <InputRow />
    </div>
  </div>
</template>

<style scoped>
  .app {
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 100vh;
    width: 100vw;
    margin: 0;
    padding: 0;
  }

  .app-content {
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    padding: 1rem;
    width: 100%;
    max-width: 1000px;
    overflow: auto;
  }
</style>
```

Notice that the `<script>` tags changed from before as we are now adding the full complement of JavaScript for the app. Furthermore, we are taking advantage of the NPM package [reconnecting-websocket](https://www.npmjs.com/package/reconnecting-websocket) to establish a websocket connection with the back-end. Be sure to install this in your `app/` directory with `npm install reconnecting-websocket`. Lastly, we add a few things to the exported object. We add a `data()` function that returns an object with two keys, `messages` and `socket`, which hold our messages received from the backend and the socket connection. Then, in `mounted()`, which is run when the page is loaded, we create the websocket connection with our backend and store it in `socket` from the `data()` function. Lastly, as a placeholder, we run `getMessages()` which will be used to get the messages from the backend.

## Getting Messages from the Back-End

Now that we have a websocket connection, let's update the JavaScript in `App.vue` with the following:

```html[App.vue]
<script>
  import ChatContent from "./components/ChatContent.vue";
  import InputRow from "./components/InputRow.vue";
  import ReconnectingWebSocket from "reconnecting-websocket";

  export default {
    name: "App",
    components: {
      ChatContent,
      InputRow,
    },
    data() {
      return {
        messages: [],
        socket: null,
      };
    },
    mounted() {
      this.socket = new ReconnectingWebSocket("ws://localhost:8000/ws");
      this.socket.onmessage = this.handleSocketMessage;
      this.getMessages();
    },
    beforeDestroy() {
      this.socket.close();
    },
    methods: {
      handleSocketMessage(event) {
        const data = JSON.parse(event.data);
        console.log(data);
        if (data.type === "message_update") {
          this.messages = data.content;
        }
      },
      getMessages() {
        const newMessage = {
          type: "get_messages",
        };
        this.sendSocketmessage(newMessage);
      },
      sendSocketmessage(message) {
        this.socket.send(JSON.stringify(message));
      },
    },
  };
</script>

<!-- Existing template and style -->
```

Here we added a few things. First, we added a handler in `mounted()`, which tells us what function to run when we receive a message from the back-end. In this case, we are running `handleSocketMessage()`, which will parse the message and run code depending on the message received. In our case, if a `message_update` is received the code will update `messages` with the received messages from the back-end. We also update our `getMessages()` function to send a message to the back-end to request the messages. Lastly, we add a `beforeDestroy()` function, which will close the websocket connection when the page is closed. This is important because we don't want to leave the connection open when we are not using it.

If you open up the console on your browser (right click, inspect, then find the console) and refresh the page, you should see that we now are receiving an empty message list from the back-end!

::blog-image
---
imagePath: /img/vue-chatbot/chatbot4.png
caption: Console screenshot of the empty message list
width: 600px
---
::

## Mimic Bot

Now that we have a websocket connection, let's add a "bot" that will mimic the user. This will allow us to test the websocket connection and see how the messages are being sent and received. First, let's modify `App.vue` to pass the `messages` as a prop into the `ChatContent` component and the `sendSocketMessage()` into the `InputRow` component.

```html[InputRow.vue]
<!-- Existing script -->

<template>
  <div class="app">
    <div class="app-content">
      <ChatContent :messages="this.messages" />
      <InputRow :sendSocketMessage="this.sendSocketMessage" />
    </div>
  </div>
</template>

<!-- Existing style -->
```

Next, we need to modify `ChatContent.vue` to accept the `messages` prop and display them. Modify the contents of `ChatContent.vue` with the following:

```html[ChatContent.vue]
<script>
  import ChatBubble from "./ChatBubble.vue";

  export default {
    name: "ChatContent",
    components: {
      ChatBubble,
    },
    props: {
      messages: {
        type: Array,
        required: true,
      },
    },
  };
</script>

<!-- Existing template and style -->
```

Notice that now our messages are coming from a prop rather than from the result of `data()`. Next, we need to heavily modify the script in `InputRow.vue` to handle the sending of messages. Modify the contents of `InputRow.vue` with the following:

```html[InputRow.vue]
<script>
  export default {
    name: "InputRow",
    props: {
      sendSocketMessage: {
        type: Function,
        required: true,
      },
    },
    data() {
      return {
        messageContent: "",
      };
    },
    methods: {
      async sendMessage() {
        if (this.messageContent.trim() !== "") {
          const newMessage = {
            type: "new_message",
            content: this.messageContent,
          };
          this.sendSocketMessage(newMessage);
          this.messageContent = "";
        }
      },
    },
  };
</script>

<template>
  <div class="input-row">
    <textarea
      rows="3"
      v-model="this.messageContent"
      placeholder="Type a message"
      @keydown.enter="sendMessage"
    ></textarea>
    <button @click="sendMessage">Send</button>
  </div>
</template>

<!-- Existing style -->
```

Here we added a `sendMessage()` function that will send a message to the back-end when the user clicks the send button or presses enter. We also added a `messageContent` variable to store the message that the user is typing. Notice that we are passing the `sendSocketMessage()` function as a prop, which is why we need to call it with `this.sendSocketMessage()`.

One last thing we need to do is modify `main.py` in order to handle receiving new messages from the front-end. Modify the contents of the `websocket_endpoint()` function with the following:

```python[main.py]
# Create a websocket connection
@app.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):
    await websocket.accept()
    try:
        while True:
            data = await websocket.receive_text()
            message_data = json.loads(data)
            print(message_data)
            if message_data['type'] == 'get_messages':
                return_message = {'type': 'message_update', 'content': messages}
                print(return_message)
                await websocket.send_text(json.dumps(return_message))

            if message_data['type'] == 'new_message':
                new_message = message_data['content']
                messages.append({'role': 'user', 'content': new_message})
                messages.append({'role': 'assistant', 'content': new_message})
                return_message = {'type': 'message_update', 'content': messages}
                print(return_message)
                await websocket.send_text(json.dumps(return_message))

    except WebSocketDisconnect:
        print("Client disconnected")
```

Here we added a new `if` statement that will handle receiving a new message from the front-end. When a new message is received, it will append the message to the `messages` list twice, once for the user and once for the assistant. Then, it will send the updated `messages` list back to the front-end.

Now, if you rebuild your webapp with `npm run build` in the `app/` directory and then run `python main.py` in the root directory, you should be able to send messages to the back-end and receive them back! You have your own mimic bot!

::blog-image
---
imagePath: /img/vue-chatbot/chatbot5.png
caption: Mimic bot, engage!
width: 600px
---
::

## One last thing before stop for now

Let's create a "clear chat" button that will allow us to clear the chat. As our app stands, you have to restart the back-end for the messages to disappear. We will need to add the button and a new function to `InputRow.vue` as well as modify `main.py` to handle the new message type. First, replace the contents of `InputRow.vue` with the following:

```html[InputRow.vue]
<script>
  export default {
    name: "InputRow",
    props: {
      sendSocketMessage: {
        type: Function,
        required: true,
      },
    },
    data() {
      return {
        messageContent: "",
      };
    },
    methods: {
      async sendMessage() {
        if (this.messageContent.trim() !== "") {
          const newMessage = {
            type: "new_message",
            content: this.messageContent,
          };
          this.sendSocketMessage(newMessage);
          this.messageContent = "";
        }
      },
      async clearMessages() {
        const newMessage = {
          type: "clear_messages",
        };
        this.sendSocketMessage(newMessage);
      },
    },
  };
</script>

<template>
  <div class="input-row">
    <button @click="clearMessages" class="btn-clear">Clear Chat</button>
    <textarea
      rows="3"
      v-model="this.messageContent"
      placeholder="Type a message"
      @keydown.enter="sendMessage"
    ></textarea>
    <button @click="sendMessage" class="btn-send">Send</button>
  </div>
</template>

<style scoped>
  .input-row {
    display: flex;
    align-items: stretch;
    background-color: #fdf0d7;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
    padding: 10px;
    width: 100%;
  }

  textarea {
    flex-grow: 1;
    margin: 0 10px;
  }

  .input-row button {
    background-color: #f0e6fb;
    border: none;
    border-radius: 5px;
    padding: 10px;
    cursor: pointer;
    color: #00000089;
    box-shadow: 1px 2px 3px rgba(0, 0, 0, 0.25);
    transition:
      background-color 0.2s ease-in-out,
      box-shadow 0.1s ease-in-out;
  }

  button:hover {
    filter: brightness(0.9);
  }

  button:active {
    box-shadow: none;
  }

  .input-row .btn-clear {
    background-color: #f17b7b;
  }
</style>
```

We added a button to clear the chat and a new function, `clearMessages()`, that will send a message to the back-end to clear the messages. We also added some styling to make the buttons look nice. Next, we need to modify `main.py` to handle the new message type. Replace the contents of the `websocket_endpoint()` function with the following:

```python[main.py]
@app.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):
    await websocket.accept()
    try:
        while True:
            data = await websocket.receive_text()
            message_data = json.loads(data)
            print(message_data)
            if message_data['type'] == 'get_messages':
                return_message = {'type': 'message_update', 'content': messages}
                print(return_message)
                await websocket.send_text(json.dumps(return_message))

            if message_data['type'] == 'new_message':
                new_message = message_data['content']
                messages.append({'role': 'user', 'content': new_message})
                messages.append({'role': 'assistant', 'content': new_message})
                return_message = {'type': 'message_update', 'content': messages}
                print(return_message)
                await websocket.send_text(json.dumps(return_message))

            if message_data['type'] == 'clear_messages':
                messages.clear()
                return_message = {'type': 'message_update', 'content': messages}
                print(return_message)
                await websocket.send_text(json.dumps(return_message))

    except WebSocketDisconnect:
        print("Client disconnected")
```

There is now a third `if` statement that will handle the new message type. When a `clear_messages` message is received, it will clear the `messages` list and send the updated list back to the front-end.

Now, if you rebuild your webapp with `npm run build` in the `app/` directory and then run `python main.py` in the root directory, you should be able to clear the chat!

## In the final part of this series

We are going to integrate the GPT-3.5 model into our chatbot and store the messages in a MongoDB database. Stay tuned!

