const Enrollment = require('../models/Enrollment');
const Course = require('../models/Course');

// @desc    Enroll user in course
// @route   POST /api/enrollments
exports.enrollCourse = async (req, res) => {
  try {
    const { courseId } = req.body;
    const userId = req.user.id;

    if (!courseId) {
      return res.status(400).json({
        success: false,
        message: 'Please provide course ID',
      });
    }

    const course = await Course.findById(courseId);

    if (!course) {
      return res.status(404).json({
        success: false,
        message: 'Course not found',
      });
    }

    const existingEnrollment = await Enrollment.findOne({
      userId,
      courseId,
    });

    if (existingEnrollment) {
      return res.status(400).json({
        success: false,
        message: 'You are already enrolled in this course',
      });
    }

    const enrollment = await Enrollment.create({
      userId,
      courseId,
    });

    course.enrolledCount += 1;
    await course.save();

    res.status(201).json({
      success: true,
      data: enrollment,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || 'Server error',
    });
  }
};


// @desc    Get all enrollments - Admin
// @route   GET /api/enrollments
exports.getAllEnrollments = async (req, res) => {
  try {
    const enrollments = await Enrollment.find()
      .populate('userId', 'name email role')
      .populate(
        'courseId',
        'title instructor price category image'
      )
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: enrollments.length,
      data: enrollments,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || 'Server error',
    });
  }
};


// @desc    Get user enrollments
// @route   GET /api/enrollments/my-courses
exports.getMyEnrollments = async (req, res) => {
  try {
    const userId = req.user.id;

    const enrollments = await Enrollment.find({ userId })
      .populate('courseId');

    res.status(200).json({
      success: true,
      count: enrollments.length,
      data: enrollments,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || 'Server error',
    });
  }
};


// @desc    Get single enrollment
// @route   GET /api/enrollments/:id
exports.getEnrollment = async (req, res) => {
  try {
    const enrollment = await Enrollment.findById(req.params.id)
      .populate('userId', 'name email role')
      .populate('courseId');

    if (!enrollment) {
      return res.status(404).json({
        success: false,
        message: 'Enrollment not found',
      });
    }

    res.status(200).json({
      success: true,
      data: enrollment,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || 'Server error',
    });
  }
};


// @desc    Update enrollment progress/status
// @route   PUT /api/enrollments/:id
exports.updateEnrollment = async (req, res) => {
  try {
    const { progress, status } = req.body;

    let enrollment = await Enrollment.findById(req.params.id);

    if (!enrollment) {
      return res.status(404).json({
        success: false,
        message: 'Enrollment not found',
      });
    }

    if (progress !== undefined) {
      enrollment.progress = progress;
    }

    if (status !== undefined) {
      enrollment.status = status;

      if (status === 'completed') {
        enrollment.completedAt = Date.now();
      }
    }

    enrollment = await enrollment.save();

    res.status(200).json({
      success: true,
      data: enrollment,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || 'Server error',
    });
  }
};


// @desc    Delete enrollment
// @route   DELETE /api/enrollments/:id
exports.deleteEnrollment = async (req, res) => {
  try {
    const enrollment = await Enrollment.findByIdAndDelete(
      req.params.id
    );

    if (!enrollment) {
      return res.status(404).json({
        success: false,
        message: 'Enrollment not found',
      });
    }

    const course = await Course.findById(enrollment.courseId);

    if (course && course.enrolledCount > 0) {
      course.enrolledCount -= 1;
      await course.save();
    }

    res.status(200).json({
      success: true,
      data: {},
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || 'Server error',
    });
  }
};