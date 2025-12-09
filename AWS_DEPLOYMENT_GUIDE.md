# 🚀 AWS Deployment Guide - Complete Step-by-Step

**Deploy your MERN stack to AWS!**

This guide will help you deploy:
- **Backend**: AWS App Runner (Easy & Serverless)
- **Frontend**: AWS Amplify (Perfect for React)
- **Database**: MongoDB Atlas (Already configured ✅)

**Estimated Time:** 45-60 minutes  
**Cost:** FREE tier available (with some limits)

---

## 📋 Prerequisites

- [x] ✅ AWS Account (we'll help you create one)
- [x] ✅ GitHub repository (already have: fullstack-project-using-AI)
- [x] ✅ MongoDB Atlas database (already configured)
- [ ] AWS CLI (optional, we'll use AWS Console)

---

## 🎯 PART 1: CREATE AWS ACCOUNT

### Step 1: Sign Up for AWS

1. **Go to:** https://aws.amazon.com
2. Click **"Create an AWS Account"** (top right)
3. Enter your email and password
4. Complete verification (phone number required)
5. Enter payment information (won't be charged for free tier)
6. Choose **"Basic Plan"** (Free)
7. ✅ **AWS Account created!**

**Note:** AWS Free Tier includes:
- 750 hours/month EC2 (t2.micro)
- 5GB S3 storage
- 12 months free for new accounts

---

## 🚂 PART 2: DEPLOY BACKEND TO AWS APP RUNNER

AWS App Runner is perfect for Node.js apps - it's serverless and easy!

### Step 2.1: Prepare Backend for App Runner

First, let's create the App Runner configuration file:

**File:** `backend/apprunner.yaml` (we'll create this)

### Step 2.2: Create App Runner Service

1. **Go to AWS Console:** https://console.aws.amazon.com
2. **Search for:** "App Runner" (top search bar)
3. Click **"App Runner"** service
4. Click **"Create an App Runner service"**

### Step 2.3: Configure Source

1. **Source:** Select **"Source code repository"**
2. **Connect to GitHub:**
   - Click **"Add new"** next to GitHub
   - Authorize AWS to access GitHub
   - Select repository: **fullstack-project-using-AI**
   - Select branch: **main**
3. **Deployment trigger:** Automatic (deploys on push)
4. Click **"Next"**

### Step 2.4: Configure Build Settings

1. **Configuration file:** Select **"Use a configuration file"**
2. **Configuration file location:** `backend/apprunner.yaml`
3. Click **"Next"**

### Step 2.5: Configure Service

1. **Service name:** `mern-todo-backend`
2. **Virtual CPU:** 0.5 vCPU (Free tier eligible)
3. **Memory:** 1 GB
4. **Port:** `5000`
5. Click **"Next"**

### Step 2.6: Add Environment Variables

Click **"Add environment variable"** and add these:

```
MONGODB_URI = mongodb+srv://tnc:tnc%401234@cluster0.issjpdv.mongodb.net/tnc-project?retryWrites=true&w=majority&appName=Cluster0
JWT_SECRET = your-super-secret-jwt-key-change-this-in-production-12345
PORT = 5000
NODE_ENV = production
FRONTEND_URL = http://localhost:3000
```

(We'll update FRONTEND_URL after deploying frontend)

Click **"Next"**

### Step 2.7: Review and Create

1. Review all settings
2. Click **"Create & deploy"**
3. Wait 5-10 minutes for deployment
4. ✅ **Backend deployed!**

### Step 2.8: Get Your Backend URL

1. Once deployed, you'll see your service
2. Click on the service name
3. Find **"Default domain"** (looks like: `xxxxx.us-east-1.awsapprunner.com`)
4. **📋 COPY THIS URL!**
5. ✅ **Backend URL ready!**

**Test it:** Open the URL in browser → Should see JSON welcome message

---

## 🎨 PART 3: DEPLOY FRONTEND TO AWS AMPLIFY

AWS Amplify is perfect for React apps!

### Step 3.1: Go to AWS Amplify

1. **Go to AWS Console**
2. **Search for:** "Amplify"
3. Click **"AWS Amplify"** service
4. Click **"New app"** → **"Host web app"**

### Step 3.2: Connect Repository

1. **Repository provider:** GitHub
2. **Authorize AWS** to access GitHub (if first time)
3. **Repository:** Select `fullstack-project-using-AI`
4. **Branch:** `main`
5. Click **"Next"**

### Step 3.3: Configure Build Settings

1. **App name:** `mern-todo-frontend`
2. **Environment:** `production`
3. **Build settings:** Click **"Edit"**

**Paste this build configuration:**

```yaml
version: 1
frontend:
  phases:
    preBuild:
      commands:
        - cd frontend
        - npm install
    build:
      commands:
        - npm run build
  artifacts:
    baseDirectory: frontend/build
    files:
      - '**/*'
  cache:
    paths:
      - frontend/node_modules/**/*
```

4. Click **"Save"**
5. Click **"Next"**

### Step 3.4: Add Environment Variables

Click **"Add environment variable"** and add:

```
REACT_APP_API_URL = https://your-app-runner-url.us-east-1.awsapprunner.com
```

⚠️ **Replace with your actual App Runner URL from Step 2.8!**
⚠️ **NO trailing slash!**

Click **"Save"** → **"Next"**

### Step 3.5: Review and Deploy

1. Review settings
2. Click **"Save and deploy"**
3. Wait 5-10 minutes for build
4. ✅ **Frontend deployed!**

### Step 3.6: Get Your Frontend URL

1. Once deployed, you'll see your app
2. Find **"Domain"** (looks like: `xxxxx.amplifyapp.com`)
3. **📋 COPY THIS URL!**
4. ✅ **Frontend URL ready!**

---

## 🔗 PART 4: CONNECT FRONTEND & BACKEND

### Step 4.1: Update App Runner FRONTEND_URL

1. Go back to **AWS App Runner** console
2. Click your backend service
3. Click **"Configuration"** tab
4. Click **"Edit"** next to Environment variables
5. Find `FRONTEND_URL`
6. **Change** to your Amplify URL (from Step 3.6)
7. ⚠️ **NO trailing slash!**
8. Click **"Save"**
9. Wait 2-3 minutes for redeploy
10. ✅ **Connected!**

---

## 👤 PART 5: CREATE ADMIN USER (If Needed)

### Step 5.1: Create Admin in MongoDB

1. Go to: **https://cloud.mongodb.com**
2. Login to MongoDB Atlas
3. Click **"Database"** → **"Browse Collections"**
4. Select database: **tnc-project**
5. Select collection: **users**
6. Click **"INSERT DOCUMENT"**
7. Switch to **"{ } JSON"** view
8. **Paste this:**

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
10. ✅ **Admin created!**

**Admin Credentials:**
- Email: `admin@gmail.com`
- Password: `Admin@1234`

---

## 🧪 PART 6: TEST YOUR DEPLOYED APP

### Step 6.1: Test Frontend

1. Open your **Amplify URL** in browser
2. Should see login page
3. Login with admin credentials
4. Should redirect to dashboard
5. ✅ **Frontend works!**

### Step 6.2: Test Features

- [ ] Dashboard loads
- [ ] Can create todos
- [ ] Can view tasks
- [ ] Analytics works
- [ ] Team chat works
- [ ] Admin panel accessible
- [ ] No CORS errors (check F12 console)

---

## ✅ SUCCESS CHECKLIST

- [ ] ✅ AWS account created
- [ ] ✅ Backend deployed to App Runner
- [ ] ✅ Frontend deployed to Amplify
- [ ] ✅ Environment variables configured
- [ ] ✅ Frontend and backend connected
- [ ] ✅ Can login and use app
- [ ] ✅ No errors in browser console

**If ALL checked:** 🎉 **AWS DEPLOYMENT SUCCESSFUL!**

---

## 📝 YOUR AWS URLS

**Fill this in:**

```
Backend (App Runner):  https://________________________________.awsapprunner.com

Frontend (Amplify):    https://________________________________.amplifyapp.com

Database:              MongoDB Atlas (tnc-project) ✅

Admin Login:           admin@gmail.com / Admin@1234
```

---

## 🐛 TROUBLESHOOTING

### Problem: App Runner build fails

**Solution:**
1. Check App Runner logs
2. Verify `apprunner.yaml` exists in `backend/` folder
3. Make sure root directory is correct
4. Check environment variables are set

### Problem: Amplify build fails

**Solution:**
1. Check Amplify build logs
2. Verify build settings are correct
3. Make sure `frontend/` folder exists
4. Check environment variables

### Problem: CORS Error

**Solution:**
1. App Runner → Configuration → Environment variables
2. Check `FRONTEND_URL` matches Amplify URL exactly
3. No trailing slash
4. Redeploy

### Problem: Frontend can't connect to backend

**Solution:**
1. Amplify → App settings → Environment variables
2. Check `REACT_APP_API_URL` matches App Runner URL
3. No trailing slash
4. Redeploy frontend

---

## 💰 AWS COSTS

**Free Tier Includes:**
- App Runner: 750 hours/month (t2.micro equivalent)
- Amplify: 1000 build minutes/month
- First 12 months free for new accounts

**Estimated Monthly Cost (after free tier):**
- App Runner: ~$5-10/month (for small app)
- Amplify: Usually free for small projects
- **Total: ~$5-10/month**

---

## 🎯 WHAT TO DO NEXT

### Share Your App:
- Send Amplify URL to friends/colleagues
- Add to your resume!
- Showcase your AWS deployment skills

### Monitor Usage:
- AWS Console → Billing Dashboard
- Set up billing alerts
- Monitor free tier usage

### Auto-Deploy:
Both App Runner and Amplify auto-deploy on git push!

```bash
git add .
git commit -m "Update feature"
git push origin main
# Both will auto-deploy! 🚀
```

---

## 🎊 CONGRATULATIONS!

You've successfully deployed to AWS! 🚀

**What you accomplished:**
- ✅ Deployed Express.js backend to AWS App Runner
- ✅ Deployed React frontend to AWS Amplify
- ✅ Connected to MongoDB Atlas
- ✅ Set up real-time chat (Socket.io)
- ✅ Configured authentication
- ✅ Made app accessible worldwide
- ✅ **AWS deployment on your resume!**

**Your app is now live on AWS! 🌍**

---

## 📞 NEED HELP?

**AWS Documentation:**
- App Runner: https://docs.aws.amazon.com/apprunner/
- Amplify: https://docs.aws.amazon.com/amplify/
- AWS Support: https://aws.amazon.com/support/

**Community:**
- AWS Forums: https://forums.aws.amazon.com/
- Stack Overflow: Tag `aws-app-runner` or `aws-amplify`

---

**Time to deploy:** ~45-60 minutes  
**Difficulty:** Medium  
**Cost:** FREE (with free tier)  
**Result:** Live MERN app on AWS! 🎉

**👉 START WITH STEP 1 ABOVE!**


