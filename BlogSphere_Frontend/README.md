# BlogSphere Frontend

Frontend client for **BlogSphere Backend API** built with **React**, **Vite**, **Axios**, and **React Router DOM**.

## 🚀 Features

- **Authentication**:
  - User Registration with Profile Picture upload (`POST /JWT/auth/add`)
  - User Login with JWT token management (`POST /JWT/auth/login`)
  - Auto-login / profile restoration via token verification (`POST /JWT/auth/authLogin`)
  - Logout from all devices (`GET /JWT/auth/logoutAll`)
- **Blog Operations**:
  - View all published blogs with Author names and images (`GET /blog`)
  - Search blogs by title/description and filter by category
  - Create new blog with image upload via Multer/Cloudinary (`POST /blog`)
  - Edit your own blogs (`PATCH /blog/:id`)
  - Delete your own blogs (`DELETE /blog/:id`)
- **User Profile**:
  - View profile details
  - Update profile name, address, phone, and profile picture (`PATCH /JWT/auth/Update`)
  - Delete user account (`DELETE /JWT/auth/deleteUser`)

## 🛠️ Getting Started

### 1. Install dependencies (if not already installed)
```bash
npm install
```

### 2. Run the development server
```bash
npm run dev
```

The frontend will run on `http://localhost:5173`.
Proxy is configured in `vite.config.js` to automatically route `/JWT`, `/blog`, and `/admin` requests to `http://localhost:5001`.
