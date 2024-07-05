const Task = require('../models/Task');

const createTask = async (req, res) => {
  const { name, description, dueDate, priority, status, collaborators, viewers } = req.body;

  try {
    const task = new Task({
      name,
      description,
      dueDate,
      priority,
      status,
      creatorEmail: req.user.email,
      collaborators,
      viewers,
    });

    await task.save();

    req.app.get('io').emit('taskCreated', task); // Emit event

    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ message: 'Error creating task', error });
  }
};

const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({
      $or: [
        { creatorEmail: req.user.email },
        { collaborators: req.user.email },
        { viewers: req.user.email }
      ]
    });
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching tasks', error });
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

    if (task.creatorEmail !== req.user.email && !task.collaborators.includes(req.user.email)) {
      return res.status(403).json({ message: 'Permission denied' });
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
    res.status(500).json({ message: 'Error updating task', error });
  }
};

const deleteTask = async (req, res) => {
  const { id } = req.params;

  try {
    const task = await Task.findById(id);

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    if (task.creatorEmail !== req.user.email) {
      return res.status(403).json({ message: 'Permission denied' });
    }

    await task.remove();

    req.app.get('io').emit('taskDeleted', task); 

    res.status(200).json({ message: 'Task deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting task', error });
  }
};

module.exports = {
  createTask,
  getTasks,
  updateTask,
  deleteTask,
};
