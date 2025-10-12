# 🔧 Railway Deployment - Troubleshooting Guide

Quick solutions to common Railway deployment issues.

---

## 🚨 Build & Deployment Issues

### ❌ Build Failed: "Cannot find module"

**Symptoms:**
- Build logs show `Error: Cannot find module 'express'`
- Deployment fails during install phase

**Solution:**
```bash
# 1. Make sure all dependencies are in package.json
cd backend
npm install

# 2. Verify package.json has all dependencies
cat package.json

# 3. Commit and push
git add package.json package-lock.json
git commit -m "Fix dependencies"
git push

# Railway will auto-redeploy
```

---

### ❌ Build Failed: "Root Directory Not Found"

**Symptoms:**
- Build logs show `Error: No such file or directory`
- Can't find backend folder

**Solution:**
1. Go to Railway Dashboard
2. Click on your service
3. **Settings** → **Service**
4. Set **Root Directory**: `backend`
5. Click **Save**
6. Railway will auto-redeploy

---

### ❌ Deployment Successful but App Crashes

**Symptoms:**
- Build succeeds
- Deployment shows "Crashed"
- Logs show error after startup

**Solution:**

**Check Start Command:**
1. Railway Settings → **Service**
2. Verify **Start Command**: `npm start`
3. Make sure package.json has:
```json
{
  "scripts": {
    "start": "node server.js"
  }
}
```

**Check Logs:**
1. Railway → **Deployments** → Latest
2. Read error messages
3. Common issues:
   - Missing environment variables
   - Wrong PORT binding
   - Database connection failed

---

## 🔌 Connection Issues

### ❌ MongoDB Connection Error

**Symptoms:**
- Logs show: `MongoNetworkError` or `MongoTimeoutError`
- App crashes on startup
- Database status: "Disconnected"

**Solution:**

**Step 1: Check MongoDB URI**
1. Railway → **Variables**
2. Verify `MONGODB_URI` is correct
3. Check for special characters (use URL encoding):
   - `@` → `%40`
   - `#` → `%23`
   - Example: `password@123` → `password%40123`

**Step 2: Whitelist Railway IPs in MongoDB**
1. Go to MongoDB Atlas → **Network Access**
2. Click **"Add IP Address"**
3. Select **"Allow Access from Anywhere"** (0.0.0.0/0)
4. Click **Confirm**
5. Wait 1-2 minutes
6. Redeploy on Railway

**Step 3: Test Connection String**
```bash
# Use Railway CLI to test
railway run node -e "const mongoose = require('mongoose'); mongoose.connect(process.env.MONGODB_URI).then(() => console.log('Connected!')).catch(err => console.error(err));"
```

---

### ❌ Frontend Can't Connect to Backend

**Symptoms:**
- Browser console: `Network Error` or `Failed to fetch`
- Login doesn't work
- API calls fail

**Solution:**

**Step 1: Verify Backend URL**
1. Visit your Railway URL directly in browser
2. Should see: `{"message": "Welcome to MERN Todo API..."}`
3. If not, backend isn't running properly

**Step 2: Check Frontend Environment Variable**
1. Vercel Dashboard → Your Project → **Settings** → **Environment Variables**
2. Verify `REACT_APP_API_URL` equals your Railway URL
3. **Important**: No trailing slash!
   - ✅ `https://app.up.railway.app`
   - ❌ `https://app.up.railway.app/`
4. After changing, redeploy frontend

**Step 3: Check CORS Configuration**
1. Railway → **Variables**
2. Verify `FRONTEND_URL` equals your Vercel URL
3. No trailing slash!
4. Redeploy backend after changing

---

### ❌ CORS Error in Browser

**Symptoms:**
- Browser console: `Access-Control-Allow-Origin` error
- API calls blocked by CORS policy
- Login fails silently

**Solution:**

**Quick Fix:**
1. Railway → **Variables**
2. Check `FRONTEND_URL`:
   ```
   FRONTEND_URL=https://your-app.vercel.app
   ```
3. Must match **exactly** with Vercel URL
4. No `http://` if Vercel uses `https://`
5. No trailing `/`
6. Save and redeploy

**Verify CORS Setup in Code:**
```javascript
// backend/server.js should have:
const corsOptions = {
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true,
  optionsSuccessStatus: 200
};
app.use(cors(corsOptions));
```

**Test CORS:**
```bash
# From terminal
curl -H "Origin: https://your-app.vercel.app" \
     -H "Access-Control-Request-Method: POST" \
     -X OPTIONS \
     https://your-railway-url.up.railway.app/api/auth/login -v
```

Look for: `Access-Control-Allow-Origin: https://your-app.vercel.app`

---

## 🔐 Authentication Issues

### ❌ Login Doesn't Work

**Symptoms:**
- Login form submits but nothing happens
- No error message
- Console shows 401 or 403

**Solution:**

**Step 1: Check JWT Secret**
1. Railway → **Variables**
2. Verify `JWT_SECRET` is set
3. If missing, add it:
   ```
   JWT_SECRET=your-super-secret-jwt-key-change-this-in-production-12345
   ```

