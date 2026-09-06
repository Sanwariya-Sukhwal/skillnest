import React from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const AdminLayout = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const menuClass = ({ isActive }) =>
    `flex items-center gap-3 px-3 py-2.5 rounded-[6px] text-[10px] font-medium transition ${
      isActive
        ? 'bg-[#6366F1] text-white'
        : 'text-[#64748B] hover:bg-[#1E293B] hover:text-white'
    }`;

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex">

      {/* ================= SIDEBAR ================= */}
      <aside className="w-[195px] min-h-screen bg-[#0F172A] text-white flex-shrink-0 flex flex-col">

        {/* Logo */}
        <div className="h-[65px] flex items-center px-4 border-b border-[#1E293B] flex-shrink-0">
          <div className="w-[27px] h-[27px] bg-[#6366F1] rounded-[7px] flex items-center justify-center mr-2">
            <svg
              width="15"
              height="15"
              viewBox="0 0 24 24"
              fill="none"
              stroke="white"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M3 6h18" />
              <path d="M5 6v12" />
              <path d="M19 6v12" />
              <path d="M8 10h8" />
              <path d="M8 14h8" />
            </svg>
          </div>

          <span className="text-[13px] font-bold">
            SkillNest Admin
          </span>
        </div>

        {/* ================= NAVIGATION ================= */}
        <nav className="px-3 py-4 space-y-1 flex-1">

          {/* Dashboard */}
          <NavLink
            to="/admin"
            end
            className={menuClass}
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
            >
              <rect x="3" y="3" width="7" height="7" />
              <rect x="14" y="3" width="7" height="7" />
              <rect x="3" y="14" width="7" height="7" />
              <rect x="14" y="14" width="7" height="7" />
            </svg>

            Dashboard
          </NavLink>

          {/* Courses */}
          <NavLink
            to="/admin/courses"
            className={menuClass}
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
            >
              <path d="M4 5h16v14H4z" />
              <path d="M8 9h8" />
              <path d="M8 13h5" />
            </svg>

            Courses
          </NavLink>

          {/* Users */}
          <NavLink
            to="/admin/users"
            className={menuClass}
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
            >
              <circle cx="9" cy="8" r="3" />
              <path d="M3 20c0-4 2.5-6 6-6s6 2 6 6" />
              <path d="M16 5a3 3 0 0 1 0 6" />
              <path d="M18 14c2 .5 3 2 3 4" />
            </svg>

            Users
          </NavLink>

          {/* Enrollments */}
          <NavLink
            to="/admin/enrollments"
            className={menuClass}
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
            >
              <circle cx="12" cy="8" r="3" />
              <path d="M7 21h10" />
              <path d="M9 11l-2 10" />
              <path d="M15 11l2 10" />
            </svg>

            Enrollments
          </NavLink>

        </nav>

        {/* ================= LOGOUT ================= */}
        <div className="px-3 pb-4">
          <button
            type="button"
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-[6px] text-[10px] font-medium text-[#64748B] hover:bg-[#1E293B] hover:text-red-400 transition"
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M10 17l5-5-5-5" />
              <path d="M15 12H3" />
              <path d="M21 19V5a2 2 0 0 0-2-2h-6" />
            </svg>

            Logout
          </button>
        </div>

      </aside>

      {/* ================= PAGE CONTENT ================= */}
      <main className="flex-1 min-w-0">
        <Outlet />
      </main>

    </div>
  );
};

export default AdminLayout;