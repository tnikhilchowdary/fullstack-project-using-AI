# ✅ Deployment Checklist

Use this checklist to ensure successful deployment.

## 📋 Pre-Deployment

- [ ] All code changes committed
- [ ] Backend runs locally without errors
- [ ] Frontend runs locally without errors
- [ ] MongoDB connection works
- [ ] Admin user can login locally
- [ ] All features tested locally

## 🔧 Backend Preparation

- [ ] `.env` file in `.gitignore` ✅
- [ ] `package.json` has `start` script ✅
- [ ] CORS configured for production ✅
- [ ] Socket.io configured for production ✅
- [ ] Environment variables documented ✅

## 🎨 Frontend Preparation

- [ ] `node_modules` in `.gitignore` ✅
- [ ] `build` folder in `.gitignore` ✅
- [ ] API calls use relative URLs or env variables ✅
- [ ] Socket.io client configured ✅

## 📦 GitHub Setup

- [ ] GitHub repository created
- [ ] Code pushed to main branch
- [ ] Repository is accessible
- [ ] No sensitive data in commits

## 🚀 Render Deployment (Backend)

- [ ] Render account created
- [ ] New Web Service created
- [ ] Connected to GitHub repository
- [ ] Root directory set to `backend`
- [ ] Build command: `npm install`
- [ ] Start command: `npm start`
- [ ] Environment variables added:
  - [ ] `MONGODB_URI`
  - [ ] `JWT_SECRET`
  - [ ] `PORT`
  - [ ] `FRONTEND_URL` (update after frontend deploy)
- [ ] Deployment successful
- [ ] Backend URL accessible
- [ ] `/api/test` endpoint works
- [ ] Database connection confirmed

## ☁️ Vercel Deployment (Frontend)

- [ ] Vercel account created
- [ ] Project imported from GitHub
- [ ] Framework preset: Create React App
- [ ] Root directory set to `frontend`
- [ ] Build command: `npm run build`
- [ ] Output directory: `build`
- [ ] Deployment successful
- [ ] Frontend URL accessible
- [ ] Login page loads correctly
- [ ] Styling looks correct

## 🔄 Post-Deployment

- [ ] Updated `FRONTEND_URL` in Render environment
- [ ] Render backend redeployed with new FRONTEND_URL
- [ ] MongoDB Atlas IP whitelist includes `0.0.0.0/0`
- [ ] CORS working (no console errors)
- [ ] Socket.io connection working

## 🧪 Testing Production

- [ ] Can access frontend URL
- [ ] Login works with admin credentials
- [ ] Dashboard loads
- [ ] Can create new todo
- [ ] Can view tasks
- [ ] Can edit tasks
- [ ] Can delete tasks
- [ ] Analytics page works
- [ ] Team chat works (Socket.io)
- [ ] Admin panel works (if admin)
- [ ] Theme toggle works
- [ ] Logout works
- [ ] Can register new user
- [ ] New user can login

## 🐛 Common Issues Fixed

- [ ] MongoDB IP whitelist configured
- [ ] CORS errors resolved
- [ ] Socket.io connects successfully
- [ ] Environment variables set correctly
- [ ] Backend stays awake (UptimeRobot configured)

## 📊 Monitoring Setup (Optional)

- [ ] UptimeRobot configured to ping backend
- [ ] Logs checked in Render dashboard
- [ ] Frontend errors monitored in Vercel

## 🎉 Launch

- [ ] All features working
- [ ] Performance acceptable
- [ ] No console errors
- [ ] App URL shared with users
- [ ] Documentation updated

---

## Your Deployment URLs:

**Frontend**: `https://_____.vercel.app`

**Backend**: `https://_____.onrender.com`

**Admin Login**:
- Email: `admin@gmail.com`
- Password: `Admin@1234`

---

## 🎊 Congratulations!

Your MERN Todo App is live! 🚀




