# BlogSphere Backend API

## 📌 Overview

BlogSphere Backend is a RESTful API built using **Node.js**, **Express.js**, and **MongoDB**. It provides secure user authentication using JWT, role-based authorization, blog management, image uploads through Cloudinary, and request validation using Joi.

---

# 🚀 Features

### 👤 User Authentication

* User Registration
* User Login
* JWT Authentication
* Authenticated User Profile
* Logout
* Logout From All Devices

### 👥 User Management

* Get All Users
* Update User Profile
* Delete User
* Role Based Authorization (Admin/User)

### 📝 Blog Management

* Create Blog
* Get All Blogs
* Update Blog
* Delete Blog
* Author Relationship
* Image Upload using Cloudinary

### 🔐 Security

* Password Hashing using bcryptjs
* JWT Authentication
* Role Based Access Control
* Request Validation using Joi
* Centralized Error Handling

---

# 🛠 Tech Stack

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT (jsonwebtoken)
* bcryptjs
* Cloudinary
* Multer
* multer-storage-cloudinary
* Joi
* dotenv

---

# 📁 Project Structure

```text
BlogSphere/
│
├── config/
│   ├── cloudinary.js
│   └── db.js
│
├── controller/
│   ├── UserController.js
│   └── BlogController.js
│
├── middleware/
│   ├── auth.js
│   ├── checkRole.js
│   ├── upload.js
│   ├── validate.js
│   └── HttpError.js
│
├── model/
│   ├── UserModel.js
│   └── BlogModel.js
│
├── routes/
│   ├── userRouter.js
│   └── BlogRouter.js
│
├── validation/
│   ├── UserValidation.js
│   └── BlogValidation.js
│
├── assets/
│   ├── user-registration.png
│   ├── user-login.png
│   ├── auth-login.png
│   ├── update-user.png
│   ├── delete-user.png
│   ├── logout-user.png
│   ├── logout-all-devices.png
│   ├── get-all-users.png
│   ├── admin-update-user.png
│   ├── admin-delete-user.png
│   ├── add-blog.png
│   ├── update-blog.png
│   ├── delete-blog.png
│   └── get-all-blogs.png
│
├── .env
├── package.json
├── README.md
└── server.js
```

---

# ⚙️ Installation

Clone the repository

```bash
git clone https://github.com/yourusername/BlogSphere.git
```

Move into the project

```bash
cd BlogSphere
```

Install dependencies

```bash
npm install
```

Run the development server

```bash
npm run dev
```

---

# 🔑 Environment Variables

Create a `.env` file in the root directory.

```env
PORT=5000

MONGO_URI=Your MongoDB Connection String

JWT_SECRET=Your JWT Secret

CLOUDINARY_NAME=Your Cloudinary Cloud Name
CLOUDINARY_API_Key=Your Cloudinary API Key
CLOUDINARY_API_SECRET=Your Cloudinary API Secret
```

---

# 📡 API Endpoints

## Authentication

| Method | Endpoint            | Description             |
| ------ | ------------------- | ----------------------- |
| POST   | /JWT/auth/register  | Register User           |
| POST   | /JWT/auth/login     | Login User              |
| GET    | /JWT/auth/me        | Authenticated User      |
| POST   | /JWT/auth/logout    | Logout                  |
| POST   | /JWT/auth/logoutAll | Logout From All Devices |

---

## User

| Method | Endpoint             | Description   |
| ------ | -------------------- | ------------- |
| GET    | /JWT/auth/users      | Get All Users |
| PATCH  | /JWT/auth/update/:id | Update User   |
| DELETE | /JWT/auth/delete/:id | Delete User   |

---

## Blog

| Method | Endpoint  | Description   |
| ------ | --------- | ------------- |
| POST   | /blog     | Create Blog   |
| GET    | /blog     | Get All Blogs |
| PATCH  | /blog/:id | Update Blog   |
| DELETE | /blog/:id | Delete Blog   |

---

# 🔒 Authentication

