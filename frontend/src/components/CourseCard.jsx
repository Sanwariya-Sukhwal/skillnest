import React from 'react';
import { Link } from 'react-router-dom';

const fallbackImages = {
  'Web Development':
    'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80',

  'Mobile Development':
    'https://images.unsplash.com/photo-1551650975-87deedd944c3?auto=format&fit=crop&w=800&q=80',

  'Data Science':
    'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80',

  'AI & Machine Learning':
    'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=800&q=80',

  'Cloud Computing':
    'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80',

  DevOps:
    'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80',
};

const CourseCard = ({ course }) => {
  const image =
    course.courseImage ||
    fallbackImages[course.category] ||
    fallbackImages['Web Development'];

  const rating = Number(course.rating || 0);

  return (
    <Link
      to={`/courses/${course._id}`}
      className="block bg-white rounded-[10px] border border-[#E2E8F0] overflow-hidden hover:shadow-md transition-shadow duration-200"
    >
      {/* Image */}
      <div className="relative h-[102px] overflow-hidden">
        <img
          src={image}
          alt={course.title}
          className="w-full h-full object-cover"
        />

        {/* Category */}
        <span className="absolute top-2 left-2 bg-white text-[#6366F1] text-[7px] font-semibold px-2 py-[4px] rounded-full uppercase">
          {course.category}
        </span>
      </div>

      {/* Content */}
      <div className="px-3 py-2">

        {/* Duration + Level + Rating */}
        <div className="flex justify-between items-center mb-1">
          <p className="text-[8px] text-[#64748B]">
            {course.duration} • {course.level}
          </p>

          <div className="flex items-center gap-1">
            <span className="text-[#F59E0B] text-[9px]">
              ★
            </span>

            <span className="text-[8px] text-[#0F172A] font-medium">
              {rating.toFixed(1)}
            </span>
          </div>
        </div>

        {/* Title */}
        <h3 className="text-[11px] font-bold text-[#0F172A] leading-[15px] min-h-[30px]">
          {course.title}
        </h3>

        {/* Instructor */}
        <p className="text-[8px] text-[#64748B] mt-1">
          By {course.instructor}
        </p>
      </div>

      {/* Bottom */}
      <div className="border-t border-[#E2E8F0] px-3 py-2 flex justify-between items-center">
        <span className="text-[12px] font-bold text-[#0F172A]">
          ₹{Number(course.price || 0).toLocaleString('en-IN')}
        </span>

        <span className="text-[8px] font-medium text-[#6366F1]">
          View Course →
        </span>
      </div>
    </Link>
  );
};

export default CourseCard;