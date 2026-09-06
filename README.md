SkillNest - Online Learning Platform

A complete MERN (MongoDB, Express, React, Node.js) stack application for an online course learning platform.

🚀 Live Demo

Frontend

https://skillnest-eight-murex.vercel.app

Backend API

https://skillnest-backend-xvbi.onrender.com

Backend Health Check

https://skillnest-backend-xvbi.onrender.com/api/health

GitHub Repository

https://github.com/Sanwariya-Sukhwal/skillnest

📋 Features

User Features

User registration and authentication with JWT

Secure password hashing with bcryptjs

Login and logout

Browse courses

Search courses

Filter courses by category

View course details

Enroll in courses

Prevent duplicate enrollments

Track learning progress

View enrolled courses

User dashboard

Admin Features

Admin authentication

Role-based authorization

Admin dashboard

Create courses

View courses

Update courses

Delete courses

Manage course categories

Manage course levels

View users

View enrollment statistics

View all course enrollments

View student progress

Track generated revenue

🏗️ Architecture

React Frontend
       |
       | Axios / REST API
       ↓
Express + Node.js Backend
       |
       ↓
MongoDB Atlas

Production Architecture

Vercel
   |
   | HTTPS REST API
   ↓
Render
   |
   ↓
MongoDB Atlas

🛠️ Tech Stack

Frontend

React

React Router v6

Axios

Tailwind CSS

Vite

JavaScript (ES6+)

Backend

Node.js

Express.js

MongoDB

Mongoose

JWT

bcryptjs

CORS

dotenv

Database

MongoDB Atlas

Deployment

Vercel - Frontend

Render - Backend

MongoDB Atlas - Database

📁 Project Structure

skillnest/
│
├── backend/
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── courseController.js
│   │   ├── enrollmentController.js
│   │   └── userController.js
│   ├── middleware/
│   │   └── auth.js
│   ├── models/
│   │   ├── User.js
│   │   ├── Course.js
│   │   └── Enrollment.js
│   ├── routes/
│   │   ├── auth.js
│   │   ├── courses.js
│   │   ├── enrollments.js
│   │   └── users.js
│   ├── .env.example
│   ├── .gitignore
│   ├── package.json
│   └── server.js
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── NavBar.jsx
│   │   │   ├── Footer.jsx
│   │   │   ├── CourseCard.jsx
│   │   │   └── CourseForm.jsx
│   │   ├── context/
│   │   │   └── AuthContext.jsx
│   │   ├── hooks/
│   │   │   └── useCourses.js
│   │   ├── layouts/
│   │   │   └── AdminLayout.jsx
│   │   ├── pages/
│   │   │   ├── Home.jsx
│   │   │   ├── Courses.jsx
│   │   │   ├── ExploreCourses.jsx
│   │   │   ├── CourseDetail.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   ├── AdminDashboard.jsx
│   │   │   ├── AdminCourses.jsx
│   │   │   ├── AdminUsers.jsx
│   │   │   └── AdminEnrollments.jsx
│   │   ├── routes/
│   │   │   └── ProtectedRoute.jsx
│   │   ├── services/
│   │   │   └── api.js
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── .env.example
│   ├── .gitignore
│   ├── index.html
│   ├── package.json
│   ├── postcss.config.js
│   ├── tailwind.config.js
│   └── vite.config.js
│
└── README.md

🚀 Getting Started

Prerequisites

Make sure the following are installed:

Node.js v14 or higher

npm

MongoDB Atlas account or local MongoDB

Git

⚙️ Backend Setup

1. Clone the repository

git clone https://github.com/Sanwariya-Sukhwal/skillnest.git
cd skillnest

2. Navigate to backend

cd backend

3. Install dependencies

npm install

4. Create .env

Create a .env file inside the backend directory.

PORT=5000
MONGODB_URI=mongodb://localhost:27017/skillnest
JWT_SECRET=your_secure_jwt_secret_key
JWT_EXPIRE=7d
CLIENT_URL=http://localhost:5173

For MongoDB Atlas:

MONGODB_URI=mongodb+srv://USERNAME:PASSWORD@CLUSTER.mongodb.net/skillnest

5. Start development server

npm run dev

Backend will run on:

http://localhost:5000

6. Test backend

Open:

http://localhost:5000/api/health

Expected response:

{
  "status": "Server is running"
}

💻 Frontend Setup

1. Navigate to frontend

From the project root:

cd frontend

2. Install dependencies

npm install

3. Create .env

Create:

frontend/.env

Add:

VITE_API_URL=http://localhost:5000/api

4. Start frontend

npm run dev

Frontend will run on:

http://localhost:5173

🔐 Authentication

SkillNest uses JWT-based authentication.

Authentication Flow

User Registration
       ↓
Password Validation
       ↓
Password Hashing using bcryptjs
       ↓
User Stored in MongoDB
       ↓
User Login
       ↓
Credentials Verified
       ↓
JWT Token Generated
       ↓
Token Stored in Frontend
       ↓
Token Sent with Protected Requests
       ↓
Backend Verifies JWT

Protected Routes

Protected routes require a valid JWT token.

Admin routes additionally require:

role = admin

👥 User Roles

User / Student

A regular user can:

Register

Login

Browse courses

Search courses

View course details

Enroll in courses

Track progress

View enrolled courses

Admin

An administrator can:

Access admin dashboard

Create courses

Update courses

Delete courses

View users

View enrollments

View enrollment statistics

Manage courses

📚 API Endpoints

Authentication

Method

Endpoint

Access

Description

