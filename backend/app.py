# backend/app.py

from flask import Flask, request, jsonify
from flask_cors import CORS
import google.generativeai as genai
import os
import requests

app = Flask(__name__)
CORS(app)

# Placeholder functions for LLMs
def query_gemini(prompt):
    GEMINI_API_KEY = os.getenv('GEMINI_FREE_API_KEY')
    genai.configure(api_key= GEMINI_API_KEY)

    model = genai.GenerativeModel("gemini-1.5-flash")
    response = model.generate_content(prompt)
    return response.text if response else "No response from Gemini."

def query_chatgpt(prompt):
    return 'Response from ChatGPT'

def query_claude(prompt):
    return 'Response from Claude'

def query_llama(prompt):
    return 'Response from Llama'

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

    return jsonify(responses)

if __name__ == '__main__':
    app.run(port=5000)
