from gpt_index import download_loader, GPTSimpleVectorIndex

WikipediaReader = download_loader("WikipediaReader")

loader = WikipediaReader()
documents = loader.load_data(pages=['Benjamin Franklin'])

index = GPTSimpleVectorIndex(documents)

index.save_to_disk('index2.json')