# 🔄 Frontend to Postman - Quick Reference Card

## 📋 Exact Data Mapping

### 1️⃣ User Signup (Signup.js → Postman)

**Frontend Code:**
```javascript
// frontend/src/pages/Signup.js
const formData = {
  name: 'John Doe',
  email: 'john@example.com',
  password: 'password123',
  confirmPassword: 'password123'  // Not sent to backend
}

// Only sends: name, email, password
await register(formData.name, formData.email, formData.password);
```

**Postman Request:**
```
POST http://localhost:5000/api/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "_id": "67...",
    "name": "John Doe",
    "email": "john@example.com",
    "token": "eyJhbGc..."
  }
}
```

---

### 2️⃣ User Login (Login.js → Postman)

**Frontend Code:**
```javascript
// frontend/src/pages/Login.js
const formData = {
  email: 'john@example.com',
  password: 'password123'
}

await login(formData.email, formData.password);
```

**Postman Request:**
```
POST http://localhost:5000/api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "_id": "67...",
    "name": "John Doe",
    "email": "john@example.com",
    "token": "eyJhbGc..."
  }
}
```

---

### 3️⃣ Get User Profile (AuthContext.js → Postman)

**Frontend Code:**
```javascript
// frontend/src/context/AuthContext.js
axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
const response = await axios.get('/api/auth/profile');
```

**Postman Request:**
```
GET http://localhost:5000/api/auth/profile
Authorization: Bearer eyJhbGc...
```

**Response:**
```json
{
  "success": true,
  "data": {
    "_id": "67...",
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

---

### 4️⃣ Create Todo (AddTodo.js → Postman)

**Frontend Code:**
```javascript
// frontend/src/components/AddTodo.js
const formData = {
  title: 'Complete project',
  description: 'Finish the todo app',
  priority: 'high',
  dueDate: '2025-10-15'
}

await createTodo(formData);
```

**Postman Request:**
```
POST http://localhost:5000/api/todos
Authorization: Bearer eyJhbGc...
Content-Type: application/json

{
  "title": "Complete project",
  "description": "Finish the todo app",
  "priority": "high",
  "dueDate": "2025-10-15"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Todo created successfully",
  "data": {
    "_id": "68...",
    "user": "67...",
    "title": "Complete project",
    "description": "Finish the todo app",
    "priority": "high",
    "dueDate": "2025-10-15T00:00:00.000Z",
    "completed": false,
    "createdAt": "2025-10-10T...",
    "updatedAt": "2025-10-10T..."
  }
}
```

---

### 5️⃣ Get All Todos (ViewTasks.js → Postman)

**Frontend Code:**
```javascript
// frontend/src/components/ViewTasks.js
const fetchTodos = async () => {
  const response = await getTodos();
  setTodos(response.data);
};
```

**Postman Request:**
```
GET http://localhost:5000/api/todos
Authorization: Bearer eyJhbGc...
```

**Response:**
```json
{
  "success": true,
  "count": 2,
  "data": [
    {
      "_id": "68...",
      "title": "Complete project",
      "description": "Finish the todo app",
      "priority": "high",
      "dueDate": "2025-10-15T00:00:00.000Z",
      "completed": false
    },
    {
      "_id": "68...",
      "title": "Another task",
      "description": "Another description",
      "priority": "medium",
      "dueDate": "2025-10-20T00:00:00.000Z",
      "completed": false
    }
  ]
}
```

---

### 6️⃣ Update Todo - Mark Complete (ViewTasks.js → Postman)

**Frontend Code:**
```javascript
// frontend/src/components/ViewTasks.js
const handleToggleComplete = async (todo) => {
  await updateTodo(todo._id, { completed: !todo.completed });
};
```

**Postman Request:**
```
PUT http://localhost:5000/api/todos/68a1b2c3d4e5f6
Authorization: Bearer eyJhbGc...
Content-Type: application/json

{
  "completed": true
}
```

**Response:**
```json
{
  "success": true,
  "message": "Todo updated successfully",
  "data": {
    "_id": "68...",
    "title": "Complete project",
    "description": "Finish the todo app",
    "priority": "high",
    "dueDate": "2025-10-15T00:00:00.000Z",
    "completed": true,
    "createdAt": "2025-10-10T...",
    "updatedAt": "2025-10-10T..."
  }
}
```

---

### 7️⃣ Delete Todo (ViewTasks.js → Postman)

**Frontend Code:**
```javascript
// frontend/src/components/ViewTasks.js
const handleDelete = async (id) => {
  if (window.confirm('Are you sure?')) {
    await deleteTodo(id);
  }
};
```

**Postman Request:**
```
DELETE http://localhost:5000/api/todos/68a1b2c3d4e5f6
Authorization: Bearer eyJhbGc...
```

**Response:**
```json
{
  "success": true,
  "message": "Todo deleted successfully",
  "data": {}
}
```

---

## 🔐 Authentication Headers

### Frontend (Automatic)
```javascript
// Set once in AuthContext.js
axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

