from flask import Flask, request, jsonify # want to make a flask app so i need to import flask, request and jsonify needed to send and recieve data
from flask_cors import CORS # cross origin resource sharing, allows us to make requests from our react app to our flask app
from dotenv import dotenv_values # allows us to access our .env file
from openai import OpenAI # openai api


app = Flask(__name__) # this created an instance of the flask app, name is what python assigns to the file
CORS(app, resources={r"/chat": {"origins": "*"}}) # this allows us to make requests from our react app to our flask app

config = dotenv_values(".env") # this loads the .env file data into a dictionary called config 

@app.route('/chat', methods=['POST'])
def chat():
  try:
  
    data = request.json
    user_input = data.get('message')
  
    client = OpenAI(api_key=config['OPENAI_API_KEY'])
    
    response = client.chat.completions.create(
      model="gpt-3.5-turbo",
      messages=[
        {"role": "system", "content": "You are a helpful assistant."},
        {"role": "user", "content": user_input}
      ]
    )
    if response.choices:
      return jsonify({"reply": response.choices[0].message.content})
    else:
      return jsonify({"reply": "Sorry, No response found."})
  except Exception as e:
    return jsonify({"error": str(e)}), 500

    
if __name__ == '__main__':
    app.debug = True
    app.run()
    debug= True 


  