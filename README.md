# Online Chat Webapp

A modern **real-time online chat web application** built with a full-stack JavaScript/TypeScript architecture. The project focuses on scalability, clean architecture, and a smooth user experience with real-time messaging features.

---

## 🚀 Features

* User authentication (Sign up / Sign in)
* Real-time messaging
* One-to-one chat
* Friend system (send / accept / reject requests)
* Block & unblock users
* Message status handling
* Responsive UI
* Secure API with JWT authentication

---

## 🛠️ Technologies Used

### Frontend

* **React**
* **TypeScript**
* **Tailwind CSS**
* **Zustand** (state management)
* **Axios** (HTTP client)
* **Socket.IO Client** (real-time communication)

### Backend

* **Node.js**
* **Express.js**
* **MongoDB** (database)
* **Mongoose** (ODM)
* **Socket.IO** (real-time server)
* **JWT** (authentication & authorization)
* **bcrypt** (password hashing)

### Dev Tools

* **Git & GitHub**
* **ESLint & Prettier**
* **Postman** (API testing)

---

## 📁 Project Structure

```text
online-chat-webapp/
│
├── frontend/
│   ├── src/
│   │   ├── components/      # Reusable UI components
│   │   ├── pages/           # Page-level components
│   │   ├── stores/          # Zustand stores
│   │   ├── services/        # API service layer
│   │   ├── hooks/           # Custom React hooks
│   │   ├── utils/           # Helper functions
│   │   ├── App.tsx
│   │   └── main.tsx
│   └── package.json
│
├── backend/
│   ├── src/
│   │   ├── controllers/     # Request handlers
│   │   ├── models/          # Mongoose schemas
│   │   ├── routes/          # API routes
│   │   ├── services/        # Business logic
│   │   ├── middlewares/     # Auth & error handling
│   │   ├── sockets/         # Socket.IO logic
│   │   ├── config/          # Environment & DB config
│   │   └── server.ts
│   └── package.json
│
├── .env.example
├── README.md
└── package-lock.json
```

---

## ⚙️ Environment Variables

Create a `.env` file in the **backend** directory based on `.env.example`:

```env
PORT=5000
MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/chat
JWT_SECRET=your_jwt_secret
```

---

## ▶️ How to Run the Project

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/your-username/online-chat-webapp.git
cd online-chat-webapp
```

---

### 2️⃣ Run Backend

```bash
cd backend
npm install
npm run dev
```

The backend server will run at:

```
http://localhost:5000
```

---

### 3️⃣ Run Frontend

```bash
cd frontend
npm install
npm run dev
```

The frontend will run at:

```
http://localhost:5173
```

---

## 🔐 Authentication Flow

1. User registers or logs in
2. Backend returns a JWT token
3. Token is stored securely on the client
4. Protected APIs validate the token via middleware

---

## 🔄 Real-Time Communication

* Socket.IO is used for real-time messaging
* Each user joins a personal socket room
* Messages are emitted and received instantly

---

## 🧪 API Testing

You can test APIs using **Postman**:

* `POST /api/auth/register`
* `POST /api/auth/login`
* `GET /api/users`
* `POST /api/messages`

---

## 📌 Future Improvements

* Group chat
* Message reactions
* Read receipts
* File & image sharing
* Online / offline presence
* Push notifications

---

## 👤 Author

**Thanh Đạt Pham**
Computer Science Student / Fullstack Developer

---

## 📄 License

This project is licensed under the MIT License.

---

⭐ If you find this project useful, feel free to give it a star!
