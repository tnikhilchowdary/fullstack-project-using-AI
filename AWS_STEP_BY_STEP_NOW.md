# 🚀 AWS Deployment - Right Now!

**Follow these steps exactly as you see them!**

---

## ✅ STEP 1: Create AWS Account (You're Here!)

**On the AWS page:**

1. **Click:** "Create an AWS Account" (big orange button, top right)
2. **Enter:**
   - Email address
   - Password (must be strong)
   - Account name (can be your name or project name)
3. **Click:** "Continue"
4. **Enter contact information:**
   - Full name
   - Phone number (for verification)
   - Country/Region
5. **Click:** "Continue"
6. **Verify phone:** You'll get a code via SMS
7. **Enter verification code**
8. **Click:** "Continue"

**Payment Information:**
- Enter credit/debit card (won't be charged for free tier)
- Enter billing address
- Click "Secure Submit"

**Choose Support Plan:**
- Select **"Basic Plan"** (FREE)
- Click "Complete sign up"

**Wait for confirmation email** (check your inbox)

✅ **AWS Account Created!**

---

## 🚂 STEP 2: Deploy Backend to App Runner

**Once logged into AWS Console:**

### 2.1: Open App Runner

1. **At the top**, you'll see a search bar
2. **Type:** `App Runner`
3. **Click:** "App Runner" (from dropdown)
4. **Click:** "Create an App Runner service" (big button)

### 2.2: Configure Source

**Source and deployment:**
- Select: **"Source code repository"** (radio button)
- **Connect to GitHub:**
  - Click **"Add new"** next to GitHub
  - Click **"Authorize AWS"**
  - Login to GitHub if needed
  - Click **"Authorize"**
- **Repository:** Select `fullstack-project-using-AI`
- **Branch:** `main`
- **Deployment trigger:** Automatic (leave as is)
- **Click:** "Next"

### 2.3: Configure Build Settings

**Build settings:**
- **Configuration file:** Select **"Use a configuration file"**
- **Configuration file location:** Type `backend/apprunner.yaml`
- **Click:** "Next"

### 2.4: Configure Service

**Service settings:**
- **Service name:** Type `mern-todo-backend`
- **Virtual CPU:** Select **0.5 vCPU** (from dropdown)
- **Memory:** Select **1 GB** (from dropdown)
- **Port:** Type `5000`
- **Click:** "Next"

### 2.5: Add Environment Variables

**This is IMPORTANT!**

Click **"Add environment variable"** button, then add these ONE BY ONE:

**Variable 1:**
- Key: `MONGODB_URI`
- Value: `mongodb+srv://tnc:tnc%401234@cluster0.issjpdv.mongodb.net/tnc-project?retryWrites=true&w=majority&appName=Cluster0`
- Click "Add"

**Variable 2:**
- Key: `JWT_SECRET`
- Value: `your-super-secret-jwt-key-change-this-in-production-12345`
- Click "Add"

**Variable 3:**
- Key: `PORT`
- Value: `5000`
- Click "Add"

**Variable 4:**
- Key: `NODE_ENV`
- Value: `production`
- Click "Add"

**Variable 5:**
- Key: `FRONTEND_URL`
- Value: `http://localhost:3000`
- Click "Add"

**Click:** "Next"

### 2.6: Review and Create

1. **Review** all settings
2. **Click:** "Create & deploy"
3. **Wait 5-10 minutes** (you'll see deployment progress)
4. **When done**, you'll see your service
5. **Click** on the service name
6. **Find:** "Default domain" (looks like: `xxxxx.us-east-1.awsapprunner.com`)
7. **📋 COPY THIS URL!** Save it somewhere!

✅ **Backend deployed!**

**Test it:** Open the URL in browser → Should see JSON welcome message

---

## 🎨 STEP 3: Deploy Frontend to Amplify

### 3.1: Open Amplify

1. **Top search bar**, type: `Amplify`
2. **Click:** "AWS Amplify"
3. **Click:** "New app" → "Host web app"

### 3.2: Connect Repository

**Repository:**
- **Repository provider:** Select **GitHub**
- **If first time:** Click "Authorize AWS" → Login GitHub → Authorize
- **Repository:** Select `fullstack-project-using-AI`
- **Branch:** `main`
- **Click:** "Next"

### 3.3: Configure Build Settings

**App settings:**
- **App name:** Type `mern-todo-frontend`
- **Environment:** Select `production`
- **Build settings:** Should auto-detect `amplify.yml`
  - If not, click "Edit" and make sure it shows `amplify.yml`
- **Click:** "Next"

### 3.4: Add Environment Variable

**Environment variables:**
- **Click:** "Add environment variable"
- **Key:** `REACT_APP_API_URL`
- **Value:** Paste your App Runner URL from Step 2.6
- ⚠️ **IMPORTANT:** No trailing slash! (should end with `.com`, not `.com/`)
- **Click:** "Save"
- **Click:** "Next"

### 3.5: Review and Deploy

1. **Review** settings
2. **Click:** "Save and deploy"
3. **Wait 5-10 minutes** (watch build progress)
4. **When done**, find **"Domain"** (looks like: `xxxxx.amplifyapp.com`)
5. **📋 COPY THIS URL!** Save it!

✅ **Frontend deployed!**

---

## 🔗 STEP 4: Connect Frontend & Backend

### 4.1: Update App Runner

1. **Go back to App Runner** console
2. **Click** your backend service (`mern-todo-backend`)
3. **Click:** "Configuration" tab
4. **Click:** "Edit" (next to Environment variables)
5. **Find:** `FRONTEND_URL`
6. **Change** value from `http://localhost:3000`
7. **To:** Your Amplify URL (from Step 3.5)
8. ⚠️ **NO trailing slash!**
9. **Click:** "Save"
10. **Wait 2-3 minutes** for redeploy

✅ **Connected!**

---

## ✅ STEP 5: Test Your App

1. **Open** your Amplify URL in browser
2. **Should see** login page
3. **Login:**
   - Email: `admin@gmail.com`
   - Password: `Admin@1234`
4. **Should redirect** to dashboard
5. **Test features:**
   - Create a todo ✅
   - View tasks ✅
   - Check analytics ✅
   - Try team chat ✅

✅ **Everything works!**

---

## 📝 Save Your URLs Here

```
Backend (App Runner):  https://________________________________.awsapprunner.com

Frontend (Amplify):    https://________________________________.amplifyapp.com
```

---

## 🎊 DONE! Your App is Live on AWS!

**Congratulations!** 🎉

You've successfully deployed:
- ✅ Backend on AWS App Runner
- ✅ Frontend on AWS Amplify
- ✅ Connected everything
- ✅ **AWS deployment on your resume!**

---

## 🐛 If Something Goes Wrong

**Tell me:**
- What step you're on
- What error message you see
- What you see on screen

**I'll help you fix it!**

---

**👉 Continue with Step 1 above if you haven't created AWS account yet!**


