import requests
from constants import model_id, api_token

class HuggingFaceService:
    def __init__(self, user, conversee) -> None:
         self.user = user
         self.conversee = conversee
         initialText = f"The following is a conversation between {user} and {conversee}."
         self.dialogue = [initialText]
    def __query(self, payload, model_id, api_token):
        headers = {"Authorization": f"Bearer {api_token}"}
        API_URL = f"https://api-inference.huggingface.co/models/{model_id}"
        response = requests.post(API_URL, headers=headers, json=payload)
        return response.json()
    def __getModelInput(self):
        d = {1: self.conversee, 0: self.user}
        modelInput = self.dialogue[0] + '\n'
        modelInput += "\n".join(
                f"{d.get(i%2, '')}: {self.dialogue[i+1]}"
                for i in range(len(self.dialogue[1:]))
            )
        return modelInput
    def newTokens(self, message: str):
        self.dialogue.append(message)
        modelInput = self.__getModelInput()
        res = self.__query(modelInput + f"\n{self.conversee}: ", model_id, api_token)[0]["generated_text"]
        digest = (res[len(modelInput)-len(self.conversee): ]).split(": ")
        self.dialogue.append(digest[1:][0][1:])

        return res
    def printDialogue(self):
        print(self.dialogue)

x = HuggingFaceService("Ajit Alapati", "Elon Musk")

res = x.newTokens("Elon, what's your favorite book on AI")

print(res)

res = x.newTokens("That's really cool")
x.printDialogue()
print(res)
