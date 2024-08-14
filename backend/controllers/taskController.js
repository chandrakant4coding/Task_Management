const Task = require('../models/task');

exports.getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (err) {
    res.status(400).json('Error: ' + err);
  }
};

exports.addTask = async (req, res) => {
  const newTask = new Task(req.body);
  try {
    await newTask.save();
    res.json('Task added!');
  } catch (err) {
    res.status(400).json('Error: ' + err);
  }
};

exports.updateTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) throw new Error('Task not found');
    
    Object.assign(task, req.body);
    await task.save();
    res.json('Task updated!');
  } catch (err) {
    res.status(400).json('Error: ' + err);
  }
};

exports.deleteTask = async (req, res) => {
  try {
    await Task.findByIdAndDelete(req.params.id);
    res.json('Task deleted.');
  } catch (err) {
    res.status(400).json('Error: ' + err);
  }
};

exports.getTasksByStatus = async (req, res) => {
  try {
    const { status } = req.query; 
    const tasks = status ? await Task.find({ status }) : await Task.find();
    res.json(tasks);
  } catch (err) {
    res.status(400).json('Error: ' + err);
  }
};
