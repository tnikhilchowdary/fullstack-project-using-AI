# 📝 MERN Todo App - Complete Project

A full-stack task management application with authentication, real-time chat, analytics, and admin panel.

![MERN Stack](https://img.shields.io/badge/MERN-Stack-green)
![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-green)
![Express](https://img.shields.io/badge/Express-4.x-blue)
![React](https://img.shields.io/badge/React-19.x-blue)
![Node](https://img.shields.io/badge/Node-22.x-green)

---

## 🚀 Features

### ✨ Core Features
- ✅ **User Authentication** - JWT-based secure login/signup
- ✅ **Todo Management** - Create, read, update, delete tasks
- ✅ **Priority Levels** - High, Medium, Low priorities
- ✅ **Due Dates** - Set and track task deadlines
- ✅ **Task Categories** - Organize tasks by category
- ✅ **Status Tracking** - Mark tasks as complete/incomplete

### 📊 Advanced Features
- ✅ **Analytics Dashboard** - Visual charts and statistics
- ✅ **Real-time Team Chat** - Socket.io powered messaging
- ✅ **Admin Panel** - System-wide user and task management
- ✅ **Dark/Light Theme** - Toggle between themes
- ✅ **Calendar View** - Interactive task calendar
- ✅ **Task Filtering** - Filter by status, priority, category

### 🎨 UI/UX
- 📱 Fully Responsive Design
- 🌙 Dark Mode Support
- 🎯 Modern Gradient UI
- ⚡ Smooth Animations
- 🔔 Toast Notifications

---

## 🛠️ Tech Stack

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB Atlas** - Cloud database
- **Mongoose** - ODM
- **JWT** - Authentication
- **Socket.io** - Real-time communication
- **bcryptjs** - Password hashing

### Frontend
- **React 19** - UI library
- **React Router** - Navigation
- **Axios** - HTTP client
- **Socket.io Client** - Real-time features
- **Recharts** - Data visualization
- **React Calendar** - Calendar component

---

## 📦 Project Structure

```
project-app-assignment/
├── backend/
│   ├── controllers/         # Business logic
│   │   ├── authController.js
│   │   ├── todoController.js
│   │   ├── chatController.js
│   │   └── adminController.js
│   ├── models/              # Database schemas
│   │   ├── User.js
│   │   ├── Todo.js
│   │   └── Message.js
│   ├── routes/              # API endpoints
│   │   ├── authRoutes.js
│   │   ├── todoRoutes.js
│   │   ├── chatRoutes.js
│   │   └── adminRoutes.js
│   ├── middleware/          # Auth & validation
│   │   ├── auth.js
│   │   └── adminAuth.js
│   ├── server.js            # Express server
│   ├── createAdmin.js       # Admin creation script
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── components/      # Reusable components
│   │   │   ├── Navbar.js
│   │   │   ├── TopBar.js
│   │   │   ├── AddTodo.js
│   │   │   ├── ViewTasks.js
│   │   │   ├── Analytics.js
│   │   │   └── DashboardHome.js
│   │   ├── pages/           # Page components
│   │   │   ├── Login.js
│   │   │   ├── Signup.js
│   │   │   ├── Dashboard.js
│   │   │   ├── Chat.js
│   │   │   └── AdminDashboard.js
│   │   ├── context/         # State management
│   │   │   ├── AuthContext.js
│   │   │   ├── TodoContext.js
│   │   │   └── ThemeContext.js
│   │   ├── services/        # API services
│   │   │   └── api.js
│   │   ├── styles/          # CSS files
│   │   ├── App.js
│   │   └── index.js
│   └── package.json
│
├── DEPLOYMENT_GUIDE.md      # Full deployment guide
├── DEPLOY_QUICK_START.md    # Quick start guide
├── ENV_SETUP.md             # Environment setup
└── README.md
```

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ installed
- MongoDB Atlas account
- Git installed

### 1. Clone Repository

```bash
git clone https://github.com/YOUR_USERNAME/YOUR_REPO.git
cd project-app-assignment
```

### 2. Backend Setup

```bash
cd backend
npm install
```

Create `.env` file:
```env
MONGODB_URI=mongodb+srv://tnc:tnc%401234@cluster0.issjpdv.mongodb.net/tnc-project?retryWrites=true&w=majority&appName=Cluster0
JWT_SECRET=your-super-secret-jwt-key-12345
PORT=5000
FRONTEND_URL=http://localhost:3000
```

Start backend:
```bash
npm run dev
```

Create admin user:
```bash
node createAdmin.js
```

### 3. Frontend Setup

```bash
cd ../frontend
npm install
npm start
```

### 4. Access Application

- Frontend: http://localhost:3000
- Backend: http://localhost:5000

**Login Credentials:**
- Email: `admin@gmail.com`
- Password: `Admin@1234`

---

## 📡 API Endpoints

### Authentication
```
POST   /api/auth/register    - Register new user
POST   /api/auth/login       - Login user
GET    /api/auth/profile     - Get user profile (Protected)
PUT    /api/auth/theme       - Update theme preference (Protected)
```

### Todos
```
GET    /api/todos            - Get all user todos (Protected)
GET    /api/todos/:id        - Get single todo (Protected)
POST   /api/todos            - Create new todo (Protected)
PUT    /api/todos/:id        - Update todo (Protected)
DELETE /api/todos/:id        - Delete todo (Protected)
```

### Chat
```
GET    /api/chat/messages    - Get chat messages (Protected)
POST   /api/chat/messages    - Send message (Protected)
```

### Admin (Admin Only)
```
GET    /api/admin/stats      - Get system statistics
GET    /api/admin/users      - Get all users
GET    /api/admin/todos      - Get all todos
GET    /api/admin/messages   - Get all messages
DELETE /api/admin/users/:id  - Delete user
```

---

## 🎨 Features Breakdown

### User Authentication
- Secure JWT-based authentication
- Password hashing with bcrypt
- Protected routes
- Persistent login sessions
- Theme preference per user

### Task Management
- **Create**: Add new tasks with title, description, priority, category, due date
- **Read**: View all tasks in list or calendar view
- **Update**: Edit task details, mark as complete
- **Delete**: Remove tasks
- **Filter**: By status, priority, category
- **Sort**: By date, priority, status

### Analytics Dashboard
- Total tasks count
- Completion rate
- Priority distribution (pie chart)
- Category distribution (bar chart)
- Recent tasks timeline
- Productivity metrics

### Real-time Team Chat
- Socket.io powered messaging
- User presence indicators
- Typing indicators
- Message history
- Room-based chats

### Admin Panel
- **Overview**: System statistics, activity feed
- **Users**: View, manage, delete users
- **Tasks**: See all tasks from all users
- **Messages**: Monitor all chat messages
- Protected routes (admin only)

---

## 🌐 Deployment

### Quick Deploy (Free Tier)

**Backend**: Render.com
**Frontend**: Vercel
**Database**: MongoDB Atlas

See detailed guides:
- [Complete Deployment Guide](./DEPLOYMENT_GUIDE.md)
- [Quick Start Deployment](./DEPLOY_QUICK_START.md)
- [Deployment Checklist](./DEPLOYMENT_CHECKLIST.md)

---

## 🔐 Security Features

- ✅ JWT token authentication
- ✅ Password hashing (bcrypt)
- ✅ Protected API routes
- ✅ CORS configuration
- ✅ Input validation
- ✅ XSS protection
- ✅ MongoDB injection prevention
- ✅ Environment variable usage

---

## 📱 Screenshots

### Dashboard
- Modern gradient UI
- Task statistics
- Quick actions

### Task Management
- List view with filters
- Calendar integration
- Priority indicators

### Analytics
- Beautiful charts
- Productivity metrics
- Task insights

### Team Chat
- Real-time messaging
- Clean interface
- User presence

### Admin Panel
- System overview
- User management
- Complete control

---

## 🧪 Testing

### Test User Accounts

**Admin:**
- Email: `admin@gmail.com`
- Password: `Admin@1234`

**Regular User:** (Create via signup)
- Use any email
- Minimum 6 character password

---

## 🔄 Development

### Run Development Servers

**Backend** (with auto-reload):
```bash
cd backend
npm run dev
```

**Frontend** (with hot reload):
```bash
cd frontend
npm start
```

### Build for Production

**Frontend**:
```bash
cd frontend
npm run build
```

---

## 📝 Environment Variables

See [ENV_SETUP.md](./ENV_SETUP.md) for complete environment variable documentation.

---

## 🐛 Troubleshooting

### MongoDB Connection Issues
- Check if IP is whitelisted in MongoDB Atlas
- Verify connection string is correct
- Ensure password is URL-encoded

### CORS Errors
- Check `FRONTEND_URL` in backend `.env`
- Verify frontend URL matches

### Socket.io Not Connecting
- Ensure both servers are running
- Check browser console for errors
- Verify CORS settings

---

## 📚 Documentation

- [Deployment Guide](./DEPLOYMENT_GUIDE.md) - Full deployment instructions
- [Quick Start](./DEPLOY_QUICK_START.md) - Fast deployment guide
- [Environment Setup](./ENV_SETUP.md) - Environment variables
- [Deployment Checklist](./DEPLOYMENT_CHECKLIST.md) - Pre-launch checklist
- [Admin Panel Guide](./ADMIN_PANEL_GUIDE.md) - Admin features
- [Authentication Guide](./AUTHENTICATION_GUIDE.md) - Auth system

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

---

## 📄 License

This project is open source and available under the MIT License.

---

## 🎉 Acknowledgments

- MongoDB Atlas for cloud database
- Render for backend hosting
- Vercel for frontend hosting
- React team for amazing framework
- Socket.io for real-time features

---

## 📞 Support

For issues or questions:
- Check existing documentation
- Review troubleshooting section
- Create an issue on GitHub

---

## 🚀 What's Next?

Future enhancements:
- [ ] Email notifications
- [ ] Task collaboration
- [ ] File attachments
- [ ] Advanced analytics
- [ ] Mobile app
- [ ] Task templates
- [ ] Export/Import features
- [ ] Task reminders
- [ ] Multi-language support

---

## 🌟 Star this repo if you find it helpful!

**Made with ❤️ using MERN Stack**

