# Profile Backend API

## 📌 Overview

Profile Backend is a RESTful API built using **Node.js**, **Express.js**, and **MongoDB**. It provides secure user authentication using **JWT**, password encryption using **bcryptjs**, protected routes, and user profile management.

---

## 📌 Render Link

https://backend-projects-3-jwnw.onrender.com/Profile/getAll
---

## 📌 video Link

[https://backend-projects-3-jwnw.onrender.com/Profile/getAll](https://drive.google.com/file/d/1Q-Sz2YH849aePn_ovXBGefBw8t7Euq0r/view?usp=drive_link)
---
# 🚀 Features

## 👤 User Authentication

- User Registration
- User Login
- Authenticated User
- Logout
- Logout From All Devices

---

## 👥 User Management

- Get All Users
- Update Logged-in User
- Delete Logged-in User

---

## 🔐 Security

- JWT Authentication
- Password Hashing using bcryptjs
- Protected Routes
- Centralized Error Handling

---

# 🛠 Tech Stack

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT (jsonwebtoken)
- bcryptjs
- dotenv

---

# 📁 Project Structure

```text
ProfileBackend/
│
├── config/
│
├── controller/
│   └── user.controller.js
│
├── middleware/
│   ├── Auth.js
│   └── HttpError.js
│
├── model/
│   └── user.model.js
│
├── routes/
│   └── userRouter.js
│
├── assets/
│   ├── register.png
│   ├── login.png
│   ├── auth-login.png
│   ├── get-all-users.png
│   ├── update-user.png
│   ├── logout.png
│   ├── logout-all.png
│   └── delete-user.png
│
├── .env
├── package.json
├── package-lock.json
├── server.js
└── README.md
```

---

# ⚙️ Installation

Clone the repository

```bash
git clone https://github.com/mohinkhan16/ProfileBackend.git
```

Move into the project

```bash
cd ProfileBackend
```

Install dependencies

```bash
npm install
```

Run the server

```bash
npm run dev
```

---

# 🔑 Environment Variables

Create a `.env` file.

```env
PORT=5000

MONGO_URI=Your_MongoDB_URI

JWT_SECRET=Your_JWT_SECRET
```

---

# 📡 API Endpoints

## Authentication

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /register | Register User |
| POST | /login | Login User |
| GET | /authLogin | Authenticated User |
| POST | /logout | Logout User |
| POST | /logoutAll | Logout From All Devices |

---

## User

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /users | Get All Users |
| PATCH | /update | Update Logged-in User |
| DELETE | /delete | Delete Logged-in User |

---

# 🔒 Authentication

Protected routes require a JWT token.

Example Header

```http
Authorization: Bearer YOUR_JWT_TOKEN
```

---

# 📸 API Output Screenshots

## 👤 User add
<img width="940" height="612" alt="image" src="https://github.com/user-attachments/assets/08de3322-94da-4a09-a436-e7e06eb8d77b" />

---

## 🔑 User Login

<img width="924" height="623" alt="image" src="https://github.com/user-attachments/assets/21db2ab7-cfc9-452d-89a0-97b5975c8545" />

---

## 🔐 Auth Login

<img width="926" height="610" alt="image" src="https://github.com/user-attachments/assets/4632f719-3c2a-4b48-9571-57b2fd2250aa" />

---

## 👥 Get All Users

<img width="934" height="615" alt="image" src="https://github.com/user-attachments/assets/f070b9af-6e20-4f8b-8a03-6d39b80d428b" />

---

## ✏️ Update User

<img width="934" height="621" alt="image" src="https://github.com/user-attachments/assets/7f299b81-f547-4916-b786-9e68281e6518" />

---

## 🚪 Logout User

<img width="945" height="451" alt="image" src="https://github.com/user-attachments/assets/87abc7b9-6f09-410c-a3fa-4cfe63e0a01a" />

---

## 🌍 Logout From All Devices

<img width="939" height="490" alt="image" src="https://github.com/user-attachments/assets/1c96c548-c8fb-4818-9921-9ab0eae01e32" />

---

## 🗑 Delete User

<img width="928" height="491" alt="image" src="https://github.com/user-attachments/assets/8e79a85c-e4c4-4d84-bc94-78de29920b67" />

---

# 🗄 Database

MongoDB is used with Mongoose ODM.

### User Schema

- Name
- Email
- Password
- Address
- Phone
- Tokens

---

# 📦 Dependencies

```json
express
mongoose
jsonwebtoken
bcryptjs
dotenv
nodemon
```

---

# 🧪 Testing

You can test the API using:

- Postman
- Thunder Client
- Insomnia

---

# 📈 Future Improvements

- Email Verification
- Forgot Password
- Reset Password
- Profile Image Upload
- Refresh Token Authentication
- Swagger API Documentation
- Unit Testing

---

# 👨‍💻 Author

**Mohin Pathan**

Backend Developer

### Tech Stack

- Node.js
- Express.js
- MongoDB
- JWT Authentication
- REST API
- Mongoose

---

# 📄 License

This project is created for learning and educational purposes.
