import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCourses } from '../hooks/useCourses';
import CourseForm from '../components/CourseForm';

const AdminCourses = () => {
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

  const handleCreate = async (courseData) => {
    const result = await createCourse(courseData);

    if (result.success) {
      setShowForm(false);
      alert('Course created successfully!');
    } else {
      alert(result.message);
    }
  };

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

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      'Are you sure you want to delete this course?'
    );

    if (!confirmed) return;

    const result = await deleteCourse(id);

    if (result.success) {
      alert('Course deleted successfully!');
    } else {
      alert(result.message);
    }
  };

  const handleAddCourse = () => {
    setEditingCourse(null);
    setShowForm(true);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC]">

      {/* Header */}
      <header className="h-[65px] bg-white border-b border-[#E2E8F0] flex items-center justify-between px-8">
        <h1 className="text-[18px] font-bold text-[#0F172A]">
          Courses
        </h1>

        <button
          type="button"
          onClick={handleAddCourse}
          className="flex items-center gap-2 bg-[#6366F1] text-white px-4 py-2.5 rounded-[6px] text-[10px] font-semibold hover:bg-[#5558E8] transition"
        >
          <span className="text-[14px] leading-none">+</span>
          Add Course
        </button>
      </header>

      {/* Content */}
      <div className="max-w-[1100px] mx-auto px-8 py-10">

        {/* Form */}
        {showForm && (
          <div className="mb-8">
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
          </div>
        )}

        {/* Page Intro */}
        <div className="mb-7">
          <p className="text-[8px] font-semibold text-[#6366F1] uppercase tracking-wide mb-1">
            Choose Your Path
          </p>

          <div className="flex items-end justify-between">
            <div>
              <h2 className="text-[23px] leading-[28px] font-bold text-[#0F172A]">
                Popular Courses
              </h2>

              <p className="text-[10px] text-[#64748B] mt-2">
                Explore our available courses and start learning.
              </p>
            </div>
          </div>
        </div>

        {/* Loading */}
        {loading && (
          <div className="bg-white border border-[#E2E8F0] rounded-[12px] py-16 text-center">
            <p className="text-[11px] text-[#64748B]">
              Loading courses...
            </p>
          </div>
        )}

        {/* Error */}
        {!loading && error && (
          <div className="bg-white border border-red-200 rounded-[12px] py-16 text-center">
            <p className="text-[11px] text-red-600">
              {error}
            </p>
          </div>
        )}

        {/* Empty */}
        {!loading && !error && courses.length === 0 && (
          <div className="bg-white border border-[#E2E8F0] rounded-[12px] py-16 text-center">
            <p className="text-[11px] text-[#64748B]">
              No courses available yet.
            </p>

            <button
              type="button"
              onClick={handleAddCourse}
              className="mt-4 bg-[#6366F1] text-white px-4 py-2 rounded-[6px] text-[10px] font-semibold"
            >
              + Add First Course
            </button>
          </div>
        )}

        {/* Course Cards */}
        {!loading && !error && courses.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">

            {courses.map((course) => (
              <div
                key={course._id}
                className="bg-white rounded-[12px] border border-[#E2E8F0] overflow-hidden hover:shadow-md transition"
              >

                {/* Image */}
                <div className="relative h-[155px] overflow-hidden">

                  <img
                    src={
                      course.image ||
                      'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=900&q=85'
                    }
                    alt={course.title}
                    className="w-full h-full object-cover"
                  />

                  {/* Category */}
                  <span className="absolute top-3 left-3 bg-white text-[#6366F1] text-[8px] font-semibold px-2 py-1 rounded-full uppercase">
                    {course.category || 'Development'}
                  </span>

                  {/* Status */}
                  <span
                    className={`absolute top-3 right-3 px-2 py-1 rounded-full text-[8px] font-semibold ${
                      course.status === 'draft'
                        ? 'bg-[#FEF3C7] text-[#D97706]'
                        : 'bg-[#ECFDF5] text-[#059669]'
                    }`}
                  >
                    {course.status === 'draft'
                      ? 'Draft'
                      : 'Active'}
                  </span>
                </div>

                {/* Card Body */}
                <div className="p-4">

                  {/* Meta */}
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-[8px] text-[#64748B]">
                      {course.duration || '6 Weeks'} • Beginner
                    </p>

                    <p className="text-[9px] text-[#F59E0B]">
                      ★ {course.rating || '0.0'}
                    </p>
                  </div>

                  {/* Title */}
                  <h3 className="text-[13px] font-bold text-[#0F172A] mb-2">
                    {course.title}
                  </h3>

                  {/* Instructor */}
                  <p className="text-[9px] text-[#64748B] mb-4">
                    By{' '}
                    <span className="text-[#475569] font-medium">
                      {course.instructor}
                    </span>
                  </p>

                  {/* Bottom */}
                  <div className="border-t border-[#E2E8F0] pt-3 flex items-center justify-between">

                    <p className="text-[14px] font-bold text-[#0F172A]">
                      ₹{course.price}
                    </p>

                    <div className="flex items-center gap-2">

                      {/* View */}
                      <Link
                        to={`/courses/${course._id}`}
                        className="px-2.5 py-1.5 border border-[#E2E8F0] rounded-[5px] text-[8px] font-semibold text-[#475569] hover:border-[#6366F1] hover:text-[#6366F1] transition"
                      >
                        View
                      </Link>

                      {/* Edit */}
                      <button
                        type="button"
                        onClick={() => {
                          setEditingCourse(course);
                          setShowForm(true);
                          window.scrollTo({
                            top: 0,
                            behavior: 'smooth',
                          });
                        }}
                        title="Edit Course"
                        className="w-[28px] h-[27px] flex items-center justify-center border border-[#E2E8F0] rounded-[5px] text-[#6366F1] hover:border-[#6366F1] transition"
                      >
                        <svg
                          width="13"
                          height="13"
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
                        type="button"
                        onClick={() =>
                          handleDelete(course._id)
                        }
                        title="Delete Course"
                        className="w-[28px] h-[27px] flex items-center justify-center border border-[#E2E8F0] rounded-[5px] text-[#EF4444] hover:border-[#EF4444] transition"
                      >
                        <svg
                          width="13"
                          height="13"
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
                  </div>
                </div>
              </div>
            ))}

          </div>
        )}
      </div>
    </div>
  );
};

export default AdminCourses;