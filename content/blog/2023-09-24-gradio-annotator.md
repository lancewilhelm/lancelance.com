---
title: Data Annotator Using Gradio
date: 2023-09-23T12:00:00Z
description: Creating a simple UI to aid in data annotation
tags: Data-Science, ML, AI, Gradio, Python
categories: Academic
---

Recently, I helped annotate over 600 rows of data for a counter-hate speech project. The data was in the form of a CSV file, and I had to manually go through each row and assign either a 0 or 1 label to two different attributes. This was a very tedious task, and I was looking for a way to speed up the process. I had a few options:

- Use a spreadsheet software like Excel or Google Sheets to manually go through each row and assign the labels (very tedious)
- Write a Python script to read the CSV file and display each row, and then assign the labels (still tedious)
- Use a tool like [Label Studio](https://labelstud.io/) to create a web-based annotation tool (a little too much for the task at hand, but a good option for larger projects)
- Use a tool like [Gradio](https://gradio.app/) to create a simple UI to aid in the annotation process (perfect!)

I decided to go with the last option, and I was able to create a simple UI in less than 10 minutes and a little help from their docs and our good friend ChatGPT. Here's how I did it.

## But first, what is Gradio?

Gradio is a Python library that allows you to quickly create customizable UI components around machine learning models. It's a great tool for quickly prototyping and sharing models with others. You can read more about it [here](https://gradio.app/).

## Installation

As always, you should create a virtual environment when starting a new project. I use Miniconda (`conda create -n annotator python=3.11`), but you can use whatever you're comfortable with. Once you have a new environment setup, you can install Gradio using pip:

```bash
pip install gradio
```

## The data

For this project, we will be annotating hate speech and counter speech for contextual relevance and tone label relevance. The CSV file contains 7 columns of data. The first column is an ID, and the next 6 columns are the attributes that we will be observing and annotating. Here's what a sample CSV file looks like:

| id  | hs                        | cs                              | topic    | tone   | isCSContextuallyRelevant | isToneMatch |
| --- | ------------------------- | ------------------------------- | -------- | ------ | ------------------------ | ----------- |
| 0   | You are mean              | That is not a nice thing to say | personal | refute |                          |             |
| 1   | These people are not good | Well if they aren't who is?!    | personal | humor  |                          |             |

_Obviously, this is made up hate speech and counter speech. The actual data is very toxic and offensive, so I won't be sharing it here. But you get the idea..._

We will be comparing the hate speech (hs) and counter speech (cs) to determine if the counter speech is contextually relevant to the hate speech (1 for yes, 0 for no). We will also be comparing the tone of the counter speech to determine if it matches the tone label (1 for yes, 0 for no). The topic column is not relevant to this project, so we will ignore it.

## Creating the UI

_The full code for the app without breaks for explanation can be found at the [end of this post](#end-result) or [here](https://huggingface.co/spaces/lancewilhelm/bad-actors-annotator/blob/main/app.py)._

Now that we have Gradio installed, we can start creating our UI. We'll start by importing the necessary libraries:

```python
import gradio as gr
import pandas as pd
import numpy as np
```

Gradio will be used to create the UI, pandas to import and handle our data, and numpy to check for null values in the data (useful for navigating the data).

First, let's build the actual UI portion of the app so that we can understand how the data will be displayed to the user. Later, we will create the functions that will be called by the UI interface, but it helps to see what is going on in the UI first.

This app will take advantage of [Gradio blocks](https://www.gradio.app/docs/blocks) (`gr.Blocks()`) to construct an app with multiple sections that handle the different parts of the annotation task. Let's start the top of our app with the following code (**Note**: Pay attention to the indentation as we are working with Python):

```python
with gr.Blocks(theme=gr.themes.Soft()) as annotator:
    gr.Markdown("## Data Annotation")
```

The first line initializes our app as `annotator` and sets the theme to `Soft` for some visual appeal. The second line creates a Markdown block that displays the title of our app. Next, we will create the row in the UI that will allow us to load in the CSV data:

```python
with gr.Row():
    gr.Markdown("### Upload CSV")
    file_upload = gr.File()
    btn_load = gr.Button("Load CSV")
```

We utilize block layout feature `gr.Row()` to contain everything underneath it into the same row. We add another title for the row, and then we get into the first substantive components. The first component is a `gr.File()` object that will allow us to upload a CSV file and store it in the variable `file_upload`. The second component is a `gr.Button()` object that will call a later function to load and store the CSV's data into a global dataframe variable.

Now that you have an idea of how this works, let's throw the entire next row on the screen:

```python
with gr.Row():
    gr.Markdown("### Current Row")
    with gr.Row():
        idx = gr.Number(label='Index')
        hs = gr.Textbox(label='HS')
        cs = gr.Textbox(label='CS')

    with gr.Row():
        topic = gr.Textbox(label='Topic')
        tone = gr.Textbox(label='Tone')

    with gr.Row():
        isCSContextuallyRelevant = gr.Radio(["1", "0"], label="Contextually Relevant?")
        isToneMatch = gr.Radio(["1", "0"], label="Tone Match?")
        btn_annotate = gr.Button("Annotate")

    with gr.Row():
        btn_previous = gr.Button("Previous")
        btn_next = gr.Button("Next")
        btn_first_unlabeled = gr.Button("First Unlabeled")
```

This row is the meat of the annotator. We utilize subrows to further organize the sub components of the row. This ends up looking like columns in our case and can probably be accomplished with `gr.Column()` as well. The first subrow contains elements that display the current data row index (id), the hate speech (hs), and the counter (cs). The second subrow contains elements that display the topic and tone. The third subrow gets a bit more complicated as we introduce Gradio elements that will allow us to annotate the data. We use `gr.Radio()` to create a radio button that will allow us to select either a 1 or 0 for the `isCSContextuallyRelevant` and `isToneMatch` attributes. Finally, we have a button that will call a function to save the annotation. Lastly, the fourth subrow contains buttons that will allow us to navigate through the data. The first button will go to the previous data row, the second button will go to the next data row, and the third button will go to the first unlabeled data row.

The last row is straight forward and contains a component to contain a downloadable file of the annotated data and a button to download the file:

```python
with gr.Row():
    gr.Markdown("### Annotated Data File Download")
    file_download = gr.File()
```

Lastly, we need to create event handlers for all of the buttons in the UI.

```python
btn_load.click(load_csv, inputs=[file_upload], outputs=[idx, hs, cs, topic, tone, isCSContextuallyRelevant, isToneMatch])
btn_annotate.click(annotate_row, inputs=[isCSContextuallyRelevant, isToneMatch], outputs=[idx, hs, cs, topic, tone, isCSContextuallyRelevant, isToneMatch, file_download])
btn_previous.click(navigate, inputs=gr.Textbox("Previous", visible=False), outputs=[idx, hs, cs, topic, tone, isCSContextuallyRelevant, isToneMatch])
btn_next.click(navigate, inputs=gr.Textbox("Next", visible=False), outputs=[idx, hs, cs, topic, tone, isCSContextuallyRelevant, isToneMatch])
btn_first_unlabeled.click(navigate, inputs=gr.Textbox("First Unlabeled", visible=False), outputs=[idx, hs, cs, topic, tone, isCSContextuallyRelevant, isToneMatch])
```

Each button has a `click()` event handler that will call a function when the button is clicked. They also have `inputs` and `outputs` parameters that will pass the appropriate data to the function and return the appropriate data from the function, respectively. The outputs are all the different component variables that we established in the rows above. Each function will return the respective data in that order which allows the correct data to be displayed in the correct place in the UI.

Now, let's create those functions that we are calling in the event handlers. Here you will see the inputs and outputs that the event handlers are working with. First up, though we need to create two global variables that will store the data and the current row index.

```python
# Global variable to store the DataFrame
df = None
# Global variable to keep track of the current row index
current_row = 0
```

For the first function, we have `load_csv()` which is called by `btn_load` and imports our data that was uploaded to `file_upload`.

```python
def load_csv(file):
    global df
    global current_row
    # import the csv and set the data types to be int, string, string, string, string, string, string
    df = pd.read_csv(file.name, dtype={'id':int, 'hs': str, 'cs': str, 'topic': str, 'tone': str, 'isCSContextuallyRelevant': str, 'isToneMatch': str})
    current_row = 0
    row_dict = df.iloc[current_row].to_dict()
    return row_dict['id'], row_dict['hs'], row_dict['cs'], row_dict['topic'], row_dict['tone'], row_dict['isCSContextuallyRelevant'], row_dict['isToneMatch']
```

This function leverages the pandas function `pd.read_csv()` to read in the data from the CSV file and store it in the global variable `df`. We also explicitly set the datatypes for each to ensure that when we work with the data in the annotator, everything is stored properly. We also set the global variable `current_row` to 0 so that we start at the beginning of the data. We then create a dictionary of the current row of data and return the appropriate values to the UI. You can see that we return the different values in the same order that we set the outputs in the event handler.

The next function is `annotate_row()` which is called by `btn_annotate` and saves the annotation to the global variable `df`.

```python
def annotate_row(isCSContextuallyRelevant, isToneMatch):
    global df
    global current_row

    df.at[current_row, 'isCSContextuallyRelevant'] = isCSContextuallyRelevant
    df.at[current_row, 'isToneMatch'] = isToneMatch

    if current_row < len(df) - 1:
        current_row += 1
    else:
        current_row = 0
    df.to_csv('annotated_data.csv', index=False)

    row_dict = df.iloc[current_row].to_dict()
    return row_dict['id'], row_dict['hs'], row_dict['cs'], row_dict['topic'], row_dict['tone'], row_dict['isCSContextuallyRelevant'], row_dict['isToneMatch'], 'annotated_data.csv'
```

This function takes the values from the UI and saves them to the global variable `df`. It then increments the `current_row` variable and returns the next row of data to the UI. If the `current_row` variable is equal to the length of the dataframe, then we have reached the end of the data and we reset the `current_row` variable to 0. We then save the annotated data to a local CSV file, `annotated_data.csv` and return the next row of data to the UI. Again, you can see that we return the different values in the same order that we set the outputs in the event handler. This time, notice that we pass the CSV file to the `file_download` component so that the user can download the annotated data from the browser as well (this comes in handy with the [Hugging Face Space](https://huggingface.co/spaces/lancewilhelm/bad-actors-annotator))

Lastly, we have the `navigate()` function which is called by `btn_previous`, `btn_next`, and `btn_first_unlabeled` and navigates the data based on the button that was clicked.

```python
def navigate(direction):
    global current_row
    if direction == "Previous":
        current_row = max(0, current_row - 1)
    elif direction == "Next":
        current_row = min(len(df) - 1, current_row + 1)
    elif direction == "First Unlabeled":
        unlabeled_row = df[df['isCSContextuallyRelevant'].isna()].index.min()
        if not np.isnan(unlabeled_row):
            current_row = int(unlabeled_row)

    row_dict = df.iloc[current_row].to_dict()
    return row_dict['id'], row_dict['hs'], row_dict['cs'], row_dict['topic'], row_dict['tone'], row_dict['isCSContextuallyRelevant'], row_dict['isToneMatch']
```

This function takes the direction that was passed to it and updates the `current_row` variable accordingly. If the direction is "Previous", then we decrement the `current_row` variable by 1. If the direction is "Next", then we increment the `current_row` variable by 1. If the direction is "First Unlabeled", then we find the first row that has a null value for the `isCSContextuallyRelevant` attribute and set the `current_row` variable to that row. This is useful if you pass in data that has already been partially annotated. We then return the next row of data to the UI. Again, you can see that we return the different values in the same order that we set the outputs in the event handler.

The last thing to do is to run the app:

```python
annotator.launch()
```

## End result

And that's it for the UI! Now, let's take a look at the full code. You can also find the full code at [Bad Actors Annotator](https://huggingface.co/spaces/lancewilhelm/bad-actors-annotator/blob/main/app.py). **Note the order in which the functions and UI elements are called/created**:

```python
import gradio as gr
import pandas as pd
import numpy as np

# Global variable to store the DataFrame
df = None
# Global variable to keep track of the current row index
current_row = 0

def load_csv(file):
    global df
    global current_row
    # import the csv and set the data types to be int, string, string, string, string, string, string
    df = pd.read_csv(file.name, dtype={'id':int, 'hs': str, 'cs': str, 'topic': str, 'tone': str, 'isCSContextuallyRelevant': str, 'isToneMatch': str})
    current_row = 0
    row_dict = df.iloc[current_row].to_dict()
    return row_dict['id'], row_dict['hs'], row_dict['cs'], row_dict['topic'], row_dict['tone'], row_dict['isCSContextuallyRelevant'], row_dict['isToneMatch']

def annotate_row(isCSContextuallyRelevant, isToneMatch):
    global df
    global current_row

    df.at[current_row, 'isCSContextuallyRelevant'] = isCSContextuallyRelevant
    df.at[current_row, 'isToneMatch'] = isToneMatch

    if current_row < len(df) - 1:
        current_row += 1
    else:
        current_row = 0
    df.to_csv('annotated_data.csv', index=False)

    row_dict = df.iloc[current_row].to_dict()
    return row_dict['id'], row_dict['hs'], row_dict['cs'], row_dict['topic'], row_dict['tone'], row_dict['isCSContextuallyRelevant'], row_dict['isToneMatch'], 'annotated_data.csv'

def navigate(direction):
    global current_row
    if direction == "Previous":
        current_row = max(0, current_row - 1)
    elif direction == "Next":
        current_row = min(len(df) - 1, current_row + 1)
    elif direction == "First Unlabeled":
        unlabeled_row = df[df['isCSContextuallyRelevant'].isna()].index.min()
        if not np.isnan(unlabeled_row):
            current_row = int(unlabeled_row)

    row_dict = df.iloc[current_row].to_dict()
    return row_dict['id'], row_dict['hs'], row_dict['cs'], row_dict['topic'], row_dict['tone'], row_dict['isCSContextuallyRelevant'], row_dict['isToneMatch']

with gr.Blocks(theme=gr.themes.Soft()) as annotator:
    gr.Markdown("## Data Annotation")

    with gr.Row():
        gr.Markdown("### Upload CSV")
        file_upload = gr.File()
        btn_load = gr.Button("Load CSV")

    with gr.Row():
        gr.Markdown("### Current Row")
        with gr.Row():
            idx = gr.Number(label='Index')
            hs = gr.Textbox(label='HS')
            cs = gr.Textbox(label='CS')

        with gr.Row():
            topic = gr.Textbox(label='Topic')
            tone = gr.Textbox(label='Tone')

        with gr.Row():
            isCSContextuallyRelevant = gr.Radio(["1", "0"], label="Contextually Relevant?")
            isToneMatch = gr.Radio(["1", "0"], label="Tone Match?")
            btn_annotate = gr.Button("Annotate")

        with gr.Row():
            btn_previous = gr.Button("Previous")
            btn_next = gr.Button("Next")
            btn_first_unlabeled = gr.Button("First Unlabeled")

    with gr.Row():
        gr.Markdown("### Annotated Data File Download")
        file_download = gr.File()

    btn_load.click(load_csv, inputs=[file_upload], outputs=[idx, hs, cs, topic, tone, isCSContextuallyRelevant, isToneMatch])
    btn_annotate.click(annotate_row, inputs=[isCSContextuallyRelevant, isToneMatch], outputs=[idx, hs, cs, topic, tone, isCSContextuallyRelevant, isToneMatch, file_download])
    btn_previous.click(navigate, inputs=gr.Textbox("Previous", visible=False), outputs=[idx, hs, cs, topic, tone, isCSContextuallyRelevant, isToneMatch])
    btn_next.click(navigate, inputs=gr.Textbox("Next", visible=False), outputs=[idx, hs, cs, topic, tone, isCSContextuallyRelevant, isToneMatch])
    btn_first_unlabeled.click(navigate, inputs=gr.Textbox("First Unlabeled", visible=False), outputs=[idx, hs, cs, topic, tone, isCSContextuallyRelevant, isToneMatch])

annotator.launch()
```

---

## Hugging Face Space

I also hosted this annotator in a Hugging Face Space, which allows us to perform the host the app and perform the annotation task using their infrastructure. **However, this is not the ideal way to use this app because the data is not persistent.** If you refresh the page, you will lose all of your progress. This is why I recommend downloading the app and running it locally. However, if you want to try it out, you can find it [here](https://huggingface.co/spaces/lancewilhelm/bad-actors-annotator) and below! Feel free to grab the sample data below and paste it into a blank CSV file to test it out.

### Sample CSV Data

```csv
id,hs,cs,topic,tone,isCSContextuallyRelevant,isToneMatch
0,You are mean,That is not a nice thing to say,personal,refute, ,
1,These people are not good,Well if they aren't who is?!,personal,humor, ,
```
