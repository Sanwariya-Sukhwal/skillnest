import React, { useMemo } from 'react';
import { useCourses } from '../hooks/useCourses';

const AdminDashboard = () => {
  const {
    courses,
    loading,
    error,
  } = useCourses();

  const totalEnrollments = useMemo(() => {
    return courses.reduce(
      (total, course) =>
        total + Number(course.enrolledCount || 0),
      0
    );
  }, [courses]);

  const revenueGenerated = useMemo(() => {
    return courses.reduce(
      (total, course) =>
        total +
        Number(course.price || 0) *
          Number(course.enrolledCount || 0),
      0
    );
  }, [courses]);

  return (
    <div className="min-h-screen bg-[#F8FAFC]">

      {/* ================= HEADER ================= */}
      <header className="h-[65px] bg-white border-b border-[#E2E8F0] flex items-center justify-between px-8">
        <h1 className="text-[18px] font-bold text-[#0F172A]">
          Dashboard
        </h1>
      </header>

      {/* ================= CONTENT ================= */}
      <div className="p-8">

        {/* Statistics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">

          {/* Active Courses */}
          <div className="bg-white border border-[#E2E8F0] rounded-[10px] p-4">
            <p className="text-[10px] text-[#475569] mb-4">
              Active Courses
            </p>

            <p className="text-[23px] font-bold text-[#0F172A]">
              {loading ? '—' : courses.length}
            </p>
          </div>

          {/* Total Users */}
          <div className="bg-white border border-[#E2E8F0] rounded-[10px] p-4">
            <p className="text-[10px] text-[#475569] mb-4">
              Total Users
            </p>

            <p className="text-[23px] font-bold text-[#0F172A]">
              —
            </p>
          </div>

          {/* Total Enrollments */}
          <div className="bg-white border border-[#E2E8F0] rounded-[10px] p-4">
            <p className="text-[10px] text-[#475569] mb-4">
              Total Enrollments
            </p>

            <p className="text-[23px] font-bold text-[#0F172A]">
              {loading ? '—' : totalEnrollments}
            </p>
          </div>

          {/* Revenue */}
          <div className="bg-white border border-[#E2E8F0] rounded-[10px] p-4">
            <p className="text-[10px] text-[#475569] mb-4">
              Revenue Generated
            </p>

            <p className="text-[23px] font-bold text-[#0F172A]">
              ₹{loading ? '—' : revenueGenerated.toLocaleString('en-IN')}
            </p>
          </div>

        </div>

        {/* Error */}
        {error && (
          <div className="bg-white border border-red-200 rounded-[10px] p-5 mb-6">
            <p className="text-[11px] text-red-600">
              {error}
            </p>
          </div>
        )}

        {/* Overview */}
        <div className="bg-white border border-[#E2E8F0] rounded-[10px] overflow-hidden">

          <div className="px-5 py-5 border-b border-[#E2E8F0]">
            <h2 className="text-[14px] font-bold text-[#0F172A]">
              Dashboard Overview
            </h2>

            <p className="text-[10px] text-[#64748B] mt-1">
              Manage your SkillNest platform from the sidebar.
            </p>
          </div>

          <div className="p-5">

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

              <div className="bg-[#F8FAFC] rounded-[8px] p-4">
                <p className="text-[10px] text-[#64748B] mb-2">
                  Courses
                </p>

                <p className="text-[18px] font-bold text-[#0F172A]">
                  {courses.length}
                </p>

                <p className="text-[9px] text-[#64748B] mt-1">
                  Available courses
                </p>
              </div>

              <div className="bg-[#F8FAFC] rounded-[8px] p-4">
                <p className="text-[10px] text-[#64748B] mb-2">
                  Enrollments
                </p>

                <p className="text-[18px] font-bold text-[#0F172A]">
                  {totalEnrollments}
                </p>

                <p className="text-[9px] text-[#64748B] mt-1">
                  Total course enrollments
                </p>
              </div>

              <div className="bg-[#F8FAFC] rounded-[8px] p-4">
                <p className="text-[10px] text-[#64748B] mb-2">
                  Revenue
                </p>

                <p className="text-[18px] font-bold text-[#0F172A]">
                  ₹{revenueGenerated.toLocaleString('en-IN')}
                </p>

                <p className="text-[9px] text-[#64748B] mt-1">
                  Generated from enrollments
                </p>
              </div>

            </div>

          </div>
        </div>

      </div>
    </div>
  );
};

export default AdminDashboard;