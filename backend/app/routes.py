from fastapi import APIRouter
from app.schema import Query
from app.cache import cache
from app.rag_pipeline import process_content, retrieve_context
from app.embeddings import create_vectorstore
from app.llm import generate_answer

router = APIRouter()

@router.post("/ask")
def ask(q: Query):
    try:
        if q.url in cache:
            db = cache[q.url]
        else:
            docs = process_content(q.content)
            db = create_vectorstore(docs)
            cache[q.url] = db

        context = retrieve_context(db, q.question)
        answer = generate_answer(context, q.question)

        return {"answer": answer}

    except Exception as e:
        return {"answer": str(e)}