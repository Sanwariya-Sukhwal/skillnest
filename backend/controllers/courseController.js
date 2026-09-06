const Course = require('../models/Course');

// @desc    Get all courses
// @route   GET /api/courses
exports.getAllCourses = async (req, res) => {
  try {
    const courses = await Course.find();
    res.status(200).json({
      success: true,
      count: courses.length,
      data: courses,
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: error.message || 'Server error' });
  }
};

// @desc    Get single course
// @route   GET /api/courses/:id
exports.getCourse = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);

    if (!course) {
      return res
        .status(404)
        .json({ success: false, message: 'Course not found' });
    }

    res.status(200).json({
      success: true,
      data: course,
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: error.message || 'Server error' });
  }
};

// @desc    Create course (Admin only)
// @route   POST /api/courses
exports.createCourse = async (req, res) => {
  try {
    const {
      title,
      description,
      price,
      duration,
      category,
      level,
      instructor,
      learningPoints,
    } = req.body;

    // Validation
    if (
      !title ||
      !description ||
      !price ||
      !duration ||
      !category ||
      !level ||
      !instructor
    ) {
      return res
        .status(400)
        .json({ success: false, message: 'Please provide all required fields' });
    }

    const course = await Course.create({
      title,
      description,
      price,
      duration,
      category,
      level,
      instructor,
      learningPoints: learningPoints || [],
    });

    res.status(201).json({
      success: true,
      data: course,
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: error.message || 'Server error' });
  }
};

// @desc    Update course (Admin only)
// @route   PUT /api/courses/:id
exports.updateCourse = async (req, res) => {
  try {
    let course = await Course.findById(req.params.id);

    if (!course) {
      return res
        .status(404)
        .json({ success: false, message: 'Course not found' });
    }

    course = await Course.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      success: true,
      data: course,
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: error.message || 'Server error' });
  }
};

// @desc    Delete course (Admin only)
// @route   DELETE /api/courses/:id
exports.deleteCourse = async (req, res) => {
  try {
    const course = await Course.findByIdAndDelete(req.params.id);

    if (!course) {
      return res
        .status(404)
        .json({ success: false, message: 'Course not found' });
    }

    res.status(200).json({
      success: true,
      data: {},
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: error.message || 'Server error' });
  }
};

// @desc    Get courses by category
// @route   GET /api/courses/category/:category
exports.getCoursesByCategory = async (req, res) => {
  try {
    const courses = await Course.find({ category: req.params.category });

    res.status(200).json({
      success: true,
      count: courses.length,
      data: courses,
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: error.message || 'Server error' });
  }
};
