const express = require('express');
const {
  getTasks,
  getTask,
  createTask,
  updateTask,
  deleteTask,
  uploadTaskDocuments,
  deleteTaskDocument
} = require('../controllers/taskController');
const { protect } = require('../middleware/auth');
const upload = require('../config/multer'); // Updated import

const router = express.Router();

router
  .route('/')
  .get(protect, getTasks)
  .post(protect, createTask);

router
  .route('/:id')
  .get(protect, getTask)
  .put(protect, updateTask)
  .delete(protect, deleteTask);

// Updated file upload route
router
  .route('/:id/documents')
  .put(protect, upload.array('documents', 3), uploadTaskDocuments); // Fixed usage

router
  .route('/:id/documents/:docId')
  .delete(protect, deleteTaskDocument);

module.exports = router;