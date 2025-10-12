# 🚂 Railway Deployment - Quick Start Guide

## 📋 Prerequisites

- GitHub account with your code pushed
- MongoDB Atlas database (already set up ✅)
- Railway account (free $5/month)
- Vercel account (free)

---

## 🚀 Step-by-Step Deployment

### Part 1: Deploy Backend to Railway (10 minutes)

#### 1️⃣ Sign Up & Create Project

1. Go to **https://railway.app**
2. Click **"Start a New Project"**
3. Select **"Deploy from GitHub repo"**
4. Authorize Railway to access your GitHub
5. Select repository: **project-app-assignment**

#### 2️⃣ Configure Service

Railway will detect your monorepo. Configure it:

1. **Service Name**: `backend` (or any name you prefer)
2. Click on the service card
3. Go to **Settings** tab:
   - **Root Directory**: `backend`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`

#### 3️⃣ Add Environment Variables

Click **"Variables"** tab and add:

| Variable | Value |
|----------|-------|
| `MONGODB_URI` | `mongodb+srv://tnc:tnc%401234@cluster0.issjpdv.mongodb.net/tnc-project?retryWrites=true&w=majority&appName=Cluster0` |
| `JWT_SECRET` | `your-super-secret-jwt-key-change-this-in-production-12345` |
| `PORT` | `5000` |
| `NODE_ENV` | `production` |
| `FRONTEND_URL` | `https://localhost:3000` (update later) |

Click **"Add"** for each variable.

#### 4️⃣ Generate Domain

1. Go to **Settings** → **Networking**
2. Click **"Generate Domain"**
3. Copy your URL: `https://xxxxxxx.up.railway.app`
4. **Save this URL** - you'll need it!

#### 5️⃣ Test Backend

Open: `https://your-railway-url.up.railway.app`

Expected response:
```json
{
  "message": "Welcome to MERN Todo API with Authentication!",
  "status": "Server is running successfully",
  "database": "Connected"
}
```

✅ **Backend deployed successfully!**

---

### Part 2: Deploy Frontend to Vercel (5 minutes)

#### 1️⃣ Sign Up & Create Project

1. Go to **https://vercel.com**
2. Sign up with **GitHub**
3. Click **"Add New Project"**
4. Select repository: **project-app-assignment**

#### 2️⃣ Configure Project

```
Framework Preset: Create React App
Root Directory: frontend
Build Command: npm run build
Output Directory: build
Install Command: npm install
```

#### 3️⃣ Add Environment Variable

Click **"Environment Variables"**:

| Variable | Value |
|----------|-------|
| `REACT_APP_API_URL` | Your Railway URL (e.g., `https://xxxxxxx.up.railway.app`) |

**Important**: Use your actual Railway URL from Part 1, Step 4!

#### 4️⃣ Deploy

1. Click **"Deploy"**
2. Wait 2-5 minutes
3. Copy your Vercel URL: `https://xxxxxxx.vercel.app`

✅ **Frontend deployed successfully!**

---

### Part 3: Connect Frontend & Backend (2 minutes)

#### Update Railway's FRONTEND_URL

1. Go back to **Railway Dashboard**
2. Select your backend service
3. Click **"Variables"** tab
4. Update `FRONTEND_URL`:
   - **Delete old value**: `https://localhost:3000`
   - **New value**: Your Vercel URL (e.g., `https://xxxxxxx.vercel.app`)
5. Click **"Save"**
6. Railway will **auto-redeploy** (wait 1-2 minutes)

✅ **Frontend and Backend are connected!**

---

### Part 4: Create Admin User (3 minutes)

#### Option A: Using Railway CLI (Recommended)

```bash
# Install Railway CLI
npm install -g @railway/cli

# Login
railway login

# Link to your project
railway link

# Open shell
railway run node createAdmin.js
```

#### Option B: Using MongoDB Atlas

1. Go to **MongoDB Atlas** → **Database** → **Collections**
2. Select database: `tnc-project`
3. Select collection: `users`
4. Click **"Insert Document"**
5. Paste this JSON:

```json
{
  "name": "Admin",
  "email": "admin@gmail.com",
  "password": "$2a$10$8K1p/s4d5VrqEtKnY9pRAeJxGp9B7bqVYrHmLcqxJq5yPWqF1YjHe",
  "isAdmin": true,
  "theme": "dark",
  "createdAt": {"$date": "2024-01-01T00:00:00.000Z"},
  "updatedAt": {"$date": "2024-01-01T00:00:00.000Z"}
}
```

6. Click **"Insert"**

**Default Admin Credentials:**
- Email: `admin@gmail.com`
- Password: `Admin@1234`

✅ **Admin user created!**

---

### Part 5: Test Your App (5 minutes)

#### 1️⃣ Visit Your App

Open your Vercel URL: `https://your-app.vercel.app`

#### 2️⃣ Test Login

- Email: `admin@gmail.com`
- Password: `Admin@1234`

#### 3️⃣ Test Features

- [ ] ✅ Dashboard loads
- [ ] ✅ Create a todo
- [ ] ✅ View tasks
- [ ] ✅ Check analytics
- [ ] ✅ Open team chat
- [ ] ✅ Send a message (Socket.io)
- [ ] ✅ Access admin panel

#### 4️⃣ Check Browser Console

Press **F12** → **Console** tab:
- ❌ No CORS errors
- ❌ No connection errors
- ✅ Socket.io connected
- ✅ API calls working

---

## 🐛 Quick Troubleshooting

### Problem: "Network Error" when logging in

**Fix:**
1. Check `REACT_APP_API_URL` in Vercel
2. Make sure it matches your Railway URL exactly
3. Redeploy frontend on Vercel

### Problem: CORS Error

**Fix:**
1. Check `FRONTEND_URL` in Railway
2. Make sure it matches your Vercel URL exactly
3. No trailing slash!
4. Redeploy backend on Railway

### Problem: MongoDB Connection Error

**Fix:**
1. Go to MongoDB Atlas → Network Access
2. Add IP: `0.0.0.0/0` (Allow from anywhere)
3. Wait 1-2 minutes
4. Redeploy on Railway

### Problem: Socket.io not connecting

**Fix:**
1. Check browser console for WebSocket errors
2. Verify Railway URL is correct in frontend Socket.io connection
3. Check Railway logs for Socket.io messages
4. Ensure CORS is configured correctly

---

## 📝 Your Deployment URLs

**Fill these in after deployment:**

```
Backend (Railway):  https://_________________.up.railway.app
Frontend (Vercel):  https://_________________.vercel.app

Admin Email:     admin@gmail.com
Admin Password:  Admin@1234
```

---

## 🎉 You're Done!

Total Time: **~25 minutes**

Your MERN Todo App is now live on Railway + Vercel! 🚀

### Share Your App:
- Send the Vercel URL to anyone
- They can sign up and start using it
- Admin panel only accessible by admin users

### Next Steps:
- Add custom domain (optional)
- Set up monitoring
- Add more features
- Share with friends! 🎊

---

**Need help?** Check the full guide: `RAILWAY_DEPLOYMENT_GUIDE.md`

