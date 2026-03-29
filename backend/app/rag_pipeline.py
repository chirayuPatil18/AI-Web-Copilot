from langchain_text_splitters import RecursiveCharacterTextSplitter

def process_content(content):
    splitter = RecursiveCharacterTextSplitter(
        chunk_size=500,
        chunk_overlap=50
    )
    return splitter.create_documents([content])


def retrieve_context(db, question):
    docs = db.similarity_search(question, k=3)
    return "\n".join([doc.page_content for doc in docs])