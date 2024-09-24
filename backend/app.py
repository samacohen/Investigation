# backend/app.py

import google.generativeai as genai
import os
import requests
import anthropic
import replicate

from flask import Flask, request, jsonify
from flask_cors import CORS
from pymongo import MongoClient
from pymongo.server_api import ServerApi
from datetime import datetime
from dotenv import load_dotenv
from openai import OpenAI
from huggingface_hub import InferenceClient
from zhipuai import ZhipuAI

#Load environment variables
load_dotenv()

app = Flask(__name__)
CORS(app)

# MongoDB setup
MONGO_URI = os.getenv('MONGO_URI', 'mongodb://localhost:27017')
client = MongoClient(MONGO_URI, server_api=ServerApi("1"))


#Test mongoDB connection:
try:
    client.admin.command('ping')
    print("Pinged your deployment. You successfully connected to MongoDB!")
except Exception as e:
    print(e)


db = client['llm_database']  # Create/use (if already existing) a database called 'llm_database'
collection = db['responses']  # Create/use (if already existing) a collection called 'responses'

@app.route('/api/chats', methods=['GET'])
def get_chats():
    chats = collection.find()
    chat_list = [{'prompt': chat['prompt'], 'response': chat['responses']} for chat in chats]
    print(jsonify(chat_list))
    return jsonify(chat_list)

#Create OpenAI client
openAIClient = OpenAI()

anthropicClient = anthropic.Anthropic(
    api_key = os.getenv('ANTHROPIC_API_KEY')
)


chatGLMclient = ZhipuAI(api_key=os.getenv('GLM_API_KEY'))

universalPrompt = "Pretend you are a triage specialist working in a large South African public hospital. For the triage scenario given to you, use only the information provided to make your triage decisions. You must triage the patients, you must list the order in which you will treat the patients with their patient number and you must explain your reasoning. You are only to answer medical triage questions. The scenario is as follows:"

# Functions to query LLMs
def query_gemini(prompt):
    GEMINI_API_KEY = os.getenv('GEMINI_FREE_API_KEY')
    genai.configure(api_key= GEMINI_API_KEY)

    model = genai.GenerativeModel("gemini-1.5-flash")
    response = model.generate_content(universalPrompt + " " + prompt)
    return response.text if response else "No response from Gemini."

def query_chatgpt(prompt):
    OPENAI_API_KEY = os.getenv('OPENAI_API_KEY')
    completion = openAIClient.chat.completions.create(
    model="gpt-4o",
    messages=[
        {"role": "system", "content": "You are a helpful assistant."},
        {
            "role": "user",
            "content": universalPrompt + " " + prompt
        }
    ],
    max_tokens=512
)
    return completion.choices[0].message.content if completion else 'No response from ChatGPT'

def query_claude(prompt):
    message = anthropicClient.messages.create(
        model='claude-3-5-sonnet-20240620',
        max_tokens=512,
        messages=[
            {'role': 'user', 'content': universalPrompt + " " + prompt}
        ]
    )
    return message.content[0].text if message else 'No response from Claude'

def query_llama(prompt):
   output = ""
   input = {
       "prompt": universalPrompt + " " + prompt,
       "max_tokens": 512
   }

   for event in replicate.stream (
       "meta/meta-llama-3.1-405b-instruct",
       input = input
   ):
        output += str(event)

   return output
    
def query_glm4_flash(prompt):
    response = chatGLMclient.chat.completions.create(
        model="glm-4-flash",
        messages=[
            {"role": "system", "content": "You are a helpful assistant."},
            {"role": "user", "content": universalPrompt + " " + prompt}
        ],
        top_p=0.7,
        temperature=0.95,
        max_tokens=1024,
        stream=True
    )

    # Accumulate the streamed response
    full_response = ""
    for chunk in response:
        full_response += chunk.choices[0].delta.content

    return full_response if full_response else 'No response from GLM-4-Flash'

@app.route('/api/llm/', methods=['POST'])
def llm():
    data = request.json
    prompt = data.get('prompt')
    models = data.get('models')  # Get the selected models
    print(f"Received prompt: {prompt}")
    print(f"Selected models: {models}")

    responses = {}

    # Only query the models that were selected
    if 'Gemini' in models:
        responses['Gemini'] = query_gemini(prompt)
    if 'ChatGPT' in models:
        responses['ChatGPT'] = query_chatgpt(prompt)
    if 'Claude' in models:
        responses['Claude'] = query_claude(prompt)
    if 'Llama' in models:
        responses['Llama'] = query_llama(prompt)
    if 'ChatGLM4-Flash' in models:
        responses['ChatGLM4-Flash'] = query_glm4_flash(prompt)


    # Save the prompt and responses to MongoDB
    document = {
        "prompt": universalPrompt + " " + prompt,
        "responses": responses,
        "models": models,
        "timestamp": datetime.utcnow()
    }
    collection.insert_one(document)

    return jsonify(responses)

if __name__ == '__main__':
    app.run(port=5000)
