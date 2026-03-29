// Extract Page Content
function getPageContent() {
    let elements = document.querySelectorAll("p, h1, h2, h3");

    return Array.from(elements)
        .map(el => el.innerText)
        .join("\n")
        .slice(0, 5000);
}


// API CALL
async function askAI(content, question, url) {
    let res = await fetch("http://127.0.0.1:8000/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content, question, url })
    });

    let data = await res.json();
    return data.answer;
}


// STORAGE
function loadChat() {
    let saved = localStorage.getItem("chat_" + location.href);
    if (saved) document.getElementById("messages").innerHTML = saved;
}

function saveChat(html) {
    localStorage.setItem("chat_" + location.href, html);
}


// DRAG FEATURE
function makeDraggable(el) {
    let isDown = false, offsetX, offsetY;

    let header = el.querySelector("#ai-header");

    header.addEventListener("mousedown", (e) => {
        if (!el.classList.contains("floating")) return;

        isDown = true;
        offsetX = e.clientX - el.offsetLeft;
        offsetY = e.clientY - el.offsetTop;
    });

    document.addEventListener("mousemove", (e) => {
        if (!isDown) return;

        el.style.left = (e.clientX - offsetX) + "px";
        el.style.top = (e.clientY - offsetY) + "px";
    });

    document.addEventListener("mouseup", () => {
        isDown = false;
    });
}


// CHAT UI
let firstQuestionAsked = false;

function addMessage(text, type = "ai") {
    let m = document.getElementById("messages");

    let div = document.createElement("div");
    div.className = type === "user" ? "msg-user" : "msg-ai";
    div.innerText = text;

    m.appendChild(div);
    m.scrollTop = m.scrollHeight;

    saveChat(m.innerHTML);

    if (type === "user" && !firstQuestionAsked) {
        firstQuestionAsked = true;
        document.getElementById("topics-list").classList.remove("show");
    }
}


// TOPICS
async function generateTopics(pageContent) {
    let saved = localStorage.getItem("topics_" + location.href);

    if (saved) {
        renderTopics(JSON.parse(saved), pageContent);
        return;
    }

    let response = await askAI(
        pageContent,
        "Give 5 important topics from this page.",
        location.href
    );

    let topics = response.split("\n")
        .map(t => t.replace(/^[0-9.\-\s]*/, "").trim())
        .filter(t => t.length > 0)
        .slice(0, 5);

    localStorage.setItem("topics_" + location.href, JSON.stringify(topics));

    renderTopics(topics, pageContent);
}

function renderTopics(topics, pageContent) {
    let container = document.getElementById("topics-list");
    container.innerHTML = "";

    topics.forEach(topic => {
        let btn = document.createElement("button");
        btn.innerText = topic;

        btn.onclick = async () => {
            addMessage(topic, "user");
            addMessage("Thinking...");

            let ans = await askAI(
                pageContent,
                "Explain this: " + topic,
                location.href
            );

            document.getElementById("messages").lastChild.remove();
            addMessage(ans, "ai");
        };

        container.appendChild(btn);
    });
}


