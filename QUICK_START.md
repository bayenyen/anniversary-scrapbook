# 🚀 Quick Setup Reference

## 5-Minute Quick Start

### Prerequisites Installed?
```bash
node -v        # Should be v16+
npm -v         # Should be v7+
```

### 1️⃣ Backend Setup (Terminal 1)

```bash
cd anniversary-scrapbook/server

# Install dependencies
npm install

# Create .env file
echo 'MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/anniversary-scrapbook?retryWrites=true&w=majority
JWT_SECRET=your_super_secure_random_key_minimum_32_chars_long
NODE_ENV=development
PORT=5000
VITE_API_URL=http://localhost:5173' > .env

# Create upload folder
mkdir -p uploads/memories

# Start server
npm run dev
```

✅ Server running on `http://localhost:5000`

### 2️⃣ Frontend Setup (Terminal 2)

```bash
cd anniversary-scrapbook/client

# Install dependencies
npm install

# Create .env file
echo 'VITE_API_URL=http://localhost:5000/api' > .env

# Start development server
npm run dev
```

✅ Frontend running on `http://localhost:5173`

### 3️⃣ Test Application

Open browser: **http://localhost:5173**

1. Register new account
2. Create anniversary scrapbook
3. Add memories with photos
4. Write love letter
5. Share scrapbook link

## 📋 Environment Variables

### Backend `.env` Required
```env
MONGODB_URI=your_mongodb_connection_string_here
JWT_SECRET=create_a_random_32_char_string_here
```

### Frontend `.env` Required
```env
VITE_API_URL=http://localhost:5000/api
```

## 🔑 Get MongoDB Connection String

**Free MongoDB Atlas** (Recommended)
1. Go to https://www.mongodb.com/cloud/atlas
2. Create free account
3. Create cluster (M0 is free)
4. Click "Connect" → "Connect your application"
5. Copy connection string
6. Replace `<username>`, `<password>`, `<dbname>`

**Local MongoDB**
```
mongodb://localhost:27017/anniversary-scrapbook
```

## 🛠️ Commands Cheatsheet

### Backend
```bash
cd server
npm install          # First time only
npm run dev         # Development with auto-reload
npm start           # Production
npm run build       # Build for production
```

### Frontend
```bash
cd client
npm install         # First time only
npm run dev         # Development
npm run build       # Build for production
npm run preview     # Preview production build
```

## 📁 Key Files

| File | Purpose |
|------|---------|
| `server/server.js` | Express server entry point |
| `client/src/App.jsx` | React router configuration |
| `server/.env` | Backend configuration |
| `client/.env` | Frontend configuration |
| `server/models/` | MongoDB schemas |
| `client/src/pages/` | React page components |

## 🐛 Quick Fixes

### MongoDB Connection Error
```bash
# Update .env with correct connection string
# Make sure IP whitelist is set in MongoDB Atlas
```

### Port Already in Use
```bash
# Use different port
PORT=5001 npm start
```

### Cannot find module
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

### CORS Error
```bash
# Check frontend URL in backend CORS config
# Update .env VITE_API_URL
```

## 📚 Documentation Files

- **README.md** - Project overview and features
- **INSTALLATION.md** - Detailed installation guide
- **DEPLOYMENT.md** - Deploy to Vercel & Render
- **API.md** - Complete API documentation
- **Quick Setup** - This file

## ✅ Verification Checklist

After setup, verify:

- [ ] Backend health check: `curl http://localhost:5000/api/health`
- [ ] Frontend loads: http://localhost:5173
- [ ] Can register new account
- [ ] Can login
- [ ] Can create scrapbook
- [ ] Can add memory with image
- [ ] Can write love letter
- [ ] Can share scrapbook link

## 🚀 Next Steps

1. **Test Thoroughly**
   - Create multiple scrapbooks
   - Test all features
   - Share links with others

2. **Customize**
   - Update colors in `tailwind.config.js`
   - Modify fonts in `client/index.html`
   - Add custom animations

3. **Deploy**
   - Follow `DEPLOYMENT.md`
   - Push to GitHub
   - Deploy to Vercel (frontend) & Render (backend)

## 💡 Tips & Tricks

### Add Test Data Quickly
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"test@example.com","password":"Test123"}'
```

### View Database (MongoDB Compass)
```
mongodb://localhost:27017
# or use MongoDB Atlas web interface
```

### Clear All Data (Dev Only)
```bash
# In MongoDB Atlas:
# 1. Go to Collections
# 2. Drop all collections
# Or delete the entire database
```

### Enable Debug Logs
```bash
# Backend
DEBUG=* npm run dev

# Frontend (in browser console)
localStorage.debug = '*'
```

## 📞 Need Help?

1. Check error messages in console
2. Review INSTALLATION.md for troubleshooting
3. Verify all .env variables are set
4. Check MongoDB connection
5. Restart both servers

## 🎯 File Structure

```
anniversary-scrapbook/
├── server/
│   ├── .env              ← Add MONGODB_URI & JWT_SECRET
│   ├── package.json
│   ├── server.js
│   ├── config/db.js
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   └── uploads/
│
└── client/
    ├── .env              ← Add VITE_API_URL
    ├── package.json
    ├── src/
    │   ├── App.jsx
    │   ├── main.jsx
    │   ├── pages/
    │   ├── components/
    │   ├── context/
    │   └── services/
    └── index.html
```

## 🎉 You're Ready!

Your anniversary scrapbook application is ready to run! 

**Happy Creating! ❤️**

---

*Last Updated: January 2024*
*Questions? Check README.md or INSTALLATION.md*
