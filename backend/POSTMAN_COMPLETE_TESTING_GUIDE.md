# 📮 Complete Postman Testing Guide - Test ALL Frontend Data

## 🎯 Overview

This guide shows you how to test **EXACTLY** what your frontend sends to the backend using Postman. Every request matches your frontend components!

---

## 🚀 Quick Start

### Step 1: Import Collection
1. Open Postman
2. Click **Import** button
3. Select file: `COMPLETE-Todo-API-With-Auth.postman_collection.json`
4. Collection imported! ✅

### Step 2: Start Backend Server
```bash
cd backend
npm start
```

**You should see:**
```
🚀 Server is running on port 5000
✅ MongoDB Connected Successfully!
```

---

## 📋 Testing Order (Follow This!)

### 🔐 Part 1: Authentication (Same as Frontend Signup/Login)

#### ✅ Test 1: Register New User
**Matches: `Signup.js` component**

1. **Select:** `Authentication → 1. Register New User`
2. **Request Body:**
```json
{
  "name": "Test User",
  "email": "test@example.com",
  "password": "password123"
}
```
3. **Click:** Send
4. **Expected Response (201 Created):**
```json
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "_id": "67081234567890abcdef",
    "name": "Test User",
    "email": "test@example.com",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```
5. **✅ Token automatically saved!** (Check console tab)

**Backend Console Output:**
```
============================================================
🌐 POST /api/auth/register
Time: 10/10/2025, 2:30:45 PM
Request Body: { name: 'Test User', email: 'test@example.com', password: 'password123' }
============================================================
📥 REGISTER REQUEST RECEIVED:
Body: { name: 'Test User', email: 'test@example.com', password: 'password123' }
✅ User registered successfully: test@example.com
📤 RESPONSE SENT: { _id: '67...', name: 'Test User', email: 'test@example.com' }
```

---

#### ✅ Test 2: Login User
**Matches: `Login.js` component**

1. **Select:** `Authentication → 2. Login User`
2. **Request Body:**
```json
{
  "email": "test@example.com",
  "password": "password123"
}
```
3. **Click:** Send
4. **Expected Response (200 OK):**
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "_id": "67081234567890abcdef",
    "name": "Test User",
    "email": "test@example.com",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

**Backend Console Output:**
```
📥 LOGIN REQUEST RECEIVED:
Body: { email: 'test@example.com', password: 'password123' }
✅ Login successful for user: test@example.com
📤 RESPONSE SENT: { _id: '67...', name: 'Test User', email: 'test@example.com' }
```

---

#### ✅ Test 3: Get User Profile
**Matches: `AuthContext.js` profile fetch**

1. **Select:** `Authentication → 3. Get User Profile`
2. **Headers:** (Automatically includes: `Authorization: Bearer {{token}}`)
3. **Click:** Send
4. **Expected Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "_id": "67081234567890abcdef",
    "name": "Test User",
    "email": "test@example.com"
  }
}
```

**Backend Console Output:**
```
🔐 AUTH MIDDLEWARE - Checking token...
✅ Token verified for user ID: 67...
✅ User authenticated: test@example.com
```

---

### 📝 Part 2: Todo Operations (Same as Frontend Components)

#### ✅ Test 4: Create New Todo
**Matches: `AddTodo.js` form submission**

1. **Select:** `Todo Operations (Protected) → 2. Create New Todo`
2. **Request Body:**
```json
{
  "title": "Complete project",
  "description": "Finish the todo app",
  "priority": "high",
  "dueDate": "2025-10-15"
}
```
3. **Click:** Send
4. **Expected Response (201 Created):**
```json
{
  "success": true,
  "message": "Todo created successfully",
  "data": {
    "_id": "68a1b2c3d4e5f6",
    "user": "67081234567890abcdef",
    "title": "Complete project",
    "description": "Finish the todo app",
    "priority": "high",
    "dueDate": "2025-10-15T00:00:00.000Z",
    "completed": false,
    "createdAt": "2025-10-10T14:30:00.000Z",
    "updatedAt": "2025-10-10T14:30:00.000Z"
  }
}
```

**Backend Console Output:**
```
🔐 AUTH MIDDLEWARE - Checking token...
✅ Token verified for user ID: 67...
✅ User authenticated: test@example.com

