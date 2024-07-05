const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  dueDate: {
    type: Date,
  },
  priority: {
    type: String,
    enum: ['Low', 'Medium', 'High'],
  },
  status: {
    type: String,
    enum: ['Pending', 'In Progress', 'Completed'],
    default: 'Pending',
  },
  creatorEmail: {
    type: String,
    required: true,
  },
  collaborators: [{
    type: String,
  }],
  viewers: [{
    type: String,
  }],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;
