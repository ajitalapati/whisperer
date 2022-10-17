from OpenAIService import *
from constants import openai_key

class Conversation:
    def __init__(self, user, conversee, dialogue = []):
        self.dialogue = dialogue
        self.user = user
        self.conversee = conversee

        if not dialogue: 
            initialText = f"The following is a conversation between {user} and {conversee}."
            self.dialogue = [initialText]

    def getModelInput(self):
        d = {1: self.conversee, 0: self.user}
        modelInput = self.dialogue[0] + '\n'
        modelInput += "\n".join(
                f"{d.get(i%2, '')}: {self.dialogue[i+1]}"
                for i in range(len(self.dialogue[1:]))
            )
        return modelInput + f"\n{self.conversee}: "

exConv = ['The following is a conversation between Ajit Alapati and Julius Caesar.', "Julius, What would you do if you are Vladimir Putin Right now?"]
c = Conversation("Ajit Alapati", "Julius Caesar", exConv)
service = OpenAIService(openai_key)

print(service.openAIPost(c))
