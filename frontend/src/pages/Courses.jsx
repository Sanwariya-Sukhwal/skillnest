import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import CourseCard from '../components/CourseCard';
import { useCourses } from '../hooks/useCourses';

import heroImage from '../image/course-home.png';

const Courses = () => {
  const {
    courses,
    loading,
    error,
    fetchCourses,
  } = useCourses();

  const [category, setCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchCourses();
  }, []);

  const categories = [
    'All',
    'Web Development',
    'Mobile Development',
    'Data Science',
    'AI & Machine Learning',
    'Cloud Computing',
    'DevOps',
  ];

  const filteredCourses = courses.filter((course) => {
    const matchCategory =
      category === 'All' ||
      course.category === category;

    const search = searchTerm.toLowerCase();

    const matchSearch =
      course.title?.toLowerCase().includes(search) ||
      course.description?.toLowerCase().includes(search) ||
      course.instructor?.toLowerCase().includes(search);

    return matchCategory && matchSearch;
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center">
        <p className="text-[#64748B] text-sm">
          Loading courses...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center">
        <p className="text-red-600 text-sm">
          {error}
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC]">

      {/* ================= HERO SECTION ================= */}

      <section className="bg-white border-b border-[#F1F5F9]">
        <div className="max-w-[1060px] mx-auto px-6 py-10">

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">

            {/* Left Content */}

            <div>

              <span className="inline-block bg-[#EEF2FF] text-[#6366F1] text-[8px] font-semibold px-2 py-1 rounded-full mb-4">
                UPGRADE YOUR SKILLS
              </span>

              <h1 className="text-[38px] leading-[40px] font-bold text-[#0F172A]">
                Learn. Grow.
                <br />
                <span className="text-[#6366F1]">
                  Succeed.
                </span>
              </h1>

              <p className="text-[11px] leading-[18px] text-[#475569] max-w-[430px] mt-4 mb-5">
                Discover short courses & workshops built for your career.
                Learn from industry experts and elevate your professional
                potential today.
              </p>

              <div className="flex items-center gap-3">

                {/* Go to Explore Courses */}

                <Link
                  to="/explore-courses"
                  className="bg-[#6366F1] text-white text-[10px] font-semibold px-4 py-2.5 rounded-[6px] hover:bg-[#5558E8] transition"
                >
                  Explore Courses
                </Link>

                <button
                  type="button"
                  className="bg-white border border-[#E2E8F0] text-[#0F172A] text-[10px] font-semibold px-4 py-2.5 rounded-[6px] hover:border-[#6366F1] transition"
                >
                  How it works
                </button>

              </div>

            </div>

            {/* Right Image */}

            <div className="flex justify-end">

              <img
                src={heroImage}
                alt="SkillNest learning"
                className="w-full max-w-[390px] h-[205px] object-cover rounded-[14px]"
              />

            </div>

          </div>

        </div>
      </section>


      {/* ================= POPULAR COURSES ================= */}

      <section
        id="courses"
        className="bg-[#F8FAFC]"
      >
        <div className="max-w-[1060px] mx-auto px-6 py-12">

          {/* Section Header */}

          <div className="flex justify-between items-end mb-6">

            <div>

              <p className="text-[8px] font-semibold text-[#6366F1] uppercase mb-1">
                Choose Your Path
              </p>

              <h2 className="text-[20px] font-bold text-[#0F172A]">
                Popular Courses
              </h2>

            </div>

            {/* Go to Explore Courses */}

            <Link
              to="/explore-courses"
              className="text-[9px] font-medium text-[#6366F1] hover:text-[#5558E8]"
            >
              View all courses →
            </Link>

          </div>


          {/* Course Cards */}

          {filteredCourses.length === 0 ? (

            <div className="bg-white rounded-[10px] py-12 text-center border border-[#E2E8F0]">

              <p className="text-[#64748B] text-sm">
                No courses found
              </p>

            </div>

          ) : (

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

              {filteredCourses.map((course) => (
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

export default Courses;