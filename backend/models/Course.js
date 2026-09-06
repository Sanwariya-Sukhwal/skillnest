const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Please add a course title'],
      trim: true,
      maxlength: 100,
    },
    description: {
      type: String,
      required: [true, 'Please add a description'],
    },
    price: {
      type: Number,
      required: [true, 'Please add a price'],
      default: 0,
    },
    duration: {
      type: String,
      required: [true, 'Please add a duration'],
    },
    category: {
      type: String,
      required: [true, 'Please add a category'],
      enum: [
        'Web Development',
        'Mobile Development',
        'Data Science',
        'AI & Machine Learning',
        'Cloud Computing',
        'DevOps',
        'Other',
      ],
    },
    level: {
      type: String,
      required: [true, 'Please add a level'],
      enum: ['Beginner', 'Intermediate', 'Advanced'],
    },
    instructor: {
      type: String,
      required: [true, 'Please add instructor name'],
    },
    learningPoints: [
      {
        type: String,
      },
    ],
    courseImage: {
      type: String,
      default: null,
    },
    enrolledCount: {
      type: Number,
      default: 0,
    },
    rating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Course', courseSchema);
