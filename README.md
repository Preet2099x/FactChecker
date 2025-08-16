🔍 FactChecker AI
A real-time, AI-powered web application to verify claims and combat misinformation. This tool is designed to empower users, especially in misinformation-prone regions like India, to critically evaluate content they encounter online.

It combines the analytical power of Google's Gemini LLM with live web search results from Serper.dev to provide a quick verdict (Real, Fake, or Unverified), a detailed explanation, and verifiable sources.

🚀 Live Demo
Frontend (Vercel): [Link to your Vercel deployment]

Backend (Render): [Link to your Render deployment]

✨ Key Features
Real-Time Verification: Paste any claim or message to get an instant analysis.

AI-Powered Analysis: Utilizes Google's gemini-2.0-flash model to analyze search results and provide a nuanced explanation.

Sourced & Transparent: Provides direct links to the web sources used for the analysis, ensuring transparency.

Clean & Minimalist UI: A straightforward interface built with React for a fast and intuitive user experience.

Robust Backend: A reliable Node.js and Express server that handles all the heavy lifting of API communication and analysis.

🛠️ Tech Stack
Frontend: React, Vite, CSS

Backend: Node.js, Express.js

APIs & Services:

Google Gemini API (for AI analysis)

Serper.dev API (for real-time web search)

Deployment:

Frontend deployed on Vercel.

Backend deployed on Render.

⚙️ Local Development Setup
To run this project on your local machine, follow these steps.

Prerequisites
Node.js (v18 or higher)

npm

Git

1. Clone the Repository
Bash

git clone https://github.com/Preet2099x/FactChecker.git
cd FactChecker
2. Configure Environment Variables
The backend requires API keys to function. In the backend directory, create a new file named .env and paste the following content.

Ini, TOML

# /backend/.env

# Get from https://serper.dev/
SERPER_API_KEY="your_serper_api_key_here"

# Get from https://aistudio.google.com/
GEMINI_API_KEY="your_google_ai_studio_api_key_here"
Replace the placeholder values with your actual API keys.

3. Run the Backend Server
Open a terminal window and run the following commands:

Bash

# Navigate to the backend directory
cd backend

# Install dependencies
npm install

# Start the server
npm start
The backend server will start on http://localhost:3000 and validate your API keys.

4. Run the Frontend Application
Open a new terminal window and run the following commands:

Bash

# Navigate to the frontend directory from the root
cd frontend

# Install dependencies
npm install

# Start the development server
npm run dev
The React application will start, and you can access it in your browser, usually at http://localhost:5173.

🌐 API Endpoint
You can test the backend API directly using a tool like curl or Postman.

Check a Claim
URL: /check

Method: POST

Body: { "claim": "Your claim to verify here" }

Example curl command:

Bash

curl -X POST http://localhost:3000/check \
-H "Content-Type: application/json" \
-d '{"claim": "ISRO has found water on the sun."}'
License
This project is licensed under the MIT License.