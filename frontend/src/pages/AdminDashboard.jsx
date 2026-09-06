import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { useCourses } from '../hooks/useCourses';
import CourseForm from '../components/CourseForm';

const AdminDashboard = () => {
  const {
    courses,
    loading,
    error,
    createCourse,
    updateCourse,
    deleteCourse,
  } = useCourses();

  const [showForm, setShowForm] = useState(false);
  const [editingCourse, setEditingCourse] = useState(null);

  /* =========================
     Dashboard Statistics
  ========================= */

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

  /* =========================
     Create Course
  ========================= */

  const handleCreate = async (courseData) => {
    const result = await createCourse(courseData);

    if (result.success) {
      setShowForm(false);
      alert('Course created successfully!');
    } else {
      alert(result.message);
    }
  };

  /* =========================
     Update Course
  ========================= */

  const handleUpdate = async (courseData) => {
    const result = await updateCourse(
      editingCourse._id,
      courseData
    );

    if (result.success) {
      setEditingCourse(null);
      setShowForm(false);
      alert('Course updated successfully!');
    } else {
      alert(result.message);
    }
  };

  /* =========================
     Delete Course
  ========================= */

  const handleDelete = async (id) => {
    if (
      window.confirm(
        'Are you sure you want to delete this course?'
      )
    ) {
      const result = await deleteCourse(id);

      if (result.success) {
        alert('Course deleted successfully!');
      } else {
        alert(result.message);
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex">

      {/* ==================================================
          SIDEBAR
      ================================================== */}

      <aside className="w-[195px] min-h-screen bg-[#0F172A] text-white flex-shrink-0">

        {/* Logo */}
        <div className="h-[65px] flex items-center px-4 border-b border-[#1E293B]">

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

        {/* Sidebar Navigation */}
        <div className="px-3 py-4 space-y-1">

          {/* Dashboard */}
          <div className="flex items-center gap-3 bg-[#6366F1] rounded-[6px] px-3 py-2.5 text-[10px] font-medium">
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
          </div>

          {/* Courses */}
          <Link
            to="/courses"
            className="flex items-center gap-3 px-3 py-2.5 rounded-[6px] text-[10px] text-[#64748B] hover:bg-[#1E293B] hover:text-white transition"
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
          </Link>

          {/* Users */}
          <div className="flex items-center gap-3 px-3 py-2.5 rounded-[6px] text-[10px] text-[#64748B]">
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
          </div>

          {/* Enrollments */}
          <div className="flex items-center gap-3 px-3 py-2.5 rounded-[6px] text-[10px] text-[#64748B]">
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
          </div>

          {/* Settings */}
          <div className="flex items-center gap-3 px-3 py-2.5 rounded-[6px] text-[10px] text-[#64748B]">
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
            >
              <circle cx="12" cy="12" r="3" />
              <path d="M19.4 15a1.7 1.7 0 0 0 .3 1.9l.1.1-2 2-.1-.1a1.7 1.7 0 0 0-1.9-.3 1.7 1.7 0 0 0-1 1.6v.2h-3v-.2a1.7 1.7 0 0 0-1-1.6 1.7 1.7 0 0 0-1.9.3l-.1.1-2-2 .1-.1a1.7 1.7 0 0 0 .3-1.9 1.7 1.7 0 0 0-1.6-1H5v-3h.2a1.7 1.7 0 0 0 1.6-1 1.7 1.7 0 0 0-.3-1.9l-.1-.1 2-2 .1.1a1.7 1.7 0 0 0 1.9.3 1.7 1.7 0 0 0 1-1.6V5h3v.2a1.7 1.7 0 0 0 1 1.6 1.7 1.7 0 0 0 1.9-.3l.1-.1 2 2-.1.1a1.7 1.7 0 0 0-.3 1.9 1.7 1.7 0 0 0 1.6 1h.2v3h-.2a1.7 1.7 0 0 0-1.6 1z"
              />
            </svg>

            Settings
          </div>

        </div>
      </aside>


      {/* ==================================================
          MAIN CONTENT
      ================================================== */}

      <main className="flex-1 min-w-0">

        {/* Top Header */}
        <header className="h-[65px] bg-white border-b border-[#E2E8F0] flex items-center justify-between px-8">

          <h1 className="text-[18px] font-bold text-[#0F172A]">
            Dashboard
          </h1>

          <button
            onClick={() => {
              setEditingCourse(null);
              setShowForm(true);
            }}
            className="flex items-center gap-2 bg-[#6366F1] text-white px-4 py-2 rounded-[6px] text-[10px] font-semibold hover:bg-[#5558E8] transition"
          >
            <span className="text-[14px] leading-none">
              +
            </span>

            Add Course
          </button>

        </header>


        {/* Content */}
        <div className="p-8">

          {/* ==================================================
              STATISTICS
          ================================================== */}

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">

            {/* Active Courses */}
            <div className="bg-white border border-[#E2E8F0] rounded-[10px] p-4">

              <div className="flex justify-between items-start">

                <div>
                  <p className="text-[10px] text-[#475569] mb-4">
                    Active Courses
                  </p>

                  <p className="text-[23px] font-bold text-[#0F172A]">
                    {courses.length}
                  </p>
                </div>

                <div className="w-[28px] h-[28px] bg-[#EEF2FF] rounded-[7px] flex items-center justify-center text-[#6366F1]">
                  <svg
                    width="15"
                    height="15"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                  >
                    <rect x="4" y="4" width="16" height="16" rx="2" />
                    <path d="M8 8h8M8 12h8M8 16h5" />
                  </svg>
                </div>

              </div>
            </div>


            {/* Total Users */}
            <div className="bg-white border border-[#E2E8F0] rounded-[10px] p-4">

              <div className="flex justify-between items-start">

                <div>
                  <p className="text-[10px] text-[#475569] mb-4">
                    Total Users
                  </p>

                  <p className="text-[23px] font-bold text-[#0F172A]">
                    —
                  </p>
                </div>

                <div className="w-[28px] h-[28px] bg-[#ECFDF5] rounded-[7px] flex items-center justify-center text-[#10B981]">
                  <svg
                    width="15"
                    height="15"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                  >
                    <circle cx="9" cy="8" r="3" />
                    <path d="M3 20c0-4 2.5-6 6-6s6 2 6 6" />
                    <circle cx="17" cy="9" r="2" />
                  </svg>
                </div>

              </div>
            </div>


            {/* Total Enrollments */}
            <div className="bg-white border border-[#E2E8F0] rounded-[10px] p-4">

              <div className="flex justify-between items-start">

                <div>
                  <p className="text-[10px] text-[#475569] mb-4">
                    Total Enrollments
                  </p>

                  <p className="text-[23px] font-bold text-[#0F172A]">
                    {totalEnrollments}
                  </p>
                </div>

                <div className="w-[28px] h-[28px] bg-[#FEF3C7] rounded-[7px] flex items-center justify-center text-[#F59E0B]">
                  <svg
                    width="15"
                    height="15"
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
                </div>

              </div>
            </div>


            {/* Revenue */}
            <div className="bg-white border border-[#E2E8F0] rounded-[10px] p-4">

              <div className="flex justify-between items-start">

                <div>
                  <p className="text-[10px] text-[#475569] mb-4">
                    Revenue Generated
                  </p>

                  <p className="text-[23px] font-bold text-[#0F172A]">
                    ₹{revenueGenerated.toLocaleString('en-IN')}
                  </p>
                </div>

                <div className="w-[28px] h-[28px] bg-[#FEF2F2] rounded-[7px] flex items-center justify-center text-[#EF4444]">
                  <svg
                    width="15"
                    height="15"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                  >
                    <path d="M4 17l6-6 4 4 6-8" />
                    <path d="M16 7h4v4" />
                  </svg>
                </div>

              </div>
            </div>

          </div>


          {/* ==================================================
              COURSE FORM
          ================================================== */}

          {showForm && (
            <CourseForm
              course={editingCourse}
              onSubmit={
                editingCourse
                  ? handleUpdate
                  : handleCreate
              }
              onCancel={() => {
                setShowForm(false);
                setEditingCourse(null);
              }}
            />
          )}


          {/* ==================================================
              MANAGE COURSES
          ================================================== */}

          <div className="bg-white border border-[#E2E8F0] rounded-[10px] overflow-hidden">

            {/* Table Header */}
            <div className="px-4 py-4 border-b border-[#E2E8F0]">

              <h2 className="text-[13px] font-bold text-[#0F172A]">
                Manage Courses
              </h2>

            </div>


            {/* Loading */}
            {loading && (
              <div className="py-12 text-center">
                <p className="text-[11px] text-[#64748B]">
                  Loading courses...
                </p>
              </div>
            )}


            {/* Error */}
            {!loading && error && (
              <div className="py-12 text-center">
                <p className="text-[11px] text-red-600">
                  {error}
                </p>
              </div>
            )}


            {/* Empty */}
            {!loading &&
              !error &&
              courses.length === 0 && (
                <div className="py-12 text-center">
                  <p className="text-[11px] text-[#64748B]">
                    No courses found
                  </p>
                </div>
              )}


            {/* Table */}
            {!loading &&
              !error &&
              courses.length > 0 && (
                <div className="overflow-x-auto">

                  <table className="w-full">

                    <thead>
                      <tr className="bg-[#F8FAFC] border-b border-[#E2E8F0]">

                        <th className="px-4 py-3 text-left text-[8px] font-semibold text-[#475569] uppercase">
                          Course Name
                        </th>

                        <th className="px-4 py-3 text-left text-[8px] font-semibold text-[#475569] uppercase">
                          Instructor
                        </th>

                        <th className="px-4 py-3 text-left text-[8px] font-semibold text-[#475569] uppercase">
                          Price
                        </th>

                        <th className="px-4 py-3 text-left text-[8px] font-semibold text-[#475569] uppercase">
                          Status
                        </th>

                        <th className="px-4 py-3 text-center text-[8px] font-semibold text-[#475569] uppercase">
                          Actions
                        </th>

                      </tr>
                    </thead>


                    <tbody>

                      {courses.map((course) => (
                        <tr
                          key={course._id}
                          className="border-b border-[#E2E8F0] last:border-b-0 hover:bg-[#F8FAFC] transition"
                        >

                          {/* Course Name */}
                          <td className="px-4 py-3">

                            <p className="text-[10px] font-semibold text-[#0F172A]">
                              {course.title}
                            </p>

                          </td>


                          {/* Instructor */}
                          <td className="px-4 py-3 text-[9px] text-[#64748B]">
                            {course.instructor}
                          </td>


                          {/* Price */}
                          <td className="px-4 py-3 text-[9px] font-semibold text-[#0F172A]">
                            ₹{course.price}
                          </td>


                          {/* Status */}
                          <td className="px-4 py-3">

                            <span
                              className={`inline-block px-2 py-1 rounded-[4px] text-[8px] font-semibold ${
                                course.status === 'draft'
                                  ? 'bg-[#FEF3C7] text-[#D97706]'
                                  : 'bg-[#ECFDF5] text-[#10B981]'
                              }`}
                            >
                              {course.status === 'draft'
                                ? 'Draft'
                                : 'Active'}
                            </span>

                          </td>


                          {/* Actions */}
                          <td className="px-4 py-3">

                            <div className="flex justify-center items-center gap-3">

                              {/* Edit */}
                              <button
                                onClick={() => {
                                  setEditingCourse(course);
                                  setShowForm(true);
                                }}
                                title="Edit Course"
                                className="text-[#6366F1] hover:text-[#4F46E5]"
                              >
                                <svg
                                  width="14"
                                  height="14"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="1.8"
                                >
                                  <path d="M12 20h9" />
                                  <path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L8 18l-4 1 1-4Z" />
                                </svg>
                              </button>


                              {/* Delete */}
                              <button
                                onClick={() =>
                                  handleDelete(course._id)
                                }
                                title="Delete Course"
                                className="text-[#EF4444] hover:text-[#DC2626]"
                              >
                                <svg
                                  width="14"
                                  height="14"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="1.8"
                                >
                                  <path d="M4 7h16" />
                                  <path d="M10 11v6M14 11v6" />
                                  <path d="M6 7l1 14h10l1-14" />
                                  <path d="M9 7V4h6v3" />
                                </svg>
                              </button>

                            </div>

                          </td>

                        </tr>
                      ))}

                    </tbody>

                  </table>

                </div>
              )}

          </div>

        </div>

      </main>

    </div>
  );
};

export default AdminDashboard;