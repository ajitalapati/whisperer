from gpt_index import GPTSimpleVectorIndex

index = GPTSimpleVectorIndex.load_from_disk('index.json')

response = index.query("Explain the cockpit in London? How did that go for Ben Franklin?")

print(response.get_formatted_sources())