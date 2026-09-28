# 🐄 MooMatch — Empowering Farmers Through AI for Cow Conservation

**A Solution Challenge Submission by Team TensorZ**

> Reviving the Indian Cow Breed for a Sustainable Future

## 🌱 Overview

MooMatch is a web platform that helps small and marginal Indian farmers care for indigenous
cattle breeds. Farmers can identify a cow breed from a photo in the browser, check a list of
symptoms against a trained disease model, keep a live record of their herd, buy and list fodder
and cattle, and ask an AI assistant questions about cattle care. It is built as three separate
apps: a React frontend, a small Node.js chat service, and a Python machine learning API.

---

## 🧠 Features

### Breed Identification and Breeding Match
- Upload a cow photo and classify it in the browser with a Google Teachable Machine model
  (no image ever leaves the device).
- Covers 8 indigenous breeds: Gir, Sahiwal, Red Sindhi, Tharparkar, Rathi, Kankrej, Deoni, Ongole.
- Rejects photos the model scores as `Object` instead of a cow, and shows a confidence score
  for each breed.
- Shows a short description plus trait ratings for the detected breed (milk yield, climate
  adaptability, fertility, disease resistance, growth rate).
- Suggests the best breeding partner using a built-in table of 28 breed-pair compatibility
  scores.

### Disease Prediction
- Pick from **88 symptoms** grouped into 7 categories (General, Digestive, Respiratory,
  Neurological, Udder & Milk, Reproductive, Infectious & Other), each with a plain-English
  description.
- Sends the selected symptoms to a Flask API and shows the predicted disease.
- The model is a Random Forest trained on 93 symptom columns across **26 cattle diseases**
  (mastitis, foot and mouth, bloat, blackleg, liver fluke, coccidiosis, and others).

### Cattle Dashboard
- Add, edit and delete cattle records: name, breed, age, daily milk yield, and weight.
- Records sync live from Firebase Firestore using `onSnapshot`, so changes appear immediately.
- Generates a rule-based health recommendation for each cow from its age, milk yield and
  weight (for example, flagging a high-yield cow that is underweight).
- Shows current temperature and wind speed from the Open-Meteo API.

### Marketplace
- Browse fodder and cattle listings, filtered by category.
- Four built-in sample listings, plus any listing added by a user.
- Farmers can post their own listing (name, description, price, category, quantity, image);
  listings are saved to Firestore with a server timestamp.
- Add items to a cart and change quantities.

### AI Chatbot
- A floating chat widget available on every page.
- Answers go through the Node.js backend, which calls Google Gemini 1.5 Pro with a built-in
  cattle knowledge prompt (A2 milk, cow dung uses, breed comparisons, milk yield facts,
  cultural significance).
- The API key stays on the server and is never exposed to the browser.

### Knowledge Hub
- Static educational pages on Indian cow breeds, conservation, and how to contribute.
- Links out to government and NGO resources (DAHD schemes, Vikaspedia, Kamdhenu care).

---

## 🧪 Tech Stack

### Frontend (`frontend/`)

| Package | Purpose |
|---|---|
| `react` 19 + `react-dom` | UI framework |
| `vite` 6 | Dev server and build tool |
| `tailwindcss` 4 + `@tailwindcss/vite` | Styling |
| `react-router-dom` 7 | Client-side routing |
| `firebase` 11 | Firestore database |
| `@teachablemachine/image` + `@tensorflow/tfjs` | In-browser breed classification |
| `framer-motion` | Page and component animation |
| `aos` | Scroll-reveal animation |
| `lucide-react`, `react-icons` | Icons |
| `eslint` 9 | Linting |

> Note: `recharts` and `axios` are listed in `package.json` but are not imported anywhere in
> the source. They can be removed.

### Chat Backend (`backend/`)

| Package | Purpose |
|---|---|
| `express` 5 | HTTP server |
| `@google/generative-ai` | Gemini 1.5 Pro client |
| `cors` | Restricts callers to the known frontend origins |
| `dotenv` | Loads the API key from `.env` |
| `nodemon` | Dev auto-reload |

### ML Backend (`ml-backend/`)

