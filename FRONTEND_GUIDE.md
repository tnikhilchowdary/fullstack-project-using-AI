# 🎨 Frontend Setup Guide

## ✅ What's Included

Your React frontend is fully set up with:
- ✅ React 19 with modern hooks (useState, useEffect)
- ✅ Axios for API requests
- ✅ Proxy configuration to backend (port 5000)
- ✅ Beautiful, responsive UI design
- ✅ Full CRUD operations UI

## 📁 Frontend Structure

```
frontend/
├── src/
│   ├── services/
│   │   └── api.js          # API service for backend calls
│   ├── App.js              # Main application component
│   ├── App.css             # Styling
│   ├── index.js            # Entry point
│   └── ...
├── public/
├── package.json            # Dependencies & proxy config
└── README.md
```

## 🚀 Running the Frontend

### Option 1: Quick Start

```bash
cd frontend
npm start
```

The app will automatically open at `http://localhost:3000`

### Option 2: Run Full Stack

**Terminal 1 - Backend:**
```bash
cd backend
npm start
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm start
```

## 🎯 Features

### 1. **Add Todo**
- Enter title (required)
- Add description (optional)
- Select priority: Low, Medium, or High
- Click "Add Todo" button

### 2. **View Todos**
- See all todos in a beautiful card layout
- Color-coded by priority:
  - 🔴 Red border = High priority
  - 🟡 Yellow border = Medium priority
  - 🟢 Green border = Low priority
- Shows creation date
- Displays completion status

### 3. **Complete/Undo Todo**
- Click "✓ Complete" to mark as done
- Click "↩️ Undo" to mark as incomplete
- Completed todos appear faded

### 4. **Delete Todo**
- Click "🗑️ Delete" button
- Confirms before deleting
- Removes from database

## 🎨 UI Features

### Design Highlights
- **Gradient Background**: Purple gradient for modern look
- **Card Design**: Clean white cards with shadows
- **Responsive**: Works on mobile, tablet, and desktop
- **Smooth Animations**: Hover effects and transitions
- **Priority Colors**: Visual indicators for task importance

### Color Scheme
- Primary: Purple (#667eea)
- Success: Green (#28a745)
- Danger: Red (#dc3545)
- Secondary: Gray (#6c757d)

## 🔌 API Integration

The frontend connects to your backend using:

### Proxy Configuration
In `package.json`:
```json
"proxy": "http://localhost:5000"
```

This allows API calls like `/api/todos` to automatically route to `http://localhost:5000/api/todos`

### API Service (`src/services/api.js`)
All backend communication happens through this service:

```javascript
import { getTodos, createTodo, updateTodo, deleteTodo } from './services/api';
```

## 📱 How to Use the App

1. **Start Both Servers**
   - Backend: `cd backend && npm start`
   - Frontend: `cd frontend && npm start`

2. **Open Browser**
   - Go to `http://localhost:3000`

3. **Create Your First Todo**
   - Fill in the form
   - Click "Add Todo"
   - See it appear in the list

4. **Manage Todos**
   - Complete tasks with the Complete button
   - Delete unwanted tasks
   - All changes sync with MongoDB

## 🛠️ Customization

### Change Colors
Edit `src/App.css`:
```css
/* Change primary color */
.btn-primary {
  background: #667eea;  /* Change this */
}
```

### Add New Features
Edit `src/App.js`:
```javascript
// Add new state
const [filter, setFilter] = useState('all');

// Add filter functionality
const filteredTodos = todos.filter(todo => {
  if (filter === 'completed') return todo.completed;
  if (filter === 'active') return !todo.completed;
  return true;
});
```

### Modify Form
Add new fields to the form in `src/App.js`:
```javascript
const [formData, setFormData] = useState({
  title: '',
  description: '',
  priority: 'medium',
  dueDate: '',  // Add new field
});
```

## 🐛 Troubleshooting

### Frontend won't connect to Backend
- ✅ Make sure backend is running on port 5000
- ✅ Check proxy in `package.json` is `"http://localhost:5000"`
- ✅ Restart frontend after changing proxy

### Port 3000 already in use
```bash
# Kill process on port 3000
netstat -ano | findstr :3000
# Note the PID and kill it
taskkill /PID <PID> /F
```

### API errors in console
- ✅ Check backend is running
- ✅ Open `http://localhost:5000/api/todos` in browser
- ✅ Should see JSON response

### Changes not appearing
- ✅ Hard refresh: Ctrl + Shift + R (Windows)
- ✅ Clear cache and reload
- ✅ Restart development server

## 🚀 Next Steps

### Enhancements You Can Add:

1. **Search & Filter**
   - Search by title
   - Filter by priority
   - Filter by completion status

2. **Edit Todo**
   - Add edit button
   - Inline editing
   - Update API call

3. **Due Dates**
   - Add date picker
   - Show overdue tasks
   - Sort by due date

4. **Categories/Tags**
   - Add categories
   - Tag filtering
   - Color coding

5. **User Authentication**
   - Login/Register
   - User-specific todos
   - JWT tokens

## 📚 Resources

- [React Documentation](https://react.dev/)
- [Axios Documentation](https://axios-http.com/)
- [CSS Tricks](https://css-tricks.com/)
- [MDN Web Docs](https://developer.mozilla.org/)

## ✨ Enjoy Your MERN Todo App!

Your full-stack application is ready! The frontend and backend are working together seamlessly. 🎉

