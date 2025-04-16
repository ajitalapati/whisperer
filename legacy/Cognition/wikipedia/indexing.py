from gpt_index import Document, GPTSimpleVectorIndex

import wikipedia
import re

# Specify the title of the Wikipedia page
wiki = wikipedia.page('Benjamin Franklin')
# Extract the plain text content of the page
text = wiki.content

cleanedParagraphs = text.split('\n')

cutoff = 0
for i, val in enumerate(cleanedParagraphs):
    if "= Notes =" in val:
        cutoff = i
cleanedParagraphs = cleanedParagraphs[0:cutoff]

#regex cleaning
text = '\n'.join(cleanedParagraphs)
text = re.sub(r'==.*?==+', '', text)
cleanedParagraphs = text.split('\n')
cleanedParagraphs = [i for i in cleanedParagraphs if i !='']

"""
documents = [Document(t) for t in cleanedParagraphs]
index = GPTSimpleVectorIndex(documents)

index.save_to_disk('index.json')"""