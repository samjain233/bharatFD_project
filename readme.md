# FAQ Management API (Node.js + Express + MongoDB)

## 📌 Overview
This is a **FAQ Management API** built using **Node.js, Express, and MongoDB**. It allows users to:

- Add FAQs with automatic translation to English before saving.
- Retrieve FAQs in different languages.
- Efficiently manage translations using caching and API integration.

---

## 🛠 Tech Stack
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Translation API**: Google Translate API
- **Caching**: Redis

---

## 📂 Project Structure
```
📦 faq-management-api
├── 📂 controllers/   # Business function (fetchController, postController.)
├── 📂 models/        # Mongoose Schema (FAQ model)
├── 📂 routes/        # Express Routes (API Endpoints)
├── 📂 utils/         # Utility functions (Translation, etc.)
├── server.js        # Main entry point
├── package.json     # Dependencies & Scripts
├── README.md        # Documentation
```

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/your-repo/faq-management-api.git
cd faq-management-api
```

### 2️⃣ Install Dependencies
```bash
npm install
```

### 3️⃣ Set Up Environment Variables
Create a `.env` file in the root directory and configure the following:
```env
PORT=8000
MONGO_URI=your_mongodb_connection_string
REDIS_HOST=your_redis_host
REDIS_PORT=your_redis_port
PASSWORD=redis_password
```

### 4️⃣ Start the Server
```bash
npm start
```

### 5️⃣ Run in Development Mode (with Nodemon)
```bash
npm run dev
```

---

## 🛠 API Endpoints

### ✅ Create a New FAQ (Auto-Translate to English)
**Endpoint:** `POST /api/faqs`

**Request Body:**
```json
{
  "question": "what is javascript",
  "answer": "JavaScript is a high-level, interpreted programming language used to create dynamic and interactive web applications.",
}
```

**Response:**
```json
{
    "question": "what is javascript",
    "answer": "JavaScript is a high-level, interpreted programming language used to create dynamic and interactive web applications.",
    "translations": {
        "hi": {
            "question": "जावास्क्रिप्ट क्या है",
            "answer": "जावास्क्रिप्ट एक उच्च-स्तरीय, व्याख्या की गई प्रोग्रामिंग भाषा है जिसका उपयोग गतिशील और इंटरैक्टिव वेब एप्लिकेशन बनाने के लिए किया जाता है।"
        },
        "bn": {
            "question": "জাভাস্ক্রিপ্ট কী?",
            "answer": "জাভাস্ক্রিপ্ট একটি উচ্চ-স্তরের, ব্যাখ্যা করা প্রোগ্রামিং ভাষা যা গতিশীল এবং ইন্টারেক্টিভ ওয়েব অ্যাপ্লিকেশন তৈরি করতে ব্যবহৃত হয়।"
        }
    },
    "_id": "679e448bdc8810088c8e91cf",
    "__v": 0
}
```

---

### ✅ Retrieve All FAQs (Default: English)
**Endpoint:** `GET /api/faqs`

**Response:**
```json
[
    {
        "question": "what is sql?",
        "answer": "sql is structured query language"
    },
    {
        "question": "capital of india?",
        "answer": "delhi"
    },
    {
        "question": "how many legs does a human have?",
        "answer": "2"
    },
    {
        "question": "how many hands does a human have?",
        "answer": "2"
    },
    {
        "question": "what is javascript",
        "answer": "JavaScript is a high-level, interpreted programming language used to create dynamic and interactive web applications."
    }
]
```

---

### ✅ Retrieve FAQs in a Specific Language
**Endpoint:** `GET /api/faqs?lang=hi`

**Response:** (Translated to Hindi)
```json
[
    {
        "question": "SQL क्या है?",
        "answer": "SQL संरचित क्वेरी भाषा है"
    },
    {
        "question": "भारत की राजधानी?",
        "answer": "दिल्ली"
    },
    {
        "question": "एक मानव के पास कितने पैर हैं?",
        "answer": "2"
    },
    {
        "question": "एक इंसान के पास कितने हाथ हैं?",
        "answer": "2"
    },
    {
        "question": "जावास्क्रिप्ट क्या है",
        "answer": "जावास्क्रिप्ट एक उच्च-स्तरीय, व्याख्या की गई प्रोग्रामिंग भाषा है जिसका उपयोग गतिशील और इंटरैक्टिव वेब एप्लिकेशन बनाने के लिए किया जाता है।"
    }
]
```
---
### ✅ Retrieve Specific FAQ in a Specific Language
**Endpoint:** `GET /api/faqs?lang=hi&id=<faqid>`

**Response:** (Specific Faq translated to hindi)
```json
{
    "question": "भारत की राजधानी?",
    "answer": "दिल्ली"
}
```
---

## 🧪 Running Tests
To run unit tests:
```bash
npm test
```

---

## 🐳 Docker Support
To run using Docker:
1. Build the Docker image:
```bash
docker build -t faq-api .
```
2. Run the container:
```bash
docker run -p 8000:8000 faq-api
```

---



