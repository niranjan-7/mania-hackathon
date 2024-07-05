const express = require('express');
const { createTask, getTasks, updateTask, deleteTask } = require('../controllers/taskController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/tasks' ,createTask);
router.get('/tasks',getTasks);
router.put('/tasks/:id' ,updateTask);
router.delete('/tasks/:id', deleteTask);

module.exports = router;
