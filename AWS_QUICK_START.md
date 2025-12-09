# ⚡ AWS Quick Start Guide

**Super simple AWS deployment!**

---

## 🎯 What You'll Deploy

- **Backend** → AWS App Runner
- **Frontend** → AWS Amplify
- **Database** → MongoDB Atlas (already set up ✅)

---

## 📋 Quick Checklist

### Step 1: AWS Account ✅
- [ ] Go to https://aws.amazon.com
- [ ] Create account (free tier available)
- [ ] Verify email/phone

### Step 2: Deploy Backend (App Runner) ✅
- [ ] AWS Console → Search "App Runner"
- [ ] Create service → Connect GitHub
- [ ] Repository: `fullstack-project-using-AI`
- [ ] Config file: `backend/apprunner.yaml`
- [ ] Add environment variables (see below)
- [ ] Deploy → Copy URL

**Environment Variables:**
```
MONGODB_URI=mongodb+srv://tnc:tnc%401234@cluster0.issjpdv.mongodb.net/tnc-project?retryWrites=true&w=majority&appName=Cluster0
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production-12345
PORT=5000
NODE_ENV=production
FRONTEND_URL=http://localhost:3000
```

### Step 3: Deploy Frontend (Amplify) ✅
- [ ] AWS Console → Search "Amplify"
- [ ] New app → Host web app
- [ ] Connect GitHub → Select repo
- [ ] Build settings: Use `amplify.yml` (in root)
- [ ] Add env var: `REACT_APP_API_URL` = Your App Runner URL
- [ ] Deploy → Copy URL

### Step 4: Connect Them ✅
- [ ] App Runner → Edit env vars
- [ ] Change `FRONTEND_URL` to Amplify URL
- [ ] Wait for redeploy

### Step 5: Test ✅
- [ ] Open Amplify URL
- [ ] Login (admin@gmail.com / Admin@1234)
- [ ] Test features

---

## 📝 Your URLs

**Backend:** `https://________________.awsapprunner.com`  
**Frontend:** `https://________________.amplifyapp.com`

---

## 🐛 Quick Fixes

**Build fails?** → Check logs in AWS Console  
**CORS error?** → Check FRONTEND_URL matches Amplify URL  
**Can't connect?** → Check REACT_APP_API_URL matches App Runner URL

---

**Full guide:** See `AWS_DEPLOYMENT_GUIDE.md`


