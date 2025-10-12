# 🚀 Deploy to Railway - Exact Steps

Follow these steps **exactly** in order. Total time: ~30 minutes.

---

## ✅ BEFORE YOU START

### Check These First:

```bash
# 1. Make sure you're in the project root
cd c:\Users\tnikh\Desktop\project-app-assignment

# 2. Make sure all changes are committed
git status

# 3. If you have uncommitted changes:
git add .
git commit -m "Ready for Railway deployment"

# 4. Push to GitHub
git push origin main
```

**Important:** If you don't have the code on GitHub yet, do this first:
```bash
git remote -v  # Check if GitHub is connected
# If not connected, create a GitHub repo and connect it
```

---

## 🚂 PART 1: DEPLOY BACKEND TO RAILWAY

### Step 1: Sign Up for Railway
1. Open browser
2. Go to: **https://railway.app**
3. Click **"Login"** (top right)
4. Select **"Login with GitHub"**
5. Authorize Railway
6. ✅ You now have a Railway account with **$5 free credit/month**!

---

### Step 2: Create New Project
1. Click **"New Project"** (big button in center)
2. Select **"Deploy from GitHub repo"**
3. If first time:
   - Click **"Configure GitHub App"**
   - Select **"All repositories"** (or select specific repo)
   - Click **"Install & Authorize"**
4. In the search box, type: **project-app-assignment**
5. Click on your repository
6. ✅ Project created!

---

### Step 3: Configure Root Directory
Railway will start deploying automatically, but we need to configure it:

1. Click on the **service card** (shows your repo name)
2. Click **"Settings"** tab
3. Scroll to **"Service"** section
4. Find **"Root Directory"**
5. Click to edit
6. Type: `backend`
7. Click outside or press Enter to save
8. ✅ Root directory set!

---

### Step 4: Add Environment Variables
1. Click **"Variables"** tab (top menu)
2. Click **"RAW Editor"** button (easier to paste multiple variables)
3. Paste this **exactly** (one per line):

```
MONGODB_URI=mongodb+srv://tnc:tnc%401234@cluster0.issjpdv.mongodb.net/tnc-project?retryWrites=true&w=majority&appName=Cluster0
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production-12345
PORT=5000
NODE_ENV=production
FRONTEND_URL=http://localhost:3000
```

4. Click **"Update Variables"**
5. ✅ Environment variables added!

---

### Step 5: Generate Domain
1. Go to **"Settings"** tab
2. Scroll to **"Networking"** section
3. Click **"Generate Domain"** button
4. Wait 10 seconds
5. You'll see a URL like: `https://xxxxxxx.up.railway.app`
6. **COPY THIS URL!** You'll need it soon
7. ✅ Domain generated!

---

### Step 6: Wait for Deployment
1. Click **"Deployments"** tab
2. Watch the build logs
3. Wait for **"Success"** status (green checkmark)
4. Usually takes 2-3 minutes
5. ✅ Backend deployed!

---

### Step 7: Test Backend
1. Open new browser tab
2. Go to your Railway URL: `https://xxxxxxx.up.railway.app`
3. You should see JSON:
```json
{
  "message": "Welcome to MERN Todo API with Authentication!",
  "status": "Server is running successfully",
  "database": "Connected"
}
```
4. ✅ If you see this, backend is working!
5. ❌ If not, check Railway logs in Deployments tab

---

## 🎨 PART 2: DEPLOY FRONTEND TO VERCEL

### Step 8: Sign Up for Vercel
1. Open new browser tab
2. Go to: **https://vercel.com**
3. Click **"Sign Up"**
4. Select **"Continue with GitHub"**
5. Authorize Vercel
6. ✅ Vercel account created!

---

### Step 9: Create New Project
1. Click **"Add New..."** → **"Project"**
2. Find your repository: **project-app-assignment**
3. Click **"Import"**
4. ✅ Project imported!

---

### Step 10: Configure Frontend
In the configuration screen:

1. **Framework Preset:** Should auto-detect "Create React App" ✅

2. **Root Directory:** 
   - Click **"Edit"** next to Root Directory
   - Select **"frontend"** from dropdown
   - Click **"Continue"**

