# ⚡ Quick Deployment Reference Card

**Print this or keep it open while deploying!**

---

## 🚂 RAILWAY (Backend) - Quick Steps

1. **Sign Up:** https://railway.app → Login with GitHub
2. **New Project** → Deploy from GitHub → Select your repo
3. **Settings** → Root Directory: `backend`
4. **Variables** → Add these:
   ```
   MONGODB_URI=mongodb+srv://tnc:tnc%401234@cluster0.issjpdv.mongodb.net/tnc-project?retryWrites=true&w=majority&appName=Cluster0
   JWT_SECRET=your-super-secret-jwt-key-change-this-in-production-12345
   PORT=5000
   NODE_ENV=production
   FRONTEND_URL=http://localhost:3000
   ```
5. **Settings** → Generate Domain → Copy URL
6. **Test:** Visit Railway URL → Should see welcome JSON

**Your Railway URL:** `https://________________.up.railway.app`

---

## 🎨 VERCEL (Frontend) - Quick Steps

1. **Sign Up:** https://vercel.com → Continue with GitHub
2. **Add New Project** → Import your repo
3. **Root Directory:** `frontend`
4. **Environment Variable:**
   - Name: `REACT_APP_API_URL`
   - Value: Your Railway URL (from above)
   - ⚠️ No trailing slash!
5. **Deploy** → Wait 3-5 minutes
6. **Copy Vercel URL**

**Your Vercel URL:** `https://________________.vercel.app`

---

## 🔗 CONNECT THEM

1. **Railway** → Variables → Edit `FRONTEND_URL`
2. Change to your Vercel URL
3. ⚠️ No trailing slash!
4. Wait for auto-redeploy (1-2 min)

---

## ✅ TEST CHECKLIST

- [ ] Railway URL shows welcome message
- [ ] Vercel URL loads login page
- [ ] Can login (admin@gmail.com / Admin@1234)
- [ ] Dashboard loads
- [ ] Can create todos
- [ ] No CORS errors in console (F12)

---

## 🐛 COMMON FIXES

**CORS Error?**
→ Check Railway `FRONTEND_URL` matches Vercel URL exactly

**Can't connect?**
→ Check Vercel `REACT_APP_API_URL` matches Railway URL exactly

**Build failed?**
→ Check root directories are set correctly (`backend` and `frontend`)

---

## 📞 YOUR URLS (Fill as you go)

```
Backend:  https://________________.up.railway.app
Frontend: https://________________.vercel.app
```

---

**Full guide:** See `DEPLOYMENT_STEP_BY_STEP.md`


