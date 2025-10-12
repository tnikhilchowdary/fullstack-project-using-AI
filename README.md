# MERN Stack Project

## Project Structure

```
project-app-assignment/
├── backend/              # Backend server (Node.js + Express + MongoDB)
│   ├── models/           # Mongoose schemas
│   ├── controllers/      # Business logic
│   ├── routes/           # API routes
│   ├── server.js         # Express server
│   ├── .env              # Environment variables
│   └── package.json      # Backend dependencies
├── frontend/             # Frontend app (React)
│   ├── src/
│   │   ├── services/     # API service
│   │   ├── App.js        # Main component
│   │   └── App.css       # Styles
│   └── package.json      # Frontend dependencies
└── README.md
```

## Setup Instructions

### Backend Setup

1. Navigate to backend folder:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure MongoDB:
   - The `.env` file is already configured with your MongoDB connection string
   - MongoDB URI is properly URL-encoded

4. Start the backend server:
   ```bash
   npm start      # Production mode
   npm run dev    # Development mode with nodemon
   ```
   
   Backend will run on: `http://localhost:5000`

### Frontend Setup

1. Open a new terminal and navigate to frontend folder:
   ```bash
   cd frontend
   ```

2. Install dependencies (already done):
   ```bash
   npm install
   ```

3. Start the React app:
   ```bash
   npm start
   ```
   
   Frontend will run on: `http://localhost:3000`

### Running the Full Stack App

1. **Terminal 1** - Start Backend:
   ```bash
   cd backend
   npm start
   ```

2. **Terminal 2** - Start Frontend:
   ```bash
   cd frontend
   npm start
   ```

3. Open browser and visit: `http://localhost:3000`

## Testing the Connection

- Visit `http://localhost:5000/` to see the server status and available API endpoints
- Visit `http://localhost:5000/api/test` to check database connection

## API Endpoints

### Todo CRUD Operations

- **GET** `/api/todos` - Get all todos
- **GET** `/api/todos/:id` - Get single todo
- **POST** `/api/todos` - Create new todo
- **PUT** `/api/todos/:id` - Update todo
- **DELETE** `/api/todos/:id` - Delete todo

For detailed API testing examples, see:
- `backend/POSTMAN_TESTING_GUIDE.md` - Complete Postman testing guide
- `backend/Todo-API.postman_collection.json` - Import this collection into Postman
- `backend/API_TESTING.md` - PowerShell/cURL examples

## Tech Stack

- **MongoDB**: Database (Cloud Atlas)
- **Express.js**: Backend framework
- **React**: Frontend framework
- **Node.js**: Runtime environment
- **Axios**: HTTP client for API requests

## Features

### Backend (API)
- ✅ RESTful API with Express
- ✅ MongoDB integration with Mongoose
- ✅ CRUD operations for todos
- ✅ Error handling
- ✅ CORS enabled
- ✅ Environment variables

### Frontend (React)
- ✅ Modern React with Hooks
- ✅ Beautiful, responsive UI
- ✅ Real-time todo management
- ✅ Priority-based color coding
- ✅ Smooth animations
- ✅ Mobile-friendly design

## 🎯 Current Status

✅ **Backend**: Running on `http://localhost:5000`  
✅ **Frontend**: Running on `http://localhost:3000`  
✅ **Database**: MongoDB Connected Successfully!  
✅ **Authentication**: Login/Signup implemented  
✅ **Dashboard**: Full featured with 4 tabs  

## 📚 Documentation

### Getting Started
- **🔐 Authentication**: See `AUTHENTICATION_GUIDE.md` - **START HERE!**
- **Backend API**: See `backend/POSTMAN_TESTING_GUIDE.md`
- **Postman Collection**: `backend/Todo-API.postman_collection.json`
- **Frontend Guide**: See `FRONTEND_GUIDE.md`

### Deployment Guides
- **🚂 Railway Deployment**: See `RAILWAY_START_HERE.md` - **RECOMMENDED!**
- **⚡ Quick Deploy**: See `RAILWAY_QUICK_START.md`
- **📖 Step-by-Step**: See `RAILWAY_STEP_BY_STEP.md`
- **🔧 Troubleshooting**: See `RAILWAY_TROUBLESHOOTING.md`
- **📊 Platform Comparison**: See `RAILWAY_VS_OTHERS.md`

## 🚀 Quick Start

### For Authentication & Dashboard
1. Open **Terminal 1**: `cd backend && npm start`
2. Open **Terminal 2**: `cd frontend && npm start`
3. Visit `http://localhost:3000`
4. Sign up / Login
5. Access full dashboard!

### Dashboard Features
- **Top Bar**: TNC-TEAM logo (right) + Profile menu (left)
- **Navbar**: Dashboard | Add Todo | View Tasks | Analytics
- **Main Page**: Today's Tasks | Tomorrow's Tasks | Calendar
- **All tasks connect to backend** and are user-specific!

