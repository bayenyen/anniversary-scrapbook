# Anniversary Scrapbook & Love Letter Web Application - Installation Guide

## 📋 Prerequisites

- Node.js (v16 or higher)
- MongoDB (local or Atlas)
- npm or yarn
- Git

## 🚀 Quick Start

### 1. Clone/Setup Project

```bash
cd anniversary-scrapbook
```

### 2. Backend Setup

```bash
# Navigate to server directory
cd server

# Install dependencies
npm install

# Create .env file
cp .env.example .env
```

#### Configure Backend .env

Edit `server/.env`:

```env
# MongoDB (Required - Replace with your connection string)
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/anniversary-scrapbook?retryWrites=true&w=majority

# JWT Secret (Create a random strong string)
JWT_SECRET=your_super_secret_jwt_key_12345

# Server Configuration
PORT=5000
NODE_ENV=development

# CORS Configuration
VITE_API_URL=http://localhost:5173
```

#### Important: MongoDB Connection

The application **ONLY requires** the `MONGODB_URI` environment variable. You can:

- **Use MongoDB Atlas (Recommended)**: 
  - Create free account at https://www.mongodb.com/cloud/atlas
  - Create a cluster
  - Get connection string (replace `<username>`, `<password>`, and `<dbname>`)
  
- **Use Local MongoDB**:
  ```
  MONGODB_URI=mongodb://localhost:27017/anniversary-scrapbook
  ```

#### Create uploads folder

```bash
# In server directory
mkdir -p uploads/memories
```

#### Start Backend

```bash
# Development (with auto-reload)
npm run dev

# Production
npm start
```

The server will run on `http://localhost:5000`

### 3. Frontend Setup

```bash
# In a new terminal, navigate to client directory
cd client

# Install dependencies
npm install

# Create .env file
cp .env.example .env
```

#### Configure Frontend .env

Edit `client/.env`:

```env
VITE_API_URL=http://localhost:5000/api
```

#### Start Frontend

```bash
npm run dev
```

The app will run on `http://localhost:5173`

### 4. Access the Application

- **Main App**: http://localhost:5173
- **Backend API**: http://localhost:5000/api
- **API Health Check**: http://localhost:5000/api/health

## 📦 API Testing

Test the API using curl or Postman:

```bash
# Health check
curl http://localhost:5000/api/health

# Register
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"John","email":"john@example.com","password":"123456"}'

# Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"john@example.com","password":"123456"}'
```

## 🌐 Environment Variables Summary

### Backend (`server/.env`)
| Variable | Required | Example |
|----------|----------|---------|
| MONGODB_URI | ✅ | mongodb+srv://user:pass@cluster.mongodb.net/db |
| JWT_SECRET | ✅ | your_secret_key_here |
| PORT | ❌ | 5000 |
| NODE_ENV | ❌ | development |
| VITE_API_URL | ❌ | http://localhost:5173 |

### Frontend (`client/.env`)
| Variable | Required | Example |
|----------|----------|---------|
| VITE_API_URL | ✅ | http://localhost:5000/api |

## 🐛 Troubleshooting

### MongoDB Connection Error
```
Error connecting to MongoDB: connect ECONNREFUSED
```
**Solution**: Verify your MongoDB connection string in `.env`. For MongoDB Atlas, ensure:
- IP whitelist includes your current IP (or 0.0.0.0 for development)
- Connection string is correct
- Database user has proper permissions

### CORS Error
```
Access to XMLHttpRequest blocked by CORS policy
```
**Solution**: Ensure frontend URL matches `VITE_API_URL` in backend and backend CORS config

### Port Already in Use
```bash
# Kill process on port 5000
lsof -ti:5000 | xargs kill -9

# Or use different port
PORT=5001 npm start
```

### Images Not Loading
- Ensure `/uploads` folder exists in server root
- Check permissions on uploads folder
- Verify image files are saved correctly

## 📁 Project Structure

```
anniversary-scrapbook/
├── server/
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── scrapbookController.js
│   │   ├── memoryController.js
│   │   └── loveLetterController.js
│   ├── middleware/
│   │   ├── auth.js
│   │   └── errorHandler.js
│   ├── models/
│   │   ├── User.js
│   │   ├── Scrapbook.js
│   │   ├── Memory.js
│   │   └── LoveLetter.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── scrapbookRoutes.js
│   │   ├── memoryRoutes.js
│   │   └── loveLetterRoutes.js
│   ├── uploads/
│   │   └── memories/
│   ├── .env.example
│   ├── package.json
│   └── server.js
│
└── client/
    ├── src/
    │   ├── components/
    │   │   └── ProtectedRoute.jsx
    │   ├── context/
    │   │   └── AuthContext.jsx
    │   ├── pages/
    │   │   ├── LoginPage.jsx
    │   │   ├── RegisterPage.jsx
    │   │   ├── DashboardPage.jsx
    │   │   ├── ScrapbookEditorPage.jsx
    │   │   └── PublicScrapbookPage.jsx
    │   ├── services/
    │   │   └── api.js
    │   ├── App.jsx
    │   ├── main.jsx
    │   └── index.css
    ├── .env.example
    ├── index.html
    ├── package.json
    ├── postcss.config.js
    ├── tailwind.config.js
    └── vite.config.js
```

## ✅ Verification Checklist

- [ ] Node.js installed (`node -v`)
- [ ] MongoDB URL ready
- [ ] Backend `.env` configured with MONGODB_URI
- [ ] Frontend `.env` configured
- [ ] Backend `npm install` completed
- [ ] Frontend `npm install` completed
- [ ] Server running on port 5000
- [ ] Client running on port 5173
- [ ] Can access http://localhost:5173
- [ ] Can register and login
- [ ] Can create scrapbooks
- [ ] Can add memories
- [ ] Can write love letters

## 📞 Support

For issues:
1. Check MongoDB connection
2. Verify all `.env` variables
3. Check console for error messages
4. Ensure ports 5000 and 5173 are available
5. Clear browser cache if needed

Good luck with your anniversary scrapbook! 💕
