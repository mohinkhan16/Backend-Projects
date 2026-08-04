# Profile Backend API

## 📌 Overview

Profile Backend is a RESTful API built using **Node.js**, **Express.js**, and **MongoDB**. It provides secure user authentication using **JWT**, password encryption using **bcryptjs**, protected routes, and user profile management.

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

## 👤 User Registration



---

## 🔑 User Login

<img src="assets/login.png" width="1000"/>

---

## 🔐 Authenticated User

<img src="assets/auth-login.png" width="1000"/>

---

## 👥 Get All Users

<img src="assets/get-all-users.png" width="1000"/>

---

## ✏️ Update User

<img src="assets/update-user.png" width="1000"/>

---

## 🚪 Logout User

<img src="assets/logout.png" width="1000"/>

---

## 🌍 Logout From All Devices

<img src="assets/logout-all.png" width="1000"/>

---

## 🗑 Delete User

<img src="assets/delete-user.png" width="1000"/>

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