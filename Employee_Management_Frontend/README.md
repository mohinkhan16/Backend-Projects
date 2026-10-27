# Employee Management System

A simple Employee Management System built using the MERN Stack. This application allows users to add, view, update, and delete employee records.

## Live-Link:-
https://dapper-heliotrope-7745f8.netlify.app


## Features

- Add new employees
- View all employees
- Update employee details
- Delete employee records
- Manage employee information
- Form validation
- REST API integration
- React Router navigation
- Console logging for debugging

## Technologies Used

**Frontend**
- React.js
- JavaScript
- React Hooks (`useState`, `useEffect`)
- React Router DOM
- Axios
- HTML

**Backend**
- Node.js
- Express.js
- MongoDB
- Mongoose
- CORS
- dotenv

## Project Structure

```text
Employee_Management/
├── client/
│   ├── src/
│   │   ├── api/
│   │   │   └── EmployeeAxios.js
│   │   ├── components/
│   │   │   ├── Employee.jsx
│   │   │   └── EmployeeForm.jsx
│   │   ├── routes/
│   │   │   └── MainLayout.jsx
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── .env
│
└── server/
    ├── config/
    ├── controller/
    ├── middleware/
    ├── models/
    ├── routes/
    ├── .env
    └── server.js
```

*Note: Folder names may differ depending on your actual project structure.*

## Employee Information

The application manages the following employee fields:

- Name
- Employee ID
- Email
- Designation
- Department
- Salary
- Status
- Mobile Number

## Installation and Setup

### 1. Clone the Repository

```bash
git clone YOUR_REPOSITORY_URL
cd Employee_Management
```

### 2. Setup Backend

Open the backend folder:

```bash
cd server
npm install
```

Create a `.env` file in the backend folder and configure your MongoDB connection:

```env
MONGO_URI=your_mongodb_connection_string
```

Ensure your backend server uses port `5001`, or update the frontend API URL to match your configured port.

Start the backend:

```bash
npm run dev
```

### 3. Setup Frontend

Open a new terminal:

```bash
cd client
npm install
```

Create a `.env` file in the frontend folder:

```env
VITE_BASE_URL=http://localhost:5001/employee
```

Start the frontend:

```bash
npm run dev
```

Open the local URL displayed in your terminal, usually `http://localhost:5173`.

## API Endpoints

Base URL: `http://localhost:5001/employee`

| Method | Endpoint | Description |
|---|---|---|
| POST | `/add` | Add an employee |
| GET | `/allEmployee` | Get all employees |
| GET | `/:id` | Get employee by ID |
| PATCH | `/:id` | Update employee details |
| DELETE | `/:id` | Delete an employee |
| DELETE | `/deleteAll` | Delete all employees |

## Application Routes

| Route | Purpose |
|---|---|
| `/` | View all employees |
| `/add` | Add a new employee |
| `/update/:id` | Edit an existing employee |

## Update Functionality

The current backend permits updates to the following fields:

- Name
- Email
- Mobile Number

Other employee fields are submitted when creating an employee but are not currently permitted by the update controller.

## Future Improvements

- Search employees by name or ID
- Filter employees by department and status
- Pagination
- Improved form validation
- Authentication and authorization
- Responsive user interface

## Author

**Mohin Pathan**

## License

This project was created for learning and development purposes.
