# Task Manager Application

A full-stack Task Management Application built using the MERN Stack (MongoDB, Express.js, React.js, Node.js). The application allows users to register, log in, manage tasks, search tasks, and track task completion status.

## Features

### Authentication
- User Signup
- User Login
- JWT Authentication
- Protected Routes
- Logout Functionality

### Task Management
- Create Tasks
- View All Tasks
- Update Tasks
- Delete Tasks
- Toggle Task Status (Pending / Completed)

### Search Functionality
- Search tasks by title or description
- Real-time filtering

### Responsive Design
- Mobile-friendly UI
- Responsive Navbar
- Sidebar Navigation for smaller screens

---

## Tech Stack

### Frontend
- React.js
- React Router DOM
- Axios
- Tailwind CSS
- JWT Decode
- Lucide React Icons

### Backend
- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- JWT Authentication
- Bcrypt.js

### Deployment
- Frontend: Vercel
- Backend: Render
- Database: MongoDB Atlas

---


## Screenshots

### Login Page

![Login Page](./screenshots/Screenshot%202026-06-07%20174745.png)

### Dashboard

![Dashboard](./screenshots/Screenshot%202026-06-07%20174842.png)

### Task Management

![Update Task](./screenshots/Screenshot%202026-06-07%20174920.png)

---

## Project Structure

```bash
task-manager/
│
├── frontend/
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── .env
│
├── backend/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── server.js
│   ├── package.json
│   └── .env
│
└── README.md
```

---

## Environment Variables

### Backend (.env)

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

### Frontend (.env)

```env
VITE_API_URI=http://localhost:5000/api
```

---

## Installation

### Clone Repository

```bash
git clone https://github.com/your-username/task-manager.git
cd task-manager
```

---

### Backend Setup

```bash
cd backend

npm install

npm start
```


### Frontend Setup

```bash
cd frontend

npm install

npm run dev
```