// Then all requests automatically include the header
```

### Postman (Manual)
```
Add to each protected request:
Key: Authorization
Value: Bearer {{token}}

OR use Collection Variables (automatic)
```

---

## 📊 Data Comparison Table

| Action | Frontend File | API Endpoint | Method | Auth Required | Data Sent |
|--------|--------------|--------------|--------|---------------|-----------|
| Signup | Signup.js | /api/auth/register | POST | ❌ | name, email, password |
| Login | Login.js | /api/auth/login | POST | ❌ | email, password |
| Profile | AuthContext.js | /api/auth/profile | GET | ✅ | (none - token in header) |
| Create Todo | AddTodo.js | /api/todos | POST | ✅ | title, description, priority, dueDate |
| Get Todos | ViewTasks.js | /api/todos | GET | ✅ | (none - token in header) |
| Update Todo | ViewTasks.js | /api/todos/:id | PUT | ✅ | completed (or other fields) |
| Delete Todo | ViewTasks.js | /api/todos/:id | DELETE | ✅ | (none - ID in URL) |

---

## 🎯 Quick Test Workflow

### Step 1: Authentication
```
1. Register User (or Login if exists)
   → Get token back
   → Save token for next requests
```

### Step 2: Todo Operations
```
2. Create Todo
   → Get todo ID back
   → Save ID for update/delete

3. Get All Todos
   → Verify creation

4. Update Todo (use ID from step 2)
   → Mark as complete

5. Delete Todo (use ID from step 2)
   → Remove todo

6. Get All Todos
   → Verify deletion
```

---

## 💡 Key Differences: Frontend vs Postman

| Aspect | Frontend | Postman |
|--------|----------|---------|
| **Token Storage** | localStorage → automatic | Collection Variable → manual setup |
| **Headers** | axios defaults → automatic | Must add Authorization header |
| **Base URL** | Proxy in package.json | Full URL: http://localhost:5000 |
| **Response Handling** | `.data` property | Full response object |
| **Error Handling** | try/catch + user messages | Status code + response body |

---

## 🔄 Request Flow Comparison

### Frontend Flow:
```
User Form → formData state → API function → axios request → Backend
```

### Postman Flow:
```
Manual Input → Request Body → Send Button → HTTP Request → Backend
```

**Result: SAME data reaches backend!** ✅

---

## 📝 Sample Data for Testing

### Test User 1:
```json
{
  "name": "Alice Johnson",
  "email": "alice@example.com",
  "password": "alice123"
}
```

### Test User 2:
```json
{
  "name": "Bob Smith",
  "email": "bob@example.com",
  "password": "bob123"
}
```

### Test Todos:
```json
// High Priority
{
  "title": "Fix critical bug",
  "description": "Authentication issue",
  "priority": "high",
  "dueDate": "2025-10-11"
}

// Medium Priority
{
  "title": "Update documentation",
  "description": "API docs needed",
  "priority": "medium",
  "dueDate": "2025-10-13"
}

// Low Priority
{
  "title": "Code cleanup",
  "description": "Remove unused code",
  "priority": "low",
  "dueDate": "2025-10-20"
}
```

---

## 🚀 Complete Test Sequence

Copy and paste these in order:

### 1. Register
```json
POST http://localhost:5000/api/auth/register
{
  "name": "Test User",
  "email": "test@example.com",
  "password": "test123"
}
```

### 2. Login (if already registered)
```json
POST http://localhost:5000/api/auth/login
{
  "email": "test@example.com",
  "password": "test123"
}
```
→ Copy the `token` from response

### 3. Get Profile
```
GET http://localhost:5000/api/auth/profile
Authorization: Bearer [paste token here]
```

### 4. Create Todo
```json
POST http://localhost:5000/api/todos
Authorization: Bearer [paste token here]
{
  "title": "My First Todo",
  "description": "Testing in Postman",
  "priority": "high",
  "dueDate": "2025-10-15"
}
```
→ Copy the `_id` from response

### 5. Get All Todos
```
GET http://localhost:5000/api/todos
Authorization: Bearer [paste token here]
```

### 6. Update Todo
```json
PUT http://localhost:5000/api/todos/[paste ID here]
Authorization: Bearer [paste token here]
{
  "completed": true
}
```

### 7. Delete Todo
```
DELETE http://localhost:5000/api/todos/[paste ID here]
Authorization: Bearer [paste token here]
```

---

## ✅ Verification Checklist

After each request, verify in **Backend Console**:

- [ ] Request logged with correct data
- [ ] Token verified (for protected routes)
- [ ] Operation completed successfully
- [ ] Response sent with correct data

**You should see the emoji logs we added!** 📥 ✅ 📤

---

## 🎊 Summary

**Frontend sends data through:** Forms → React State → Axios → Backend
**Postman sends data through:** Manual Input → Request Body → HTTP → Backend

**Both send EXACTLY the same data to the same endpoints!**

**Use this reference to:**
✅ Know what data each frontend component sends
✅ Replicate it exactly in Postman
✅ Test without running frontend
✅ Debug API issues independently
✅ Verify backend receives correct data

**Happy Testing!** 🚀

