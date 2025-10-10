# 🔐 Authentication & Dashboard Guide

## ✅ What's Implemented

### Backend Authentication
- ✅ User Model with password hashing (bcrypt)
- ✅ JWT token-based authentication
- ✅ Register & Login endpoints
- ✅ Protected routes with middleware
- ✅ Todo items linked to users
- ✅ Due date support for calendar

### Frontend Features
- ✅ Login Page (/) - Beautiful auth UI
- ✅ Signup Page (/signup) - User registration
- ✅ Protected Dashboard (/dashboard)
- ✅ AuthContext for state management
- ✅ Automatic token management
- ✅ Private route protection

### Dashboard Components
- ✅ **TopBar**: TNC-TEAM logo (right) + Profile menu (left)
- ✅ **Navbar**: Dashboard, Add Todo, View Tasks, Analytics
- ✅ **Dashboard Home**: Today's tasks, Tomorrow's tasks, Calendar
- ✅ **Add Todo**: Create tasks with due dates
- ✅ **View Tasks**: All tasks with filters
- ✅ **Analytics**: Task statistics

## 🚀 How to Run

### Step 1: Start Backend
Open **Terminal 1**:
```bash
cd backend
npm start
```

Wait for:
```
🚀 Server is running on port 5000
✅ MongoDB Connected Successfully!
```

### Step 2: Start Frontend
Open **Terminal 2**:
```bash
cd frontend
npm start
```

Frontend will open at: `http://localhost:3000`

## 📝 User Flow

### 1. Sign Up
1. Go to `http://localhost:3000/`
2. Click "Sign up here"
3. Fill in:
   - Full Name
   - Email
   - Password (min 6 characters)
   - Confirm Password
4. Click "Sign Up"
5. You'll be automatically logged in and redirected to dashboard

### 2. Login
1. Go to `http://localhost:3000/`
2. Enter email and password
3. Click "Login"
4. Redirected to dashboard

### 3. Dashboard Navigation

#### Top Bar
- **Left Side**: Profile menu with avatar and name
  - Click to see dropdown
  - Shows email
  - Logout option
- **Right Side**: TNC-TEAM logo

#### Navbar (4 Tabs)
1. **📊 Dashboard**
   - Today's tasks
   - Tomorrow's tasks
   - Calendar with task dates highlighted
   - Quick stats (Total, Completed, Pending)

2. **➕ Add Todo**
   - Task title (required)
   - Description (optional)
   - Due date (for calendar)
   - Priority (low/medium/high)

3. **📋 View Tasks**
   - All tasks in cards
   - Filter: All, Pending, Completed
   - Mark complete/undo
   - Delete tasks

4. **📈 Analytics**
   - Total tasks count
   - Completed tasks count
   - Pending tasks count
   - Completion rate %
   - Priority breakdown
   - Progress bar

## 🎨 Features in Detail

### Today's & Tomorrow's Tasks
- Automatically filters tasks by due date
- Shows tasks due today in one section
- Shows tasks due tomorrow in another
- Color-coded by priority
- Shows completion status

### Calendar Integration
- Full calendar view
- Dates with tasks are highlighted
- Click to select date
- Shows selected date info
- Visual indicator for task dates

### Task Management
- Create tasks with due dates
- Set priority levels (low/medium/high)
- Mark as complete/incomplete
- Delete tasks
- Filter by status
- All tasks are user-specific (protected)

### Priority System
- **High**: Red border & badge
- **Medium**: Yellow border & badge
- **Low**: Green border & badge

### Analytics Dashboard
- Real-time task statistics
- Completion percentage
- Priority distribution
- Visual progress indicators
- Color-coded stats

## 🔒 Security Features

### Backend
- Passwords hashed with bcrypt
- JWT tokens (30-day expiration)
- Protected routes with middleware
- User-specific data isolation
- Secure token validation

### Frontend
- Token stored in localStorage
- Automatic header injection
- Private route protection
- Auto-logout on token failure
- Secure API communication

## 📡 API Endpoints

### Authentication
```
POST /api/auth/register  - Create account
POST /api/auth/login     - Login
GET  /api/auth/profile   - Get user profile (Protected)
```

