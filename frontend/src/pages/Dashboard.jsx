import React, { useEffect, useMemo } from 'react';
import { useAuth } from '../context/AuthContext';
import { useEnrollments } from '../hooks/useCourses';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const { user } = useAuth();

  const {
    enrollments,
    loading,
    error,
    fetchEnrollments,
  } = useEnrollments();

  useEffect(() => {
    fetchEnrollments();
  }, []);

  // =========================
  // Dashboard Statistics
  // =========================

  const stats = useMemo(() => {
    const total = enrollments.length;

    const completed = enrollments.filter(
      (item) => item.status === 'completed'
    ).length;

    const inProgress = enrollments.filter(
      (item) => item.status === 'in-progress'
    ).length;

    const overallProgress =
      total > 0
        ? Math.round(
            enrollments.reduce(
              (sum, item) => sum + Number(item.progress || 0),
              0
            ) / total
          )
        : 0;

    return {
      total,
      completed,
      inProgress,
      overallProgress,
    };
  }, [enrollments]);

  return (
    <div className="min-h-screen bg-[#F8FAFC]">

      {/* =========================
          Header
      ========================= */}

      <div className="bg-white border-b border-[#E2E8F0]">
        <div className="max-w-7xl mx-auto px-6 py-5">

          <h1 className="text-[24px] font-bold text-[#0F172A]">
            My Dashboard
          </h1>

          <p className="text-[13px] text-[#64748B] mt-1">
            Track your learning progress and continue your courses.
          </p>

        </div>
      </div>


      <div className="max-w-7xl mx-auto px-6 py-8">

        {/* =========================
            Welcome Section
        ========================= */}

        <div className="bg-[#6366F1] rounded-[12px] p-7 mb-7 text-white">

          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5">

            <div>

              <p className="text-[12px] opacity-80 mb-2">
                WELCOME BACK
              </p>

              <h2 className="text-[25px] font-bold mb-2">
                Hi, {user?.name || 'Learner'}! 👋
              </h2>

              <p className="text-[13px] opacity-90">
                Continue learning and achieve your goals.
              </p>

            </div>

            <Link
              to="/courses"
              className="inline-flex items-center justify-center bg-white text-[#6366F1] px-5 py-2.5 rounded-[7px] text-[12px] font-semibold hover:bg-[#F8FAFC] transition"
            >
              Browse Courses
            </Link>

          </div>

        </div>


        {/* =========================
            Statistics
        ========================= */}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">

          {/* Enrolled Courses */}
          <div className="bg-white border border-[#E2E8F0] rounded-[10px] p-5">

            <div className="flex justify-between items-start">

              <div>
                <p className="text-[11px] text-[#64748B] mb-3">
                  Enrolled Courses
                </p>

                <p className="text-[25px] font-bold text-[#0F172A]">
                  {stats.total}
                </p>
              </div>

              <div className="w-9 h-9 rounded-[8px] bg-[#EEF2FF] flex items-center justify-center text-[#6366F1]">

                <svg
                  width="17"
                  height="17"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                >
                  <path d="M4 5h16v14H4z" />
                  <path d="M8 9h8M8 13h6M8 17h4" />
                </svg>

              </div>

            </div>

          </div>


          {/* In Progress */}
          <div className="bg-white border border-[#E2E8F0] rounded-[10px] p-5">

            <div className="flex justify-between items-start">

              <div>
                <p className="text-[11px] text-[#64748B] mb-3">
                  In Progress
                </p>

                <p className="text-[25px] font-bold text-[#0F172A]">
                  {stats.inProgress}
                </p>
              </div>

              <div className="w-9 h-9 rounded-[8px] bg-[#EFF6FF] flex items-center justify-center text-[#3B82F6]">

                <svg
                  width="17"
                  height="17"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                >
                  <circle cx="12" cy="12" r="9" />
                  <path d="M12 7v5l3 2" />
                </svg>

              </div>

            </div>

          </div>


          {/* Completed */}
          <div className="bg-white border border-[#E2E8F0] rounded-[10px] p-5">

            <div className="flex justify-between items-start">

              <div>
                <p className="text-[11px] text-[#64748B] mb-3">
                  Completed
                </p>

                <p className="text-[25px] font-bold text-[#0F172A]">
                  {stats.completed}
                </p>
              </div>

              <div className="w-9 h-9 rounded-[8px] bg-[#ECFDF5] flex items-center justify-center text-[#10B981]">

                <svg
                  width="17"
                  height="17"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                >
                  <path d="M20 6L9 17l-5-5" />
                </svg>

              </div>

            </div>

          </div>


          {/* Overall Progress */}
          <div className="bg-white border border-[#E2E8F0] rounded-[10px] p-5">

            <div className="flex justify-between items-start">

              <div>
                <p className="text-[11px] text-[#64748B] mb-3">
                  Overall Progress
                </p>

                <p className="text-[25px] font-bold text-[#0F172A]">
                  {stats.overallProgress}%
                </p>
              </div>

              <div className="w-9 h-9 rounded-[8px] bg-[#FEF3C7] flex items-center justify-center text-[#F59E0B]">

                <svg
                  width="17"
                  height="17"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                >
                  <path d="M4 19V5" />
                  <path d="M4 5h14l-2 4 2 4H4" />
                </svg>

              </div>

            </div>

          </div>

        </div>


        {/* =========================
            My Courses
        ========================= */}

        <div className="bg-white border border-[#E2E8F0] rounded-[10px] overflow-hidden">

          <div className="px-6 py-5 border-b border-[#E2E8F0] flex justify-between items-center">

            <div>
              <h2 className="text-[15px] font-bold text-[#0F172A]">
                My Courses
              </h2>

              <p className="text-[11px] text-[#64748B] mt-1">
                Courses you are currently learning
              </p>
            </div>

            <Link
              to="/courses"
              className="text-[11px] font-semibold text-[#6366F1] hover:underline"
            >
              Browse All
            </Link>

          </div>


          {/* =========================
              Loading
          ========================= */}

          {loading && (
            <div className="py-16 text-center">

              <p className="text-[12px] text-[#64748B]">
                Loading your courses...
              </p>

            </div>
          )}


          {/* =========================
              Error
          ========================= */}

          {!loading && error && (
            <div className="py-16 text-center">

              <p className="text-[12px] text-red-600 mb-4">
                {error}
              </p>

              <button
                onClick={fetchEnrollments}
                className="bg-[#6366F1] text-white px-5 py-2 rounded-[6px] text-[11px] font-semibold hover:bg-[#5558E8]"
              >
                Try Again
              </button>

            </div>
          )}


          {/* =========================
              No Courses
          ========================= */}

          {!loading &&
            !error &&
            enrollments.length === 0 && (

              <div className="py-16 text-center px-6">

                <div className="w-12 h-12 bg-[#EEF2FF] rounded-full flex items-center justify-center mx-auto mb-4 text-[#6366F1]">

                  <svg
                    width="22"
                    height="22"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                  >
                    <path d="M4 5h16v14H4z" />
                    <path d="M8 9h8M8 13h6" />
                  </svg>

                </div>

                <h3 className="text-[15px] font-bold text-[#0F172A] mb-2">
                  No courses yet
                </h3>

                <p className="text-[12px] text-[#64748B] mb-5">
                  Start learning by enrolling in a course.
                </p>

                <Link
                  to="/courses"
                  className="inline-block bg-[#6366F1] text-white px-5 py-2.5 rounded-[6px] text-[11px] font-semibold hover:bg-[#5558E8]"
                >
                  Browse Courses
                </Link>

              </div>
            )
          }


          {/* =========================
              Course Cards
          ========================= */}

          {!loading &&
            !error &&
            enrollments.length > 0 && (

              <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-5">

                {enrollments.map((enrollment) => {

                  const course = enrollment.courseId;

                  const progress = Number(
                    enrollment.progress || 0
                  );

                  const isCompleted =
                    enrollment.status === 'completed';

                  return (
                    <div
                      key={enrollment._id}
                      className="border border-[#E2E8F0] rounded-[9px] p-5 hover:shadow-sm transition"
                    >

                      {/* Course Top */}
                      <div className="flex justify-between items-start gap-4 mb-4">

                        <div>

                          <h3 className="text-[14px] font-bold text-[#0F172A] mb-1">
                            {course?.title || 'Course'}
                          </h3>

                          <p className="text-[10px] text-[#64748B]">
                            Instructor: {course?.instructor || 'N/A'}
                          </p>

                        </div>

                        <span
                          className={`px-2 py-1 rounded-[4px] text-[9px] font-semibold whitespace-nowrap ${
                            isCompleted
                              ? 'bg-[#ECFDF5] text-[#10B981]'
                              : enrollment.status ===
                                'in-progress'
                              ? 'bg-[#EFF6FF] text-[#3B82F6]'
                              : 'bg-[#FEF3C7] text-[#D97706]'
                          }`}
                        >
                          {isCompleted
                            ? 'Completed'
                            : enrollment.status ===
                              'in-progress'
                            ? 'In Progress'
                            : 'Enrolled'}
                        </span>

                      </div>


                      {/* Course Info */}
                      <div className="flex gap-5 mb-5">

                        <div>
                          <p className="text-[9px] text-[#94A3B8]">
                            Category
                          </p>

                          <p className="text-[10px] font-semibold text-[#475569] mt-1">
                            {course?.category || 'N/A'}
                          </p>
                        </div>

                        <div>
                          <p className="text-[9px] text-[#94A3B8]">
                            Duration
                          </p>

                          <p className="text-[10px] font-semibold text-[#475569] mt-1">
                            {course?.duration || 'N/A'}
                          </p>
                        </div>

                      </div>


                      {/* Progress */}
                      <div className="mb-5">

                        <div className="flex justify-between mb-2">

                          <span className="text-[10px] font-semibold text-[#475569]">
                            Progress
                          </span>

                          <span className="text-[10px] font-semibold text-[#6366F1]">
                            {progress}%
                          </span>

                        </div>

                        <div className="w-full h-[6px] bg-[#E2E8F0] rounded-full overflow-hidden">

                          <div
                            className="h-full bg-[#6366F1] rounded-full transition-all duration-500"
                            style={{
                              width: `${Math.min(
                                Math.max(progress, 0),
                                100
                              )}%`,
                            }}
                          />

                        </div>

                      </div>


                      {/* Bottom */}
                      <div className="flex justify-between items-center pt-4 border-t border-[#E2E8F0]">

                        <p className="text-[10px] text-[#64748B]">
                          {isCompleted
                            ? 'Course completed ✓'
                            : 'Keep learning!'}
                        </p>

                        <Link
                          to={`/courses/${course?._id}`}
                          className="text-[10px] font-semibold text-[#6366F1] hover:underline"
                        >
                          {isCompleted
                            ? 'View Course →'
                            : 'Continue Learning →'}
                        </Link>

                      </div>

                    </div>
                  );
                })}

              </div>
            )
          }

        </div>

      </div>

    </div>
  );
};

export default Dashboard;