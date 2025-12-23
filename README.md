# Assignment 2 — API Integration (Node.js)

## 📌 Project Overview
This project is a Node.js + Express application developed as part of **Assignment 2: API Integration**.  
The purpose of the project is to demonstrate server-side API usage, data processing, and frontend presentation.

All external API calls are handled **only on the server side**, and the frontend receives **cleaned and structured data**.

---

## 🎯 Features
- Fetches a random user from Random User Generator API
- Retrieves country information using REST Countries API
- Displays exchange rates using Exchange Rate API
- Shows latest news headlines using News API
- Clean and responsive frontend UI
- Secure handling of API keys using environment variables

---

## 🛠 Technologies Used
- Node.js
- Express.js
- Axios
- Dotenv
- HTML
- CSS
- JavaScript (Vanilla)

---

## 🌐 APIs Used
- Random User Generator API  
  https://randomuser.me/api/

- REST Countries API  
  https://restcountries.com/

- Exchange Rate API  
  https://www.exchangerate-api.com/

- News API  
  https://newsapi.org/

---

## 📂 Project Structure
Node_1/
├── server.js
├── package.json
├── package-lock.json
├── .gitignore
├── public/
│ ├── index.html
│ ├── main.js
│ └── style.css



---

## ⚙️ Setup Instructions

### 1️⃣ Clone the repository

git clone https://github.com/erooohaaa/Node_1.git
cd Node_1
2️⃣ Install dependencies
bash

npm install
3️⃣ Create .env file
Create a .env file in the root directory:

env

PORT=3000
NEWS_API_KEY=your_news_api_key
EXCHANGE_API_KEY=your_exchange_api_key
The .env file is excluded from GitHub using .gitignore.

4️⃣ Run the server
bash

node server.js
