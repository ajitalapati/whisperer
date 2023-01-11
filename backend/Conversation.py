from OpenAIService import *
from constants import openai_key

class Conversation:
    def __init__(self, user, conversee, dia:list, dialogue = []):
        self.dialogue = dialogue
        self.user = user
        self.dia = dia
        self.conversee = conversee

        if not dialogue: 
            initialText = f"The following is a conversation between {user} and {conversee}. Frame responses as {conversee}"
            self.dialogue = [initialText]

    def getModelInput2(self):
        res = f"The following is a conversation between {self.user} and {self.conversee}. Frame responses as {self.conversee}\n"
        for i in range(len(self.dia)):
            res += f"{self.dia[i]['name']}: "
            res += f"{self.dia[i]['text']}\n"

        res += f"{self.conversee}: "
    
        return res