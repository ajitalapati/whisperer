from flask import Flask, redirect, url_for, request, render_template
from Conversation import *
from OpenAIService import *
from constants import openai_key

openAIService = OpenAIService(openai_key)
app = Flask(__name__)

@app.route("/")
def home():
   return {"d": "welcome to whisper"}

@app.route('/login',methods = ['POST', 'GET'])
def login():
   if request.method == 'POST':
      r = request.json
      c = Conversation(r["user"], r["conversee"], r['conversation'])
      return {"res": openAIService.openAIPost(c)}
   else:
      user = request.args.get('nm')

if __name__ == '__main__':
   app.run(debug = True)