Protected routes require a JWT token.

Example Header

```http
Authorization: Bearer YOUR_JWT_TOKEN
```

---

# 📷 Image Upload

Images are uploaded to **Cloudinary** using:

* Multer
* multer-storage-cloudinary

Supported formats

* jpg
* jpeg
* png
* webp

Maximum file size

```
5 MB
```

---

# 📸 API Output Screenshots

## 👤 User Router

### 🟢 User ADD

<p align="center">
 <img width="1088" height="757" alt="image" src="https://github.com/user-attachments/assets/bb1baed2-98ec-4662-a7c3-7175d2a05e5f" />
</p>

---

### 🔑 User Login

<img width="1104" height="952" alt="image" src="https://github.com/user-attachments/assets/e806cffb-9b8b-4358-92c2-0824011d0a93" />


---

### 🔐 Auth Login

<img width="1081" height="880" alt="image" src="https://github.com/user-attachments/assets/e6415add-cde6-4870-bbbe-3f6dfa992d20" />


---

### ✏️ Update User

<img width="1114" height="669" alt="image" src="https://github.com/user-attachments/assets/3a52fd14-4008-4811-a442-afb0c270ae3a" />

---

### 🗑️ Delete User

<img width="1089" height="657" alt="image" src="https://github.com/user-attachments/assets/5b9ad4a4-118e-4bde-8be4-0eb4228097a9" />

---

### 🌍 Logout From All Devices

<img width="1101" height="666" alt="image" src="https://github.com/user-attachments/assets/7ecc4788-731b-4b3c-98e5-19d675415631" />

---

### 👥 Get All Users

<img width="1088" height="930" alt="image" src="https://github.com/user-attachments/assets/2014fe4c-56e7-41ca-a9b3-74d81873fabd" />

---


---

## 📝 Blog Router

### ➕ Add Blog

<img width="1089" height="904" alt="image" src="https://github.com/user-attachments/assets/a6039254-57d5-46ca-bd53-9dcf98f197e9" />


---

### ✏️ Update Blog

<img width="1091" height="653" alt="image" src="https://github.com/user-attachments/assets/c35035d1-066f-45d0-a868-fdb2df38f6fb" />

---

### 🗑️ Delete Blog

<img width="1095" height="428" alt="image" src="https://github.com/user-attachments/assets/c11c4bf7-1c84-4b8d-9b06-bf748023ccd5" />

---

### 📚 Get All Blogs

<img width="1087" height="955" alt="image" src="https://github.com/user-attachments/assets/78ba431e-fd64-4c9e-a512-5467dbe5c0f0" />

---

👨‍💼 Admin Router
---
### Admin Update User
<img width="849" height="613" alt="image" src="https://github.com/user-attachments/assets/ca8f2dc6-9d95-4d22-a5b9-95e784c168b0" />

---
###Admin Delete User

<img width="847" height="542" alt="image" src="https://github.com/user-attachments/assets/6a949122-c5d3-43b5-beb8-2be4f2678531" />

---

# 🗄 Database

MongoDB is used with Mongoose ODM.

Relationships

* One User → Many Blogs
* Blog belongs to one Author

---

# 📦 Dependencies

```json
express
mongoose
jsonwebtoken
bcryptjs
multer
multer-storage-cloudinary
cloudinary
dotenv
joi
```

---

# 🧪 Testing

You can test the API using:

* Postman
* Thunder Client
* Insomnia

---

# 📈 Future Improvements

* Email Verification
* Forgot Password
* Reset Password
* Like and Dislike Blog
* Comments System
* Search Blogs
* Pagination
* Blog Categories
* Refresh Token Authentication
* Swagger API Documentation
* Unit Testing (Jest)

---

# 👨‍💻 Author

**Mohin Pathan**

Backend Developer

**Tech Stack**

* Node.js
* Express.js
* MongoDB
* JWT
* Cloudinary
* REST API
* Mongoose

---

# 📄 License

This project is created for learning and educational purposes.