**Step 2: Verify Admin User Exists**
1. MongoDB Atlas → **Browse Collections**
2. Database: `tnc-project` → Collection: `users`
3. Should see admin user with `isAdmin: true`
4. If not, create it (see main guide)

**Step 3: Check Password Hash**
```bash
# Test login via Railway CLI
railway run node -e "
const bcrypt = require('bcryptjs');
console.log(bcrypt.compareSync('Admin@1234', '$2a$10$8K1p/s4d5VrqEtKnY9pRAeJxGp9B7bqVYrHmLcqxJq5yPWqF1YjHe'));
"
```
Should output: `true`

---

### ❌ Token Expired or Invalid

**Symptoms:**
- Logged in but redirected to login
- Console: `Token expired` or `Invalid token`
- Random logouts

**Solution:**

**Check Token Expiry:**
```javascript
// backend/controllers/authController.js
// Token should have expiry:
const token = jwt.sign(
  { id: user._id },
  process.env.JWT_SECRET,
  { expiresIn: '7d' } // ← Make sure this is set
);
```

**Clear Browser Data:**
1. Open browser DevTools (F12)
2. Application → Local Storage
3. Clear all entries
4. Refresh and login again

---

## 💬 Socket.io Issues

### ❌ Team Chat Not Working

**Symptoms:**
- Messages don't send
- Console: `WebSocket connection failed`
- Chat seems disconnected

**Solution:**

**Step 1: Verify Socket.io Connection**
```javascript
// Check frontend/src/pages/Chat.js or TeamChat component
// Should connect to Railway URL:
const socket = io(process.env.REACT_APP_API_URL || 'http://localhost:5000');
```

**Step 2: Check Railway WebSocket Support**
1. Railway **fully supports WebSockets** ✅
2. No additional config needed
3. Check Railway logs for Socket.io messages:
   ```
   👤 User connected: xxxxx
   💬 Socket.io is ready
   ```

**Step 3: Check CORS for Socket.io**
```javascript
// backend/server.js
const io = new Server(server, {
  cors: {
    origin: process.env.FRONTEND_URL || "http://localhost:3000",
    methods: ["GET", "POST"],
    credentials: true
  }
});
```

**Step 4: Test Socket Connection**
1. Open browser console (F12)
2. Look for Socket.io connection logs
3. Should see: `Socket connected: xxxxx`

---

## 📊 Environment Variables Issues

### ❌ Environment Variable Not Working

**Symptoms:**
- Variable shows in Railway but not in app
- `undefined` errors in logs
- Features relying on env vars fail

**Solution:**

**Step 1: Verify Variable Name**
1. Railway → **Variables**
2. Check exact spelling (case-sensitive!)
3. Common mistakes:
   - `MONGO_URI` vs `MONGODB_URI`
   - `FRONTEND_URL` vs `FRONTEND_URL `(extra space)

**Step 2: Redeploy After Adding Variables**
1. Adding variables doesn't auto-redeploy
2. After adding all variables, manually redeploy:
   - Railway → **Deployments**
   - Click **"..."** → **"Redeploy"**

**Step 3: Check in Logs**
```javascript
// Add to backend/server.js temporarily:
console.log('Environment Variables:', {
  MONGODB_URI: process.env.MONGODB_URI ? 'Set ✅' : 'Missing ❌',
  JWT_SECRET: process.env.JWT_SECRET ? 'Set ✅' : 'Missing ❌',
  FRONTEND_URL: process.env.FRONTEND_URL,
  PORT: process.env.PORT
});
```

Check Railway logs after deployment.

---

## 🌐 Domain & Networking Issues

### ❌ No Domain Generated

**Symptoms:**
- Can't access app via URL
- Railway shows service but no domain

**Solution:**

1. Railway → Your Service → **Settings**
2. Scroll to **Networking**
3. Click **"Generate Domain"**
4. Wait ~30 seconds for DNS propagation
5. Domain appears: `https://xxxxx.up.railway.app`

---

### ❌ Domain Shows "Not Found"

**Symptoms:**
- Domain generated but shows 404
- Can't access app

**Solution:**

**Check Service is Running:**
1. Railway → **Deployments**
2. Latest deployment should be green (Success)
3. If red (Failed), check logs

**Check Port Binding:**
```javascript
// backend/server.js
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
```

Railway sets `PORT` automatically - use `process.env.PORT`!

---

## 🐛 Debugging Tips

### View Real-Time Logs

```bash
# Install Railway CLI
npm install -g @railway/cli

# Login
railway login

# Link to project
railway link

# View logs (real-time)
railway logs
```

### SSH into Railway Service

```bash
# Using Railway CLI
railway run bash

# Then you can:
node -v          # Check Node version
npm list         # List installed packages
ls -la           # See files
cat .env         # Won't work (env vars not in files)
printenv         # See environment variables
```

### Test Individual Components

