const LiveClass = require('../models/LiveClass');

exports.getClasses = async (req, res) => {
  try {
    const classes = await LiveClass.find().sort({ date: 1 });
    res.json(classes);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

exports.createClass = async (req, res) => {
  const { title, date, time, instructor, link } = req.body;

  try {
    const newClass = new LiveClass({
      title,
      date,
      time,
      instructor,
      link
    });

    const liveClass = await newClass.save();
    res.json(liveClass);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};