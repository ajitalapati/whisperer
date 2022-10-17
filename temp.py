import requests

url = 'http://127.0.0.1:5000/login'
myobj = {
        "user": "Ajit Alapati",
        "conversee": "Julius Caesar",
        'conversation': ['The following is a conversation between Ajit Alapati and Julius Caesar.', 
            "Julius, first of all, It's very nice to meet you. Second, what was the hardest part about conquering Gaul?"
        ]}

x = requests.post(url, json = myobj)

print(x.text)