POST

/api/auth/register

Public

Register new user

POST

/api/auth/login

Public

Login user

GET

/api/auth/me

Protected

Get current user

Courses

Method

Endpoint

Access

Description

GET

/api/courses

Public

Get all courses

GET

/api/courses/:id

Public

Get single course

GET

/api/courses/category/:category

Public

Get courses by category

POST

/api/courses

Admin

Create course

PUT

/api/courses/:id

Admin

Update course

DELETE

/api/courses/:id

Admin

Delete course

Enrollments

Method

Endpoint

Access

Description

POST

/api/enrollments

Protected

Enroll in course

GET

/api/enrollments/my-courses

Protected

Get current user's courses

GET

/api/enrollments

Admin

Get all enrollments

GET

/api/enrollments/:id

Protected

Get enrollment details

PUT

/api/enrollments/:id

Protected

Update progress/status

DELETE

/api/enrollments/:id

Protected

Delete enrollment

Users

Method

Endpoint

Access

Description

GET

/api/users

Admin

Get all users

GET

/api/users/:id

Admin

Get user details

🎓 Enrollment System

The enrollment system provides:

One-click course enrollment

Duplicate enrollment prevention

Enrollment count tracking

Progress tracking

Course completion status

Enrollment date tracking

Admin enrollment management

Enrollment Status

enrolled
in-progress
completed

Progress is tracked from:

0% → 100%

🖥️ Frontend Pages

Public Pages

Home

Landing page containing:

Hero section

Platform information

Featured courses

Learning features

Call-to-action sections

Courses

Provides:

Course listing

Search

Category filtering

Course cards

Course navigation

Course Detail

Displays:

Course image

Course title

Instructor

Category

Price

Rating

Course information

Enrollment action

Login

Allows users and administrators to authenticate.

Register

Allows new students to create accounts.

📊 User Dashboard

The user dashboard provides:

Enrolled courses

Course progress

Course status

Learning information

🛠️ Admin Dashboard

Admin dashboard contains:

Dashboard
Courses
Users
Enrollments
Settings
Logout

Admin Dashboard Statistics

The dashboard provides:

Active Courses

Total Users

Total Enrollments

Revenue Generated

✏️ Course Management

Administrators can:

Create

Add a new course with:

Title

Description

Instructor

Category

Level

Duration

Price

Image

Status

Read

View all available courses.

Update

Edit existing course information.

Delete

Remove courses from the platform.

🧪 Testing the Application

Create a Regular User

Register through:

/register

Example:

Name: Test User
Email: testuser@example.com
Password: test123456

Create an Admin User

Register a normal user first.

Then update the user's role in MongoDB:

db.users.updateOne(
  { email: "admin@skillnest.com" },
  { $set: { role: "admin" } }
)

The user can then login as an administrator.

Test Enrollment

Login as a regular user.

Open Courses.

Select a course.

Click Enroll.

Open Dashboard.

Verify the enrolled course.

Check progress.

Test Admin Features

Login as admin.

Open /admin.

Open Courses.

Create a course.

Edit the course.

Delete the course.

Open Users.

Open Enrollments.

🛡️ Security Features

JWT authentication

bcryptjs password hashing

Protected routes

Role-based authorization

CORS configuration

Environment variables

Password excluded from normal user responses

Duplicate enrollment prevention

🌐 Production Deployment

SkillNest is deployed using:

Frontend → Vercel
Backend → Render
Database → MongoDB Atlas

Frontend

Production frontend:

https://skillnest-eight-murex.vercel.app

Frontend environment variable:

VITE_API_URL=https://skillnest-backend-xvbi.onrender.com/api

Backend

Production backend:

https://skillnest-backend-xvbi.onrender.com

Backend environment variables:

MONGODB_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_secure_jwt_secret
JWT_EXPIRE=7d
CLIENT_URL=https://skillnest-eight-murex.vercel.app

Database

MongoDB Atlas is used as the production database.

Database name:

skillnest

🔧 Production Configuration

The frontend communicates with the deployed backend using:

https://skillnest-backend-xvbi.onrender.com/api

The backend allows requests from the deployed frontend:

https://skillnest-eight-murex.vercel.app

🐛 Troubleshooting

Backend not connecting to MongoDB

Check:

MONGODB_URI

Make sure:

MongoDB Atlas is accessible

Database username is correct

Database password is correct

Special characters in password are URL encoded

Network access is configured in MongoDB Atlas

CORS Error

Check the backend environment variable:

CLIENT_URL=https://skillnest-eight-murex.vercel.app

Authentication Error

Try:

Logout

Clear browser localStorage

Login again

Check JWT configuration

Courses Not Loading

Production endpoint:

https://skillnest-backend-xvbi.onrender.com/api/courses

Users API Not Loading

Admin Users uses:

GET /api/users

This endpoint requires an admin account.

📦 Installation Commands

Backend

cd backend
npm install
npm run dev

Frontend

cd frontend
npm install
npm run dev

📌 Production URLs

Resource

URL

Frontend

https://skillnest-eight-murex.vercel.app

Backend

https://skillnest-backend-xvbi.onrender.com

Health API

https://skillnest-backend-xvbi.onrender.com/api/health

GitHub

https://github.com/Sanwariya-Sukhwal/skillnest

📝 License

This project is open source and available under the ISC License.

👨‍💻 Author

SkillNest is a MERN stack online learning platform developed as a full-stack web application project.

🎓 SkillNest

A simple platform to discover courses, enroll, and track learning progress.

Happy Learning! 🚀