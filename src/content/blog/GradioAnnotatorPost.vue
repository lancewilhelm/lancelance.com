<script setup lang="ts">
import CodeBlock from "@/components/CodeBlock.vue";
import ProseHeading from "@/components/ProseHeading.vue";
import ProseTable from "@/components/ProseTable.vue";

const code0 = "pip install gradio\n";
const code1 = "import gradio as gr\nimport pandas as pd\nimport numpy as np\n";
const code2 = "with gr.Blocks(theme=gr.themes.Soft()) as annotator:\n    gr.Markdown(\"## Data Annotation\")\n";
const code3 = "with gr.Row():\n    gr.Markdown(\"### Upload CSV\")\n    file_upload = gr.File()\n    btn_load = gr.Button(\"Load CSV\")\n";
const code4 = "with gr.Row():\n    gr.Markdown(\"### Current Row\")\n    with gr.Row():\n        idx = gr.Number(label='Index')\n        hs = gr.Textbox(label='HS')\n        cs = gr.Textbox(label='CS')\n\n    with gr.Row():\n        topic = gr.Textbox(label='Topic')\n        tone = gr.Textbox(label='Tone')\n\n    with gr.Row():\n        isCSContextuallyRelevant = gr.Radio([\"1\", \"0\"], label=\"Contextually Relevant?\")\n        isToneMatch = gr.Radio([\"1\", \"0\"], label=\"Tone Match?\")\n        btn_annotate = gr.Button(\"Annotate\")\n\n    with gr.Row():\n        btn_previous = gr.Button(\"Previous\")\n        btn_next = gr.Button(\"Next\")\n        btn_first_unlabeled = gr.Button(\"First Unlabeled\")\n";
const code5 = "with gr.Row():\n    gr.Markdown(\"### Annotated Data File Download\")\n    file_download = gr.File()\n";
const code6 = "btn_load.click(load_csv, inputs=[file_upload], outputs=[idx, hs, cs, topic, tone, isCSContextuallyRelevant, isToneMatch])\nbtn_annotate.click(annotate_row, inputs=[isCSContextuallyRelevant, isToneMatch], outputs=[idx, hs, cs, topic, tone, isCSContextuallyRelevant, isToneMatch, file_download])\nbtn_previous.click(navigate, inputs=gr.Textbox(\"Previous\", visible=False), outputs=[idx, hs, cs, topic, tone, isCSContextuallyRelevant, isToneMatch])\nbtn_next.click(navigate, inputs=gr.Textbox(\"Next\", visible=False), outputs=[idx, hs, cs, topic, tone, isCSContextuallyRelevant, isToneMatch])\nbtn_first_unlabeled.click(navigate, inputs=gr.Textbox(\"First Unlabeled\", visible=False), outputs=[idx, hs, cs, topic, tone, isCSContextuallyRelevant, isToneMatch])\n";
const code7 = "# Global variable to store the DataFrame\ndf = None\n# Global variable to keep track of the current row index\ncurrent_row = 0\n";
const code8 = "def load_csv(file):\n    global df\n    global current_row\n    # import the csv and set the data types to be int, string, string, string, string, string, string\n    df = pd.read_csv(file.name, dtype={'id':int, 'hs': str, 'cs': str, 'topic': str, 'tone': str, 'isCSContextuallyRelevant': str, 'isToneMatch': str})\n    current_row = 0\n    row_dict = df.iloc[current_row].to_dict()\n    return row_dict['id'], row_dict['hs'], row_dict['cs'], row_dict['topic'], row_dict['tone'], row_dict['isCSContextuallyRelevant'], row_dict['isToneMatch']\n";
const code9 = "def annotate_row(isCSContextuallyRelevant, isToneMatch):\n    global df\n    global current_row\n\n    df.at[current_row, 'isCSContextuallyRelevant'] = isCSContextuallyRelevant\n    df.at[current_row, 'isToneMatch'] = isToneMatch\n\n    if current_row < len(df) - 1:\n        current_row += 1\n    else:\n        current_row = 0\n    df.to_csv('annotated_data.csv', index=False)\n\n    row_dict = df.iloc[current_row].to_dict()\n    return row_dict['id'], row_dict['hs'], row_dict['cs'], row_dict['topic'], row_dict['tone'], row_dict['isCSContextuallyRelevant'], row_dict['isToneMatch'], 'annotated_data.csv'\n";
const code10 = "def navigate(direction):\n    global current_row\n    if direction == \"Previous\":\n        current_row = max(0, current_row - 1)\n    elif direction == \"Next\":\n        current_row = min(len(df) - 1, current_row + 1)\n    elif direction == \"First Unlabeled\":\n        unlabeled_row = df[df['isCSContextuallyRelevant'].isna()].index.min()\n        if not np.isnan(unlabeled_row):\n            current_row = int(unlabeled_row)\n\n    row_dict = df.iloc[current_row].to_dict()\n    return row_dict['id'], row_dict['hs'], row_dict['cs'], row_dict['topic'], row_dict['tone'], row_dict['isCSContextuallyRelevant'], row_dict['isToneMatch']\n";
const code11 = "annotator.launch()\n";
const code12 = "import gradio as gr\nimport pandas as pd\nimport numpy as np\n\n# Global variable to store the DataFrame\ndf = None\n# Global variable to keep track of the current row index\ncurrent_row = 0\n\ndef load_csv(file):\n    global df\n    global current_row\n    # import the csv and set the data types to be int, string, string, string, string, string, string\n    df = pd.read_csv(file.name, dtype={'id':int, 'hs': str, 'cs': str, 'topic': str, 'tone': str, 'isCSContextuallyRelevant': str, 'isToneMatch': str})\n    current_row = 0\n    row_dict = df.iloc[current_row].to_dict()\n    return row_dict['id'], row_dict['hs'], row_dict['cs'], row_dict['topic'], row_dict['tone'], row_dict['isCSContextuallyRelevant'], row_dict['isToneMatch']\n\ndef annotate_row(isCSContextuallyRelevant, isToneMatch):\n    global df\n    global current_row\n\n    df.at[current_row, 'isCSContextuallyRelevant'] = isCSContextuallyRelevant\n    df.at[current_row, 'isToneMatch'] = isToneMatch\n\n    if current_row < len(df) - 1:\n        current_row += 1\n    else:\n        current_row = 0\n    df.to_csv('annotated_data.csv', index=False)\n\n    row_dict = df.iloc[current_row].to_dict()\n    return row_dict['id'], row_dict['hs'], row_dict['cs'], row_dict['topic'], row_dict['tone'], row_dict['isCSContextuallyRelevant'], row_dict['isToneMatch'], 'annotated_data.csv'\n\ndef navigate(direction):\n    global current_row\n    if direction == \"Previous\":\n        current_row = max(0, current_row - 1)\n    elif direction == \"Next\":\n        current_row = min(len(df) - 1, current_row + 1)\n    elif direction == \"First Unlabeled\":\n        unlabeled_row = df[df['isCSContextuallyRelevant'].isna()].index.min()\n        if not np.isnan(unlabeled_row):\n            current_row = int(unlabeled_row)\n\n    row_dict = df.iloc[current_row].to_dict()\n    return row_dict['id'], row_dict['hs'], row_dict['cs'], row_dict['topic'], row_dict['tone'], row_dict['isCSContextuallyRelevant'], row_dict['isToneMatch']\n\nwith gr.Blocks(theme=gr.themes.Soft()) as annotator:\n    gr.Markdown(\"## Data Annotation\")\n\n    with gr.Row():\n        gr.Markdown(\"### Upload CSV\")\n        file_upload = gr.File()\n        btn_load = gr.Button(\"Load CSV\")\n\n    with gr.Row():\n        gr.Markdown(\"### Current Row\")\n        with gr.Row():\n            idx = gr.Number(label='Index')\n            hs = gr.Textbox(label='HS')\n            cs = gr.Textbox(label='CS')\n\n        with gr.Row():\n            topic = gr.Textbox(label='Topic')\n            tone = gr.Textbox(label='Tone')\n\n        with gr.Row():\n            isCSContextuallyRelevant = gr.Radio([\"1\", \"0\"], label=\"Contextually Relevant?\")\n            isToneMatch = gr.Radio([\"1\", \"0\"], label=\"Tone Match?\")\n            btn_annotate = gr.Button(\"Annotate\")\n\n        with gr.Row():\n            btn_previous = gr.Button(\"Previous\")\n            btn_next = gr.Button(\"Next\")\n            btn_first_unlabeled = gr.Button(\"First Unlabeled\")\n\n    with gr.Row():\n        gr.Markdown(\"### Annotated Data File Download\")\n        file_download = gr.File()\n\n    btn_load.click(load_csv, inputs=[file_upload], outputs=[idx, hs, cs, topic, tone, isCSContextuallyRelevant, isToneMatch])\n    btn_annotate.click(annotate_row, inputs=[isCSContextuallyRelevant, isToneMatch], outputs=[idx, hs, cs, topic, tone, isCSContextuallyRelevant, isToneMatch, file_download])\n    btn_previous.click(navigate, inputs=gr.Textbox(\"Previous\", visible=False), outputs=[idx, hs, cs, topic, tone, isCSContextuallyRelevant, isToneMatch])\n    btn_next.click(navigate, inputs=gr.Textbox(\"Next\", visible=False), outputs=[idx, hs, cs, topic, tone, isCSContextuallyRelevant, isToneMatch])\n    btn_first_unlabeled.click(navigate, inputs=gr.Textbox(\"First Unlabeled\", visible=False), outputs=[idx, hs, cs, topic, tone, isCSContextuallyRelevant, isToneMatch])\n\nannotator.launch()\n";
const code13 = "id,hs,cs,topic,tone,isCSContextuallyRelevant,isToneMatch\n0,You are mean,That is not a nice thing to say,personal,refute, ,\n1,These people are not good,Well if they aren't who is?!,personal,humor, ,\n";
</script>

