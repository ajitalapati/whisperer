import openai

class OpenAIService:
    def __init__(self, api_key) -> None:
         self.api_key = api_key

    def openAIPost(self, conv):
        openai.api_key = self.api_key    
        res = openai.Completion.create(
            model="text-davinci-003",
            prompt=conv.getModelInput(),
            temperature=0.9,
            max_tokens=100,
            top_p=1,
            frequency_penalty=0,
            presence_penalty=0.6,
            stop=[f" {conv.user}:", f" {conv.conversee}:"]
        )
        resText = res["choices"][0]["text"]

        while resText[0] == " " or resText[0] == '\n': resText = resText[1:]
        return resText