| Package | Purpose |
|---|---|
| `flask` + `flask-cors` | Prediction API |
| `scikit-learn` | Random Forest, variance threshold feature selection, hyperparameter search |
| `imbalanced-learn` | SMOTE oversampling for rare diseases |
| `pandas`, `numpy` | Data handling |
| `joblib` | Saving and loading the trained model |
| `matplotlib`, `seaborn` | Confusion matrix and feature importance plots |

### External Services
- **Firebase Firestore** — `cattle` and `products` collections
- **Google Gemini API** — chatbot responses
- **Google Teachable Machine** — hosted breed model (`93e46mcoU`)
- **Open-Meteo** — weather, no API key needed
- **Google Cloud Run** — hosts the disease prediction API
- **Netlify** — hosts the frontend

---

## 📁 File Structure

```
MooMatch-gdg/
├── README.md
├── LICENSE                         # MIT license text
├── docker-compose.yml              # Runs both backend services together
├── .gitignore
│
├── frontend/                       # React + Vite single-page app (not containerised)
│   ├── index.html                  # HTML entry point
│   ├── vite.config.js              # Vite config (React + Tailwind plugins)
│   ├── eslint.config.js            # ESLint flat config
│   ├── .env.example                # Template for the VITE_* variables
│   ├── package.json
│   ├── public/                     # Breed photos, product images, icons
│   └── src/
│       ├── main.jsx                # React root, mounts <App />
│       ├── App.jsx                 # Router with all 5 routes
│       ├── index.css               # Tailwind entry
│       ├── firebase.js             # Firebase init, exports Firestore `db`
│       ├── CattleDashboard.jsx     # Herd records + health advice + weather
│       ├── CowDiseasePredictor.jsx # Symptom picker, calls the Flask API
│       ├── Marketplace.jsx         # Listings, add-listing form, cart
│       ├── EduContent.jsx          # Knowledge hub pages
│       └── components/
│           ├── Navbar.jsx          # Top navigation
│           ├── Hero.jsx            # Landing banner
│           ├── About.jsx           # About section
│           ├── ImageModel.jsx      # Breed classifier + breeding match
│           ├── Chatbot.jsx         # Floating Gemini chat widget
│           ├── WeatherWidget.jsx   # Open-Meteo current weather
│           ├── Contact.jsx         # Contact form (UI only, see note below)
│           ├── BackToTop.jsx       # Scroll-to-top button
│           └── Footer.jsx          # Footer
│
├── backend/                        # Node.js chat service
│   ├── server.js                   # Express app, POST /api/chat
│   ├── .env.example                # Template for GEMINI_API_KEY etc.
│   ├── Dockerfile
│   └── package.json
│
└── ml-backend/                     # Python disease prediction service
    ├── app.py                      # Flask app, POST /predict
    ├── model.py                    # Training script, writes cow_disease_model.pkl
    ├── requirements.txt            # Python dependencies
    ├── Dockerfile                  # Trains the model, then serves with gunicorn
    └── train.csv                   # 2043 rows, 93 symptoms, 26 diseases
```

---

## 🚀 Getting Started