<template>
  <p>Recently, I helped annotate over 600 rows of data for a counter-hate speech project. The data was in the form of a CSV file, and I had to manually go through each row and assign either a 0 or 1 label to two different attributes. This was a very tedious task, and I was looking for a way to speed up the process. I had a few options:</p>
  <ul>
    <li>Use a spreadsheet software like Excel or Google Sheets to manually go through each row and assign the labels (very tedious)</li>
    <li>Write a Python script to read the CSV file and display each row, and then assign the labels (still tedious)</li>
    <li>Use a tool like <a href="https://labelstud.io/" target="_blank" rel="noopener noreferrer">Label Studio</a> to create a web-based annotation tool (a little too much for the task at hand, but a good option for larger projects)</li>
    <li>Use a tool like <a href="https://gradio.app/" target="_blank" rel="noopener noreferrer">Gradio</a> to create a simple UI to aid in the annotation process (perfect!)</li>
  </ul>
  <p>I decided to go with the last option, and I was able to create a simple UI in less than 10 minutes and a little help from their docs and our good friend ChatGPT. Here's how I did it.</p>
  <ProseHeading id="but-first-what-is-gradio" :level="2">But first, what is Gradio?</ProseHeading>
  <p>Gradio is a Python library that allows you to quickly create customizable UI components around machine learning models. It's a great tool for quickly prototyping and sharing models with others. You can read more about it <a href="https://gradio.app/" target="_blank" rel="noopener noreferrer">graido.app</a>.</p>
  <ProseHeading id="installation" :level="2">Installation</ProseHeading>
  <p>As always, you should create a virtual environment when starting a new project. I use Miniconda (<code>conda create -n annotator python=3.11</code>), but you can use whatever you're comfortable with. Once you have a new environment setup, you can install Gradio using pip:</p>
  <CodeBlock language="bash" :code="code0" />
  <ProseHeading id="the-data" :level="2">The data</ProseHeading>
  <p>For this project, we will be annotating hate speech and counter speech for contextual relevance and tone label relevance. The CSV file contains 7 columns of data. The first column is an ID, and the next 6 columns are the attributes that we will be observing and annotating. Here's what a sample CSV file looks like:</p>
  <ProseTable>
    <thead>
      <tr>
        <th>id</th>
        <th>hs</th>
        <th>cs</th>
        <th>topic</th>
        <th>tone</th>
        <th>isCSContextuallyRelevant</th>
        <th>isToneMatch</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>0</td>
        <td>You are mean</td>
        <td>That is not a nice thing to say</td>
        <td>personal</td>
        <td>refute</td>
        <td></td>
        <td></td>
      </tr>
      <tr>
        <td>1</td>
        <td>These people are not good</td>
        <td>Well if they aren't who is?!</td>
        <td>personal</td>
        <td>humor</td>
        <td></td>
        <td></td>
      </tr>
    </tbody>
  </ProseTable>
  <p><em>Obviously, this is made up hate speech and counter speech. The actual data is very toxic and offensive, so I won't be sharing it here. But you get the idea...</em></p>
  <p>We will be comparing the hate speech (hs) and counter speech (cs) to determine if the counter speech is contextually relevant to the hate speech (1 for yes, 0 for no). We will also be comparing the tone of the counter speech to determine if it matches the tone label (1 for yes, 0 for no). The topic column is not relevant to this project, so we will ignore it.</p>
  <ProseHeading id="creating-the-ui" :level="2">Creating the UI</ProseHeading>
  <p><em>The full code for the app without breaks for explanation can be found at the <a href="#end-result">end of this post</a> or <a href="https://huggingface.co/spaces/lancewilhelm/bad-actors-annotator/blob/main/app.py" target="_blank" rel="noopener noreferrer">at this huggingface space</a>.</em></p>
  <p>Now that we have Gradio installed, we can start creating our UI. We'll start by importing the necessary libraries:</p>
  <CodeBlock language="python" :code="code1" />
  <p>Gradio will be used to create the UI, pandas to import and handle our data, and numpy to check for null values in the data (useful for navigating the data).</p>
  <p>First, let's build the actual UI portion of the app so that we can understand how the data will be displayed to the user. Later, we will create the functions that will be called by the UI interface, but it helps to see what is going on in the UI first.</p>
  <p>This app will take advantage of <a href="https://www.gradio.app/docs/blocks" target="_blank" rel="noopener noreferrer">Gradio blocks</a> (<code>gr.Blocks()</code>) to construct an app with multiple sections that handle the different parts of the annotation task. Let's start the top of our app with the following code (<strong>Note</strong>: Pay attention to the indentation as we are working with Python):</p>
  <CodeBlock language="python" :code="code2" />
  <p>The first line initializes our app as <code>annotator</code> and sets the theme to <code>Soft</code> for some visual appeal. The second line creates a Markdown block that displays the title of our app. Next, we will create the row in the UI that will allow us to load in the CSV data:</p>
  <CodeBlock language="python" :code="code3" />
  <p>We utilize block layout feature <code>gr.Row()</code> to contain everything underneath it into the same row. We add another title for the row, and then we get into the first substantive components. The first component is a <code>gr.File()</code> object that will allow us to upload a CSV file and store it in the variable <code>file_upload</code>. The second component is a <code>gr.Button()</code> object that will call a later function to load and store the CSV's data into a global dataframe variable.</p>
  <p>Now that you have an idea of how this works, let's throw the entire next row on the screen:</p>
  <CodeBlock language="python" :code="code4" />
  <p>This row is the meat of the annotator. We utilize subrows to further organize the sub components of the row. This ends up looking like columns in our case and can probably be accomplished with <code>gr.Column()</code> as well. The first subrow contains elements that display the current data row index (id), the hate speech (hs), and the counter (cs). The second subrow contains elements that display the topic and tone. The third subrow gets a bit more complicated as we introduce Gradio elements that will allow us to annotate the data. We use <code>gr.Radio()</code> to create a radio button that will allow us to select either a 1 or 0 for the <code>isCSContextuallyRelevant</code> and <code>isToneMatch</code> attributes. Finally, we have a button that will call a function to save the annotation. Lastly, the fourth subrow contains buttons that will allow us to navigate through the data. The first button will go to the previous data row, the second button will go to the next data row, and the third button will go to the first unlabeled data row.</p>
  <p>The last row is straight forward and contains a component to contain a downloadable file of the annotated data and a button to download the file:</p>
  <CodeBlock language="python" :code="code5" />
  <p>Lastly, we need to create event handlers for all of the buttons in the UI.</p>
  <CodeBlock language="python" :code="code6" />
  <p>Each button has a <code>click()</code> event handler that will call a function when the button is clicked. They also have <code>inputs</code> and <code>outputs</code> parameters that will pass the appropriate data to the function and return the appropriate data from the function, respectively. The outputs are all the different component variables that we established in the rows above. Each function will return the respective data in that order which allows the correct data to be displayed in the correct place in the UI.</p>
  <p>Now, let's create those functions that we are calling in the event handlers. Here you will see the inputs and outputs that the event handlers are working with. First up, though we need to create two global variables that will store the data and the current row index.</p>
  <CodeBlock language="python" :code="code7" />
  <p>For the first function, we have <code>load_csv()</code> which is called by <code>btn_load</code> and imports our data that was uploaded to <code>file_upload</code>.</p>
  <CodeBlock language="python" :code="code8" />
  <p>This function leverages the pandas function <code>pd.read_csv()</code> to read in the data from the CSV file and store it in the global variable <code>df</code>. We also explicitly set the datatypes for each to ensure that when we work with the data in the annotator, everything is stored properly. We also set the global variable <code>current_row</code> to 0 so that we start at the beginning of the data. We then create a dictionary of the current row of data and return the appropriate values to the UI. You can see that we return the different values in the same order that we set the outputs in the event handler.</p>
  <p>The next function is <code>annotate_row()</code> which is called by <code>btn_annotate</code> and saves the annotation to the global variable <code>df</code>.</p>
  <CodeBlock language="python" :code="code9" />
  <p>This function takes the values from the UI and saves them to the global variable <code>df</code>. It then increments the <code>current_row</code> variable and returns the next row of data to the UI. If the <code>current_row</code> variable is equal to the length of the dataframe, then we have reached the end of the data and we reset the <code>current_row</code> variable to 0. We then save the annotated data to a local CSV file, <code>annotated_data.csv</code> and return the next row of data to the UI. Again, you can see that we return the different values in the same order that we set the outputs in the event handler. This time, notice that we pass the CSV file to the <code>file_download</code> component so that the user can download the annotated data from the browser as well (this comes in handy with the <a href="https://huggingface.co/spaces/lancewilhelm/bad-actors-annotator" target="_blank" rel="noopener noreferrer">Hugging Face Space</a>)</p>
  <p>Lastly, we have the <code>navigate()</code> function which is called by <code>btn_previous</code>, <code>btn_next</code>, and <code>btn_first_unlabeled</code> and navigates the data based on the button that was clicked.</p>
  <CodeBlock language="python" :code="code10" />
  <p>This function takes the direction that was passed to it and updates the <code>current_row</code> variable accordingly. If the direction is "Previous", then we decrement the <code>current_row</code> variable by 1. If the direction is "Next", then we increment the <code>current_row</code> variable by 1. If the direction is "First Unlabeled", then we find the first row that has a null value for the <code>isCSContextuallyRelevant</code> attribute and set the <code>current_row</code> variable to that row. This is useful if you pass in data that has already been partially annotated. We then return the next row of data to the UI. Again, you can see that we return the different values in the same order that we set the outputs in the event handler.</p>
  <p>The last thing to do is to run the app:</p>
  <CodeBlock language="python" :code="code11" />
  <ProseHeading id="end-result" :level="2">End result</ProseHeading>
  <p>And that's it for the UI! Now, let's take a look at the full code. You can also find the full code at <a href="https://huggingface.co/spaces/lancewilhelm/bad-actors-annotator/blob/main/app.py" target="_blank" rel="noopener noreferrer">Bad Actors Annotator</a>. <strong>Note the order in which the functions and UI elements are called/created</strong>:</p>
  <CodeBlock language="python" :code="code12" />
  <hr />
  <ProseHeading id="hugging-face-space" :level="2">Hugging Face Space</ProseHeading>
  <p>I also hosted this annotator in a Hugging Face Space, which allows us to perform the host the app and perform the annotation task using their infrastructure. <strong>However, this is not the ideal way to use this app because the data is not persistent.</strong> If you refresh the page, you will lose all of your progress. This is why I recommend downloading the app and running it locally. However, if you want to try it out, you can find it <a href="https://huggingface.co/spaces/lancewilhelm/bad-actors-annotator" target="_blank" rel="noopener noreferrer">at this huggingface space</a> and below! Feel free to grab the sample data below and paste it into a blank CSV file to test it out.</p>
  <ProseHeading id="sample-csv-data" :level="3">Sample CSV Data</ProseHeading>
  <CodeBlock language="csv" :code="code13" />
</template>
