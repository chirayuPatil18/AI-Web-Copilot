from openai import OpenAI
import os
from dotenv import load_dotenv

# ✅ LOAD ENV (this was missing)
load_dotenv()

client = OpenAI(
    base_url="https://openrouter.ai/api/v1",
    api_key=os.getenv("OPENROUTER_API_KEY")  # ✅ correct key
)

def generate_answer(context, question):
    response = client.chat.completions.create(
        model="openrouter/auto",
        messages=[
            {
                "role": "user",
                "content": f"""
                Answer based on context:

                {context}

                Question: {question}
                """
            }
        ]
    )

    return response.choices[0].message.content