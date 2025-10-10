# Todo API Testing Guide

## Base URL
```
http://localhost:5000
```

## API Endpoints

### 1. CREATE - Add New Todo
**Endpoint:** `POST /api/todos`

**PowerShell:**
```powershell
$body = @{
    title = 'Complete MERN project'
    description = 'Build a full-stack todo app'
    priority = 'high'
} | ConvertTo-Json

Invoke-RestMethod -Uri http://localhost:5000/api/todos -Method POST -Body $body -ContentType 'application/json'
```

**cURL:**
```bash
curl -X POST http://localhost:5000/api/todos \
  -H "Content-Type: application/json" \
  -d "{\"title\":\"Complete MERN project\",\"description\":\"Build a full-stack todo app\",\"priority\":\"high\"}"
```

---

### 2. READ - Get All Todos
**Endpoint:** `GET /api/todos`

**PowerShell:**
```powershell
Invoke-RestMethod -Uri http://localhost:5000/api/todos -Method GET
```

**cURL:**
```bash
curl http://localhost:5000/api/todos
```

---

### 3. READ - Get Single Todo
**Endpoint:** `GET /api/todos/:id`

**PowerShell:**
```powershell
Invoke-RestMethod -Uri http://localhost:5000/api/todos/YOUR_TODO_ID -Method GET
```

**cURL:**
```bash
curl http://localhost:5000/api/todos/YOUR_TODO_ID
```

---

### 4. UPDATE - Update Todo
**Endpoint:** `PUT /api/todos/:id`

**PowerShell:**
```powershell
$body = @{
    completed = $true
    title = 'Complete MERN project - DONE'
} | ConvertTo-Json

Invoke-RestMethod -Uri http://localhost:5000/api/todos/YOUR_TODO_ID -Method PUT -Body $body -ContentType 'application/json'
```

**cURL:**
```bash
curl -X PUT http://localhost:5000/api/todos/YOUR_TODO_ID \
  -H "Content-Type: application/json" \
  -d "{\"completed\":true,\"title\":\"Complete MERN project - DONE\"}"
```

---

### 5. DELETE - Delete Todo
**Endpoint:** `DELETE /api/todos/:id`

**PowerShell:**
```powershell
Invoke-RestMethod -Uri http://localhost:5000/api/todos/YOUR_TODO_ID -Method DELETE
```

**cURL:**
```bash
curl -X DELETE http://localhost:5000/api/todos/YOUR_TODO_ID
```

---

## Todo Schema

```javascript
{
  title: String (required),
  description: String,
  completed: Boolean (default: false),
  priority: String (enum: ['low', 'medium', 'high'], default: 'medium'),
  createdAt: Date (auto-generated),
  updatedAt: Date (auto-generated)
}
```

## Response Format

### Success Response
```json
{
  "success": true,
  "message": "Operation message",
  "data": { ... }
}
```

### Error Response
```json
{
  "success": false,
  "message": "Error message",
  "error": "Error details"
}
```

## Test Results ✅

All 4 CRUD operations tested and working:

1. ✅ **CREATE** - Successfully created todos
2. ✅ **READ** - Successfully retrieved all todos and single todo
3. ✅ **UPDATE** - Successfully updated todo (marked as completed)
4. ✅ **DELETE** - Successfully deleted todo

