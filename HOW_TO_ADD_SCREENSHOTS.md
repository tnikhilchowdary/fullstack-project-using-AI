# 📸 How to Add Screenshots to GitHub

**Follow these steps to make your screenshots visible on GitHub!**

---

## Step 1: Save Your Screenshots

Save your screenshots with these exact names in the `screenshots/` folder:

1. `app-dashboard-light.png` - Dashboard (Light Theme)
2. `app-dashboard-dark.png` - Dashboard (Dark Theme)
3. `app-add-todo-light.png` - Add Todo Page
4. `app-view-tasks-light.png` - View Tasks Page
5. `app-analytics-light.png` - Analytics Dashboard
6. `app-team-chat-light.png` - Team Chat

---

## Step 2: Add Images to Repository

### Option A: Using GitHub Web Interface

1. Go to your repository: https://github.com/tnikhilchowdary/fullstack-project-using-AI
2. Click on `screenshots/` folder
3. Click **"Add file"** → **"Upload files"**
4. Drag and drop your screenshot images
5. Click **"Commit changes"**

### Option B: Using Git Commands

```bash
# Navigate to your project
cd C:\Users\tnikh\Desktop\project-app-assignment

# Copy your screenshot images to the screenshots folder
# (Make sure they have the exact names listed above)

# Add images to git
git add screenshots/*.png

# Commit
git commit -m "Add application screenshots"

# Push to GitHub
git push origin main
```

---

## Step 3: Verify Images Display

After pushing, check your README on GitHub:
- https://github.com/tnikhilchowdary/fullstack-project-using-AI

The screenshots should now display as images in the README!

---

## 📝 Image Naming Convention

Make sure your images are named exactly:
- ✅ `app-dashboard-light.png` (correct)
- ❌ `dashboard-light.png` (wrong - missing "app-" prefix)
- ❌ `App-Dashboard-Light.PNG` (wrong - case sensitive)

---

## 🎯 Quick Checklist

- [ ] Screenshots saved with correct names
- [ ] Images placed in `screenshots/` folder
- [ ] Images added to git (`git add screenshots/*.png`)
- [ ] Committed (`git commit`)
- [ ] Pushed to GitHub (`git push`)
- [ ] Verified on GitHub README

---

**Once you add the images, they'll automatically display in the README!** 🎉

