# 🐄 MooMatch — Empowering Farmers Through AI for Cow Conservation

**A Solution Challenge Submission by Team TensorZ**

> Reviving the Indian Cow Breed for a Sustainable Future

## 🌱 Overview

MooMatch is a comprehensive **AI-powered platform** designed to conserve indigenous Indian cow breeds and empower small and marginal farmers with smart tools. From in-browser **breed identification** to **disease prediction**, multilingual chatbot, and an integrated **marketplace**, MooMatch is the one-stop digital companion for cattle care and management.

---

## 🧠 Features

### 🧬 AI Breed Identification
- In-browser model using Google Teachable Machine
- No backend needed
- Real-time classification of cow breeds from images

### 🔁 Breeding Compatibility Engine
- Frontend-only JS logic
- Weighted matrix-based recommendation for ideal breeding pairs

### 🐮 Farmer Dashboard (Firestore)
- Tracks cattle details like age, breed, health, and productivity
- Helps in planning and monitoring herd health

### 🦠 Disease Prediction API
- Flask backend deployed on Google Cloud Run
- Powered by a custom Random Forest model trained on 90+ symptoms

### 💬 Multilingual Chatbot (Gemini)
- Real-time guidance in regional languages (Hindi, Kannada, Marathi, etc.)
- Covers breeding, health, and conservation FAQs

### 🛒 Farmer Marketplace
- List and sell cattle, dairy products, and fodder
- Firestore backend handles product data and orders

### 📚 Knowledge Hub
- Educates farmers on traditional Indian practices, organic inputs, and sustainability

---

## 🧪 Technologies Used

| Tech/Tool           | Purpose                             |
|---------------------|-------------------------------------|
| `React.js`          | Frontend framework                  |
| `Tailwind CSS`      | UI styling                          |
| `Google Teachable Machine` | Breed ID model               |
| `JavaScript`        | Breeding logic, form UI             |
| `Flask + Scikit-learn` | Disease prediction backend       |
| `Google Cloud Run`  | Model deployment, Backend deployment|
| `Firebase Firestore`| Database for dashboard & marketplace|
| `Gemini API`        | Chatbot & language support          |
| `Netlify`           | Frontend hosting                    |

---

## 🚀 Deployment

- **Frontend**: [https://moomatch.netlify.app](https://moomatch.netlify.app)
- **Backend**: Hosted on Google Cloud Run
- **GitHub Repo**: [MooMatch GitHub](https://github.com/krishna-086/MooMatch-gdg)
- **Demo Video**: [Watch on YouTube](https://youtu.be/BiujpOA5ulU?si=q1KrJl57U2D49_Da)

---

## 🎯 Future Scope

- 🔍 Expand dataset for more accurate disease and breed prediction
- 📷 Enable real-time webcam-based breed detection (TensorFlow.js)
- 🎙️ Add voice-based chatbot interaction in Indian languages
- 📱 Launch offline-first mobile app (PWA/Android)
- 📈 Use BigQuery for health analytics and breeding trends
- 🔗 Integrate with NDDB/Gov APIs for scheme eligibility checks

---

## 📦 How to Run Locally


### Frontend (ReactJS)
```bash
cd frontend
npm install
npm start
```
### Backend (Include your own gemini api key)
```bash
cd backend
npm install 
npm run dev
```
### Backend (Flask)
```bash
cd ml-backend
pip install -r requirements.txt
python app.py
```
