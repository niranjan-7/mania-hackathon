const Task = require('../models/Task');
const mongoose = require('mongoose');

const createTask = async (req, res) => {
  try {
    const { name, creatorEmail, description, dueDate, priority, status, collaborators, viewers } = req.body;

    const task = new Task({
      name,
      description,
      dueDate,
      priority,
      status,
      creatorEmail,
      collaborators,
      viewers,
    });

    await task.save();

    req.app.get('io').emit('taskCreated', task); // Emit event

    res.status(201).json(task);
  } catch (error) {
    console.error('Error creating task:', error);
    res.status(500).json({ message: 'Error creating task', error: error.message });
  }
};

const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({});
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching tasks', error });
  }
};

const getTaskById = async (req, res) => {
  const { id } = req.params;

  try {
    const task = await Task.findById(id);

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching task', error });
  }
};

const updateTask = async (req, res) => {
  const { id } = req.params;
  const { name, description, dueDate, priority, status, collaborators, viewers } = req.body;

  try {
    const task = await Task.findById(id);

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    task.name = name;
    task.description = description;
    task.dueDate = dueDate;
    task.priority = priority;
    task.status = status;
    task.collaborators = collaborators;
    task.viewers = viewers;
    task.updatedAt = Date.now();

    await task.save();

    req.app.get('io').emit('taskUpdated', task);

    res.status(200).json(task);
  } catch (error) {
    console.error('Error updating task:', error);
    res.status(500).json({ message: 'Error updating task', error: error.message });
  }
};

const deleteTask = async (req, res) => {
  console.log('delete api');
  const { id } = req.params;

  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid task ID' });
    }

    const task = await Task.findByIdAndDelete(id);

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    req.app.get('io').emit('taskDeleted', task);

    res.status(200).json({ message: 'Task deleted' });
  } catch (error) {
    console.error('Error deleting task:', error); // Enhanced error logging
    res.status(500).json({ message: 'Error deleting task', error: error.message });
  }
};

module.exports = {
  createTask,
  getTasks,
  getTaskById,
  updateTask,
  deleteTask,
};
