
# 🧠 FactChecker – Real-Time Misinformation Detection Tool

FactChecker is an AI-powered web app that helps users verify whether a claim or news snippet is **Real**, **Fake**, or **Unverified**.  
It uses **Gemini (Google's LLM)** and **Serper.dev (real-time Google search API)** to analyze claims using live web data, returning a verdict, explanation, and trusted sources.

---

## ⚙️ Features

- ✅ Accepts any user-submitted claim for fact-checking  
- 🌐 Uses live search to fetch real-time sources from the web  
- 🤖 Uses Gemini to analyze the claim and sources  
- ⚠️ Verdicts: **Real**, **Fake**, or **Unverified**  
- 📝 Gives explanations and source URLs  
- 💻 Built with Node.js (backend) and React (frontend)

---

## 🧱 Tech Stack

| Layer       | Tool/Tech                |
|-------------|--------------------------|
| LLM         | Gemini (Google AI)       |
| Web Search  | Serper.dev (Google proxy)|
| Backend     | Node.js + Express        |
| Frontend    | React + Axios            |
| APIs        | REST (JSON)              |

---

## 🚀 Getting Started

### 📦 Prerequisites

- Node.js ≥ 18.x  
- npm  
- Internet connection  
- [Gemini API Key](https://makersuite.google.com/app)  
- [Serper.dev API Key](https://serper.dev)

---

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/Preet2099x/FactChecker.git
cd FactChecker
```

---

### 2️⃣ ▶️ Start the Backend (Node + Express)

```bash
cd backend
npm install
npm run start
```

### 3️⃣ 💻 Start the Frontend (React)

```bash
cd frontend
npm install
npm run dev
```

---

### 🔗 Access the App

- Frontend: [http://localhost:5173](http://localhost:5173)  
- Backend: [http://localhost:3000](http://localhost:3000)

---

## 📌 Example Use Cases

- "Hot water kills COVID-19"  
- "India bans ₹2000 notes"  
- "Pakistan involved in Pahalgam attack, says India"  
- "NASA confirms Earth will go dark for 6 days"

---



## 🛡️ License

MIT License

---

