# 📮 Postman Testing Guide - Todo API

## Base URL
```
http://localhost:5000
```

---

## 🔍 Test Server Status First

### Check Server is Running
- **Method:** `GET`
- **URL:** `http://localhost:5000/`
- **Expected Response:**
```json
{
  "message": "Welcome to MERN Todo API!",
  "status": "Server is running successfully",
  "database": "Connected",
  "endpoints": {
    "GET /api/todos": "Get all todos",
    "GET /api/todos/:id": "Get single todo",
    "POST /api/todos": "Create new todo",
    "PUT /api/todos/:id": "Update todo",
    "DELETE /api/todos/:id": "Delete todo"
  }
}
```

---

## 1️⃣ CREATE - Add New Todo

### Request Details
- **Method:** `POST`
- **URL:** `http://localhost:5000/api/todos`
- **Headers:**
  - Key: `Content-Type`
  - Value: `application/json`

### Request Body (JSON - raw)
```json
{
  "title": "Complete MERN Project",
  "description": "Build a full-stack todo application",
  "priority": "high"
}
```

### Expected Response (201 Created)
```json
{
  "success": true,
  "message": "Todo created successfully",
  "data": {
    "title": "Complete MERN Project",
    "description": "Build a full-stack todo application",
    "completed": false,
    "priority": "high",
    "_id": "68e91e91b871d196af302e13",
    "createdAt": "2025-10-10T14:56:17.561Z",
    "updatedAt": "2025-10-10T14:56:17.561Z",
    "__v": 0
  }
}
```

### More Test Cases

**Test Case 2:**
```json
{
  "title": "Learn MongoDB",
  "description": "Master MongoDB CRUD operations",
  "priority": "medium"
}
```

**Test Case 3:**
```json
{
  "title": "Test APIs with Postman",
  "description": "Test all CRUD endpoints",
  "priority": "low",
  "completed": false
}
```

---

## 2️⃣ READ - Get All Todos

### Request Details
- **Method:** `GET`
- **URL:** `http://localhost:5000/api/todos`
- **Headers:** None required

### Expected Response (200 OK)
```json
{
  "success": true,
  "count": 3,
  "data": [
    {
      "_id": "68e91e9cb871d196af302e15",
      "title": "Test APIs with Postman",
      "description": "Test all CRUD endpoints",
      "completed": false,
      "priority": "low",
      "createdAt": "2025-10-10T14:56:28.750Z",
      "updatedAt": "2025-10-10T14:56:28.750Z",
      "__v": 0
    },
    {
      "_id": "68e91e91b871d196af302e13",
      "title": "Complete MERN Project",
      "description": "Build a full-stack todo application",
      "completed": false,
      "priority": "high",
      "createdAt": "2025-10-10T14:56:17.561Z",
      "updatedAt": "2025-10-10T14:56:17.561Z",
      "__v": 0
    }
  ]
}
```

---

## 3️⃣ READ - Get Single Todo by ID

### Request Details
- **Method:** `GET`
- **URL:** `http://localhost:5000/api/todos/YOUR_TODO_ID`
  - Replace `YOUR_TODO_ID` with actual ID from previous response
  - Example: `http://localhost:5000/api/todos/68e91e91b871d196af302e13`
- **Headers:** None required

### Expected Response (200 OK)
```json
{
  "success": true,
  "data": {
    "_id": "68e91e91b871d196af302e13",
    "title": "Complete MERN Project",
    "description": "Build a full-stack todo application",
    "completed": false,
    "priority": "high",
    "createdAt": "2025-10-10T14:56:17.561Z",
    "updatedAt": "2025-10-10T14:56:17.561Z",
    "__v": 0
  }
}
```

---

## 4️⃣ UPDATE - Modify Todo

### Request Details
- **Method:** `PUT`
- **URL:** `http://localhost:5000/api/todos/YOUR_TODO_ID`
  - Example: `http://localhost:5000/api/todos/68e91e91b871d196af302e13`
