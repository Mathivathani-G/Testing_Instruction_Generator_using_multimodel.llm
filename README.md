# Testing_Instruction_Generator_using_multimodel.llm
Overview

This project leverages a multimodal machine learning model integrated with Hugging Face API to generate detailed testing instructions based on user-provided contexts and uploaded screenshots. The goal is to make testing easier, faster, and more structured for bus application development.

The application provides:

- Step-by-step instructions for testing functionality.
- Pre-conditions and expected outcomes based on user context and screenshots.
- A user-friendly interface with real-time generation of test steps.

Features

* Upload Screenshots: Upload up to 12 screenshots for better context-based testing instructions.
* Context Input: Add optional context to tailor the generated test steps.
* Testing Instructions: Get detailed pre-conditions, steps, and expected results for your testing scenarios.
* Hugging Face API Integration: Uses GPT models to generate relevant and coherent testing instructions.

Prerequisites : Node.js (>=14.x) , NPM , Hugging Face API Key

1.Installation
Clone the repository:

git clone https://github.com/Mathivathani-G/Testing_Instruction_Generator_using_multimodel.llm.git

2.Navigate into the project directory:

cd Testing_Instruction_Generator_using_multimodel.llm

3.Install dependencies:

npm install

4.Create a .env file to include your Hugging Face API key:

API_KEY=your_hugging_face_api_key

5.Start the server:

npm start
Open http://localhost:5000 in your browser.

API Details

This project integrates with the Hugging Face GPT-2 model. The API call is made to generate testing instructions based on the uploaded images and provided context.

API URL:

https://api-inference.huggingface.co/models/gpt2

API Key:

You will need to include your API Key in the .env file for authentication.

Prompt Strategy
The prompting strategy is designed to guide the model in generating detailed and structured testing instructions.

Please generate detailed testing instructions for the following context: "bus application".

Instructions should follow this format:

1. Pre-conditions: Describe any setup needed before testing.
2. Steps: Provide step-by-step testing actions.
3. Expected Result: Describe the expected outcome after completing the test.

Usage

Upload Screenshots:
*  Use the "Choose Files" button to select the images.
* Add Context: Enter a brief description of the context (optional but recommended).
* Generate Instructions: Click the "Generate Instructions" button to get detailed steps for testing.

  PROJECT STRUCTURE :

├── public/             # Contains HTML, CSS, JS files for frontend

│ ----├── index.html      # Main HTML file

│ ----├── style.css       # Styling for the frontend

│ ----└── script.js       # JavaScript for handling frontend logic

├── server.mjs          # Express server to handle API requests and file uploads

├── README.md           # Project documentation

└── package.json        # Project dependencies and metadata

