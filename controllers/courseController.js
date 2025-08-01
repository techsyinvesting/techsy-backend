const Course = require('../models/Course');

exports.getCourses = async (req, res) => {
  try {
    const courses = await Course.find({ status: 'active' });
    res.json(courses);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

exports.createCourse = async (req, res) => {
  const { name, description, price, language, instructor } = req.body;

  try {
    const newCourse = new Course({
      name,
      description,
      price,
      language,
      instructor
    });

    const course = await newCourse.save();
    res.json(course);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};