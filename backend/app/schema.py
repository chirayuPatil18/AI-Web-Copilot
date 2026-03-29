from pydantic import BaseModel

class Query(BaseModel):
    content: str
    question: str
    url: str