📥 CREATE TODO REQUEST
User ID: 67081234567890abcdef
Body: {
  title: 'Complete project',
  description: 'Finish the todo app',
  priority: 'high',
  dueDate: '2025-10-15'
}
✅ Todo created successfully: Complete project
📤 RESPONSE SENT: { id: '68a1b2c3d4e5f6', title: 'Complete project' }
```

---

#### ✅ Test 5: Get All Todos
**Matches: `ViewTasks.js` fetchTodos()**

1. **Select:** `Todo Operations (Protected) → 1. Get All Todos`
2. **Click:** Send
3. **Expected Response (200 OK):**
```json
{
  "success": true,
  "count": 1,
  "data": [
    {
      "_id": "68a1b2c3d4e5f6",
      "user": "67081234567890abcdef",
      "title": "Complete project",
      "description": "Finish the todo app",
      "priority": "high",
      "dueDate": "2025-10-15T00:00:00.000Z",
      "completed": false,
      "createdAt": "2025-10-10T14:30:00.000Z",
      "updatedAt": "2025-10-10T14:30:00.000Z"
    }
  ]
}
```

**Backend Console Output:**
```
📥 GET ALL TODOS REQUEST
User ID: 67081234567890abcdef
✅ Found 1 todos
📤 RESPONSE SENT: count: 1
```

---

#### ✅ Test 6: Update Todo - Mark as Complete
**Matches: `ViewTasks.js` handleToggleComplete()**

1. **Select:** `Todo Operations (Protected) → 4. Update Todo - Mark Complete`
2. **Request Body:**
```json
{
  "completed": true
}
```
3. **Click:** Send
4. **Expected Response (200 OK):**
```json
{
  "success": true,
  "message": "Todo updated successfully",
  "data": {
    "_id": "68a1b2c3d4e5f6",
    "user": "67081234567890abcdef",
    "title": "Complete project",
    "description": "Finish the todo app",
    "priority": "high",
    "dueDate": "2025-10-15T00:00:00.000Z",
    "completed": true,
    "createdAt": "2025-10-10T14:30:00.000Z",
    "updatedAt": "2025-10-10T14:35:00.000Z"
  }
}
```

**Backend Console Output:**
```
📥 UPDATE TODO REQUEST
Todo ID: 68a1b2c3d4e5f6
Body: { completed: true }
✅ Todo updated successfully: Complete project
📤 RESPONSE SENT: { id: '68a1b2c3d4e5f6', title: 'Complete project' }
```

---

#### ✅ Test 7: Delete Todo
**Matches: `ViewTasks.js` handleDelete()**

1. **Select:** `Todo Operations (Protected) → 6. Delete Todo`
2. **Click:** Send
3. **Expected Response (200 OK):**
```json
{
  "success": true,
  "message": "Todo deleted successfully",
  "data": {}
}
```

**Backend Console Output:**
```
📥 DELETE TODO REQUEST
Todo ID: 68a1b2c3d4e5f6
✅ Todo deleted successfully: Complete project
📤 RESPONSE SENT: Todo deleted
```

---

## 🎨 Sample Test Scenarios

### Scenario 1: Complete User Journey
1. ✅ Register New User
2. ✅ Login User (get token)
3. ✅ Get User Profile
4. ✅ Create 3 Todos (high, medium, low priority)
5. ✅ Get All Todos
6. ✅ Mark one todo as complete
7. ✅ Delete one todo
8. ✅ Get All Todos (verify changes)

### Scenario 2: Test Different Priorities
Use the **Sample Test Data** folder:
- Create Todo - High Priority
- Create Todo - Medium Priority
- Create Todo - Low Priority

---

## 🔍 Frontend to Postman Mapping

| Frontend Component | Postman Request | Data Sent |
|-------------------|----------------|-----------|
| `Signup.js` | Authentication → 1. Register | name, email, password |
| `Login.js` | Authentication → 2. Login | email, password |
| `AuthContext.js` profile | Authentication → 3. Get Profile | (token in header) |
| `AddTodo.js` | Todo Operations → 2. Create Todo | title, description, priority, dueDate |
| `ViewTasks.js` fetch | Todo Operations → 1. Get All Todos | (token in header) |
| `ViewTasks.js` toggle | Todo Operations → 4. Mark Complete | completed: true/false |
| `ViewTasks.js` delete | Todo Operations → 6. Delete Todo | (todo ID) |

---

## 🛠️ Postman Variables Explained

The collection uses **automatic variables**:

| Variable | Saved From | Used In |
|----------|-----------|---------|
| `{{base_url}}` | Manual: `http://localhost:5000` | All requests |
| `{{token}}` | Auto-saved from Login/Register | All protected routes |
| `{{todo_id}}` | Auto-saved from Create Todo | Update/Delete operations |

