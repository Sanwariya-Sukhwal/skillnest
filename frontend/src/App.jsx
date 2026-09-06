import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from 'react-router-dom';

import { AuthProvider } from './context/AuthContext';

import NavBar from './components/NavBar';
import Footer from './components/Footer';
import ProtectedRoute from './routes/ProtectedRoute';

// Pages
import Home from './pages/Home';
import Courses from './pages/Courses';
import ExploreCourses from './pages/ExploreCourses';
import CourseDetail from './pages/CourseDetail';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import AdminDashboard from './pages/AdminDashboard';

const AppLayout = () => {
  const location = useLocation();

  // Admin page ke liye normal Navbar/Footer hide
  const isAdminPage = location.pathname.startsWith('/admin');

  // Login/Register par bhi Navbar/Footer hide
  const isAuthPage =
    location.pathname === '/login' ||
    location.pathname === '/register';

  const hideLayout = isAdminPage || isAuthPage;

  return (
    <>
      {!hideLayout && <NavBar />}

      <Routes>

        {/* ================= HOME ================= */}

        <Route
          path="/"
          element={<Home />}
        />

        {/* ================= COURSES ================= */}

        <Route
          path="/courses"
          element={<Courses />}
        />

        {/* ================= EXPLORE COURSES ================= */}

        <Route
          path="/explore-courses"
          element={<ExploreCourses />}
        />

        {/* ================= COURSE DETAIL ================= */}

        <Route
          path="/courses/:id"
          element={<CourseDetail />}
        />

        {/* ================= AUTH ================= */}

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />

        {/* ================= USER DASHBOARD ================= */}

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        {/* ================= ADMIN DASHBOARD ================= */}

        <Route
          path="/admin"
          element={
            <ProtectedRoute requiredRole="admin">
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        {/* ================= 404 ================= */}

        <Route
          path="*"
          element={
            <div className="min-h-screen flex items-center justify-center">
              <div className="text-center">
                <h1 className="text-2xl font-bold text-[#0F172A]">
                  Page Not Found
                </h1>

                <p className="text-sm text-[#64748B] mt-2">
                  The page you are looking for does not exist.
                </p>
              </div>
            </div>
          }
        />

      </Routes>

      {!hideLayout && <Footer />}
    </>
  );
};

function App() {
  return (
    <Router>
      <AuthProvider>
        <AppLayout />
      </AuthProvider>
    </Router>
  );
}

export default App;