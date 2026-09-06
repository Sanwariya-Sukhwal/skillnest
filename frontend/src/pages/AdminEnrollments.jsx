import React, { useEffect } from 'react';
import { useEnrollments } from '../hooks/useCourses';

const AdminEnrollments = () => {
  const {
    enrollments,
    loading,
    error,
    fetchAllEnrollments,
  } = useEnrollments();

  useEffect(() => {
    fetchAllEnrollments();
  }, []);

  return (
    <div className="min-h-screen bg-[#F8FAFC]">

      {/* ================= HEADER ================= */}
      <header className="h-[65px] bg-white border-b border-[#E2E8F0] flex items-center justify-between px-8">
        <div>
          <h1 className="text-[18px] font-bold text-[#0F172A]">
            Enrollments
          </h1>

          <p className="text-[9px] text-[#64748B] mt-1">
            Manage all course enrollments
          </p>
        </div>

        <div className="bg-[#EEF2FF] text-[#6366F1] px-3 py-2 rounded-[6px] text-[10px] font-semibold">
          Total: {enrollments.length}
        </div>
      </header>

      {/* ================= CONTENT ================= */}
      <div className="max-w-[1100px] mx-auto px-8 py-10">

        {/* Loading */}
        {loading && (
          <div className="bg-white border border-[#E2E8F0] rounded-[12px] py-16 text-center">
            <p className="text-[11px] text-[#64748B]">
              Loading enrollments...
            </p>
          </div>
        )}

        {/* Error */}
        {!loading && error && (
          <div className="bg-white border border-red-200 rounded-[12px] py-16 text-center">
            <p className="text-[11px] text-red-600">
              {error}
            </p>

            <button
              type="button"
              onClick={fetchAllEnrollments}
              className="mt-4 bg-[#6366F1] text-white px-4 py-2 rounded-[6px] text-[10px] font-semibold hover:bg-[#5558E8] transition"
            >
              Try Again
            </button>
          </div>
        )}

        {/* Empty */}
        {!loading &&
          !error &&
          enrollments.length === 0 && (
            <div className="bg-white border border-[#E2E8F0] rounded-[12px] py-16 text-center">
              <div className="w-[45px] h-[45px] mx-auto mb-4 bg-[#EEF2FF] rounded-full flex items-center justify-center">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#6366F1"
                  strokeWidth="1.8"
                >
                  <circle cx="12" cy="8" r="3" />
                  <path d="M7 21h10" />
                  <path d="M9 11l-2 10" />
                  <path d="M15 11l2 10" />
                </svg>
              </div>

              <p className="text-[12px] font-semibold text-[#0F172A]">
                No enrollments found
              </p>

              <p className="text-[9px] text-[#64748B] mt-1">
                Students have not enrolled in any course yet.
              </p>
            </div>
          )}

        {/* Enrollment Table */}
        {!loading &&
          !error &&
          enrollments.length > 0 && (
            <div className="bg-white border border-[#E2E8F0] rounded-[12px] overflow-hidden">

              {/* Table Header */}
              <div className="px-5 py-4 border-b border-[#E2E8F0] flex items-center justify-between">
                <div>
                  <h2 className="text-[13px] font-bold text-[#0F172A]">
                    All Enrollments
                  </h2>

                  <p className="text-[9px] text-[#64748B] mt-1">
                    Students enrolled in SkillNest courses
                  </p>
                </div>

                <button
                  type="button"
                  onClick={fetchAllEnrollments}
                  className="flex items-center gap-2 px-3 py-2 border border-[#E2E8F0] rounded-[6px] text-[9px] font-semibold text-[#475569] hover:border-[#6366F1] hover:text-[#6366F1] transition"
                >
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M20 11a8 8 0 1 0 1 4" />
                    <path d="M20 4v7h-7" />
                  </svg>

                  Refresh
                </button>
              </div>

              {/* Responsive Table */}
              <div className="overflow-x-auto">
                <table className="w-full min-w-[800px]">

                  <thead>
                    <tr className="bg-[#F8FAFC] border-b border-[#E2E8F0]">

                      <th className="text-left px-5 py-4 text-[9px] font-semibold text-[#64748B] uppercase">
                        Student
                      </th>

                      <th className="text-left px-5 py-4 text-[9px] font-semibold text-[#64748B] uppercase">
                        Course
                      </th>

                      <th className="text-left px-5 py-4 text-[9px] font-semibold text-[#64748B] uppercase">
                        Progress
                      </th>

                      <th className="text-left px-5 py-4 text-[9px] font-semibold text-[#64748B] uppercase">
                        Status
                      </th>

                      <th className="text-left px-5 py-4 text-[9px] font-semibold text-[#64748B] uppercase">
                        Enrolled Date
                      </th>

                    </tr>
                  </thead>

                  <tbody>
                    {enrollments.map((enrollment) => {
                      const user = enrollment.userId;
                      const course = enrollment.courseId;

                      const progress =
                        enrollment.progress || 0;

                      return (
                        <tr
                          key={enrollment._id}
                          className="border-b border-[#E2E8F0] last:border-b-0 hover:bg-[#FAFAFA] transition"
                        >

                          {/* Student */}
                          <td className="px-5 py-4">
                            <div className="flex items-center gap-3">

                              <div className="w-[32px] h-[32px] rounded-full bg-[#EEF2FF] text-[#6366F1] flex items-center justify-center text-[10px] font-bold flex-shrink-0">
                                {user?.name
                                  ? user.name
                                      .charAt(0)
                                      .toUpperCase()
                                  : '?'}
                              </div>

                              <div>
                                <p className="text-[10px] font-semibold text-[#0F172A]">
                                  {user?.name ||
                                    'Unknown User'}
                                </p>

                                <p className="text-[8px] text-[#64748B] mt-1">
                                  {user?.email || '—'}
                                </p>
                              </div>

                            </div>
                          </td>

                          {/* Course */}
                          <td className="px-5 py-4">
                            <div className="max-w-[220px]">

                              <p className="text-[10px] font-semibold text-[#0F172A] truncate">
                                {course?.title ||
                                  'Unknown Course'}
                              </p>

                              <p className="text-[8px] text-[#64748B] mt-1">
                                {course?.category || '—'}
                              </p>

                            </div>
                          </td>

                          {/* Progress */}
                          <td className="px-5 py-4">
                            <div className="w-[110px]">

                              <div className="flex items-center justify-between mb-1">
                                <span className="text-[8px] text-[#64748B]">
                                  Progress
                                </span>

                                <span className="text-[8px] font-semibold text-[#0F172A]">
                                  {progress}%
                                </span>
                              </div>

                              <div className="w-full h-[5px] bg-[#E2E8F0] rounded-full overflow-hidden">
                                <div
                                  className="h-full bg-[#6366F1] rounded-full transition-all"
                                  style={{
                                    width: `${Math.min(
                                      Math.max(
                                        progress,
                                        0
                                      ),
                                      100
                                    )}%`,
                                  }}
                                />
                              </div>

                            </div>
                          </td>

                          {/* Status */}
                          <td className="px-5 py-4">

                            <span
                              className={`inline-flex px-2.5 py-1 rounded-full text-[8px] font-semibold capitalize ${
                                enrollment.status ===
                                'completed'
                                  ? 'bg-[#ECFDF5] text-[#059669]'
                                  : enrollment.status ===
                                    'in-progress'
                                  ? 'bg-[#EEF2FF] text-[#6366F1]'
                                  : 'bg-[#F1F5F9] text-[#64748B]'
                              }`}
                            >
                              {enrollment.status ||
                                'enrolled'}
                            </span>

                          </td>

                          {/* Date */}
                          <td className="px-5 py-4">
                            <p className="text-[9px] text-[#64748B]">
                              {enrollment.createdAt
                                ? new Date(
                                    enrollment.createdAt
                                  ).toLocaleDateString(
                                    'en-IN',
                                    {
                                      day: '2-digit',
                                      month: 'short',
                                      year: 'numeric',
                                    }
                                  )
                                : '—'}
                            </p>
                          </td>

                        </tr>
                      );
                    })}
                  </tbody>

                </table>
              </div>

            </div>
          )}

      </div>
    </div>
  );
};

export default AdminEnrollments;