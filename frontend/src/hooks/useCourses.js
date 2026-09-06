import { useState, useEffect } from 'react';
import { courseAPI, enrollmentAPI } from '../services/api';

export const useCourses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchCourses = async () => {
    try {
      setLoading(true);

      const response = await courseAPI.getAllCourses();

      setCourses(response.data.data || []);
      setError(null);
    } catch (err) {
      setError(
        err.response?.data?.message ||
          'Failed to fetch courses'
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const createCourse = async (courseData) => {
    try {
      const response = await courseAPI.createCourse(courseData);

      setCourses((prevCourses) => [
        ...prevCourses,
        response.data.data,
      ]);

      return {
        success: true,
        data: response.data.data,
      };
    } catch (err) {
      return {
        success: false,
        message:
          err.response?.data?.message ||
          'Failed to create course',
      };
    }
  };

  const updateCourse = async (id, courseData) => {
    try {
      const response = await courseAPI.updateCourse(
        id,
        courseData
      );

      setCourses((prevCourses) =>
        prevCourses.map((course) =>
          course._id === id
            ? response.data.data
            : course
        )
      );

      return {
        success: true,
        data: response.data.data,
      };
    } catch (err) {
      return {
        success: false,
        message:
          err.response?.data?.message ||
          'Failed to update course',
      };
    }
  };

  const deleteCourse = async (id) => {
    try {
      await courseAPI.deleteCourse(id);

      setCourses((prevCourses) =>
        prevCourses.filter(
          (course) => course._id !== id
        )
      );

      return {
        success: true,
      };
    } catch (err) {
      return {
        success: false,
        message:
          err.response?.data?.message ||
          'Failed to delete course',
      };
    }
  };

  return {
    courses,
    loading,
    error,
    fetchCourses,
    createCourse,
    updateCourse,
    deleteCourse,
  };
};


export const useEnrollments = () => {
  const [enrollments, setEnrollments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchEnrollments = async () => {
    try {
      setLoading(true);

      const response =
        await enrollmentAPI.getMyEnrollments();

      setEnrollments(response.data.data || []);
      setError(null);
    } catch (err) {
      setError(
        err.response?.data?.message ||
          'Failed to fetch enrollments'
      );
    } finally {
      setLoading(false);
    }
  };

  const enrollCourse = async (courseId) => {
    try {
      const response =
        await enrollmentAPI.enrollCourse(courseId);

      setEnrollments((prevEnrollments) => [
        ...prevEnrollments,
        response.data.data,
      ]);

      return {
        success: true,
        data: response.data.data,
      };
    } catch (err) {
      return {
        success: false,
        message:
          err.response?.data?.message ||
          'Failed to enroll in course',
      };
    }
  };

  return {
    enrollments,
    loading,
    error,
    fetchEnrollments,
    enrollCourse,
  };
};