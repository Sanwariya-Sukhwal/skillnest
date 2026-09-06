import React, { useState } from 'react';

const CourseForm = ({ course, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState(
    course || {
      title: '',
      description: '',
      price: '',
      duration: '',
      category: 'Web Development',
      level: 'Beginner',
      instructor: '',
      learningPoints: [],
    }
  );

  const [learningPoint, setLearningPoint] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAddPoint = () => {
    if (learningPoint.trim()) {
      setFormData({
        ...formData,
        learningPoints: [...formData.learningPoints, learningPoint],
      });
      setLearningPoint('');
    }
  };

  const handleRemovePoint = (index) => {
    setFormData({
      ...formData,
      learningPoints: formData.learningPoints.filter((_, i) => i !== index),
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-8 mb-8">
      <h2 className="text-2xl font-bold mb-6">
        {course ? 'Edit Course' : 'Create New Course'}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Course Title
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              placeholder="e.g., React Full Stack Development"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Instructor
            </label>
            <input
              type="text"
              name="instructor"
              value={formData.instructor}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              placeholder="e.g., John Doe"
            />
          </div>
        </div>

        <div>
          <label className="block text-gray-700 font-semibold mb-2">
            Description
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            rows="4"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            placeholder="Course description"
          ></textarea>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Price (₹)
            </label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              placeholder="999"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Duration
            </label>
            <input
              type="text"
              name="duration"
              value={formData.duration}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              placeholder="e.g., 6 Weeks"
            />
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Category
            </label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            >
              <option>Web Development</option>
              <option>Mobile Development</option>
              <option>Data Science</option>
              <option>AI & Machine Learning</option>
              <option>Cloud Computing</option>
              <option>DevOps</option>
              <option>Other</option>
            </select>
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Level
            </label>
            <select
              name="level"
              value={formData.level}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            >
              <option>Beginner</option>
              <option>Intermediate</option>
              <option>Advanced</option>
            </select>
          </div>
        </div>

        {/* Learning Points */}
        <div>
          <label className="block text-gray-700 font-semibold mb-2">
            Learning Points
          </label>
          <div className="flex gap-2 mb-4">
            <input
              type="text"
              value={learningPoint}
              onChange={(e) => setLearningPoint(e.target.value)}
              className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              placeholder="e.g., Learn React Hooks"
            />
            <button
              type="button"
              onClick={handleAddPoint}
              className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
            >
              Add
            </button>
          </div>

          <div className="space-y-2">
            {formData.learningPoints.map((point, index) => (
              <div
                key={index}
                className="flex justify-between items-center bg-gray-100 p-3 rounded-lg"
              >
                <span>{point}</span>
                <button
                  type="button"
                  onClick={() => handleRemovePoint(index)}
                  className="text-red-600 hover:text-red-800 font-semibold"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Submit Buttons */}
        <div className="flex gap-4 pt-4">
          <button
            type="submit"
            className="flex-1 bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition"
          >
            {course ? 'Update Course' : 'Create Course'}
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 bg-gray-600 text-white py-2 rounded-lg font-semibold hover:bg-gray-700 transition"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default CourseForm;
