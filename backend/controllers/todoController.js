const Todo = require('../models/Todo');

// @desc    Get all todos
// @route   GET /api/todos
// @access  Private
const getTodos = async (req, res) => {
  try {
    console.log('📥 GET ALL TODOS REQUEST');
    console.log('User ID:', req.user.id);
    
    const todos = await Todo.find({ user: req.user.id }).sort({ createdAt: -1 });
    
    console.log('✅ Found', todos.length, 'todos');
    
    // Log dates for debugging
    todos.forEach(todo => {
      if (todo.dueDate) {
        console.log(`  📅 "${todo.title}": dueDate = ${todo.dueDate}`);
      }
    });
    
    console.log('📤 RESPONSE SENT: count:', todos.length);
    
    res.json({
      success: true,
      count: todos.length,
      data: todos
    });
  } catch (error) {
    console.log('❌ ERROR in Get Todos:', error.message);
    res.status(500).json({
      success: false,
      message: 'Error fetching todos',
      error: error.message
    });
  }
};

// @desc    Get single todo
// @route   GET /api/todos/:id
// @access  Public
const getTodo = async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);
    
    if (!todo) {
      return res.status(404).json({
        success: false,
        message: 'Todo not found'
      });
    }
    
    res.json({
      success: true,
      data: todo
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching todo',
      error: error.message
    });
  }
};

// @desc    Create new todo
// @route   POST /api/todos
// @access  Private
const createTodo = async (req, res) => {
  try {
    console.log('📥 CREATE TODO REQUEST');
    console.log('User ID:', req.user.id);
    console.log('Body:', req.body);
    
    const { title, description, completed, priority, dueDate } = req.body;
    
    if (!title) {
      console.log('❌ Validation Failed - Title is required');
      return res.status(400).json({
        success: false,
        message: 'Title is required'
      });
    }
    
    // Normalize date: If dueDate is provided as "YYYY-MM-DD", keep it as is
    let normalizedDueDate = dueDate;
    if (dueDate && typeof dueDate === 'string') {
      console.log('📅 Received dueDate:', dueDate);
      // Store the date string as-is to avoid timezone conversion issues
      // MongoDB will store it, and we'll handle display on the frontend
      normalizedDueDate = dueDate;
      console.log('📅 Storing date string:', normalizedDueDate);
    }
    
    const todo = await Todo.create({
      user: req.user.id,
      title,
      description,
      completed,
      priority,
      dueDate: normalizedDueDate
    });
    
    console.log('✅ Todo created successfully:', todo.title);
    console.log('📅 Stored dueDate:', todo.dueDate);
    console.log('📤 RESPONSE SENT:', { id: todo._id, title: todo.title, dueDate: todo.dueDate });
    
    res.status(201).json({
      success: true,
      message: 'Todo created successfully',
      data: todo
    });
  } catch (error) {
    console.log('❌ ERROR in Create Todo:', error.message);
    res.status(500).json({
      success: false,
      message: 'Error creating todo',
      error: error.message
    });
  }
};

// @desc    Update todo
// @route   PUT /api/todos/:id
// @access  Public
const updateTodo = async (req, res) => {
  try {
    console.log('📥 UPDATE TODO REQUEST');
    console.log('Todo ID:', req.params.id);
    console.log('Body:', req.body);
    
    const todo = await Todo.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,  // Return updated document
        runValidators: true  // Run schema validators
      }
    );
    
    if (!todo) {
      console.log('❌ Todo not found:', req.params.id);
      return res.status(404).json({
        success: false,
        message: 'Todo not found'
      });
    }
    
    console.log('✅ Todo updated successfully:', todo.title);
    console.log('📤 RESPONSE SENT:', { id: todo._id, title: todo.title });
    
    res.json({
      success: true,
      message: 'Todo updated successfully',
      data: todo
    });
  } catch (error) {
    console.log('❌ ERROR in Update Todo:', error.message);
    res.status(500).json({
      success: false,
      message: 'Error updating todo',
      error: error.message
    });
  }
};

// @desc    Delete todo
// @route   DELETE /api/todos/:id
// @access  Public
const deleteTodo = async (req, res) => {
  try {
    console.log('📥 DELETE TODO REQUEST');
    console.log('Todo ID:', req.params.id);
    
    const todo = await Todo.findByIdAndDelete(req.params.id);
    
    if (!todo) {
      console.log('❌ Todo not found:', req.params.id);
      return res.status(404).json({
        success: false,
        message: 'Todo not found'
      });
    }
    
    console.log('✅ Todo deleted successfully:', todo.title);
    console.log('📤 RESPONSE SENT: Todo deleted');
    
    res.json({
      success: true,
      message: 'Todo deleted successfully',
      data: {}
    });
  } catch (error) {
    console.log('❌ ERROR in Delete Todo:', error.message);
    res.status(500).json({
      success: false,
      message: 'Error deleting todo',
      error: error.message
    });
  }
};

module.exports = {
  getTodos,
  getTodo,
  createTodo,
  updateTodo,
  deleteTodo
};