```bash
# Test database connection
railway run node -e "require('./backend/server.js')"

# Test API endpoint
curl https://your-app.up.railway.app/api/test

# Test with auth
curl -X POST https://your-app.up.railway.app/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@gmail.com","password":"Admin@1234"}'
```

---

## 📋 Pre-Deployment Checklist

Before deploying, verify:

**Code:**
- [ ] All changes committed and pushed to GitHub
- [ ] `backend/package.json` has all dependencies
- [ ] `.env` files in `.gitignore`
- [ ] `server.js` uses `process.env.PORT`

**MongoDB:**
- [ ] Connection string is correct
- [ ] Password is URL-encoded
- [ ] Network Access allows 0.0.0.0/0
- [ ] Database and collections exist

**Railway:**
- [ ] Root directory set to `backend`
- [ ] All environment variables added
- [ ] Domain generated
- [ ] Latest deployment successful

**Vercel:**
- [ ] Root directory set to `frontend`
- [ ] `REACT_APP_API_URL` points to Railway
- [ ] Latest deployment successful

---

## 🆘 Emergency Fixes

### App Completely Down

**Quick Recovery:**

```bash
# 1. Check if backend is running
curl https://your-railway-url.up.railway.app

# 2. Check Railway status
# Visit https://railway.app/status

# 3. View logs
railway logs --tail 100

# 4. Force redeploy
# Railway Dashboard → Deployments → "..." → Redeploy

# 5. Check MongoDB
# Atlas Dashboard → Database → should show "Active"

# 6. Verify environment variables
# Railway → Variables → all should be set
```

### Roll Back to Previous Version

1. Railway → **Deployments**
2. Find last working deployment (green check)
3. Click **"..."** → **"Redeploy"**
4. This will roll back to that version

---

## 📞 Get Help

### Railway Support

1. **Discord**: https://discord.gg/railway
   - Active community
   - Railway team responds quickly

2. **Documentation**: https://docs.railway.app
   - Comprehensive guides
   - Troubleshooting section

3. **Twitter**: @Railway
   - Updates and announcements

### MongoDB Support

- **Documentation**: https://docs.atlas.mongodb.com
- **Community Forums**: https://community.mongodb.com
- **Support**: MongoDB Atlas support (free tier has community support)

### Vercel Support

- **Documentation**: https://vercel.com/docs
- **Discord**: https://vercel.com/discord
- **Support**: support@vercel.com

---

## 🔍 Common Error Messages

| Error | Likely Cause | Quick Fix |
|-------|-------------|-----------|
| `ENOTFOUND` | DNS resolution failed | Check domain spelling |
| `ECONNREFUSED` | Can't connect to service | Service might be down, check Railway status |
| `MongoNetworkError` | Can't reach MongoDB | Whitelist Railway IPs in Atlas |
| `MongoServerError: bad auth` | Wrong credentials | Check MONGODB_URI password |
| `JsonWebTokenError` | Invalid JWT | Check JWT_SECRET is set |
| `CORS error` | Wrong origin | Update FRONTEND_URL |
| `Cannot read property of undefined` | Missing env var | Check all variables are set |
| `Port already in use` | PORT conflict | Railway handles this, check logs |

---

## ✅ Health Check Script

Create this to verify everything is working:

```bash
#!/bin/bash
# Save as check-deployment.sh

echo "🔍 Checking Railway Deployment..."

# Check backend
echo ""
echo "1. Testing Backend..."
BACKEND_URL="https://your-railway-url.up.railway.app"
RESPONSE=$(curl -s $BACKEND_URL)
if [[ $RESPONSE == *"Welcome to MERN Todo API"* ]]; then
  echo "✅ Backend is UP"
else
  echo "❌ Backend is DOWN"
fi

# Check database
echo ""
echo "2. Testing Database Connection..."
DB_RESPONSE=$(curl -s $BACKEND_URL/api/test)
if [[ $DB_RESPONSE == *"Connected"* ]]; then
  echo "✅ Database is CONNECTED"
else
  echo "❌ Database is DISCONNECTED"
fi

# Check frontend
echo ""
echo "3. Testing Frontend..."
FRONTEND_URL="https://your-vercel-url.vercel.app"
FRONTEND_STATUS=$(curl -s -o /dev/null -w "%{http_code}" $FRONTEND_URL)
if [[ $FRONTEND_STATUS == "200" ]]; then
  echo "✅ Frontend is UP"
else
  echo "❌ Frontend is DOWN (Status: $FRONTEND_STATUS)"
fi

echo ""
echo "✅ Deployment Check Complete!"
```

---

## 🎯 Success Indicators

Your deployment is healthy when:

✅ Railway deployment status: **Success**  
✅ Backend URL loads: JSON response visible  
✅ Database status: **Connected**  
✅ Frontend loads: No blank page  
✅ Login works: Redirects to dashboard  
✅ API calls work: No network errors  
✅ Socket.io connected: Real-time chat works  
✅ No CORS errors in console  
✅ Railway usage: Under $5/month  

---

**Still having issues?** Check the step-by-step guide: `RAILWAY_STEP_BY_STEP.md`

