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
  <p>Recently, I helped annotate over 600 rows of data for a counter-hate speech project. The data came in a CSV file, and I had to go through each row manually and assign a 0 or 1 label to two different attributes. That was tedious, so I looked for a faster workflow. I had a few options:</p>
  <ul>
    <li>Use spreadsheet software like Excel or Google Sheets to go through each row manually and enter labels (very tedious)</li>
    <li>Write a Python script to read the CSV file, display each row in the terminal, and enter labels (still tedious)</li>
    <li>Use a tool like <a href="https://labelstud.io/" target="_blank" rel="noopener noreferrer">Label Studio</a> to set up a web-based annotation tool (more than I needed here, though a good option for larger projects)</li>
    <li>Use <a href="https://gradio.app/" target="_blank" rel="noopener noreferrer">Gradio</a> to build a simple UI for the annotation task (perfect!)</li>
  </ul>
  <p>I went with the last option and put together a simple UI in under 10 minutes with help from the Gradio docs and ChatGPT. Here is how I built it.</p>
  <ProseHeading id="but-first-what-is-gradio" :level="2">But first, what is Gradio?</ProseHeading>
  <p>Gradio is a Python library that lets you quickly build customizable UI components around machine learning models. It is a great tool for prototyping and sharing demos with others. You can read more about it at <a href="https://gradio.app/" target="_blank" rel="noopener noreferrer">gradio.app</a>.</p>
  <ProseHeading id="installation" :level="2">Installation</ProseHeading>
  <p>As always, create a virtual environment when starting a new project. I use Miniconda (<code>conda create -n annotator python=3.11</code>), but you can use whatever you prefer. Once you have a new environment set up, install Gradio using pip:</p>
  <CodeBlock language="bash" :code="code0" />
  <ProseHeading id="the-data" :level="2">The data</ProseHeading>
  <p>For this project, we are annotating hate speech and counter speech for contextual relevance and for whether the tone matches its label. The CSV file has 7 columns: an ID followed by 6 attributes that we will review and annotate. Here is what a sample CSV file looks like:</p>
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
  <p><em>You can find the full code for the app without breaks at the <a href="#end-result">end of this post</a> or <a href="https://huggingface.co/spaces/lancewilhelm/bad-actors-annotator/blob/main/app.py" target="_blank" rel="noopener noreferrer">in this Hugging Face Space</a>.</em></p>
  <p>Now that Gradio is installed, we can start building the UI. First, let's import the libraries that we need:</p>
  <CodeBlock language="python" :code="code1" />
  <p>We will use Gradio for the UI, pandas to load and update our data, and numpy to check for null values when navigating rows.</p>
  <p>Let's build the UI layout first so that we can see how the data will appear to the user. Afterward, we will write the functions that the buttons call.</p>
  <p>This app uses <a href="https://www.gradio.app/docs/blocks" target="_blank" rel="noopener noreferrer">Gradio Blocks</a> (<code>gr.Blocks()</code>) to organize the annotation workflow into separate sections. Let's start the top of the app with the following code (<strong>Note</strong>: pay attention to indentation since this is Python):</p>
  <CodeBlock language="python" :code="code2" />
  <p>The first line initializes our app as <code>annotator</code> and applies the <code>Soft</code> theme. The second line adds a Markdown block that displays the app title. Next, let's create the row that lets us load a CSV file:</p>
  <CodeBlock language="python" :code="code3" />
  <p>We use the <code>gr.Row()</code> layout block to group everything underneath it into one row. After adding a section heading, we add two interactive components: a <code>gr.File()</code> uploader stored in <code>file_upload</code> and a <code>gr.Button()</code> that will call a function to load the CSV into a global DataFrame.</p>
  <p>Now that you see how rows work, here is the entire next row:</p>
  <CodeBlock language="python" :code="code4" />
  <p>This row is the core of the annotator. We use nested rows to organize its components into four groups (which end up looking like columns and could also be built with <code>gr.Column()</code>). The first nested row displays the index of the current row (<code>id</code>), the hate speech (<code>hs</code>), and the counter speech (<code>cs</code>). The second displays the topic and tone. The third adds controls for labeling: two <code>gr.Radio()</code> inputs to select 1 or 0 for <code>isCSContextuallyRelevant</code> and <code>isToneMatch</code>, plus a button that saves the annotation. The fourth adds navigation buttons to move to the previous row, the next row, or the first unlabeled row.</p>
  <p>The final row is straightforward and adds a component for downloading the annotated CSV file:</p>
  <CodeBlock language="python" :code="code5" />
  <p>Lastly, we need to wire up event handlers for each button in the UI.</p>
  <CodeBlock language="python" :code="code6" />
  <p>Each button has a <code>click()</code> handler that calls a Python function when clicked. The <code>inputs</code> and <code>outputs</code> lists specify which component values are passed into the function and which components receive its return values. Each function returns values in the exact order listed in <code>outputs</code> so that each field in the UI updates properly.</p>
  <p>Now let's write the functions that those handlers call. First, though, we need two global variables to store the DataFrame and the current row index.</p>
  <CodeBlock language="python" :code="code7" />
  <p>The first function, <code>load_csv()</code>, is called by <code>btn_load</code> and loads the file that was uploaded to <code>file_upload</code>.</p>
  <CodeBlock language="python" :code="code8" />
  <p>This function uses <code>pd.read_csv()</code> to read the CSV file into the global variable <code>df</code>. We set the data types explicitly for each column so that values are handled consistently in the annotator, and we set <code>current_row</code> to 0 so that we start at the first row. We then convert that row to a dictionary and return its values in the exact order expected by the event handler's <code>outputs</code>.</p>
  <p>Next is <code>annotate_row()</code>, which is called by <code>btn_annotate</code> to save the selected labels to <code>df</code>.</p>
  <CodeBlock language="python" :code="code9" />
  <p>This function writes the selected labels from the UI into <code>df</code>, advances <code>current_row</code> (wrapping back to 0 at the end of the DataFrame), and saves the updated table to a local file named <code>annotated_data.csv</code>. It then returns the next row's values in the same order as <code>outputs</code>, along with the CSV file path for <code>file_download</code> so that the user can download the annotated file from the browser. That download button is especially helpful in the <a href="https://huggingface.co/spaces/lancewilhelm/bad-actors-annotator" target="_blank" rel="noopener noreferrer">Hugging Face Space</a>.</p>
  <p>Finally, <code>navigate()</code> is called by <code>btn_previous</code>, <code>btn_next</code>, and <code>btn_first_unlabeled</code> to move through the dataset based on which button was clicked.</p>
  <CodeBlock language="python" :code="code10" />
  <p>This function updates <code>current_row</code> based on the direction passed to it. If the direction is "Previous", it subtracts 1; if "Next", it adds 1. If the direction is "First Unlabeled", it finds the first row with a null value in <code>isCSContextuallyRelevant</code> and jumps there, which is handy when working with a partially annotated file. It then returns that row's values in the same order as <code>outputs</code>.</p>
  <p>The last step is launching the app:</p>
  <CodeBlock language="python" :code="code11" />
  <ProseHeading id="end-result" :level="2">End result</ProseHeading>
  <p>And that is it for the UI! Here is the complete script, which you can also view in the <a href="https://huggingface.co/spaces/lancewilhelm/bad-actors-annotator/blob/main/app.py" target="_blank" rel="noopener noreferrer">Bad Actors Annotator</a> Space. <strong>Note the order in which the functions and UI elements are defined</strong>:</p>
  <CodeBlock language="python" :code="code12" />
  <hr />
  <ProseHeading id="hugging-face-space" :level="2">Hugging Face Space</ProseHeading>
  <p>I also hosted this annotator in a Hugging Face Space, which lets us run the app and annotate data using their infrastructure. <strong>However, this is not the ideal way to use the app because the data is not persistent.</strong> If you refresh the page, you will lose your progress, so I recommend downloading the script and running it locally. If you just want to try it out, you can open it <a href="https://huggingface.co/spaces/lancewilhelm/bad-actors-annotator" target="_blank" rel="noopener noreferrer">in this Hugging Face Space</a>. Grab the sample data below and paste it into a blank CSV file to test it.</p>
  <ProseHeading id="sample-csv-data" :level="3">Sample CSV Data</ProseHeading>
  <CodeBlock language="csv" :code="code13" />
</template>
