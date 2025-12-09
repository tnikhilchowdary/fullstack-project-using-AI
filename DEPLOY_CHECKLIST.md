# ✅ Deployment Checklist - Check Off As You Go!

## 🚂 RAILWAY (Backend) - Step by Step

### Step 1: Sign Up ✅
- [ ] Opened https://railway.app
- [ ] Clicked "Start a New Project" or "Login"
- [ ] Clicked "Login with GitHub"
- [ ] Authorized Railway
- [ ] ✅ Signed in!

### Step 2: Create Project ✅
- [ ] Clicked "New Project"
- [ ] Selected "Deploy from GitHub repo"
- [ ] Configured GitHub App (if needed)
- [ ] Selected repo: **fullstack-project-using-AI**
- [ ] ✅ Project created!

### Step 3: Configure Root Directory ✅
- [ ] Clicked on service card
- [ ] Clicked "Settings" tab
- [ ] Found "Root Directory"
- [ ] Changed to: **backend**
- [ ] ✅ Saved!

### Step 4: Add Environment Variables ✅
- [ ] Clicked "Variables" tab
- [ ] Clicked "RAW Editor"
- [ ] Pasted all 5 variables (see below)
- [ ] Clicked "Update Variables"
- [ ] ✅ Variables added!

**Copy these variables:**
```
MONGODB_URI=mongodb+srv://tnc:tnc%401234@cluster0.issjpdv.mongodb.net/tnc-project?retryWrites=true&w=majority&appName=Cluster0
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production-12345
PORT=5000
NODE_ENV=production
FRONTEND_URL=http://localhost:3000
```

### Step 5: Generate Domain ✅
- [ ] Clicked "Settings" tab
- [ ] Scrolled to "Networking"
- [ ] Clicked "Generate Domain"
- [ ] Waited 10 seconds
- [ ] **COPIED THE URL:** ________________________________
- [ ] ✅ Domain generated!

### Step 6: Wait for Deployment ✅
- [ ] Clicked "Deployments" tab
- [ ] Waited for green checkmark ✅
- [ ] Tested URL in browser (should see JSON)
- [ ] ✅ Backend deployed!

---

## 🎨 VERCEL (Frontend) - Step by Step

### Step 1: Sign Up ✅
- [ ] Opened https://vercel.com
- [ ] Clicked "Sign Up"
- [ ] Clicked "Continue with GitHub"
- [ ] Authorized Vercel
- [ ] ✅ Signed in!

### Step 2: Create Project ✅
- [ ] Clicked "Add New..." → "Project"
- [ ] Found repo: **fullstack-project-using-AI**
- [ ] Clicked "Import"
- [ ] ✅ Project imported!

### Step 3: Configure Settings ✅
- [ ] Changed Root Directory to: **frontend**
- [ ] ✅ Settings configured!

### Step 4: Add Environment Variable ✅
- [ ] Found "Environment Variables" section
- [ ] Added variable:
  - Name: `REACT_APP_API_URL`
  - Value: (Railway URL from above)
- [ ] ⚠️ No trailing slash!
- [ ] ✅ Variable added!

### Step 5: Deploy ✅
- [ ] Clicked "Deploy"
- [ ] Waited 3-5 minutes
- [ ] Saw "Congratulations!"
- [ ] Clicked "Visit"
- [ ] **COPIED THE URL:** ________________________________
- [ ] ✅ Frontend deployed!

---

## 🔗 CONNECT THEM

### Step 1: Update Railway ✅
- [ ] Went back to Railway
- [ ] Clicked project → "Variables"
- [ ] Found `FRONTEND_URL`
- [ ] Changed to Vercel URL
- [ ] ⚠️ No trailing slash!
- [ ] Waited for redeploy (1-2 min)
- [ ] ✅ Connected!

---

## ✅ TEST

- [ ] Opened Vercel URL
- [ ] Saw login page
- [ ] Logged in (admin@gmail.com / Admin@1234)
- [ ] Dashboard loaded
- [ ] ✅ Everything works!

---

## 📝 YOUR URLS

**Backend (Railway):** ________________________________

**Frontend (Vercel):** ________________________________

---

**When you finish each step, tell me and I'll help with the next one!**


