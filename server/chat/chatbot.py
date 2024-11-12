from langchain_community.document_loaders import CSVLoader
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain_openai import ChatOpenAI, OpenAIEmbeddings
from langchain_community.vectorstores import FAISS
from langchain.chains.combine_documents import create_stuff_documents_chain
from langchain.chains import create_retrieval_chain
from langchain_core.prompts import ChatPromptTemplate
from dotenv import load_dotenv
import pandas as pd
import os
import sys

# Load environment variables from .env file
load_dotenv()

# Get the directory of the current file
current_dir = os.path.dirname(os.path.abspath(__file__))
# Update file paths to absolute paths
SUMM_PATH = os.path.join(current_dir, "Data_for_Training.csv")
PROCESSED_SUMM_PATH = os.path.join(current_dir, "Data_for_Training.csv")
DB_FAISS_PATH = os.path.join(current_dir, "VectosFAISS")
# Llama_MODEL_PATH = "models/llama-2-7b.Q4_K_M.gguf"

def QAmodel(api_key):
    """
    This function builds and returns a retrieval and answer chain
    for a automotive question answering system.
    """
    # Set the OpenAI API key
    os.environ["OPENAI_API_KEY"] = api_key
    """
    Uncomment these lines if running for the first time. 
    Comment out these lines again from 2nd time onwards to save time and processing power.
    """
    loader = CSVLoader(file_path=PROCESSED_SUMM_PATH, encoding="utf-8", csv_args={'delimiter':','})
    data = loader.load()
    # data = pd.read_csv('Data_for_Training.csv')

    text_splitter = RecursiveCharacterTextSplitter(chunk_size=2000, chunk_overlap=20)
    text_chunks = text_splitter.split_documents(data)
    """ 
    Uncomment the embedding you want to use
    """ 
    embeddings = OpenAIEmbeddings()
    # embeddings = VertexAIEmbeddings(model_name="textembedding-gecko@003")
    # embeddings = HuggingFaceEmbeddings(model_name="sentence-transformers/all-minilm-l6-v2")
    """
    Uncomment these lines if running for the first time.
    Comment out these lines again from 2nd time onwards to save time and processing power. 
    """
    # db = FAISS.from_documents(text_chunks, embeddings)
    # db.save_local(DB_FAISS_PATH)
    
    db = FAISS.load_local(DB_FAISS_PATH, embeddings, allow_dangerous_deserialization=True)
    """
    Uncomment the LLM you want to use
    """
    LLM = ChatOpenAI(model="gpt-3.5-turbo-0125", temperature=0.4)   # paid  
    # LLM = ChatVertexAI(model_name="gemini-pro", temperature=0.1)      # free trial
    # LLM = LlamaCpp(model_name=Llama_MODEL_PATH, temperature=0.1)  # free (require local download of model)

    prompt = ChatPromptTemplate.from_template(""" 
    You are Auto-Bot, a friendly AI assistant here to answer car-related queries. 
    I provide detailed and accurate information based on a supervised dataset specifically focused on automotive issues and solutions.

    The dataset includes the following fields for each entry:
    - Input: The user-provided car-related question or prompt.
    - Output: Potential issues and solutions related to various car models and problems.

    Please follow these strict guidelines when answering questions:
    - Only provide information related to cars and automotive issues. Dont provide information on other topics.
    - Dont let the user know about the dataset or the AI model.
    - Generate 3-4 possible answers for each user query in the form of a paragraph.
    - If you cannot satisfactorily answer a question based on the dataset, politely inform the user that the necessary information is not available.
    <context>
    {context}
    </context>

    Question: {input}
    """)

    document_chain = create_stuff_documents_chain(LLM, prompt)
    retriever = db.as_retriever()
    qa = create_retrieval_chain(retriever, document_chain)
    return qa

def main():
    api_key = os.getenv("OPENAI_API_KEY")
    if not api_key:
        raise ValueError("API key not found. Please set OPENAI_API_KEY in your environment variables.")
        
    qa_model = QAmodel(api_key)
    if len(sys.argv) > 1:
        user_input = sys.argv[1]
        if user_input:
            answer = qa_model.invoke({"input": user_input})
            result = answer['answer']
            print(result)
        else:
            print("No input provided")
    else:
        print("No input provided")

if __name__ == "__main__":
    main()
