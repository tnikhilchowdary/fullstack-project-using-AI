# 🔐 Environment Variables Setup

## Backend Environment Variables

Create a file `backend/.env` with:

```env
# MongoDB Connection (Your actual connection string)
MONGODB_URI=mongodb+srv://tnc:tnc%401234@cluster0.issjpdv.mongodb.net/tnc-project?retryWrites=true&w=majority&appName=Cluster0

# JWT Secret (Change this to a random string in production!)
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production-12345

# Server Port
PORT=5000

# Frontend URL (for CORS)
FRONTEND_URL=http://localhost:3000
```

### For Production (Render):

Same variables, but update `FRONTEND_URL` to your Vercel URL:
```env
FRONTEND_URL=https://your-app-name.vercel.app
```

---

## Frontend Environment Variables (Optional)

If you want to explicitly set the API URL, create `frontend/.env.local`:

```env
REACT_APP_API_URL=http://localhost:5000
```

### For Production (Vercel):

Update to your deployed backend URL:
```env
REACT_APP_API_URL=https://your-backend.onrender.com
```

---

## Important Notes:

1. **Never commit `.env` files to git!** ✅ Already in .gitignore
2. **Use strong random strings for JWT_SECRET in production**
3. **URL-encode special characters in MongoDB password** (@ becomes %40)
4. **Update FRONTEND_URL after deploying frontend**

---

## Your Current MongoDB Details:

- **Username**: `tnc`
- **Password**: `tnc@1234` (URL-encoded: `tnc%401234`)
- **Cluster**: `cluster0.issjpdv.mongodb.net`
- **Database**: `tnc-project`

---

## Generate Strong JWT Secret:

Node.js:
```javascript
require('crypto').randomBytes(64).toString('hex')
```

Or use online generator: https://randomkeygen.com/





