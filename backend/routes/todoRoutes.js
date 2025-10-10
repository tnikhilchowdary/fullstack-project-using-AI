const express = require('express');
const router = express.Router();
const {
  getTodos,
  getTodo,
  createTodo,
  updateTodo,
  deleteTodo
} = require('../controllers/todoController');
const { protect } = require('../middleware/auth');

// All routes are protected (require authentication)
router.use(protect);

// Routes
router.route('/')
  .get(getTodos)      // GET /api/todos - Get all todos
  .post(createTodo);  // POST /api/todos - Create new todo

router.route('/:id')
  .get(getTodo)       // GET /api/todos/:id - Get single todo
  .put(updateTodo)    // PUT /api/todos/:id - Update todo
  .delete(deleteTodo); // DELETE /api/todos/:id - Delete todo

module.exports = router;

