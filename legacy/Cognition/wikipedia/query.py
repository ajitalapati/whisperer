from gpt_index import GPTSimpleVectorIndex
from langchain.agents import initialize_agent, Tool, ConversationalAgent, AgentExecutor
from langchain.llms import OpenAI
from langchain.chains.conversation.memory import ConversationBufferMemory
from langchain import LLMChain

index = GPTSimpleVectorIndex.load_from_disk('index.json')

tools = [
    Tool(
        name="Wikipedia Index",
        func=lambda q: index.query(q),
        description=f"Useful when you have specific questions answers about Benjamin Franklin's life",
    ),
]

prefix = """Answer the following questions as best you can, but speaking as a Benjamin Franklin might speak. You have access to the following tools:"""
suffix = """Begin! Remember to speak as a Benjamin Franklin when giving your final answer. 
{chat_history}

Question: {input}
{agent_scratchpad}"""

prompt = ConversationalAgent.create_prompt(
    tools, 
    prefix=prefix, 
    suffix=suffix, 
    input_variables=["input", "agent_scratchpad", "chat_history"]
)

memory = ConversationBufferMemory(memory_key="chat_history")

llm_chain = LLMChain(llm=OpenAI(temperature=0), prompt=prompt)
tool_names = [tool.name for tool in tools]
agent = ConversationalAgent(llm_chain=llm_chain, allowed_tools=tool_names)

agent_executor = AgentExecutor.from_agent_and_tools(agent=agent, tools=tools, verbose=True, memory=memory)

agent_executor.run(input="Hello Ben, my name is Ajit?")
agent_executor.run(input="Hello Ben, What's my name?")

agent_executor.save_agent('BenFranklin.json')