### Prerequisites
- **Node.js 18+** and npm (Express 5 and Vite 6 both need a modern Node).
- **Python 3.8+** and pip.
- A **Firebase project** with Firestore enabled.
- A **Google Gemini API key** from [Google AI Studio](https://aistudio.google.com/).

### 1. Clone the repository

```bash
git clone https://github.com/krishna-086/MooMatch-gdg.git
cd MooMatch-gdg
```

### 2. Chat backend

```bash
cd backend
npm install
```

Create `backend/.env` from the template:

```bash
cp .env.example .env
```

| Variable | Purpose |
|---|---|
| `GEMINI_API_KEY` | Google Gemini API key used to generate chat replies |
| `PORT` | Port for the Express server (optional, defaults to `3000`) |
| `CORS_ORIGINS` | Comma-separated list of allowed frontend origins (optional) |

```bash
npm run dev     # development, auto-reloads on change
npm start       # production
```

By default the server accepts requests from `http://localhost:5173` and
`https://moomatch.netlify.app`. To allow a different origin, set `CORS_ORIGINS`:

```bash
CORS_ORIGINS=http://localhost:4173,https://your-domain.example
```

### 3. Frontend

```bash
cd frontend
npm install
```

Create `frontend/.env` from the template:

```bash
cp .env.example .env
```

All variables must start with `VITE_` for Vite to expose them to the app. Restart the
dev server after changing any of them:

| Variable | Purpose |
|---|---|
| `VITE_API_URL` | Base URL of the chat backend, e.g. `http://localhost:3000` |
| `VITE_ML_API_URL` | Base URL of the disease prediction API (optional, falls back to the deployed Cloud Run service) |
| `VITE_FIREBASE_API_KEY` | Firebase web API key |
| `VITE_FIREBASE_AUTH_DOMAIN` | Firebase auth domain |
| `VITE_FIREBASE_PROJECT_ID` | Firebase project ID |
| `VITE_FIREBASE_STORAGE_BUCKET` | Firebase storage bucket |
| `VITE_FIREBASE_MESSAGING_SENDER_ID` | Firebase messaging sender ID |
| `VITE_FIREBASE_APP_ID` | Firebase app ID |
| `VITE_FIREBASE_MEASUREMENT_ID` | Firebase analytics measurement ID |

```bash
npm run dev       # dev server on http://localhost:5173
npm run build     # production build into dist/
npm run preview   # serve the production build locally
npm run lint      # run ESLint
```

### 4. ML backend

```bash
cd ml-backend
pip install -r requirements.txt
```

`requirements.txt` uses minimum versions rather than exact pins. After a successful
install, run `pip freeze > requirements.txt` if you want a fully reproducible set.

Train the model. This writes `cow_disease_model.pkl` next to the script:

```bash
python model.py
```

If a `test.csv` is present it is used for evaluation; otherwise the script holds out
20% of `train.csv` (stratified, `random_state=42`). Only `train.csv` is committed, so
by default you get the held-out split.

Run the API:

```bash
python app.py     # starts on http://127.0.0.1:5000 with debug enabled
```

`app.py` loads `cow_disease_model.pkl` at import time, so training must succeed first.
The `.pkl` file is not committed to the repository.

For production, run Flask behind a WSGI server such as `gunicorn` instead of the built-in
development server:

```bash
gunicorn --bind 0.0.0.0:8080 app:app
```

### 5. Switching between the local and deployed ML backend

`frontend/.env.example` sets `VITE_ML_API_URL=http://localhost:5000`, so a local Flask
server is used by default. Comment that line out to fall back to the deployed Cloud Run
service instead:

```bash
# VITE_ML_API_URL=http://localhost:5000
```

Restart the dev server after changing it — Vite only reads `.env` at startup.

---

## 🐳 Running with Docker

The two backend services are containerised. The frontend is not — run it with
`npm run dev`, which gives you hot reload and is simpler than rebuilding a static image.

### Both backends at once

```bash
cp backend/.env.example backend/.env    # then fill in GEMINI_API_KEY
docker compose up --build
```

| Service | URL |
|---|---|
| Chat API | http://localhost:3000 |
| Disease API | http://localhost:5000 |

Compose reads `backend/.env`, the same file `npm run dev` uses, so the Gemini key only
has to be set in one place.

The first build is slow: the `ml-backend` image trains the Random Forest as a build step,
so the finished image already contains `cow_disease_model.pkl`. Later builds reuse the
cached layer unless `model.py`, `train.csv`, or `requirements.txt` changes.

Then start the frontend against them:

```bash
cd frontend
npm run dev     # http://localhost:5173
```

The defaults in `frontend/.env` already point at both containers.

### Individual images

```bash
# Disease API — trains the model, then serves it with gunicorn
docker build -t moomatch-ml ./ml-backend
docker run -p 5000:8080 moomatch-ml

# Chat API
docker build -t moomatch-backend ./backend
docker run -p 3000:3000 --env-file backend/.env moomatch-backend
```

Useful extras:

```bash
docker compose logs -f backend    # follow one service's logs
docker compose down               # stop and remove the containers
docker compose up --build ml-backend   # rebuild just one service
```

---

## 📖 Usage

### Routes

| Route | Page | What it does |
|---|---|---|
| `/` | Home | Hero, About, breed identifier, contact form, footer |
| `/EduContent` | Knowledge Hub | Articles on breeds and conservation |
| `/dashboard` | Cattle Dashboard | Herd records, health advice, weather |
| `/marketplace` | Marketplace | Browse and post fodder and cattle listings |
| `/diseasepredictor` | Disease Predictor | Select symptoms, get a prediction |

The chatbot widget and back-to-top button appear on every route.

### API: chat backend

**`POST /api/chat`**

```bash
curl -X POST http://localhost:3000/api/chat \
  -H "Content-Type: application/json" \
  -d '{"prompt": "What is A2 milk and which Indian breeds produce it?"}'
```

```json
{ "response": "A2 milk contains only the A2 beta-casein protein..." }
```

Errors return HTTP 500 with `{ "error": "Failed to process request" }`.

### API: disease prediction

**`POST /predict`**

Send symptom IDs as they appear in `symptomData` in `CowDiseasePredictor.jsx`.

```bash
curl -X POST http://127.0.0.1:5000/predict \
  -H "Content-Type: application/json" \
  -d '{"symptoms": ["fever", "milk_flakes", "swelling_udder"]}'
```

```json
{ "disease": "mastitis" }
```

Any symptom not recognised by the model is ignored, so an empty or unrelated symptom list
will still return a prediction. Treat the output as guidance, not a veterinary diagnosis.

### Firestore collections

| Collection | Fields |
|---|---|
| `cattle` | `name`, `breed`, `age`, `milk`, `weight` |
| `products` | `name`, `description`, `price`, `category`, `inStock`, `image`, `quantity`, `quantityUnit`, `createdAt` |

---

## ⚠️ Known Limitations

- The **contact form** on the home page has no submit handler. It renders but does not send
  anything.
- The **marketplace cart** is local React state only. There is no checkout, payment, or order
  collection, and the cart is lost on page refresh.
- The **chatbot UI is in English**. Gemini can reply in other languages if asked directly, but
  there is no language selector or translation layer.
- The **weather widget** is fixed to Delhi coordinates (28.7041, 77.1025) and does not use the
  user's location.
- There are **no automated tests** in any of the three apps.

---

## 🌐 Deployment

- **Frontend**: [https://moomatch.netlify.app](https://moomatch.netlify.app) (Netlify)
- **Disease Prediction API**: Google Cloud Run —
  `https://cow-disease-api-18018835632.us-central1.run.app`
- **Repository**: [github.com/krishna-086/MooMatch-gdg](https://github.com/krishna-086/MooMatch-gdg)
- **Demo Video**: [Watch on YouTube](https://youtu.be/BiujpOA5ulU?si=q1KrJl57U2D49_Da)

### Deploying the disease API to Cloud Run

The `ml-backend` image reads the `PORT` variable that Cloud Run injects, so it can be
deployed straight from source:

```bash
gcloud run deploy cow-disease-api \
  --source ./ml-backend \
  --region us-central1 \
  --allow-unauthenticated
```

<!-- TODO: no CI workflow exists in this repository. Add one to build the images and
     deploy on push to main, if that is wanted. -->

---

## 🎯 Future Scope

- Expand the dataset for more accurate disease and breed prediction
- Enable real-time webcam-based breed detection
- Add voice-based chatbot interaction in Indian languages
- Add a real multilingual UI (Hindi, Kannada, Marathi and more)
- Launch an offline-first mobile app (PWA or Android)
- Use BigQuery for health analytics and breeding trends
- Integrate with NDDB and government APIs for scheme eligibility checks
- Add authentication so each farmer sees only their own herd and listings

---

## 🤝 Contributing

1. Fork the repository.
2. Create a branch: `git checkout -b feature/your-feature`.
3. Run `npm run lint` in `frontend/` before committing.
4. Never commit `.env` files or API keys.
5. Open a pull request against `main`.

---

## 📄 License

Released under the **MIT License**. See [LICENSE](LICENSE) for the full text.

Copyright (c) 2025-2026 Krishna Anand.

You are free to use, copy, modify and distribute this project, including for commercial
purposes, as long as the copyright notice and license text are kept in any copy you
distribute. The software comes with no warranty.