// UI
function injectSidebar() {
    let container = document.createElement("div");

    container.innerHTML = `
        <style>
            #ai-sidebar {
                position: fixed;
                top: 0;
                right: -350px;
                width: 350px;
                height: 100%;
                z-index: 999999;
                display: flex;
                flex-direction: column;
                transition: right 0.3s ease;

                backdrop-filter: blur(16px);
                background: linear-gradient(
                    135deg,
                    rgba(255,255,255,0.85),
                    rgba(240,240,255,0.75)
                );

                box-shadow: -5px 0 25px rgba(0,0,0,0.3);
                font-family: 'Segoe UI', sans-serif;
            }

            #ai-sidebar.dark {
                background: linear-gradient(
                    135deg,
                    rgba(20,20,30,0.95),
                    rgba(40,40,60,0.9)
                );
                color: #fff;
            }

            #ai-sidebar.open { right: 0; }

            #ai-sidebar.floating {
                right: auto !important;
                top: 120px;
                left: 120px;
                width: 420px;
                height: 520px;
                border-radius: 16px;
                overflow: hidden;
                box-shadow: 0 15px 50px rgba(0,0,0,0.4);
                transition: none;
            }

            #ai-header {
                display:flex;
                justify-content:space-between;
                padding:12px;
                font-weight:600;
                cursor:move;

                background: linear-gradient(135deg,#007bff,#00c6ff);
                color: white;
            }

            #ai-actions button {
                margin-left:5px;
                cursor:pointer;
                border:none;
                background:rgba(255,255,255,0.2);
                color:white;
                border-radius:6px;
                padding:2px 6px;
            }

            #topics-dropdown {
                padding:6px;
                border-bottom:1px solid rgba(0,0,0,0.1);
            }

            #topics-header {
                cursor:pointer;
                font-size:13px;
                padding:5px;
            }

            #topics-list {
                display:none;
                flex-wrap:wrap;
            }

            #topics-list.show {
                display:flex;
            }

            #topics-list button {
                margin:4px;
                padding:6px 12px;
                border-radius:20px;
                border:none;
                cursor:pointer;
                font-size:12px;
                background: linear-gradient(135deg,#e0e7ff,#c7d2fe);
            }

            #messages {
                flex:1;
                overflow:auto;
                padding:12px;
                display:flex;
                flex-direction:column;
            }

            .msg-user {
                background: linear-gradient(135deg,#007bff,#00c6ff);
                color:white;
                padding:10px;
                border-radius:14px;
                align-self:flex-end;
                margin-bottom:10px;
                max-width:80%;
                white-space: pre-wrap;
                word-wrap: break-word;
            }

            .msg-ai {
                background: rgba(255,255,255,0.95);
                color:#111;
                padding:10px;
                border-radius:14px;
                margin-bottom:10px;
                max-width:80%;
                white-space: pre-wrap;
                word-wrap: break-word;
            }

            #input {
                padding:12px;
                border:none;
                border-top:1px solid rgba(0,0,0,0.1);
            }

            #ai-toggle {
                position: fixed;
                right:12px;
                top:50%;
                transform:translateY(-50%);
                z-index:999999;
                border:none;
                background: linear-gradient(135deg,#007bff,#00c6ff);
                color:white;
                width:50px;
                height:50px;
                border-radius:50%;
                cursor:pointer;
            }
        </style>

        <button id="ai-toggle">🤖</button>

        <div id="ai-sidebar">
            <div id="ai-header">
                AI Copilot
                <div id="ai-actions">
                    <button id="ai-float">🗗</button>
                    <button id="ai-close">✖</button>
                </div>
            </div>

            <div id="topics-dropdown">
                <div id="topics-header">📌 Topics</div>
                <div id="topics-list"></div>
            </div>

            <div id="messages"></div>
            <input id="input" placeholder="Ask..." />
        </div>
    `;

    document.body.appendChild(container);

    let sidebar = document.getElementById("ai-sidebar");

    if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
        sidebar.classList.add("dark");
    }

    document.getElementById("ai-toggle").onclick = () => {
        sidebar.classList.add("open");
    };

    document.getElementById("ai-close").onclick = () => {
        sidebar.classList.remove("open");
        sidebar.classList.remove("floating");
        sidebar.style.left = "";
        sidebar.style.top = "";
        sidebar.style.right = "";
    };

    document.getElementById("ai-float").onclick = () => {
        if (!sidebar.classList.contains("floating")) {
            sidebar.classList.add("floating");
            sidebar.style.right = "auto";
            sidebar.style.left = "120px";
            sidebar.style.top = "120px";
        } else {
            sidebar.classList.remove("floating");
            sidebar.style.left = "";
            sidebar.style.top = "";
            sidebar.style.right = "0";
        }
    };

    document.getElementById("topics-header").onclick = () => {
        document.getElementById("topics-list").classList.toggle("show");
    };

    makeDraggable(sidebar);
}


// INIT
let pageContent = "";

window.addEventListener("load", () => {
    injectSidebar();

    pageContent = getPageContent();

    loadChat();
    generateTopics(pageContent);

    let input = document.getElementById("input");

    input.addEventListener("keypress", async (e) => {
        if (e.key === "Enter") {
            let q = input.value;

            addMessage(q, "user");
            addMessage("Thinking...");

            let ans = await askAI(pageContent, q, location.href);

            document.getElementById("messages").lastChild.remove();
            addMessage(ans, "ai");

            input.value = "";
        }
    });
});