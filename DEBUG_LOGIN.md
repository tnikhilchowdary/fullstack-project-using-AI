# 🔍 Login Issue Debug Guide

## ✅ Backend is Working!
I just tested:
- ✅ Signup: Works perfectly
- ✅ Login: Works perfectly
- ✅ Password hashing: Working correctly

## 🐛 Why You're Seeing "Invalid Credentials"

### Most Common Reasons:

1. **Email Mismatch**
   - Signup: `N@gmail.com` 
   - Login: `n@gmail.com` (lowercase)
   - ❌ These are DIFFERENT emails!

2. **Password Mismatch**
   - You might have entered different password during login

3. **Account Doesn't Exist**
   - Check if signup actually succeeded
   - Look for success message after signup

## 🔧 How to Fix:

### Option 1: Use Exact Same Credentials
1. **For Email**: 
   - If you signed up with `N@gmail.com` (capital N)
   - Login with `N@gmail.com` (same capital N)
   - Emails are case-sensitive in MongoDB!

2. **For Password**:
   - Use exact same password you used during signup
   - No extra spaces

### Option 2: Create New Account
1. Clear your browser cache: `Ctrl + Shift + R`
2. Click "Sign up here"
3. Use new credentials:
   - Name: `Test User`
   - Email: `test@example.com` (all lowercase)
   - Password: `test123` (simple to remember)
   - Confirm: `test123`
4. Click Sign Up
5. Should auto-login to dashboard

### Option 3: Check Browser Console
1. Open DevTools: Press `F12`
2. Go to `Console` tab
3. Try to login
4. Look for any errors in red
5. Share screenshot if you see errors

## 📝 Test These Exact Credentials:

### Account 1 (Already Created):
- Email: `test@gmail.com` (lowercase)
- Password: `123456`

Try logging in with these ↑

### Or Create Account 2:
- Email: `demo@example.com`
- Password: `demo123`

## 🎯 Quick Test:

1. Go to: `http://localhost:3000`
2. Click "Sign up here"
3. Use these EXACT details:
   ```
   Name: Demo User
   Email: demo@test.com
   Password: password123
   Confirm: password123
   ```
4. Click "Sign Up"
5. Should redirect to dashboard
6. Logout (click profile → logout)
7. Try login with:
   ```
   Email: demo@test.com
   Password: password123
   ```
8. Should work! ✅

## ⚠️ Important Notes:

1. **Email is Case-Sensitive**: 
   - `Test@gmail.com` ≠ `test@gmail.com`

2. **Password Must Match Exactly**:
   - Check for spaces
   - Check caps lock

3. **Use Simple Passwords for Testing**:
   - `test123`
   - `password`
   - `123456`

## 🔍 Still Not Working?

Try this in browser console (F12):
```javascript
// Clear everything
localStorage.clear();
// Refresh page
window.location.reload();
```

Then create a completely new account with simple credentials.