3. **Build Settings:** (Should be auto-filled)
   - Build Command: `npm run build` ✅
   - Output Directory: `build` ✅
   - Install Command: `npm install` ✅

4. ✅ Configuration ready!

---

### Step 11: Add Environment Variable
Still on the import screen:

1. Expand **"Environment Variables"** section
2. Add variable:
   - **Name:** `REACT_APP_API_URL`
   - **Value:** Your Railway URL (from Step 6)
   - Example: `https://xxxxxxx.up.railway.app`
   - **Important:** No trailing slash!
3. Click **"Add"**
4. ✅ Environment variable added!

---

### Step 12: Deploy Frontend
1. Click **"Deploy"** button (bottom)
2. Wait for build (3-5 minutes)
3. Watch the build logs
4. When done, you'll see **"Congratulations!"** 🎉
5. Click **"Visit"** to open your app
6. **COPY THE VERCEL URL** from the address bar
7. Example: `https://xxxxxxx.vercel.app`
8. ✅ Frontend deployed!

---

## 🔗 PART 3: CONNECT FRONTEND & BACKEND

### Step 13: Update Railway's FRONTEND_URL
1. Go back to **Railway Dashboard**
2. Click on your backend service
3. Click **"Variables"** tab
4. Find `FRONTEND_URL` variable
5. Click on it to edit
6. **Change** from `http://localhost:3000`
7. **To** your Vercel URL: `https://xxxxxxx.vercel.app`
8. Press Enter or click outside to save
9. Railway will **auto-redeploy** (wait 1-2 minutes)
10. ✅ Connected!

---

## 👤 PART 4: CREATE ADMIN USER

### Step 14: Create Admin in MongoDB
1. Go to: **https://cloud.mongodb.com**
2. Login to MongoDB Atlas
3. Click **"Database"** (left sidebar)
4. Click **"Browse Collections"** button
5. Select database: **tnc-project**
6. Select collection: **users**
7. Click **"INSERT DOCUMENT"**
8. Switch to **"{ } JSON"** view (top right toggle)
9. **Delete** the default content
10. **Paste** this exactly:

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

11. Click **"Insert"**
12. ✅ Admin user created!

**Admin Credentials:**
- Email: `admin@gmail.com`
- Password: `Admin@1234`

---

## 🧪 PART 5: TEST YOUR DEPLOYED APP

### Step 15: Test Login
1. Open your Vercel URL in browser
2. You should see the login page
3. Enter:
   - Email: `admin@gmail.com`
   - Password: `Admin@1234`
4. Click **Login**
5. Should redirect to dashboard
6. ✅ If logged in, authentication works!

---

### Step 16: Test Features

**Dashboard:**
- [ ] Dashboard loads
- [ ] See your name in top bar
- [ ] Theme toggle works

**Add Todo:**
- [ ] Click "Add Todo" in navbar
- [ ] Create a new todo
- [ ] Todo appears in list

**View Tasks:**
- [ ] Click "View Tasks"
- [ ] See your created todo
- [ ] Mark as complete
- [ ] Edit todo
- [ ] Delete todo

**Analytics:**
- [ ] Click "Analytics"
- [ ] See statistics
- [ ] Charts display

**Team Chat:**
- [ ] Click "Team Chat" or chat icon
- [ ] Send a message
- [ ] Message appears
- [ ] No WebSocket errors

