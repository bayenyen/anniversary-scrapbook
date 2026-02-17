# 💕 Anniversary Scrapbook & Love Letter Web Application

A modern, romantic MERN stack application for creating beautiful digital anniversary scrapbooks with photos, memories, love letters, and shareable links.

![Love Stories](https://img.shields.io/badge/Made%20with-%F0%9F%92%95-red)
![License](https://img.shields.io/badge/license-MIT-green)

## ✨ Features

### 📸 Photo Scrapbooks
- Create multiple anniversary scrapbooks
- Add photos with captions and dates
- Organize memories chronologically
- Add location and mood tags to each memory
- Responsive image gallery with smooth animations

### ❤️ Love Letters
- Write heartfelt love letters to your special one
- Rich text support with elegant typography
- Optional scheduled reveal dates
- Private and secure

### 🎨 Beautiful UI
- Soft romantic design with pastel gradients
- Glassmorphism cards and smooth animations
- Mobile-first responsive design
- Framer Motion smooth transitions
- Dark mode support (optional)

### 🔒 Security & Privacy
- User authentication with JWT tokens
- Password-hashed accounts (bcrypt)
- Optional password protection for scrapbooks
- Private/public sharing with unique tokens
- Protected routes and authorization

### 🌐 Sharing
- Generate private shareable links
- Optional password protection
- Public viewing mode (read-only)
- No login required for viewers
- Perfect for sharing with loved ones

### 📱 Responsive Design
- Works on all devices (mobile, tablet, desktop)
- Touch-friendly interface
- Optimized images and fast loading
- Progressive Web App ready

## 🛠️ Tech Stack

### Frontend
- **React 18** - UI library
- **Vite** - Fast build tool
- **Tailwind CSS** - Styling
- **Framer Motion** - Smooth animations
- **Axios** - HTTP client
- **React Router** - Navigation

### Backend
- **Node.js & Express** - Server framework
- **MongoDB** - Database
- **Mongoose** - ODM
- **JWT** - Authentication
- **bcryptjs** - Password hashing
- **Multer** - File uploads

## 🚀 Quick Start

### Prerequisites
- Node.js v16+
- MongoDB (Atlas or local)
- npm or yarn

### Installation

1. **Clone/Setup Project**
```bash
cd anniversary-scrapbook
```

2. **Backend Setup**
```bash
cd server
npm install
cp .env.example .env
# Edit .env and add MONGODB_URI
npm run dev
```

3. **Frontend Setup** (new terminal)
```bash
cd client
npm install
cp .env.example .env
npm run dev
```

4. **Access Application**
- Frontend: http://localhost:5173
- Backend API: http://localhost:5000/api

### Detailed Guide
See [INSTALLATION.md](./INSTALLATION.md) for complete setup instructions.

## 📖 Usage

### Create an Account
1. Visit the app
2. Click "Create Account"
3. Enter name, email, and password
4. Account created!

### Create a Scrapbook
1. Go to Dashboard
2. Click "Create New Scrapbook"
3. Enter title and anniversary date
4. Choose theme color
5. Create!

### Add Memories
1. Open scrapbook in editor
2. Click "Add New Memory"
3. Upload photo
4. Add caption, date, location, mood
5. Save!

### Write Love Letter
1. Open scrapbook
2. Go to "Love Letter" tab
3. Write your message
4. Save!

### Share Scrapbook
1. Open scrapbook
2. Click "Share" button
3. Copy link and send to loved one
4. (Optional) Protect with password

## 🎨 Design Features

- **Soft Pastel Palette**: Pink, rose, and cream colors
- **Floating Animations**: Subtle heart animations throughout
- **Glassmorphism**: Modern frosted glass card effects
- **Smooth Transitions**: Framer Motion animations
- **Typography**: Playfair Display for elegant headers
- **Icons**: Lucide React for clean icons
- **Responsive Grid**: Mobile-first responsive layouts

## 🔐 Security

- ✅ JWT token-based authentication
- ✅ Password hashing with bcrypt
- ✅ Protected API routes
- ✅ CORS configured
- ✅ Input validation
- ✅ SQL injection prevention (MongoDB)
- ✅ XSS protection

## 📦 Project Structure

```
anniversary-scrapbook/
├── server/                 # Express API
│   ├── config/            # Database config
│   ├── controllers/        # Route handlers
│   ├── middleware/         # Auth & error handling
│   ├── models/            # MongoDB schemas
│   ├── routes/            # API routes
│   ├── uploads/           # Image storage
│   └── server.js          # Entry point
│
└── client/                # React frontend
    ├── src/
    │   ├── components/     # React components
    │   ├── context/        # Auth context
    │   ├── pages/          # Page components
    │   ├── services/       # API service
    │   ├── App.jsx         # Router
    │   └── main.jsx        # Entry point
    ├── public/             # Static files
    └── index.html          # HTML template
```

## 📊 Database Schema

### Users
```javascript
{
  name: String,
  email: String (unique),
  password: String (hashed),
  createdAt: Date
}
```

### Scrapbooks
```javascript
{
  userId: ObjectId,
  title: String,
  themeColor: String,
  coverImage: String,
  anniversaryDate: Date,
  isPublic: Boolean,
  accessPassword: String (hashed, optional),
  shareToken: String (unique),
  createdAt: Date,
  updatedAt: Date
}
```

### Memories
```javascript
{
  scrapbookId: ObjectId,
  image: String,
  caption: String,
  date: Date,
  location: String,
  mood: String (enum),
  createdAt: Date
}
```

### Love Letters
```javascript
{
  scrapbookId: ObjectId (unique),
  content: String,
  revealDate: Date (optional),
  createdAt: Date,
  updatedAt: Date
}
```

## 🌐 API Endpoints

### Authentication
- `POST /api/auth/register` - Register user
- `POST /api/auth/login` - Login user

### Scrapbooks
- `POST /api/scrapbooks` - Create scrapbook
- `GET /api/scrapbooks` - Get all scrapbooks
- `GET /api/scrapbooks/:id` - Get scrapbook
- `PUT /api/scrapbooks/:id` - Update scrapbook
- `DELETE /api/scrapbooks/:id` - Delete scrapbook
- `POST /api/scrapbooks/public/:token` - View public scrapbook

### Memories
- `POST /api/memories` - Add memory
- `GET /api/memories/:scrapbookId` - Get memories
- `PUT /api/memories/:id` - Update memory
- `DELETE /api/memories/:id` - Delete memory

### Love Letters
- `POST /api/love-letters` - Create/update letter
- `GET /api/love-letters/:scrapbookId` - Get letter
- `DELETE /api/love-letters/:scrapbookId` - Delete letter

See [API.md](./API.md) for complete documentation.

## 🚀 Deployment

### Deploy Backend to Render
```bash
1. Push to GitHub
2. Create Render account
3. New Web Service → Select repo
4. Set environment variables
5. Deploy
```

### Deploy Frontend to Vercel
```bash
1. Push to GitHub
2. Create Vercel account
3. Import project → Select client folder
4. Set VITE_API_URL environment variable
5. Deploy
```

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed instructions.

## 🔧 Environment Variables

### Backend
```env
MONGODB_URI=mongodb+srv://...
JWT_SECRET=your_secret_key
NODE_ENV=development
PORT=5000
VITE_API_URL=http://localhost:5173
```

### Frontend
```env
VITE_API_URL=http://localhost:5000/api
```

## 📈 Performance

- ✅ Optimized images with lazy loading
- ✅ Code splitting with React.lazy
- ✅ Memoization to prevent re-renders
- ✅ Efficient state management
- ✅ CDN ready (Vercel + Render)
- ✅ Minimal bundle size

## 🧪 Testing

### Manual Testing Checklist
- [ ] User registration
- [ ] User login
- [ ] Create scrapbook
- [ ] Add memories
- [ ] Write love letter
- [ ] Update/delete memories
- [ ] Share scrapbook
- [ ] View public scrapbook
- [ ] Password protection
- [ ] Mobile responsiveness

### Test User
```
Email: test@example.com
Password: Test123456
```

## 🐛 Troubleshooting

### MongoDB Connection Error
- Verify connection string in `.env`
- Check MongoDB Atlas IP whitelist
- Ensure credentials are correct

### CORS Issues
- Check frontend URL in backend
- Verify API URL in frontend `.env`

### Images Not Loading
- Ensure `/uploads` folder exists
- Check file permissions
- Verify image paths

See [INSTALLATION.md](./INSTALLATION.md) for more help.

## 📝 Features Roadmap

- [ ] Background music support
- [ ] Countdown timer
- [ ] Collaborative scrapbooks
- [ ] PDF export
- [ ] Email notifications
- [ ] Comments on memories
- [ ] Social sharing buttons
- [ ] Multiple themes
- [ ] Dark mode

## 🤝 Contributing

Contributions welcome! Please:
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📄 License

MIT License - feel free to use this project freely!

## 💌 Support

- 📧 Email: support@example.com
- 🐛 Report bugs via GitHub Issues
- 💡 Feature requests welcome

## 🎉 Credits

Made with ❤️ for celebrating love stories.

---

### 🌟 Star this repo if you find it helpful!

**Perfect for:**
- Anniversary celebrations
- Proposal planning
- Wedding memories
- Relationship milestones
- Special occasion gifts

### Happy Anniversary! 💕

Transform your love story into a beautiful digital memory that lasts forever.

---

**Last Updated**: January 2024
**Version**: 1.0.0
**Status**: Production Ready ✅
