# 🎯 Railway Deployment - Complete Step-by-Step Guide

Follow these steps **exactly** for a successful deployment! 🚀

---

## 📌 Before You Start

**You'll Need:**
1. GitHub account (with your code pushed)
2. Railway account (sign up at https://railway.app)
3. Vercel account (sign up at https://vercel.com)
4. MongoDB Atlas (already configured ✅)

**Time Required:** 20-30 minutes

---

## 🚂 PART 1: BACKEND DEPLOYMENT (Railway)

### 📍 Step 1: Push Code to GitHub

```bash
# If not already pushed
cd c:\Users\tnikh\Desktop\project-app-assignment

# Check status
git status

# Stage all changes
git add .

# Commit
git commit -m "Prepare for Railway deployment"

# Push to GitHub
git push origin main
```

**⏱️ Wait:** Code uploaded (~1 minute)

---

### 📍 Step 2: Sign Up for Railway

1. Open browser → https://railway.app
2. Click **"Login"** (top right)
3. Select **"Login with GitHub"**
4. Authorize Railway access
5. You'll get **$5 free credits/month**!

**✅ Railway account created!**

---

### 📍 Step 3: Create New Project

1. Click **"New Project"** (big button in center)
2. Select **"Deploy from GitHub repo"**
3. If first time:
   - Click **"Configure GitHub App"**
   - Select **"All repositories"** or just your repo
   - Click **"Install & Authorize"**
4. Search for: **project-app-assignment**
5. Click on your repository

**✅ Project created!**

---

### 📍 Step 4: Configure Backend Service

Railway will create a service automatically. Now configure it:

1. Click on the **service card** (shows your repo name)
2. Go to **"Settings"** tab
3. Scroll down to **"Service"** section
4. Set **Root Directory**: `backend`
5. Click **"Save"**

**✅ Root directory configured!**

---

### 📍 Step 5: Add Environment Variables

1. Click **"Variables"** tab
2. Click **"+ New Variable"** (or "RAW Editor" for faster input)
3. Add these variables one by one:

```env
MONGODB_URI=mongodb+srv://tnc:tnc%401234@cluster0.issjpdv.mongodb.net/tnc-project?retryWrites=true&w=majority&appName=Cluster0
```

```env
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production-12345
```

```env
PORT=5000
```

```env
NODE_ENV=production
```

```env
FRONTEND_URL=http://localhost:3000
```
*(We'll update this after deploying frontend)*

4. Click **"Add"** or **"Save"** after each variable

**✅ Environment variables configured!**

---

### 📍 Step 6: Deploy Backend

1. Railway should auto-deploy after saving variables
2. If not, click **"Deploy"** button (top right)
3. Watch the **"Deployments"** tab
4. Wait for build to complete (~2-3 minutes)
5. Look for ✅ **"Success"** status

**✅ Backend deployed!**

---

### 📍 Step 7: Get Backend URL

1. Go to **"Settings"** tab
2. Scroll to **"Networking"** section
3. Click **"Generate Domain"**
4. Railway will create a URL like: `https://xxxxxxx.up.railway.app`
5. **Copy this URL!** You'll need it for frontend

**Test it:**
- Open the URL in browser
- You should see JSON with "Welcome to MERN Todo API"

**✅ Backend URL generated and working!**

---

## 🎨 PART 2: FRONTEND DEPLOYMENT (Vercel)

### 📍 Step 8: Sign Up for Vercel

1. Open browser → https://vercel.com
2. Click **"Sign Up"**
3. Select **"Continue with GitHub"**
4. Authorize Vercel

**✅ Vercel account created!**

---

### 📍 Step 9: Create New Project

1. Click **"Add New..."** → **"Project"**
2. Find your repository: **project-app-assignment**
3. Click **"Import"**

**✅ Project imported!**

---

### 📍 Step 10: Configure Frontend

In the import screen, set:

**Framework Preset:** Create React App *(should auto-detect)*

**Root Directory:** Click **"Edit"** → Select **"frontend"** → Click **"Continue"**

**Build and Output Settings:**
```
Build Command: npm run build
Output Directory: build
Install Command: npm install
```
*(These should be auto-detected)*

**✅ Project configured!**

---

### 📍 Step 11: Add Environment Variable

1. Expand **"Environment Variables"** section
2. Add variable:

**Name:** `REACT_APP_API_URL`

**Value:** Your Railway backend URL
Example: `https://xxxxxxx.up.railway.app`

*(Use the URL from Step 7)*

3. Click **"Add"**

**✅ Environment variable added!**

---

### 📍 Step 12: Deploy Frontend

1. Click **"Deploy"** button
2. Wait for build (~3-5 minutes)
3. Watch the build logs
4. When done, you'll see **"Congratulations!"** 🎉
5. Click **"Visit"** to open your app
6. **Copy the Vercel URL**: `https://xxxxxxx.vercel.app`

**✅ Frontend deployed!**

---

## 🔗 PART 3: CONNECT FRONTEND & BACKEND

### 📍 Step 13: Update Railway FRONTEND_URL

1. Go back to **Railway Dashboard**
2. Click on your backend service
3. Go to **"Variables"** tab
4. Find `FRONTEND_URL` variable
5. Click to edit
6. **Update value** to your Vercel URL: `https://xxxxxxx.vercel.app`
7. Click **"Save"** or press Enter

**⏱️ Wait:** Railway will auto-redeploy (~1-2 minutes)

**✅ Frontend and Backend connected!**

---

## 👤 PART 4: CREATE ADMIN USER

### 📍 Step 14: Create Admin via MongoDB Atlas

1. Go to **MongoDB Atlas** → https://cloud.mongodb.com
2. Click **"Database"** (left sidebar)
3. Click **"Browse Collections"**
4. Select database: **tnc-project**
5. Select collection: **users**
6. Click **"INSERT DOCUMENT"**
7. Switch to **"{ } JSON"** view
8. Paste this:

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

9. Click **"Insert"**

**✅ Admin user created!**

**Login Credentials:**
- Email: `admin@gmail.com`
- Password: `Admin@1234`

---

## 🧪 PART 5: TEST YOUR APP

### 📍 Step 15: Test Everything

1. **Open your Vercel URL** in browser
2. **Login** with admin credentials:
   - Email: `admin@gmail.com`
   - Password: `Admin@1234`

3. **Test features:**
   - [ ] ✅ Dashboard loads
   - [ ] ✅ Create a new todo
   - [ ] ✅ Mark todo as complete
   - [ ] ✅ Delete a todo
   - [ ] ✅ View tasks page
   - [ ] ✅ Analytics page shows data
   - [ ] ✅ Team chat works (send messages)
   - [ ] ✅ Admin panel accessible
   - [ ] ✅ Theme toggle works

4. **Check browser console (F12):**
   - [ ] ❌ No errors
   - [ ] ✅ Socket.io connected
   - [ ] ✅ API calls successful

**✅ All features working!**

---

## 🎉 DEPLOYMENT COMPLETE!

**Your App is Live! 🚀**

### 📝 Save These URLs:

```
🎨 Frontend (Vercel):  https://__________________.vercel.app
🚂 Backend (Railway):  https://__________________.up.railway.app
💾 Database:           MongoDB Atlas ✅

👤 Admin Login:
   Email:     admin@gmail.com
   Password:  Admin@1234
```

---

## 🔍 Monitoring & Maintenance

### View Backend Logs (Railway):
1. Railway Dashboard → Select service
2. Click **"Deployments"** → Select latest
3. View real-time logs

### View Frontend Logs (Vercel):
1. Vercel Dashboard → Select project
2. Click **"Deployments"** → Select latest
3. Click **"View Function Logs"**

### Monitor Railway Usage:
1. Railway Dashboard
2. Click **"Usage"** (left sidebar)
3. See current month's credit usage
4. You have $5/month free

---

## 🔄 How to Update Your App

### After Making Code Changes:

```bash
# Stage changes
git add .

# Commit
git commit -m "Description of changes"

# Push to GitHub
git push origin main
```

**Railway and Vercel will auto-deploy!** 🎉

No need to manually redeploy - it's automatic!

---

## ⚠️ Important Notes

### Railway Free Tier:
- ✅ $5 credit/month (enough for small apps)
- ✅ No sleeping (unlike Render)
- ✅ 512 MB RAM
- ✅ WebSockets supported
- ⚠️ Monitor usage to stay within free tier

### Keep App Running:
Railway doesn't sleep, but to ensure optimal performance:
- Check logs regularly
- Monitor error rates
- Keep dependencies updated

### Security:
- ✅ Never commit .env files
- ✅ Use strong JWT_SECRET in production
- ✅ Use strong admin password
- ⚠️ MongoDB whitelist 0.0.0.0/0 is for development
  - For production, consider specific IP ranges

---

## 🆘 Common Issues & Solutions

### Issue 1: "Application Error" on Railway
**Solution:**
- Check Railway logs
- Verify environment variables
- Ensure MongoDB connection string is correct
- Check if MongoDB allows Railway's IP

### Issue 2: Frontend can't connect to backend
**Solution:**
- Verify `REACT_APP_API_URL` in Vercel
- Check backend is running (visit Railway URL)
- Look for CORS errors in browser console
- Update `FRONTEND_URL` in Railway

### Issue 3: Build failed on Vercel
**Solution:**
- Check build logs
- Verify all dependencies in package.json
- Make sure root directory is `frontend`
- Check for any TypeScript/ESLint errors

### Issue 4: Socket.io not connecting
**Solution:**
- Check browser console for WebSocket errors
- Verify backend URL in Socket.io connection
- Check Railway logs for connection attempts
- Ensure CORS allows your frontend URL

---

## 📞 Support Resources

- **Railway Docs**: https://docs.railway.app
- **Railway Discord**: https://discord.gg/railway
- **Vercel Docs**: https://vercel.com/docs
- **MongoDB Atlas**: https://docs.atlas.mongodb.com

---

## 🏆 Success Criteria

Your deployment is successful when:

✅ Backend URL returns API welcome message  
✅ Frontend URL loads login page  
✅ Can login with admin credentials  
✅ Can create, view, update, delete todos  
✅ Analytics show data  
✅ Team chat sends/receives messages  
✅ Admin panel accessible (for admin users)  
✅ No errors in browser console  
✅ No CORS errors  

---

## 🎊 Congratulations!

You've successfully deployed a full-stack MERN application with:
- ✅ Authentication & Authorization
- ✅ Real-time chat (Socket.io)
- ✅ Admin panel
- ✅ Analytics dashboard
- ✅ Complete CRUD operations
- ✅ Responsive design

**Share your app with the world! 🌍**

---

**Quick Reference:**
- 🚂 Railway Dashboard: https://railway.app/dashboard
- 🎨 Vercel Dashboard: https://vercel.com/dashboard
- 💾 MongoDB Atlas: https://cloud.mongodb.com

---

*Need the quick version? See: `RAILWAY_QUICK_START.md`*
*Need detailed troubleshooting? See: `RAILWAY_DEPLOYMENT_GUIDE.md`*

