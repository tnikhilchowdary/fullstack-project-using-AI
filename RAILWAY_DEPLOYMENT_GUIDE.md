# 🚂 Railway Deployment Guide - MERN Todo App

This guide will help you deploy your MERN stack application to Railway (Backend) and Vercel (Frontend).

## 📋 Deployment Stack

- **Frontend**: Vercel (Free)
- **Backend**: Railway (Free - $5 credit/month)
- **Database**: MongoDB Atlas (Already Set Up ✅)

---

## 🎯 Why Railway?

✅ **Easy Setup** - One-click deployment  
✅ **Free Credits** - $5/month free (enough for hobby projects)  
✅ **No Sleep** - Unlike Render, your app stays awake  
✅ **Fast Deployments** - Deploys in seconds  
✅ **Great DX** - Excellent developer experience  
✅ **WebSockets** - Full support for Socket.io  

---

## 📦 Part 1: Deploy Backend to Railway

### Step 1: Sign Up for Railway

1. Go to [https://railway.app](https://railway.app)
2. Click **"Login"**
3. Sign up with **GitHub** (Recommended)
4. You'll get **$5 free credits/month** (no credit card required initially)

### Step 2: Create New Project

1. Click **"New Project"**
2. Select **"Deploy from GitHub repo"**
3. If this is your first time:
   - Click **"Configure GitHub App"**
   - Select your repository
   - Give Railway access
4. Select your repository: **project-app-assignment**

### Step 3: Configure Backend Service

1. Railway will detect your project structure
2. Click **"Add variables"** or go to **Variables** tab
3. Add the following environment variables:

```env
MONGODB_URI=mongodb+srv://tnc:tnc%401234@cluster0.issjpdv.mongodb.net/tnc-project?retryWrites=true&w=majority&appName=Cluster0
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production-12345
PORT=5000
NODE_ENV=production
```

4. Go to **Settings** tab
5. Configure:
   - **Root Directory**: `backend`
   - **Start Command**: `npm start`
   - **Build Command**: `npm install` (auto-detected)

### Step 4: Deploy Backend

1. Click **"Deploy"** (or it may auto-deploy)
2. Wait for deployment (usually 1-2 minutes)
3. Once deployed, go to **Settings** → **Networking**
4. Click **"Generate Domain"**
5. Copy your backend URL: `https://your-app-name.up.railway.app`

### Step 5: Update FRONTEND_URL

1. Go back to **Variables** tab
2. Add new variable:
```env
FRONTEND_URL=https://your-app-name.vercel.app
```
(We'll update this after deploying frontend)

### Step 6: Test Your Backend

Open your Railway URL in browser: `https://your-app-name.up.railway.app`

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

### Step 1: Prepare Frontend

Your frontend is already configured with `process.env.REACT_APP_API_URL`! ✅

### Step 2: Deploy on Vercel

1. Go to [https://vercel.com](https://vercel.com)
2. Sign up/Login with **GitHub**
3. Click **"Add New"** → **"Project"**
4. Import your GitHub repository: **project-app-assignment**

### Step 3: Configure Vercel Project

```
Framework Preset: Create React App
Root Directory: frontend
Build Command: npm run build
Output Directory: build
Install Command: npm install
```

### Step 4: Add Environment Variables

Click **"Environment Variables"** and add:

```env
REACT_APP_API_URL=https://your-app-name.up.railway.app
```

Replace `your-app-name.up.railway.app` with your actual Railway domain.

### Step 5: Deploy Frontend

1. Click **"Deploy"**
2. Wait 2-5 minutes
3. Copy your Vercel URL: `https://your-app-name.vercel.app`

### Step 6: Update Backend FRONTEND_URL

1. Go back to **Railway Dashboard**
2. Select your project
3. Go to **Variables** tab
4. Update `FRONTEND_URL`:
```env
FRONTEND_URL=https://your-app-name.vercel.app
```
5. Save (Railway will auto-redeploy)

---

## 🔐 Part 3: Create Admin User

### Option 1: Using Railway Shell (Recommended)

1. Go to Railway Dashboard
2. Select your backend service
3. Click on **"..." menu** → **"Shell"** or **"Service"** → **"Shell"**
4. Run:
```bash
cd backend
node createAdmin.js
```

### Option 2: Using MongoDB Atlas

1. Go to MongoDB Atlas → Collections
2. Find `tnc-project` database → `users` collection
3. Create a new document:
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

This creates admin with password: `Admin@1234`

---

## 🧪 Part 4: Test Your Deployed App

### 1. Test Frontend
Visit: `https://your-app-name.vercel.app`
- ✅ Login page loads
- ✅ Styling works

### 2. Test Login
- **Email**: `admin@gmail.com`
- **Password**: `Admin@1234`

### 3. Test All Features
- ✅ Dashboard loads
- ✅ Add Todo works
- ✅ View Tasks works
- ✅ Analytics works
- ✅ Team Chat (Socket.io) works
- ✅ Admin Panel works

---

## 🐛 Troubleshooting

### Backend Not Connecting to MongoDB

**Error**: `MongoDB Connection Error`

**Fix**:
1. Go to MongoDB Atlas → Network Access
2. Click **"Add IP Address"**
3. Select **"Allow Access from Anywhere"** (0.0.0.0/0)
4. Save

### CORS Errors

**Error**: `Access-Control-Allow-Origin error`

**Fix**:
1. Check `FRONTEND_URL` in Railway variables
2. Make sure it matches your Vercel URL exactly
3. No trailing slash: ✅ `https://app.vercel.app` ❌ `https://app.vercel.app/`
4. Redeploy backend

### Frontend Can't Reach Backend

**Error**: `Failed to fetch` or `Network Error`

**Fix**:
1. Check `REACT_APP_API_URL` in Vercel
2. Make sure it matches your Railway URL
3. Check Railway logs for errors (Dashboard → Logs)
4. Verify backend is running (visit Railway URL)

### Socket.io Not Working

**Error**: WebSocket connection failed

**Fix**:
1. Railway fully supports WebSockets ✅
2. Check browser console for errors
3. Verify `FRONTEND_URL` is set correctly in Railway
4. Check that Socket.io is connecting to correct backend URL

### Build Failed on Railway

**Error**: Build command failed

**Fix**:
1. Check Railway logs
2. Verify `package.json` has all dependencies
3. Make sure Root Directory is set to `backend`
4. Try manual redeploy

---

## 📊 Monitoring & Logs

### Railway Logs

1. Go to Railway Dashboard
2. Select your service
3. Click **"Deployments"** → Select latest deployment
4. View **real-time logs**

### Vercel Logs

1. Go to Vercel Dashboard
2. Select your project
3. Click **"Deployments"** → Select deployment
4. Click **"View Function Logs"**

---

## 🔐 Environment Variables Summary

### Backend (Railway)

```env
MONGODB_URI=mongodb+srv://tnc:tnc%401234@cluster0.issjpdv.mongodb.net/tnc-project?retryWrites=true&w=majority&appName=Cluster0
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production-12345
PORT=5000
NODE_ENV=production
FRONTEND_URL=https://your-app-name.vercel.app
```

### Frontend (Vercel)

```env
REACT_APP_API_URL=https://your-app-name.up.railway.app
```

---

## 🚀 Quick Deployment Checklist

### Before Deploying:

- [ ] GitHub repository exists
- [ ] Code pushed to GitHub
- [ ] .env files in .gitignore
- [ ] MongoDB Atlas allows 0.0.0.0/0

### Deploy Backend (Railway):

- [ ] Created Railway account
- [ ] Created new project from GitHub
- [ ] Set root directory to `backend`
- [ ] Added environment variables
- [ ] Generated domain
- [ ] Deployment successful
- [ ] Backend URL works

### Deploy Frontend (Vercel):

- [ ] Created Vercel account
- [ ] Imported GitHub repository
- [ ] Set root directory to `frontend`
- [ ] Added `REACT_APP_API_URL`
- [ ] Deployment successful
- [ ] Frontend URL works

### Final Steps:

- [ ] Updated `FRONTEND_URL` in Railway
- [ ] Created admin user
- [ ] Tested login
- [ ] Tested all features
- [ ] Socket.io working

---

## 💡 Railway Free Tier Details

### What You Get:

- **$5 free credits/month** (enough for small apps)
- **No sleeping** - Your app stays awake 24/7
- **512 MB RAM** - Sufficient for MERN apps
- **1 GB Disk** - Good for logs and temp files
- **Unlimited deployments**
- **WebSocket support** ✅
- **Custom domains** ✅

### Monitoring Usage:

1. Go to Railway Dashboard
2. Click **"Usage"** in sidebar
3. See current month's usage
4. Get alerts when approaching limit

### After Free Credits:

If you exceed $5/month:
- Add payment method
- Only pay for what you use
- Usually $1-3/month for hobby projects

---

## 🔄 Updating Your Deployed App

### Auto-Deploy on Git Push:

Railway and Vercel both support **auto-deployment**!

```bash
# Make changes to your code
git add .
git commit -m "Update feature"
git push origin main

# Both Railway and Vercel will auto-deploy! 🎉
```

### Manual Redeploy:

**Railway:**
1. Go to Dashboard → Deployments
2. Click **"..." menu** → **"Redeploy"**

**Vercel:**
1. Go to Dashboard → Deployments
2. Click **"..." menu** → **"Redeploy"**

---

## 🎯 Railway vs Render Comparison

| Feature | Railway | Render |
|---------|---------|--------|
| Free Tier | $5 credit/month | 750 hours/month |
| Sleep Policy | **Never sleeps** ✅ | Sleeps after 15 min |
| Wake-up Time | **N/A** | ~30-60 seconds |
| Deployment Speed | **Very Fast** ✅ | Medium |
| WebSockets | **Full Support** ✅ | Supported |
| DX | **Excellent** ✅ | Good |
| Logs | **Real-time** ✅ | Real-time |

**Winner**: Railway for better performance and no sleep issues! 🚂

---

## 📧 Useful Railway Commands

### View Logs:
```bash
# Install Railway CLI
npm i -g @railway/cli

# Login
railway login

# Link to project
railway link

# View logs
railway logs

# Deploy manually
railway up
```

---

## 🎊 Success Checklist

After deployment, verify:

- [ ] ✅ Frontend loads at Vercel URL
- [ ] ✅ Backend responds at Railway URL
- [ ] ✅ Login works
- [ ] ✅ Can create todos
- [ ] ✅ Can view tasks
- [ ] ✅ Analytics display data
- [ ] ✅ Team chat (Socket.io) works
- [ ] ✅ Admin panel accessible
- [ ] ✅ No CORS errors
- [ ] ✅ No console errors

---

## 🎉 Congratulations!

Your MERN Todo App is now live on Railway + Vercel! 🚀

**Your URLs:**
- 🎨 Frontend: `https://your-app-name.vercel.app`
- 🚂 Backend: `https://your-app-name.up.railway.app`

**Login Credentials:**
- 📧 Email: `admin@gmail.com`
- 🔑 Password: `Admin@1234`

---

## 📚 Additional Resources

- [Railway Docs](https://docs.railway.app)
- [Vercel Docs](https://vercel.com/docs)
- [MongoDB Atlas Docs](https://docs.atlas.mongodb.com)

---

## 💬 Need Help?

1. Check Railway logs (real-time)
2. Check Vercel deployment logs
3. Verify environment variables
4. Check MongoDB IP whitelist
5. Test backend endpoint directly

---

**Happy Deploying! 🚂✨**

