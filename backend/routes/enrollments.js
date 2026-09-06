const express = require('express');

const {
  enrollCourse,
  getAllEnrollments,
  getMyEnrollments,
  getEnrollment,
  updateEnrollment,
  deleteEnrollment,
} = require('../controllers/enrollmentController');

const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

// ========================================
// User Enrollment
// ========================================

// Enroll in a course
router.post('/', protect, enrollCourse);

// Get logged-in user's enrollments
router.get('/my-courses', protect, getMyEnrollments);


// ========================================
// Admin Enrollment
// ========================================

// Get all enrollments
router.get(
  '/',
  protect,
  authorize('admin'),
  getAllEnrollments
);


// ========================================
// Single Enrollment
// ========================================

// Get single enrollment
router.get('/:id', protect, getEnrollment);

// Update enrollment progress/status
router.put('/:id', protect, updateEnrollment);

// Delete enrollment
router.delete('/:id', protect, deleteEnrollment);

module.exports = router;