**Admin Panel:**
- [ ] Click "Admin" in navbar (visible because you're admin)
- [ ] See user statistics
- [ ] See all users

---

### Step 17: Check Browser Console
1. Press **F12** to open DevTools
2. Click **"Console"** tab
3. Check for errors:
   - ❌ No CORS errors
   - ❌ No "Failed to fetch" errors
   - ❌ No authentication errors
   - ✅ Should see "Socket connected" or similar
4. ✅ If no errors, you're good!

---

## ✅ SUCCESS CHECKLIST

Your deployment is successful if:

- [ ] ✅ Railway backend URL shows welcome message
- [ ] ✅ Vercel frontend URL loads login page
- [ ] ✅ Can login with admin credentials
- [ ] ✅ Dashboard loads with user info
- [ ] ✅ Can create todos
- [ ] ✅ Can view tasks
- [ ] ✅ Analytics page works
- [ ] ✅ Team chat sends messages
- [ ] ✅ Admin panel accessible
- [ ] ✅ No CORS errors in console
- [ ] ✅ No network errors

**If ALL checked:** 🎉 **DEPLOYMENT SUCCESSFUL!**

---

## 🐛 TROUBLESHOOTING

### Problem: Backend shows "Application Error"

**Solution:**
1. Railway → Click your service → **"Deployments"**
2. Click latest deployment
3. Read the error logs
4. Common fixes:
   - Check environment variables are set
   - Verify MongoDB URI is correct
   - Make sure root directory is `backend`

---

### Problem: Frontend can't connect to backend

**Check these:**
1. Vercel → Your project → **"Settings"** → **"Environment Variables"**
2. Verify `REACT_APP_API_URL` is correct
3. Should match your Railway URL exactly
4. No trailing slash
5. After fixing, redeploy:
   - Vercel → **"Deployments"** → **"..."** → **"Redeploy"**

---

### Problem: CORS Error in Browser Console

**Fix:**
1. Railway → Your service → **"Variables"**
2. Check `FRONTEND_URL` equals your Vercel URL
3. Must match exactly (no trailing slash)
4. Save and wait for auto-redeploy

---

### Problem: MongoDB Connection Failed

**Fix:**
1. MongoDB Atlas → **"Network Access"** (left sidebar)
2. Click **"Add IP Address"**
3. Select **"Allow Access from Anywhere"**
4. Enter: `0.0.0.0/0`
5. Click **"Confirm"**
6. Wait 1-2 minutes
7. Redeploy on Railway

---

### Problem: Login doesn't work

**Check:**
1. MongoDB Atlas → **Browse Collections** → **users**
2. Make sure admin user exists
3. Verify `email` is exactly: `admin@gmail.com`
4. Check Railway logs for auth errors

---

### Problem: Team Chat not working

**Check:**
1. Browser console (F12)
2. Look for WebSocket errors
3. Verify Railway URL in frontend Socket.io connection
4. Check Railway logs for Socket.io messages

---

## 📝 YOUR DEPLOYMENT URLS

**Fill this in:**

```
Backend (Railway):  https://________________________________.up.railway.app

Frontend (Vercel):  https://________________________________.vercel.app

Database:           MongoDB Atlas (tnc-project) ✅

Admin Login:        admin@gmail.com / Admin@1234
```

---

## 🎯 WHAT TO DO NEXT

### Share Your App:
1. Send Vercel URL to friends/colleagues
2. They can sign up and use it
3. You manage users via Admin Panel

### Monitor Usage:
1. Railway → **"Usage"** tab
2. Check monthly credit usage
3. Should be $2-4/month for normal use
4. Free tier gives $5/month

### Auto-Deploy:
Both Railway and Vercel auto-deploy when you push to GitHub!

```bash
# Make changes to your code
git add .
git commit -m "Update feature"
git push origin main

# Both platforms will auto-deploy! 🚀
```

---

## 🎊 CONGRATULATIONS!

You've successfully deployed a full-stack MERN application! 🚀

**What you accomplished:**
- ✅ Deployed Express.js backend to Railway
- ✅ Deployed React frontend to Vercel
- ✅ Connected to MongoDB Atlas
- ✅ Set up real-time chat (Socket.io)
- ✅ Configured authentication
- ✅ Made app accessible worldwide

**Your app is now live! 🌍**

---

## 📞 NEED HELP?

**Detailed guides:**
- `RAILWAY_TROUBLESHOOTING.md` - Common errors
- `RAILWAY_DEPLOYMENT_GUIDE.md` - Full documentation
- `RAILWAY_STEP_BY_STEP.md` - Detailed walkthrough

**Community support:**
- Railway Discord: https://discord.gg/railway
- Vercel Discord: https://vercel.com/discord

---

**Time to deploy:** ~30 minutes  
**Difficulty:** Easy  
**Cost:** FREE  
**Result:** Live MERN app! 🎉

**👉 START WITH STEP 1 ABOVE!**

