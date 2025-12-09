# 🚀 Step-by-Step Deployment Guide

Follow these exact steps to deploy your app!

---

## ✅ Prerequisites Checklist

Before we start:
- [x] Code is on GitHub: https://github.com/tnikhilchowdary/fullstack-project-using-AI
- [x] MongoDB Atlas database is set up
- [ ] Render.com account (we'll create this)
- [ ] Vercel.com account (we'll create this)

---

## PART 1: Deploy Backend on Render (5 minutes)

### Step 1: Create Render Account

1. Open your browser and go to: **https://render.com**
2. Click **"Get Started for Free"** (top right)
3. Click **"Continue with GitHub"**
4. Login to your GitHub account
5. Click **"Authorize Render"**
6. You'll be redirected to Render Dashboard

✅ **You're now logged into Render!**

---

### Step 2: Create New Web Service

1. On Render Dashboard, click **"New +"** button (top right)
2. Select **"Web Service"**
3. Click **"Build and deploy from a Git repository"** → **"Next"**
4. You'll see a list of your GitHub repositories
5. Find **"fullstack-project-using-AI"**
6. Click **"Connect"** button next to it

✅ **Repository connected!**

---

### Step 3: Configure the Web Service

Fill in these settings:

**Name:**
```
todo-app-backend
```

**Region:**
```
Oregon (US West) - or choose closest to you
```

**Branch:**
```
main
```

**Root Directory:**
```
backend
```
⚠️ IMPORTANT: Type exactly "backend" (lowercase)

**Runtime:**
```
Node
```
(Should auto-detect)

**Build Command:**
```
npm install
```

**Start Command:**
```
npm start
```

**Instance Type:**
```
Free
```
(Select from dropdown)

---

### Step 4: Add Environment Variables

Scroll down to **"Environment Variables"** section.

Click **"Add Environment Variable"** and add these 4 variables:

**Variable 1:**
- Key: `MONGODB_URI`
- Value: `mongodb+srv://tnc:tnc%401234@cluster0.issjpdv.mongodb.net/tnc-project?retryWrites=true&w=majority&appName=Cluster0`

Click **"Add Environment Variable"** again

**Variable 2:**
- Key: `JWT_SECRET`
- Value: `my-super-secret-jwt-key-change-this-later-12345`

Click **"Add Environment Variable"** again

**Variable 3:**
- Key: `PORT`
- Value: `5000`

Click **"Add Environment Variable"** again

**Variable 4:**
- Key: `FRONTEND_URL`
- Value: `http://localhost:3000`

(We'll update this later after deploying frontend)

---

### Step 5: Deploy Backend

1. Scroll to the bottom
2. Click **"Create Web Service"** button
3. Wait for deployment (takes 3-5 minutes)
4. You'll see logs appearing - this is normal!
5. Wait for "Build successful ✓" message

---

### Step 6: Get Your Backend URL

1. Once deployed, you'll see your service dashboard
2. At the top, you'll see a URL like: `https://todo-app-backend-xxxx.onrender.com`
3. **COPY THIS URL** - you'll need it!
4. Click on the URL to test it
5. You should see a JSON response with "Welcome to MERN Todo API"

✅ **Backend is LIVE!** 🎉

**Write down your backend URL here:**
```
https://_____________________________.onrender.com
```

---

## PART 2: Deploy Frontend on Vercel (3 minutes)

### Step 7: Create Vercel Account

1. Open a new tab and go to: **https://vercel.com**
2. Click **"Sign Up"** (top right)
3. Click **"Continue with GitHub"**
4. Login to your GitHub account
5. Click **"Authorize Vercel"**
6. You'll be redirected to Vercel Dashboard

✅ **You're now logged into Vercel!**

---

### Step 8: Import Your Project

1. Click **"Add New..."** button (top right)
2. Select **"Project"**
3. You'll see your GitHub repositories
4. Find **"fullstack-project-using-AI"**
5. Click **"Import"** button next to it

---

### Step 9: Configure the Project

Fill in these settings:

**Framework Preset:**
```
Create React App
```
(Should auto-detect)

**Root Directory:**
- Click **"Edit"** next to Root Directory
- Type: `frontend`
- Click **"Continue"**

**Build and Output Settings:**
- Build Command: `npm run build` (auto-filled)
- Output Directory: `build` (auto-filled)
- Install Command: `npm install` (auto-filled)

---

### Step 10: Add Environment Variable

1. Expand **"Environment Variables"** section
2. Add this variable:

**Name:**
```
REACT_APP_API_URL
```

**Value:**
```
[PASTE YOUR BACKEND URL FROM STEP 6]
```
⚠️ IMPORTANT: Use the URL you copied from Render!
Example: `https://todo-app-backend-xxxx.onrender.com`

**DO NOT** include a trailing slash!

---

### Step 11: Deploy Frontend

1. Click **"Deploy"** button
2. Wait for deployment (takes 2-3 minutes)
3. You'll see build logs - this is normal!
4. Wait for "Congratulations!" message

---

### Step 12: Get Your Frontend URL

1. Once deployed, you'll see a success screen
2. Click **"Continue to Dashboard"**
3. At the top, you'll see your live URL like: `https://fullstack-project-using-ai.vercel.app`
4. **COPY THIS URL** - you'll need it!
5. Click **"Visit"** to see your app

✅ **Frontend is LIVE!** 🎉

**Write down your frontend URL here:**
```
https://_____________________________.vercel.app
```

---

## PART 3: Connect Frontend & Backend (2 minutes)

### Step 13: Update Backend CORS Settings

1. Go back to **Render Dashboard** (render.com)
2. Click on your **"todo-app-backend"** service
3. Click **"Environment"** in the left sidebar
4. Find **FRONTEND_URL** variable
5. Click the **pencil icon** (Edit) next to it
6. Update the value to your Vercel URL (from Step 12)
   - Example: `https://fullstack-project-using-ai.vercel.app`
7. Click **"Save Changes"** button
8. Backend will automatically redeploy (wait 1-2 minutes)

✅ **CORS Updated!**

---

### Step 14: Whitelist Render IPs in MongoDB

1. Go to **https://cloud.mongodb.com**
2. Login to your MongoDB Atlas account
3. Click **"Network Access"** in the left menu
4. Click **"+ Add IP Address"** button
5. Click **"Allow Access from Anywhere"**
6. Confirm the IP: `0.0.0.0/0`
7. Click **"Confirm"**

✅ **Database is accessible from Render!**

---

## 🎉 DEPLOYMENT COMPLETE!

Your app is now LIVE on the internet! 🌍

---

## Test Your Deployed App

### 1. Visit Your Live App:

Go to your Vercel URL:
```
https://your-app.vercel.app
```

### 2. Create an Account:

1. Click **"Sign Up"**
2. Fill in:
   - Name: Your Name
   - Email: your@email.com
   - Password: YourPassword123

### 3. Or Login with Admin Account:

- Email: `admin@gmail.com`
- Password: `Admin@1234`

### 4. Test All Features:

- ✅ Dashboard loads
- ✅ Add Todo works
- ✅ View Tasks shows todos
- ✅ Analytics displays charts
- ✅ Team Chat works (real-time!)
- ✅ Admin Panel works (if admin)

---

## 🎊 SUCCESS!

Your URLs:
- **Frontend**: https://your-frontend.vercel.app
- **Backend**: https://your-backend.onrender.com

Share your frontend URL with anyone! 🚀

---

## ⚠️ Important Notes

### Render Free Tier Behavior:
- Backend goes to sleep after 15 minutes of no activity
- First request after sleep takes 30-60 seconds to wake up
- This is NORMAL for free tier
- Your app will work fine, just be patient on first load

### To Keep Backend Awake (Optional):

Use **UptimeRobot** (free):
1. Go to https://uptimerobot.com
2. Sign up free
3. Click "Add New Monitor"
4. Monitor Type: HTTP(s)
5. Friendly Name: My Todo Backend
6. URL: `https://your-backend-url.onrender.com`
7. Monitoring Interval: 5 minutes
8. Click "Create Monitor"

Now your backend stays awake! ⚡

---

## 🔄 Updating Your App Later

To update your deployed app:

```bash
# Make changes to your code
git add .
git commit -m "Updated my app"
git push
```

Both Render and Vercel will **automatically redeploy**! 🚀

---

## 🐛 Troubleshooting

### If you get "Network Error" on login:
1. Open browser console (F12)
2. Check if backend URL is correct
3. Wait 60 seconds for backend to wake up
4. Try again

### If MongoDB connection fails:
1. Check MongoDB Atlas → Network Access
2. Make sure `0.0.0.0/0` is in the IP whitelist
3. Check MONGODB_URI is correct in Render environment variables

### If CORS errors:
1. Make sure FRONTEND_URL in Render matches your Vercel URL exactly
2. No trailing slash in URL
3. Save and wait for redeploy

---

## 📧 Your Deployment Summary

Once you're done, fill this out:

**Backend URL:** ___________________________________

**Frontend URL:** ___________________________________

**Admin Login:**
- Email: admin@gmail.com
- Password: Admin@1234

**Status:** ✅ DEPLOYED!

---

🎊 **Congratulations! You've deployed a full-stack MERN application!** 🎊







