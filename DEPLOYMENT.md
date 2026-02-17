# Deployment Guide - Vercel (Frontend) & Render/Railway (Backend)

## 🚀 Deploy Backend to Render

### Step 1: Prepare Repository

Create a Git repository if you don't have one:

```bash
git init
git add .
git commit -m "Initial commit"
```

Push to GitHub/GitLab/Bitbucket (Render supports all).

### Step 2: Create Render Account

1. Go to https://render.com
2. Sign up with GitHub
3. Connect your Git provider

### Step 3: Create Web Service

1. Click "New +" → "Web Service"
2. Select your repository
3. Configure:
   - **Name**: `anniversary-scrapbook-api`
   - **Environment**: `Node`
   - **Build Command**: `cd server && npm install`
   - **Start Command**: `cd server && npm start`
   - **Root Directory**: `.` (or leave empty)

### Step 4: Set Environment Variables

In Render dashboard → Environment:

```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/anniversary-scrapbook
JWT_SECRET=your_very_secure_random_key_here_minimum_32_chars
NODE_ENV=production
VITE_API_URL=https://your-frontend-url.vercel.app
PORT=10000
```

**Important**: Render assigns a dynamic PORT, use 10000 as fallback.

### Step 5: Deploy

- Click "Deploy"
- Wait for build completion
- Your backend URL: `https://anniversary-scrapbook-api.onrender.com`

**Note**: Free tier on Render spins down after 15 minutes of inactivity. Upgrade to Pro for always-on.

## 🌐 Deploy Frontend to Vercel

### Step 1: Create Vercel Account

1. Go to https://vercel.com
2. Sign up with GitHub
3. Connect your repository

### Step 2: Import Project

1. Click "Add New..." → "Project"
2. Select your repository
3. Configure:
   - **Framework**: React (auto-detected)
   - **Root Directory**: `client`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`

### Step 3: Set Environment Variables

In Vercel → Settings → Environment Variables:

```
VITE_API_URL=https://your-backend-url.onrender.com/api
```

Replace with your actual backend URL from Render.

### Step 4: Deploy

- Click "Deploy"
- Wait for build completion
- Your frontend URL: `https://anniversary-scrapbook.vercel.app`

## 🚀 Alternative: Deploy Backend to Railway

### Step 1: Create Railway Account

1. Go to https://railway.app
2. Sign up with GitHub
3. Create new project

### Step 2: Add Service

1. Click "Add Service" → "GitHub Repo"
2. Select your repository
3. Configure environment variables

### Step 3: Set Up Environment Variables

```
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
NODE_ENV=production
VITE_API_URL=https://your-vercel-url.vercel.app
```

### Step 4: Configure Build

In Railway:
- **Start Command**: `cd server && npm install && npm start`
- **Port**: `5000`

### Step 5: Deploy

- Railway auto-deploys on Git push
- Your backend URL: `https://your-project.railway.app`

## 🔗 Connect Frontend & Backend

### Update Frontend Environment

After backend deployment:

1. **Vercel Dashboard** → Project → Settings → Environment Variables
2. Update `VITE_API_URL`:
   ```
   VITE_API_URL=https://anniversary-scrapbook-api.onrender.com/api
   ```
3. Trigger redeploy (push to GitHub or click "Redeploy")

### Test Connection

After both deployed:

```bash
# Test backend
curl https://anniversary-scrapbook-api.onrender.com/api/health

# Should respond with: {"status":"Server is running"}
```

## 🗄️ Setup MongoDB Atlas (if not done)

### Step 1: Create MongoDB Atlas Account

1. Go to https://www.mongodb.com/cloud/atlas
2. Sign up free
3. Create organization and project

### Step 2: Create Database

1. Click "Create" → Database
2. Choose "M0 Sandbox" (free)
3. Select cloud provider (AWS/Google Cloud/Azure)
4. Select region closest to you

### Step 3: Add IP Whitelist

1. Go to "Network Access"
2. Click "Add IP Address"
3. For development: Add your IP
4. For production: Add `0.0.0.0/0` (allows all - use with caution)

### Step 4: Create Database User

1. Go to "Database Access"
2. Click "Add New Database User"
3. Choose "Password" authentication
4. Create username and strong password
5. Give "Atlas Admin" role

### Step 5: Get Connection String

1. Go to "Databases" → "Connect"
2. Choose "Connect your application"
3. Copy connection string
4. Replace `<username>`, `<password>`, `<dbname>`

Example:
```
mongodb+srv://myuser:mypassword@cluster0.mongodb.net/anniversary-scrapbook?retryWrites=true&w=majority
```

## 📊 Environment Variables Checklist

### Backend (Render/Railway)
- [ ] MONGODB_URI - MongoDB Atlas connection string
- [ ] JWT_SECRET - Strong random key (min 32 chars)
- [ ] NODE_ENV - Set to `production`
- [ ] VITE_API_URL - Your Vercel frontend URL

### Frontend (Vercel)
- [ ] VITE_API_URL - Your Render/Railway backend URL with `/api`

## 🔒 Security Best Practices

1. **Never commit `.env` files** - Use environment variables in deployment platforms
2. **Use strong JWT secrets** - Min 32 random characters
3. **Enable IP whitelisting** - MongoDB Atlas → Network Access
4. **Use HTTPS only** - Both Render and Vercel provide SSL
5. **Keep dependencies updated** - Regularly run `npm update`
6. **Monitor API usage** - Set up alerts for unusual activity

## 📈 Performance Optimization

### Frontend (Vercel)
- Automatic CDN caching
- Image optimization
- Edge functions support
- Automatic deployment previews

### Backend (Render)
- Connection pooling for MongoDB
- Caching strategies
- Rate limiting middleware
- Request compression

## 🆘 Troubleshooting Deployment

### "Cannot find module" Error
```
npm install missing dependencies
git push (redeploy)
```

### CORS Errors in Production
- Update backend `CORS_ORIGIN` variable
- Verify frontend URL in backend config

### MongoDB Connection Timeout
- Check IP whitelist on MongoDB Atlas
- Verify connection string format
- Check network connectivity

### Blank Page on Frontend
- Check browser console for errors
- Verify `VITE_API_URL` is set correctly
- Check Network tab in DevTools

## 📋 Final Deployment Checklist

- [ ] MongoDB Atlas account created and configured
- [ ] Backend pushed to GitHub
- [ ] Backend deployed on Render/Railway
- [ ] Backend `.env` variables set correctly
- [ ] Backend tests passing (health check works)
- [ ] Frontend pushed to GitHub
- [ ] Frontend deployed on Vercel
- [ ] Frontend `VITE_API_URL` points to backend
- [ ] Frontend tests passing (can login, create scrapbook)
- [ ] HTTPS working on both
- [ ] Custom domain configured (optional)
- [ ] SSL certificates auto-renewed
- [ ] Monitoring/alerts set up

## 📞 Support Resources

- **Render Docs**: https://render.com/docs
- **Vercel Docs**: https://vercel.com/docs
- **Railway Docs**: https://docs.railway.app
- **MongoDB Atlas Docs**: https://docs.atlas.mongodb.com

Your anniversary scrapbook is now live! 🎉💕