- **Headers:**
  - Key: `Content-Type`
  - Value: `application/json`

### Request Body (JSON - raw)

**Mark as Completed:**
```json
{
  "completed": true
}
```

**Update Title and Mark Complete:**
```json
{
  "title": "Complete MERN Project ✅",
  "completed": true
}
```

**Change Priority:**
```json
{
  "priority": "low",
  "description": "Updated description"
}
```

### Expected Response (200 OK)
```json
{
  "success": true,
  "message": "Todo updated successfully",
  "data": {
    "_id": "68e91e91b871d196af302e13",
    "title": "Complete MERN Project ✅",
    "description": "Build a full-stack todo application",
    "completed": true,
    "priority": "high",
    "createdAt": "2025-10-10T14:56:17.561Z",
    "updatedAt": "2025-10-10T14:57:30.123Z",
    "__v": 0
  }
}
```

---

## 5️⃣ DELETE - Remove Todo

### Request Details
- **Method:** `DELETE`
- **URL:** `http://localhost:5000/api/todos/YOUR_TODO_ID`
  - Example: `http://localhost:5000/api/todos/68e91e91b871d196af302e13`
- **Headers:** None required

### Expected Response (200 OK)
```json
{
  "success": true,
  "message": "Todo deleted successfully",
  "data": {}
}
```

---

## 📝 Step-by-Step Postman Workflow

### Step 1: Start Your Server
```bash
cd backend
npm start
```

### Step 2: Test in This Order

1. **GET** `http://localhost:5000/` → Check server status
2. **POST** `http://localhost:5000/api/todos` → Create 2-3 todos
3. **GET** `http://localhost:5000/api/todos` → Get all todos (copy an ID)
4. **GET** `http://localhost:5000/api/todos/{id}` → Get single todo
5. **PUT** `http://localhost:5000/api/todos/{id}` → Update the todo
6. **GET** `http://localhost:5000/api/todos/{id}` → Verify update
7. **DELETE** `http://localhost:5000/api/todos/{id}` → Delete the todo
8. **GET** `http://localhost:5000/api/todos` → Verify deletion

---

## 🚨 Error Responses

### 404 - Not Found
```json
{
  "success": false,
  "message": "Todo not found"
}
```

### 400 - Bad Request (Missing Title)
```json
{
  "success": false,
  "message": "Title is required"
}
```

### 500 - Server Error
```json
{
  "success": false,
  "message": "Error message",
  "error": "Error details"
}
```

---

## 🎯 Quick Tips for Postman

1. **Save Requests:** Create a collection called "Todo API" and save all requests
2. **Environment Variables:** 
   - Create variable `base_url` = `http://localhost:5000`
   - Use `{{base_url}}/api/todos` in requests
3. **Tests Tab:** Add this to automatically save todo ID:
   ```javascript
   if (pm.response.code === 201) {
       var jsonData = pm.response.json();
       pm.environment.set("todo_id", jsonData.data._id);
   }
   ```
4. **Use Variables:** Then use `{{base_url}}/api/todos/{{todo_id}}` for UPDATE/DELETE

---

## ✅ Testing Checklist

- [ ] Server is running on port 5000
- [ ] MongoDB is connected
- [ ] CREATE: Successfully create multiple todos
- [ ] READ: Get all todos returns array
- [ ] READ: Get single todo by ID works
- [ ] UPDATE: Can mark todo as completed
- [ ] UPDATE: Can change title, description, priority
- [ ] DELETE: Successfully delete a todo
- [ ] Error handling works (try invalid ID, missing title)

---

## 📦 Todo Schema Reference

| Field | Type | Required | Default | Options |
|-------|------|----------|---------|---------|
| title | String | Yes | - | - |
| description | String | No | - | - |
| completed | Boolean | No | false | - |
| priority | String | No | medium | low, medium, high |
| createdAt | Date | Auto | - | - |
| updatedAt | Date | Auto | - | - |

