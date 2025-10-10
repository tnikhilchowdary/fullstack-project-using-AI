# 🚀 Quick Start - Postman Testing

## Method 1: Import Collection (Recommended)

### Step 1: Import the Collection
1. Open **Postman**
2. Click **Import** button (top left)
3. Select **File** tab
4. Choose `Todo-API.postman_collection.json` from the backend folder
5. Click **Import**

### Step 2: Start the Server
```bash
cd backend
npm start
```

Wait for:
```
🚀 Server is running on port 5000
✅ MongoDB Connected Successfully!
```

### Step 3: Test the APIs
1. In Postman, you'll see **"Todo API - MERN Stack"** collection
2. Expand it to see all requests
3. Start testing in this order:
   - ✅ **Server Status** - Check if server is running
   - ✅ **CREATE - Add New Todo** - Create a todo
   - ✅ **READ - Get All Todos** - Copy an `_id` from response
   - ✅ **READ - Get Single Todo** - Replace `YOUR_TODO_ID` with copied ID
   - ✅ **UPDATE - Mark as Completed** - Replace `YOUR_TODO_ID`
   - ✅ **DELETE - Remove Todo** - Replace `YOUR_TODO_ID`

---

## Method 2: Manual Setup

### 1. Server Status
- Method: `GET`
- URL: `http://localhost:5000/`

### 2. Create Todo (POST)
- Method: `POST`
- URL: `http://localhost:5000/api/todos`
- Headers: `Content-Type: application/json`
- Body (raw JSON):
```json
{
  "title": "My First Todo",
  "description": "Testing with Postman",
  "priority": "high"
}
```

### 3. Get All Todos (GET)
- Method: `GET`
- URL: `http://localhost:5000/api/todos`
- **📝 Copy an `_id` from the response**

### 4. Get Single Todo (GET)
- Method: `GET`
- URL: `http://localhost:5000/api/todos/{PASTE_ID_HERE}`

### 5. Update Todo (PUT)
- Method: `PUT`
- URL: `http://localhost:5000/api/todos/{PASTE_ID_HERE}`
- Headers: `Content-Type: application/json`
- Body (raw JSON):
```json
{
  "completed": true,
  "title": "My First Todo ✅"
}
```

### 6. Delete Todo (DELETE)
- Method: `DELETE`
- URL: `http://localhost:5000/api/todos/{PASTE_ID_HERE}`

---

## 📝 Pro Tips

### Tip 1: Use Environment Variables
1. Click **Environments** (left sidebar)
2. Create new environment "Todo API Dev"
3. Add variable:
   - Variable: `base_url`
   - Initial Value: `http://localhost:5000`
   - Current Value: `http://localhost:5000`
4. Use in requests: `{{base_url}}/api/todos`

### Tip 2: Auto-Save Todo ID
In **POST** request Tests tab, add:
```javascript
if (pm.response.code === 201) {
    var jsonData = pm.response.json();
    pm.environment.set("todo_id", jsonData.data._id);
}
```

Then use `{{base_url}}/api/todos/{{todo_id}}` in other requests!

### Tip 3: Save Your Work
1. Create a **Collection** called "My Todo API"
2. Save each request in the collection
3. Add descriptions to each request
4. Share collection with team

---

## ✅ Testing Checklist

Complete this workflow:

- [ ] Import collection into Postman
- [ ] Start backend server (`cd backend && npm start`)
- [ ] Test: Server Status - Should return "Connected"
- [ ] Test: CREATE - Add 3 different todos
- [ ] Test: READ All - Should show all 3 todos
- [ ] Test: READ Single - Use an ID from previous response
- [ ] Test: UPDATE - Mark one todo as completed
- [ ] Test: UPDATE - Change priority to "low"
- [ ] Test: DELETE - Remove one todo
- [ ] Test: READ All - Verify only 2 todos remain

---

## 🎯 Sample Test Scenarios

### Scenario 1: Basic Workflow
1. Create: "Buy groceries" (priority: high)
2. Create: "Study MongoDB" (priority: medium)
3. Get All: See both todos
4. Update: Mark "Buy groceries" as completed
5. Delete: Remove "Study MongoDB"

### Scenario 2: Error Testing
1. Try CREATE without title → Should get 400 error
2. Try GET with invalid ID → Should get 404 error
3. Try UPDATE non-existent todo → Should get 404 error

### Scenario 3: Data Validation
1. Create todo with all fields
2. Verify `createdAt` and `updatedAt` timestamps
3. Update todo
4. Verify `updatedAt` changed but `createdAt` stayed same

---

## 🔧 Troubleshooting

**Server not responding?**
- Check if server is running: `netstat -ano | findstr :5000`
- Restart server: Stop it (Ctrl+C) and run `npm start` again

**"ECONNREFUSED" error?**
- Make sure you're using `http://` not `https://`
- Verify port 5000 in URL matches server port

**MongoDB not connected?**
- Check `.env` file in backend folder
- Verify MongoDB URI is correct
- Check server console for MongoDB connection message

**Can't find the ID?**
- Run GET all todos request
- Look for `"_id"` field in response
- Copy the entire ID string (24 characters)

---

## 📚 Need More Help?

See detailed documentation:
- `POSTMAN_TESTING_GUIDE.md` - Complete API reference
- `API_TESTING.md` - PowerShell/cURL examples

