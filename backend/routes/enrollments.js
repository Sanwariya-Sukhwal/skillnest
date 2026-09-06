const express = require('express');
const {
  enrollCourse,
  getMyEnrollments,
  getEnrollment,
  updateEnrollment,
  deleteEnrollment,
} = require('../controllers/enrollmentController');
const { protect } = require('../middleware/auth');

const router = express.Router();

// All enrollment routes require authentication
router.post('/', protect, enrollCourse);
router.get('/my-courses', protect, getMyEnrollments);
router.get('/:id', protect, getEnrollment);
router.put('/:id', protect, updateEnrollment);
router.delete('/:id', protect, deleteEnrollment);

module.exports = router;
