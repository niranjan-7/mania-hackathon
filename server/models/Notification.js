const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  taskId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Task',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  users:{
    type:[String],
  }
});

const Notification = mongoose.model('Notification', notificationSchema);
module.exports = Notification;
