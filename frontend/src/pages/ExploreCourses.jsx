import React, { useEffect, useState } from 'react';
import CourseCard from '../components/CourseCard';
import { useCourses } from '../hooks/useCourses';

const ExploreCourses = () => {
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
        <div className="text-center">
          <p className="text-red-600 text-sm mb-4">
            {error}
          </p>

          <button
            type="button"
            onClick={fetchCourses}
            className="bg-[#6366F1] text-white text-[10px] font-semibold px-4 py-2 rounded-[6px] hover:bg-[#5558E8]"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC]">

      <div className="max-w-[1060px] mx-auto px-6 py-12">

        {/* ================= HEADER ================= */}

        <div className="flex justify-between items-center mb-5">

          <h1 className="text-[20px] font-bold text-[#0F172A]">
            Explore Courses
          </h1>

          {/* ================= CATEGORY FILTERS ================= */}

          <div className="flex flex-wrap items-center gap-2">

            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setCategory(cat)}
                className={`px-3 py-1.5 rounded-full text-[8px] font-medium border transition ${
                  category === cat
                    ? 'bg-[#6366F1] text-white border-[#6366F1]'
                    : 'bg-white text-[#475569] border-[#E2E8F0] hover:border-[#6366F1] hover:text-[#6366F1]'
                }`}
              >
                {cat}
              </button>
            ))}

          </div>

        </div>

        {/* ================= SEARCH ================= */}

        <div className="mb-8 max-w-[330px]">

          <input
            type="text"
            placeholder="Search topics, skills, instructors..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full h-[36px] bg-white border border-[#E2E8F0] rounded-[6px] px-3 text-[9px] text-[#334155] placeholder:text-[#94A3B8] focus:outline-none focus:border-[#6366F1]"
          />

        </div>

        {/* ================= COURSE COUNT ================= */}

        <div className="mb-5">

          <p className="text-[9px] text-[#64748B]">
            {filteredCourses.length} course
            {filteredCourses.length !== 1 ? 's' : ''} found
          </p>

        </div>

        {/* ================= COURSES ================= */}

        {filteredCourses.length === 0 ? (

          <div className="bg-white rounded-[10px] border border-[#E2E8F0] py-16 text-center">

            <p className="text-[#64748B] text-sm mb-3">
              No courses found
            </p>

            <button
              type="button"
              onClick={() => {
                setCategory('All');
                setSearchTerm('');
              }}
              className="text-[10px] font-semibold text-[#6366F1] hover:text-[#5558E8]"
            >
              Clear filters
            </button>

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

    </div>
  );
};

export default ExploreCourses;