# 🚀 AI Web Copilot (Agentic RAG Chrome Extension)

An AI-powered Chrome Extension that understands any webpage and lets you interact with it using natural language.

This project demonstrates **Retrieval-Augmented Generation (RAG)**, **semantic search**, and **context-aware AI responses** using a modular backend and browser-based interface.

---

## ✨ Features

- 🧠 Context-aware Q&A on any webpage
- 📄 Automatic content extraction from websites
- 🔍 Semantic search using embeddings (FAISS)
- ⚡ Fast responses with in-memory caching
- 📌 Auto-generated key topics for quick exploration
- 💬 Persistent chat per webpage (localStorage)
- 🎨 Premium UI with floating & sidebar modes
- 🌙 Dark mode support

---

## 🧠 Tech Stack

### 🔹 Backend
- FastAPI
- LangChain
- FAISS (Vector Database)
- HuggingFace Embeddings
- OpenRouter (LLM API)

### 🔹 Frontend (Extension)
- Chrome Extension (Manifest v3)
- Vanilla JavaScript
- Dynamic UI Injection

---

## 🏗️ Project Structure
# 🚀 AI Web Copilot (Agentic RAG Chrome Extension)

An AI-powered Chrome Extension that understands any webpage and lets you interact with it using natural language.

This project demonstrates **Retrieval-Augmented Generation (RAG)**, **semantic search**, and **context-aware AI responses** using a modular backend and browser-based interface.

---

## ✨ Features

- 🧠 Context-aware Q&A on any webpage
- 📄 Automatic content extraction from websites
- 🔍 Semantic search using embeddings (FAISS)
- ⚡ Fast responses with in-memory caching
- 📌 Auto-generated key topics for quick exploration
- 💬 Persistent chat per webpage (localStorage)
- 🎨 Premium UI with floating & sidebar modes
- 🌙 Dark mode support

---

## 🧠 Tech Stack

### 🔹 Backend
- FastAPI
- LangChain
- FAISS (Vector Database)
- HuggingFace Embeddings
- OpenRouter (LLM API)

### 🔹 Frontend (Extension)
- Chrome Extension (Manifest v3)
- Vanilla JavaScript
- Dynamic UI Injection

---

## 🏗️ Project Structure
AI Web Copilot/
│
├── backend/
│ ├── app/
│ │ ├── main.py
│ │ ├── routes.py
│ │ ├── rag_pipeline.py
│ │ ├── embeddings.py
│ │ ├── llm.py
│ │ ├── cache.py
│ │ └── schema.py
│ │
│ ├── .env
│ └── requirements.txt
│
├── extension/
│ ├── content.js
│ └── manifest.json
│
└── README.md


---

## ⚙️ Setup Instructions

### 1️⃣ Clone Repository

```bash
git clone https://github.com/your-username/ai-web-copilot.git
cd ai-web-copilot

### 2️⃣ Backend Setup
cd backend
python -m venv venv
venv\Scripts\activate   # Windows

# Install dependencies:
pip install -r requirements.txt

### 3️⃣ Add API Key
Create .env file inside backend/:
OPENROUTER_API_KEY=your_api_key_here

### 4️⃣ Run Backend
uvicorn app.main:app --reload

Server will run at:
http://127.0.0.1:8000

### 5️⃣ Load Chrome Extension
Open Chrome
Go to: chrome://extensions/
Enable Developer Mode
Click Load Unpacked
Select the extension/ folder

🚀 Usage
Open any website (e.g., Wikipedia)
Click the 🤖 button
Ask questions about the page
Explore topics using quick buttons

🧠 How It Works
Webpage content is extracted in real-time
Content is split into chunks
Embeddings are created using HuggingFace
Stored in FAISS vector database
Relevant chunks retrieved using similarity search
Context + Question sent to LLM
AI generates contextual answer

⚡ Performance Optimizations
In-memory caching of vector DB per URL
Reduced redundant embedding computations
Context-limited chunk retrieval

🔮 Future Improvements
🔄 Streaming responses
🧠 Memory across tabs
🎙️ Voice input & output
🤖 Agent-based workflows
🌐 SaaS deployment
📊 Analytics & usage tracking


👨‍💻 Author
Chirayu Patil
AI Engineer

⭐ If you like this project
Give it a ⭐ on GitHub — it helps a lot!