# Deployment Guide: Render (Backend) & Vercel (Frontend)

## 🚀 Quick Start Deployment

### 1️⃣ Deploy Backend on Render

#### Step-by-Step:
1. Go to [Render Dashboard](https://dashboard.render.com)
2. Click **"New +"** → Select **"Web Service"**
3. Connect your GitHub repository
4. Fill in the details:
   - **Name:** `chatapp-backend` (or your choice)
   - **Environment:** `Node`
   - **Region:** `Oregon` (or nearest to you)
   - **Branch:** `main`
   - **Build Command:** `npm install`
   - **Start Command:** `node server.js`

5. Go to **Environment** tab and add:
   - **Key:** `GOOGLE_GENERATIVE_AI_KEY`
   - **Value:** Your Google Generative AI API key from [aistudio.google.com/app/apikey](https://aistudio.google.com/app/apikey)

6. Click **"Create Web Service"**
7. Wait for deployment (2-3 minutes)
8. Copy the deployed URL (e.g., `https://chatapp-backend-xxxxx.onrender.com`)

---

### 2️⃣ Deploy Frontend on Vercel

#### Step-by-Step:
1. Go to [Vercel Dashboard](https://vercel.com)
2. Click **"Add New..."** → **"Project"**
3. Select your GitHub repository
4. Fill in the details:
   - **Project Name:** `chatapp-frontend` (or your choice)
   - **Framework Preset:** `Vite`

5. Go to **Environment Variables** and add:
   - **Name:** `VITE_API_URL`
   - **Value:** Your Render backend URL (e.g., `https://chatapp-backend-xxxxx.onrender.com`)
   - **Environments:** Select all (Production, Preview, Development)

6. Click **"Deploy"**
7. Wait for deployment (1-2 minutes)

---

## ⚙️ Environment Variables Setup

### For Render (Backend)
```
PORT=10000 (automatically set by Render, but you can customize)
GOOGLE_GENERATIVE_AI_KEY=your_google_api_key_here
```

### For Vercel (Frontend)
```
VITE_API_URL=https://chatapp-backend-xxxxx.onrender.com
```

---

## 🔧 Important Configuration Details

### Render Backend
- **Port:** Render automatically assigns a port. The `server.js` uses `process.env.PORT || 5174`
- **Node Version:** Uses latest LTS by default
- **Start Command:** `node server.js`

### Vercel Frontend
- **Build:** `npm run build`
- **Output Directory:** `dist`
- **Framework:** Vite (auto-detected)

---

## ✅ Common Issues & Fixes

### Issue 1: "Cannot reach backend" Error
**Solution:** Make sure you've set the `VITE_API_URL` environment variable on Vercel to your Render backend URL.

### Issue 2: CORS Error
**Solution:** The backend already has CORS enabled for all origins (`Access-Control-Allow-Origin: *`). If still issues, ensure the backend is running.

### Issue 3: Google API Key Invalid
**Solution:** Get a new key from [aistudio.google.com/app/apikey](https://aistudio.google.com/app/apikey) and update it in Render environment variables.

### Issue 4: "502 Bad Gateway" on Render
**Solution:** 
1. Check if `server.js` is running with `node server.js`
2. Verify `GOOGLE_GENERATIVE_AI_KEY` is set
3. Check Render logs for errors

---

## 📱 After Deployment

1. **Test Backend:** Visit `https://your-render-url/api/chat` (should give 404 - that's normal)
2. **Test Frontend:** Visit your Vercel URL
3. **Test Chat:** Send a message in the chat and verify it works

---

## 🔄 Updating Deployment

### Update Backend
```bash
git add .
git commit -m "Update backend"
git push origin main
```
Render auto-deploys on git push.

### Update Frontend
```bash
git add .
git commit -m "Update frontend"
git push origin main
```
Vercel auto-deploys on git push.

---

## 📝 Notes

- **API Key Security:** Never hardcode your `.env` file in Git. Use `.env.example` as template.
- **CORS:** Already configured in `server.js` to accept requests from any origin.
- **Port:** Render assigns a dynamic port, but we use `process.env.PORT` to handle it.

---

## 🆘 Need Help?

- **Render Support:** [render.com/docs](https://render.com/docs)
- **Vercel Support:** [vercel.com/support](https://vercel.com/support)
- **Google AI API:** [ai.google.dev/docs](https://ai.google.dev/docs)
