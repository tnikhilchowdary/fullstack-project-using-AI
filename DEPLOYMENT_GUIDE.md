# 🚀 Complete Deployment Guide - MERN Todo App

This guide will help you deploy your MERN stack application to the cloud using **free tiers**.

## 📋 Deployment Stack

- **Frontend**: Vercel (Free)
- **Backend**: Render (Free)
- **Database**: MongoDB Atlas (Already Set Up ✅)

---

## 🎯 Pre-Deployment Checklist

✅ MongoDB Atlas database is set up and working  
✅ Backend and frontend work locally  
✅ All dependencies are in package.json  
✅ .env files are in .gitignore  

---

## 📦 Part 1: Deploy Backend to Render

### Step 1: Prepare Your Backend

1. **Make sure your `.env` file is NOT committed to git**
2. **Your backend is ready** - all environment variables will be set on Render

### Step 2: Create GitHub Repository (If Not Already)

```bash
# In your project root
git init
git add .
git commit -m "Initial commit - Ready for deployment"

# Create a new repository on GitHub, then:
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
git branch -M main
git push -u origin main
```

### Step 3: Deploy on Render

1. **Go to** [https://render.com](https://render.com)
2. **Sign up/Login** with GitHub
3. **Click** "New +" → "Web Service"
4. **Connect your GitHub repository**
5. **Configure the service:**

```
Name: todo-app-backend
Region: Choose closest to you
Branch: main
Root Directory: backend
Runtime: Node
Build Command: npm install
Start Command: npm start
Instance Type: Free
```

6. **Add Environment Variables** (Click "Advanced" → "Add Environment Variable"):

```
MONGODB_URI = mongodb+srv://tnc:tnc%401234@cluster0.issjpdv.mongodb.net/tnc-project?retryWrites=true&w=majority&appName=Cluster0

JWT_SECRET = your-super-secret-jwt-key-change-this-in-production-12345

PORT = 5000

FRONTEND_URL = https://your-app-name.vercel.app
(Update this after deploying frontend)
```

7. **Click "Create Web Service"**
8. **Wait for deployment** (5-10 minutes)
9. **Copy your backend URL** (e.g., `https://todo-app-backend.onrender.com`)

### Step 4: Test Your Backend

Open: `https://your-backend-url.onrender.com`

You should see:
```json
{
  "message": "Welcome to MERN Todo API with Authentication!",
  "status": "Server is running successfully",
  "database": "Connected"
}
```

---

## 🎨 Part 2: Deploy Frontend to Vercel

### Step 1: Update Frontend for Production

Before deploying, your frontend needs to know where the backend is.

**Option A: Use Vercel Environment Variables (Recommended)**

1. Deploy first, then add environment variable in Vercel dashboard

**Option B: Update package.json proxy (Quick)**

In `frontend/package.json`, update:
```json
"proxy": "https://your-backend-url.onrender.com"
```

### Step 2: Deploy on Vercel

1. **Go to** [https://vercel.com](https://vercel.com)
2. **Sign up/Login** with GitHub
3. **Click** "Add New" → "Project"
4. **Import your GitHub repository**
5. **Configure the project:**

```
Framework Preset: Create React App
Root Directory: frontend
Build Command: npm run build
Output Directory: build
Install Command: npm install
```

6. **Add Environment Variables** (if needed):

```
REACT_APP_API_URL = https://your-backend-url.onrender.com
```

7. **Click "Deploy"**
8. **Wait for deployment** (2-5 minutes)
9. **Copy your frontend URL** (e.g., `https://your-app-name.vercel.app`)

### Step 3: Update Backend FRONTEND_URL

1. Go back to **Render Dashboard**
2. Select your **backend service**
3. Click **"Environment"**
4. **Update** `FRONTEND_URL`:
```
FRONTEND_URL = https://your-app-name.vercel.app
```
5. **Save Changes** (This will trigger a redeploy)

---

## 🔄 Part 3: Final Configuration

### Update CORS on Backend

Your backend is already configured to use `process.env.FRONTEND_URL` for CORS! ✅

### Create Admin User on Production

After backend is deployed:

1. **SSH into Render** (from dashboard → "Shell" tab)
2. **Run**:
```bash
node createAdmin.js
```

OR create admin manually in MongoDB Atlas:
1. Go to MongoDB Atlas → Collections
2. Find your database → users collection
3. Create a new document:
```json
{
  "name": "Admin",
  "email": "admin@gmail.com",
  "password": "$2a$10$...", // Use bcrypt to hash "Admin@1234"
  "isAdmin": true,
  "theme": "dark",
  "createdAt": new Date(),
  "updatedAt": new Date()
}
```

---

## 🧪 Part 4: Test Your Deployed App

### 1. Test Frontend

Visit: `https://your-app-name.vercel.app`

- Login page should load ✅
- Styling should work ✅

### 2. Test Login

Use credentials:
- **Email**: `admin@gmail.com`
- **Password**: `Admin@1234`

### 3. Test Features

- ✅ Dashboard loads
- ✅ Add Todo works
- ✅ View Tasks works
- ✅ Analytics works
- ✅ Team Chat works (Socket.io)
- ✅ Admin Panel works (if admin)

---

## 🐛 Troubleshooting

### Backend Not Connecting to MongoDB

**Error**: `MongoDB Connection Error`

**Fix**:
1. Check MongoDB Atlas IP Whitelist
2. Go to MongoDB Atlas → Network Access
3. Add: `0.0.0.0/0` (Allow from anywhere)
4. Or add Render's IP addresses

### CORS Errors

**Error**: `Access-Control-Allow-Origin error`

**Fix**:
1. Make sure `FRONTEND_URL` is set correctly in Render
2. Redeploy backend after updating environment variables

### Frontend Can't Reach Backend

**Error**: `Failed to fetch` or `Network Error`

**Fix**:
1. Check if backend URL is correct in frontend
2. Make sure backend is deployed and running
3. Check Render logs for errors

### Socket.io Not Working

**Error**: WebSocket connection failed

**Fix**:
1. Make sure `FRONTEND_URL` includes your Vercel URL
2. Check browser console for socket errors
3. Render free tier supports WebSockets ✅

---

## 📊 Monitoring & Logs

### Backend Logs (Render)

1. Go to Render Dashboard
2. Select your service
3. Click "Logs" tab
4. See real-time logs

### Frontend Logs (Vercel)

1. Go to Vercel Dashboard
2. Select your project
3. Click "Deployments"
4. Click on any deployment → "View Function Logs"

---

## 🔐 Environment Variables Summary

### Backend (Render)

```env
MONGODB_URI=mongodb+srv://tnc:tnc%401234@cluster0.issjpdv.mongodb.net/tnc-project?retryWrites=true&w=majority&appName=Cluster0
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production-12345
PORT=5000
FRONTEND_URL=https://your-app-name.vercel.app
```

### Frontend (Vercel) - Optional

```env
REACT_APP_API_URL=https://your-backend-url.onrender.com
```

---

## 🚀 Quick Deployment Checklist

### Before Deploying:

- [ ] Git repository created
- [ ] Code pushed to GitHub
- [ ] .env files in .gitignore
- [ ] MongoDB Atlas allows connections (0.0.0.0/0)

### Deploy Backend:

- [ ] Created Render account
- [ ] Created new Web Service
- [ ] Added environment variables
- [ ] Deployment successful
- [ ] Backend URL works
- [ ] Database connected

### Deploy Frontend:

- [ ] Created Vercel account
- [ ] Imported GitHub repository
- [ ] Deployment successful
- [ ] Frontend URL works

### Final Steps:

- [ ] Updated FRONTEND_URL in Render
- [ ] Created admin user in production
- [ ] Tested login
- [ ] Tested all features
- [ ] Socket.io working

---

## 🎉 Success!

Your MERN Todo App is now live and accessible worldwide!

**Your URLs:**
- Frontend: `https://your-app-name.vercel.app`
- Backend: `https://todo-app-backend.onrender.com`

**Login Credentials:**
- Email: `admin@gmail.com`
- Password: `Admin@1234`

---

## 💡 Tips for Free Tier

### Render Free Tier:
- Backend goes to sleep after 15 minutes of inactivity
- First request after sleep takes ~1 minute to wake up
- 750 hours/month free (more than enough)

### Vercel Free Tier:
- 100GB bandwidth/month
- Unlimited deployments
- Auto-deployments on git push

### Keep Backend Awake:
Use a service like **UptimeRobot** or **Cron-job.org** to ping your backend every 10 minutes:

```
Ping URL: https://your-backend-url.onrender.com/api/test
Interval: Every 10 minutes
```

---

## 🔄 Updating Your Deployed App

### Update Backend:

```bash
# Make changes to backend code
git add .
git commit -m "Update backend"
git push

# Render will auto-deploy!
```

### Update Frontend:

```bash
# Make changes to frontend code
git add .
git commit -m "Update frontend"
git push

# Vercel will auto-deploy!
```

---

## 📧 Support

If you encounter issues:

1. **Check Logs**: Render/Vercel dashboards
2. **Check Environment Variables**: Make sure all are set correctly
3. **Check MongoDB**: Ensure IP whitelist includes 0.0.0.0/0
4. **Check CORS**: Ensure FRONTEND_URL matches your Vercel URL

---

## 🎊 Congratulations!

You've successfully deployed a full-stack MERN application! 🚀

**Share your app with the world! 🌍**

