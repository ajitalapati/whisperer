import requests

url = 'http://127.0.0.1:5000/login'
myobj = {
        "user": "Ajit Alapati",
        "conversee": "Elon Musk",
        'conversation': ['The following is a conversation between Ajit Alapati and Elon Musk.', 
            "Elon, first of all, It's very nice to meet you. Second, what was the hardest part about founding Tesla and SpaceX?"
        ]}

x = requests.post(url, json = myobj)

print(x.text)