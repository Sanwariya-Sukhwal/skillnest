import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { courseAPI, enrollmentAPI } from '../services/api';
import { useAuth } from '../context/AuthContext';

const CourseDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [enrolling, setEnrolling] = useState(false);

  useEffect(() => {
    fetchCourse();
  }, [id]);

  const fetchCourse = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await courseAPI.getCourse(id);

      setCourse(response.data.data);
    } catch (err) {
      setError(
        err.response?.data?.message ||
          'Failed to load course details'
      );
    } finally {
      setLoading(false);
    }
  };

  const handleEnroll = async () => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    try {
      setEnrolling(true);

      await enrollmentAPI.enrollCourse(id);

      alert('Successfully enrolled in course!');

      navigate('/dashboard');
    } catch (err) {
      alert(
        err.response?.data?.message ||
          'Failed to enroll'
      );
    } finally {
      setEnrolling(false);
    }
  };

  /* ================= LOADING ================= */

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center">
        <p className="text-sm text-[#64748B]">
          Loading course...
        </p>
      </div>
    );
  }

  /* ================= ERROR ================= */

  if (error) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center">
        <div className="text-center">
          <p className="text-sm text-red-600 mb-4">
            {error}
          </p>

          <button
            type="button"
            onClick={fetchCourse}
            className="bg-[#6366F1] text-white text-[11px] font-semibold px-5 py-2.5 rounded-[7px] hover:bg-[#5558E8] transition"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  /* ================= COURSE NOT FOUND ================= */

  if (!course) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center">
        <div className="text-center">
          <p className="text-sm text-[#64748B] mb-4">
            Course not found
          </p>

          <Link
            to="/explore-courses"
            className="text-[11px] font-semibold text-[#6366F1]"
          >
            ← Browse Courses
          </Link>
        </div>
      </div>
    );
  }

  const rating = Number(course.rating || 0).toFixed(1);

  const courseImage =
    course.courseImage ||
    'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1000&q=85';

  return (
    <div className="min-h-screen bg-[#F8FAFC]">

      {/* =====================================================
          COURSE HERO / HEADER
      ====================================================== */}

      <section className="bg-[#0F172A] text-white">

        <div className="max-w-[1060px] mx-auto px-6 py-10">

          {/* Breadcrumb */}

          <div className="flex items-center flex-wrap gap-2 text-[9px] mb-5">

            <Link
              to="/courses"
              className="text-[#94A3B8] hover:text-white"
            >
              Courses
            </Link>

            <span className="text-[#64748B]">
              ›
            </span>

            <span className="text-[#94A3B8]">
              {course.category}
            </span>

            <span className="text-[#64748B]">
              ›
            </span>

            <span className="text-[#CBD5E1]">
              {course.title}
            </span>

          </div>


          {/* Course Title */}

          <h1 className="text-[32px] md:text-[36px] leading-[40px] font-bold max-w-[850px] mb-4">
            {course.title}
          </h1>


          {/* Course Meta */}

          <div className="flex items-center flex-wrap gap-3 text-[10px] text-[#CBD5E1]">

            <span>
              👤 {course.instructor}
            </span>

            <span className="text-[#475569]">
              |
            </span>

            <span>
              ◷ {course.duration}
            </span>

            <span className="text-[#475569]">
              |
            </span>

            <span>
              ◫ {course.level}
            </span>

            <span className="text-[#475569]">
              |
            </span>

            <span className="text-yellow-400">
              ★ {rating}
            </span>

            <span className="text-[#64748B]">
              ({course.enrolledCount || 0} ratings)
            </span>

          </div>

        </div>

      </section>


      {/* =====================================================
          MAIN CONTENT
      ====================================================== */}

      <main className="max-w-[1060px] mx-auto px-6 py-10">

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-8">


          {/* =================================================
              LEFT CONTENT
          ================================================== */}

          <div>

            {/* Course Overview */}

            <section className="mb-8">

              <h2 className="text-[18px] font-bold text-[#0F172A] mb-3">
                Course Overview
              </h2>

              <p className="text-[11px] leading-[19px] text-[#475569] max-w-[700px]">
                {course.description}
              </p>

            </section>


            {/* What You'll Learn */}

            <section className="bg-white border border-[#E2E8F0] rounded-[12px] p-6">

              <h2 className="text-[15px] font-bold text-[#0F172A] mb-5">
                What You'll Learn
              </h2>

              {course.learningPoints &&
              course.learningPoints.length > 0 ? (

                <ul className="space-y-4">

                  {course.learningPoints.map(
                    (point, index) => (
                      <li
                        key={index}
                        className="flex items-start gap-3"
                      >

                        <span className="flex-shrink-0 w-[18px] h-[18px] rounded-full bg-[#ECFDF5] text-[#10B981] flex items-center justify-center text-[10px] font-bold">
                          ✓
                        </span>

                        <span className="text-[10px] leading-[18px] text-[#475569]">
                          {point}
                        </span>

                      </li>
                    )
                  )}

                </ul>

              ) : (

                <p className="text-[10px] text-[#64748B]">
                  No learning points specified yet.
                </p>

              )}

            </section>

          </div>


          {/* =================================================
              RIGHT PURCHASE CARD
          ================================================== */}

          <aside>

            <div className="bg-white border border-[#E2E8F0] rounded-[12px] p-4 sticky top-5 shadow-sm">

              {/* Course Image */}

              <img
                src={courseImage}
                alt={course.title}
                className="w-full h-[125px] object-cover rounded-[8px] mb-4"
              />


              {/* Price */}

              <div className="flex items-end gap-2 mb-1">

                <span className="text-[22px] font-bold text-[#0F172A]">
                  ₹{course.price}
                </span>

              </div>

              <p className="text-[9px] text-[#64748B] mb-4">
                Lifetime access. Start learning today.
              </p>


              {/* Enroll */}

              <button
                type="button"
                onClick={handleEnroll}
                disabled={enrolling}
                className="w-full h-[36px] bg-[#6366F1] text-white text-[10px] font-semibold rounded-[6px] hover:bg-[#5558E8] transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {enrolling
                  ? 'Enrolling...'
                  : 'Enroll Now'}
              </button>


              {/* Course Includes */}

              <div className="border-t border-[#E2E8F0] mt-5 pt-4">

                <h3 className="text-[10px] font-bold text-[#0F172A] mb-3">
                  This Course Includes:
                </h3>

                <div className="space-y-2">

                  <div className="flex items-center gap-2">
                    <span className="text-[10px]">
                      ▣
                    </span>

                    <span className="text-[9px] text-[#64748B]">
                      On-demand learning content
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-[10px]">
                      ◫
                    </span>

                    <span className="text-[9px] text-[#64748B]">
                      Course exercises
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-[10px]">
                      ♧
                    </span>

                    <span className="text-[9px] text-[#64748B]">
                      Certificate of completion
                    </span>
                  </div>

                </div>

              </div>

            </div>

          </aside>

        </div>

      </main>

    </div>
  );
};

export default CourseDetail;