import React from 'react';
import { Link } from 'react-router-dom';
import CourseCard from '../components/CourseCard';
import { useCourses } from '../hooks/useCourses';

const Home = () => {
  const {
    courses,
    loading,
    error,
  } = useCourses();

  // Home page par sirf first 3 courses
  const popularCourses = courses.slice(0, 3);

  return (
    <div className="min-h-screen bg-[#F8FAFC]">

      {/* ================= HERO SECTION ================= */}

      <section className="bg-white border-b border-[#F1F5F9]">
        <div className="max-w-[1060px] mx-auto px-6 py-[54px]">

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

            {/* Left Content */}

            <div>

              <span className="inline-block bg-[#EEF2FF] text-[#6366F1] text-[8px] font-semibold px-2 py-1 rounded-full uppercase tracking-wide mb-4">
                Upgrade Your Skills
              </span>

              <h1 className="text-[40px] leading-[42px] font-bold text-[#0F172A] mb-4">
                Learn. Grow.
                <br />
                <span className="text-[#6366F1]">
                  Succeed.
                </span>
              </h1>

              <p className="text-[12px] leading-[19px] text-[#475569] max-w-[420px] mb-6">
                Discover short courses & workshops built for your career.
                Learn from industry experts and elevate your professional
                potential today.
              </p>

              {/* Buttons */}

              <div className="flex items-center gap-2">

                {/* IMPORTANT: Explore → ExploreCourses */}

                <Link
                  to="/explore-courses"
                  className="bg-[#6366F1] text-white text-[10px] font-semibold px-5 py-2.5 rounded-[6px] hover:bg-[#5558E8] transition"
                >
                  Explore Courses
                </Link>

                <button
                  type="button"
                  className="bg-white border border-[#E2E8F0] text-[#0F172A] text-[10px] font-semibold px-5 py-2.5 rounded-[6px] hover:border-[#6366F1] transition"
                >
                  How it works
                </button>

              </div>

            </div>

            {/* Right Image */}

            <div className="flex justify-end">

              <img
                src="https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=900&q=85"
                alt="Learning and collaboration"
                className="w-full max-w-[315px] h-[235px] object-cover rounded-[15px]"
              />

            </div>

          </div>

        </div>
      </section>


      {/* ================= POPULAR COURSES ================= */}

      <section className="bg-[#F8FAFC]">

        <div className="max-w-[1060px] mx-auto px-6 py-[54px]">

          {/* Section Header */}

          <div className="flex justify-between items-end mb-7">

            <div>

              <p className="text-[8px] font-semibold text-[#6366F1] uppercase tracking-wide mb-1">
                Choose Your Path
              </p>

              <h2 className="text-[21px] leading-[26px] font-bold text-[#0F172A]">
                Popular Courses
              </h2>

            </div>

            {/* IMPORTANT: View All → ExploreCourses */}

            <Link
              to="/explore-courses"
              className="text-[9px] font-medium text-[#6366F1] hover:text-[#5558E8] transition"
            >
              View all courses →
            </Link>

          </div>


          {/* ================= LOADING ================= */}

          {loading && (
            <div className="bg-white rounded-[10px] border border-[#E2E8F0] py-12 text-center">

              <p className="text-[11px] text-[#64748B]">
                Loading courses...
              </p>

            </div>
          )}


          {/* ================= ERROR ================= */}

          {!loading && error && (
            <div className="bg-white rounded-[10px] border border-red-200 py-12 text-center">

              <p className="text-[11px] text-red-600">
                {error}
              </p>

            </div>
          )}


          {/* ================= NO COURSES ================= */}

          {!loading && !error && popularCourses.length === 0 && (
            <div className="bg-white rounded-[10px] border border-[#E2E8F0] py-12 text-center">

              <p className="text-[11px] text-[#64748B]">
                No courses available yet.
              </p>

              <Link
                to="/explore-courses"
                className="inline-block mt-3 text-[10px] text-[#6366F1] font-semibold hover:text-[#5558E8]"
              >
                Browse Courses →
              </Link>

            </div>
          )}


          {/* ================= POPULAR COURSE CARDS ================= */}

          {!loading && !error && popularCourses.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

              {popularCourses.map((course) => (
                <CourseCard
                  key={course._id}
                  course={course}
                />
              ))}

            </div>
          )}

        </div>

      </section>

    </div>
  );
};

export default Home;