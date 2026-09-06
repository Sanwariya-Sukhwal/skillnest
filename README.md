# SkillNest - Online Learning Platform

A complete MERN (MongoDB, Express, React, Node.js) stack application for an online course learning platform.

## 📋 Features

### User Features
- ✅ User registration and authentication with JWT
- ✅ Browse and search courses
- ✅ View course details
- ✅ Enroll in courses
- ✅ Track learning progress
- ✅ User dashboard with enrolled courses
- ✅ Password hashing with bcryptjs

### Admin Features
- ✅ Create, Read, Update, Delete (CRUD) courses
- ✅ Manage course categories and levels
- ✅ View enrollment statistics
- ✅ Admin authorization with role-based access

## 🏗️ Architecture

```
Frontend (React)
       ↓
   REST API (Express + Node.js)
       ↓
    MongoDB Database
```

## 🛠️ Tech Stack

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB
- **Authentication**: JWT (JSON Web Tokens)
- **Password Hashing**: bcryptjs
- **CORS**: Cross-Origin Resource Sharing

### Frontend
- **UI Library**: React
- **Routing**: React Router v6
- **HTTP Client**: Axios
- **Styling**: Tailwind CSS
- **Build Tool**: Vite

## 📁 Project Structure

```
skillnest/
├── backend/
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── courseController.js
│   │   └── enrollmentController.js
│   ├── models/
│   │   ├── User.js
│   │   ├── Course.js
│   │   └── Enrollment.js
│   ├── routes/
│   │   ├── auth.js
│   │   ├── courses.js
│   │   └── enrollments.js
│   ├── middleware/
│   │   └── auth.js
│   ├── config/
│   │   └── db.js
│   ├── server.js
│   ├── package.json
│   └── .env.example
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── NavBar.jsx
│   │   │   ├── CourseCard.jsx
│   │   │   └── CourseForm.jsx
│   │   ├── pages/
│   │   │   ├── Home.jsx
│   │   │   ├── Courses.jsx
│   │   │   ├── CourseDetail.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   └── AdminDashboard.jsx
│   │   ├── context/
│   │   │   └── AuthContext.jsx
│   │   ├── hooks/
│   │   │   └── useCourses.js
│   │   ├── routes/
│   │   │   └── ProtectedRoute.jsx
│   │   ├── services/
│   │   │   └── api.js
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   ├── tailwind.config.js
│   ├── postcss.config.js
│   └── .env.example
│
└── README.md
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or Atlas)
- npm or yarn

### Backend Setup

1. **Navigate to backend directory**
```bash
cd backend
```

2. **Install dependencies**
```bash
npm install
```

3. **Create .env file**
```bash
cp .env.example .env
```

4. **Edit .env with your configuration**
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/skillnest
JWT_SECRET=your_secure_jwt_secret_key
JWT_EXPIRE=7d
CLIENT_URL=http://localhost:5173
```

5. **Start MongoDB** (if running locally)
```bash
mongod
```

6. **Run development server**
```bash
npm run dev
```

Backend will run on: `http://localhost:5000`

### Frontend Setup

1. **Navigate to frontend directory** (from root)
```bash
cd frontend
```

2. **Install dependencies**
```bash
npm install
```

3. **Create .env file**
```bash
cp .env.example .env
```

4. **Run development server**
```bash
npm run dev
```

Frontend will run on: `http://localhost:5173`

## 📚 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (Protected)

### Courses
- `GET /api/courses` - Get all courses
- `GET /api/courses/:id` - Get single course
- `GET /api/courses/category/:category` - Get courses by category
- `POST /api/courses` - Create course (Admin only)
- `PUT /api/courses/:id` - Update course (Admin only)
- `DELETE /api/courses/:id` - Delete course (Admin only)

### Enrollments
- `POST /api/enrollments` - Enroll in course (Protected)
- `GET /api/enrollments/my-courses` - Get user's enrollments (Protected)
- `GET /api/enrollments/:id` - Get enrollment details (Protected)
- `PUT /api/enrollments/:id` - Update enrollment (Protected)
- `DELETE /api/enrollments/:id` - Delete enrollment (Protected)

## 🔐 Authentication Flow

1. User registers with email and password
2. Password is hashed using bcryptjs
3. User logs in with credentials
4. Backend verifies credentials and returns JWT token
5. Frontend stores token in localStorage
6. Token is sent with every protected API request
7. Backend verifies token using middleware

## 👥 User Roles

- **User (Student)**: Can browse, view, and enroll in courses
- **Admin**: Can manage (CRUD) all courses

## 🎨 Frontend Pages

- **Home** - Landing page with features and stats
- **Courses** - Browse all courses with filters and search
- **Course Detail** - Detailed course information and enroll button
- **Login** - User login form
- **Register** - User registration form
- **Dashboard** - User's enrolled courses and progress
- **Admin Dashboard** - Manage courses (CRUD operations)

## 🔑 Key Features Explained

### 1. Authentication
- JWT-based authentication
- Secure password hashing with bcryptjs
- Token stored in localStorage
- Automatic redirect on unauthorized access

### 2. Course Listing
- Display all courses with cards
- Filter by category
- Search functionality
- Show enrolled count and rating

### 3. Enrollment
- One-click enrollment
- Prevent duplicate enrollments
- Track enrollment count
- View progress tracking

### 4. Admin Dashboard
- Add new courses
- Edit existing courses
- Delete courses
- View course statistics
- Manage learning points

## 🧪 Testing the Application

### Create Admin User
1. Register with any credentials
2. Manually update user role in MongoDB to "admin"

```javascript
db.users.updateOne(
  { email: "admin@skillnest.com" },
  { $set: { role: "admin" } }
)
```

### Test Enrollment
1. Login as regular user
2. Browse courses
3. Click "Enroll Now" on a course
4. Check dashboard to see enrolled course

### Test Admin Features
1. Login as admin user
2. Navigate to Admin dashboard
3. Create, update, or delete courses

## 🛡️ Security Features

- ✅ Password hashing with bcryptjs
- ✅ JWT token-based authentication
- ✅ Protected API routes
- ✅ Role-based authorization
- ✅ CORS enabled
- ✅ Environment variables for sensitive data

## 📦 Dependencies

### Backend
- express: Web framework
- mongoose: MongoDB ODM
- jsonwebtoken: JWT implementation
- bcryptjs: Password hashing
- cors: Cross-origin support
- dotenv: Environment variables

### Frontend
- react: UI library
- react-router-dom: Routing
- axios: HTTP client
- tailwindcss: CSS framework

## 🚢 Deployment

### Backend Deployment (Heroku/Railway)
```bash
cd backend
heroku create your-app-name
git push heroku main
```

### Frontend Deployment (Vercel/Netlify)
```bash
cd frontend
npm run build
# Deploy the 'dist' folder
```

### Database
- Use MongoDB Atlas for cloud database
- Update MONGODB_URI in backend .env

## 🐛 Troubleshooting

### Connection Issues
- Ensure MongoDB is running
- Check MONGODB_URI in .env
- Verify PORT is not in use

### CORS Errors
- Check CLIENT_URL in backend .env
- Ensure frontend URL matches

### Authentication Errors
- Clear localStorage and login again
- Verify JWT_SECRET in .env
- Check token expiration

## 📝 License

This project is open source and available under the ISC License.

## 👨‍💻 Contributors

Created as a comprehensive MERN stack learning project.

## 📞 Support

For issues or questions, please create an issue in the repository.

---

**Happy Learning with SkillNest! 🚀**