### How It Works:
1. **Register/Login** → Token automatically saved
2. **Create Todo** → Todo ID automatically saved
3. **All other requests** → Automatically use token and todo_id

**You don't need to copy/paste IDs manually!** ✨

---

## 🚨 Testing Error Scenarios

### Test 1: Login with Wrong Password
```json
{
  "email": "test@example.com",
  "password": "wrongpassword"
}
```
**Expected:** 401 Unauthorized
```json
{
  "success": false,
  "message": "Invalid credentials"
}
```

### Test 2: Create Todo Without Token
1. Remove Authorization header
2. Try to create todo
**Expected:** 401 Unauthorized
```json
{
  "success": false,
  "message": "Not authorized, no token"
}
```

### Test 3: Create Todo Without Title
```json
{
  "description": "No title",
  "priority": "high"
}
```
**Expected:** 400 Bad Request
```json
{
  "success": false,
  "message": "Title is required"
}
```

### Test 4: Delete Non-existent Todo
Change `{{todo_id}}` to invalid ID like `000000000000000000000000`
**Expected:** 404 Not Found
```json
{
  "success": false,
  "message": "Todo not found"
}
```

---

## 📊 All Possible Request Data

### Register/Signup
```json
{
  "name": "string (required)",
  "email": "string (required)",
  "password": "string (required, min 6 chars)"
}
```

### Login
```json
{
  "email": "string (required)",
  "password": "string (required)"
}
```

### Create Todo
```json
{
  "title": "string (required)",
  "description": "string (optional)",
  "priority": "low | medium | high (optional, default: medium)",
  "dueDate": "YYYY-MM-DD (optional)",
  "completed": "boolean (optional, default: false)"
}
```

### Update Todo
```json
{
  "title": "string (optional)",
  "description": "string (optional)",
  "priority": "low | medium | high (optional)",
  "dueDate": "YYYY-MM-DD (optional)",
  "completed": "boolean (optional)"
}
```
**Note:** Send only fields you want to update!

---

## ✅ Testing Checklist

### Authentication
- [ ] Register new user successfully
- [ ] Login returns token
- [ ] Get profile with valid token works
- [ ] Get profile without token fails
- [ ] Login with wrong password fails
- [ ] Register with existing email fails

### Todo Operations
- [ ] Create todo with all fields
- [ ] Create todo with only title
- [ ] Get all todos returns array
- [ ] Get single todo by ID works
- [ ] Update todo - mark complete
- [ ] Update todo - change title
- [ ] Update todo - change priority
- [ ] Delete todo successfully
- [ ] Create todo without token fails
- [ ] Update todo without title still works

---

## 🎯 Pro Tips

### 1. Watch Backend Console
Keep your backend terminal open to see the logs we added:
```
============================================================
🌐 POST /api/auth/login
📥 LOGIN REQUEST RECEIVED:
✅ Login successful
📤 RESPONSE SENT
```

### 2. Use Collection Runner
1. Click **Run Collection**
2. Select all requests
3. Click **Run Todo API**
4. Watch all tests execute automatically!

### 3. Save Responses as Examples
After successful requests:
1. Click **Save Response**
2. Click **Save as Example**
3. Future reference for expected responses!

### 4. Export Collection
After testing:
1. Right-click collection
2. **Export**
3. Share with team!

---

## 🔥 Common Issues & Solutions

### Issue: "Not authorized, no token"
**Solution:** 
1. Run Login request first
2. Check if token is saved (Collection Variables)
3. Verify Authorization header has `Bearer {{token}}`

### Issue: "Todo not found"
**Solution:**
1. Run "Create New Todo" first
2. Check if `{{todo_id}}` is saved
3. Or run "Get All Todos" and copy a valid ID

### Issue: "User already exists"
**Solution:**
1. Change email in Register request
2. Or use Login request instead

### Issue: Can't see backend logs
**Solution:**
1. Make sure backend is running: `npm start`
2. Check terminal where backend is running
3. Logs appear after each request

---

## 🎊 Summary

**You now have:**
✅ Complete Postman collection matching ALL frontend requests
✅ Automatic token and ID management
✅ Sample data for quick testing
✅ Error scenario testing
✅ Backend console logging to verify data

**You can test:**
✅ User registration (Signup.js)
✅ User login (Login.js)
✅ User profile (AuthContext.js)
✅ Create todos (AddTodo.js)
✅ View todos (ViewTasks.js)
✅ Update todos (ViewTasks.js toggle)
✅ Delete todos (ViewTasks.js delete)

**Everything your frontend sends, you can now test in Postman!** 🚀

