import React from 'react';
import {
  Link,
  useNavigate,
  useLocation,
} from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import logoIcon from '../image/icon.svg';

const NavBar = () => {
  const {
    isAuthenticated,
    user,
    logout,
    isAdmin,
  } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  // Hide navbar on Login and Register pages
const hideNavbar =
  location.pathname === '/login' ||
  location.pathname === '/register' ||
  location.pathname === '/admin';

  if (hideNavbar) {
    return null;
  }

  return (
    <nav className="bg-[#FFFFFF] border-b border-[#E2E8F0]">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-[64px]">

          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-2"
          >
            <div className="w-[32px] h-[32px] bg-[#6366F1] rounded-[8px] flex items-center justify-center">
              <img
                src={logoIcon}
                alt="SkillNest"
                className="w-[19px] h-[19px]"
              />
            </div>

            <span className="text-[16px] font-bold text-[#0F172A]">
              SkillNest
            </span>
          </Link>

          {/* Navigation */}
          <div className="flex items-center gap-7">

            {/* Courses */}
            <Link
              to="/courses"
              className={`text-[12px] font-medium transition ${
                location.pathname.startsWith('/courses')
                  ? 'text-[#6366F1]'
                  : 'text-[#475569] hover:text-[#6366F1]'
              }`}
            >
              Courses
            </Link>

            {isAuthenticated ? (
              <>
                {/* User Dashboard */}
                <Link
                  to="/dashboard"
                  className={`text-[12px] font-medium transition ${
                    location.pathname === '/dashboard'
                      ? 'text-[#6366F1]'
                      : 'text-[#475569] hover:text-[#6366F1]'
                  }`}
                >
                  Dashboard
                </Link>

                {/* Admin Dashboard */}
                {isAdmin && (
                  <Link
                    to="/admin"
                    className={`text-[12px] font-medium transition ${
                      location.pathname === '/admin'
                        ? 'text-[#6366F1]'
                        : 'text-[#475569] hover:text-[#6366F1]'
                    }`}
                  >
                    Admin
                  </Link>
                )}

                {/* User Name */}
                <span className="text-[12px] font-medium text-[#475569]">
                  {user?.name}
                </span>

                {/* Logout */}
                <button
                  onClick={handleLogout}
                  className="bg-[#6366F1] text-white text-[12px] font-semibold px-4 py-2 rounded-[7px] hover:bg-[#5558E8] transition"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                {/* Login */}
                <Link
                  to="/login"
                  className="text-[12px] font-semibold text-[#0F172A] hover:text-[#6366F1] transition"
                >
                  Login
                </Link>

                {/* Sign Up */}
                <Link
                  to="/register"
                  className="bg-[#6366F1] text-white text-[12px] font-semibold px-4 py-2 rounded-[7px] hover:bg-[#5558E8] transition"
                >
                  Sign Up
                </Link>
              </>
            )}

          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;