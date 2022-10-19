from flask import Flask, redirect, url_for, request, render_template
from flask_cors import CORS
from Conversation import *
from OpenAIService import *
from constants import openai_key

openAIService = OpenAIService(openai_key)
app = Flask(__name__)
CORS(app)

@app.route("/")
def home():
   return {"d": "welcome to whisper"}

@app.route('/new',methods = ['POST', 'GET'])
def login():
   if request.method == 'POST':
      r = request.json
      c = Conversation(r["user"], r["conversee"], r['conversation'])
      return {"res": openAIService.openAIPost(c)}
   else:
      user = request.args.get('nm')

if __name__ == '__main__':
   app.run(debug = True)