### Todos (All Protected)
```
GET    /api/todos        - Get user's todos
POST   /api/todos        - Create todo
GET    /api/todos/:id    - Get single todo
PUT    /api/todos/:id    - Update todo
DELETE /api/todos/:id    - Delete todo
```

## 🎯 Testing the App

### Test Scenario 1: Complete User Journey
1. Sign up with new account
2. Add 3 tasks with different due dates:
   - One for today
   - One for tomorrow
   - One for next week
3. Check Dashboard - see today's & tomorrow's tasks
4. Go to Add Todo - create more tasks
5. View Tasks - see all tasks, filter them
6. Analytics - view statistics
7. Logout and login again

### Test Scenario 2: Task Management
1. Create task with high priority
2. Set due date for today
3. Go to Dashboard - see it in "Today's Tasks"
4. Mark as complete
5. Check Analytics - see completion rate increase
6. View Tasks - filter by completed
7. Delete the task

### Test Scenario 3: Calendar
1. Create tasks with various due dates
2. Go to Dashboard
3. Check calendar - highlighted dates
4. Click on different dates
5. Tasks appear in respective sections

## 🛠️ Troubleshooting

### Backend not connecting to MongoDB
- Check `.env` file in backend folder
- Verify MongoDB URI is correct
- Ensure internet connection

### Frontend can't reach backend
- Ensure backend is running on port 5000
- Check `package.json` has `"proxy": "http://localhost:5000"`
- Restart frontend if you changed proxy

### Authentication errors
- Clear localStorage: `localStorage.clear()` in browser console
- Re-login
- Check JWT_SECRET is set in backend `.env`

### Calendar not showing tasks
- Ensure tasks have `dueDate` set
- Check date format is correct
- Refresh the page

## 📂 Project Structure

```
project-app-assignment/
├── backend/
│   ├── models/
│   │   ├── User.js           # User model
│   │   └── Todo.js           # Todo model (with user ref)
│   ├── controllers/
│   │   ├── authController.js # Auth logic
│   │   └── todoController.js # Todo logic (user-specific)
│   ├── routes/
│   │   ├── authRoutes.js     # Auth routes
│   │   └── todoRoutes.js     # Protected todo routes
│   ├── middleware/
│   │   └── auth.js           # JWT protection
│   └── server.js             # Main server
│
├── frontend/
│   ├── src/
│   │   ├── context/
│   │   │   └── AuthContext.js    # Auth state management
│   │   ├── pages/
│   │   │   ├── Login.js          # Login page (/)
│   │   │   ├── Signup.js         # Signup page
│   │   │   └── Dashboard.js      # Main dashboard
│   │   ├── components/
│   │   │   ├── TopBar.js         # Logo + Profile
│   │   │   ├── Navbar.js         # 4 menu items
│   │   │   ├── DashboardHome.js  # Today/Tomorrow/Calendar
│   │   │   ├── AddTodo.js        # Add task form
│   │   │   ├── ViewTasks.js      # All tasks
│   │   │   ├── Analytics.js      # Statistics
│   │   │   └── PrivateRoute.js   # Route protection
│   │   └── styles/
│   │       └── *.css             # Component styles
│   └── package.json              # with proxy config
```

## 🌟 Key Features Summary

✅ **Login/Signup**: Beautiful auth pages with validation  
✅ **Protected Routes**: JWT-based authentication  
✅ **TNC-TEAM Logo**: Positioned on top right  
✅ **Profile Menu**: Top left with logout  
✅ **4 Navbar Items**: Dashboard, Add Todo, View Tasks, Analytics  
✅ **Today's Tasks**: Shows tasks due today  
✅ **Tomorrow's Tasks**: Shows tasks due tomorrow  
✅ **Calendar**: Interactive with highlighted task dates  
✅ **User-Specific Data**: Each user sees only their tasks  
✅ **Real-time Updates**: All changes reflect immediately  

## 🎉 Your MERN App is Complete!

Everything is set up and ready to use! Open `http://localhost:3000` and start managing your tasks! 🚀

