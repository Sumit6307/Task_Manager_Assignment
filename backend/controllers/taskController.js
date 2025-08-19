const Task = require('../models/Task');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const path = require('path');
const fs = require('fs');

// @desc    Get all tasks
// @route   GET /api/v1/tasks
// @access  Private
exports.getTasks = asyncHandler(async (req, res, next) => {
  // Check for admin role
  if (req.user.role === 'admin') {
    const tasks = await Task.find().populate('assignedTo createdBy', 'email');
    return res.status(200).json({
      success: true,
      count: tasks.length,
      data: tasks
    });
  }

  // Regular users can only see their assigned tasks or tasks they created
  const tasks = await Task.find({
    $or: [
      { assignedTo: req.user.id },
      { createdBy: req.user.id }
    ]
  }).populate('assignedTo createdBy', 'email');

  res.status(200).json({
    success: true,
    count: tasks.length,
    data: tasks
  });
});

// @desc    Get single task
// @route   GET /api/v1/tasks/:id
// @access  Private
exports.getTask = asyncHandler(async (req, res, next) => {
  const task = await Task.findById(req.params.id).populate('assignedTo createdBy', 'email');

  if (!task) {
    return next(
      new ErrorResponse(`Task not found with id of ${req.params.id}`, 404)
    );
  }

  // Make sure user is task owner or admin
  if (task.assignedTo.toString() !== req.user.id && task.createdBy.toString() !== req.user.id && req.user.role !== 'admin') {
    return next(
      new ErrorResponse(`User not authorized to access this task`, 401)
    );
  }

  res.status(200).json({
    success: true,
    data: task
  });
});

// @desc    Create task
// @route   POST /api/v1/tasks
// @access  Private
exports.createTask = asyncHandler(async (req, res, next) => {
  // Add user to req.body
  req.body.createdBy = req.user.id;

  const task = await Task.create(req.body);

  res.status(201).json({
    success: true,
    data: task
  });
});

// @desc    Update task
// @route   PUT /api/v1/tasks/:id
// @access  Private
exports.updateTask = asyncHandler(async (req, res, next) => {
  let task = await Task.findById(req.params.id);

  if (!task) {
    return next(
      new ErrorResponse(`Task not found with id of ${req.params.id}`, 404)
    );
  }

  // Make sure user is task owner or admin
  if (task.createdBy.toString() !== req.user.id && req.user.role !== 'admin') {
    return next(
      new ErrorResponse(`User not authorized to update this task`, 401)
    );
  }

  task = await Task.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  res.status(200).json({
    success: true,
    data: task
  });
});

// @desc    Delete task
// @route   DELETE /api/v1/tasks/:id
// @access  Private
exports.deleteTask = asyncHandler(async (req, res, next) => {
  const task = await Task.findById(req.params.id);

  if (!task) {
    return next(
      new ErrorResponse(`Task not found with id of ${req.params.id}`, 404)
    );
  }

  // Make sure user is task owner or admin
  if (task.createdBy.toString() !== req.user.id && req.user.role !== 'admin') {
    return next(
      new ErrorResponse(`User not authorized to delete this task`, 401)
    );
  }

  // Delete associated files
  if (task.documents && task.documents.length > 0) {
    task.documents.forEach(doc => {
      const filePath = path.join(__dirname, '..', doc.filePath);
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    });
  }

  await task.remove();

  res.status(200).json({
    success: true,
    data: {}
  });
});

// @desc    Upload document for task
// @route   PUT /api/v1/tasks/:id/documents
// @access  Private
exports.uploadTaskDocuments = asyncHandler(async (req, res, next) => {
  const task = await Task.findById(req.params.id);

  if (!task) {
    return next(
      new ErrorResponse(`Task not found with id of ${req.params.id}`, 404)
    );
  }

  // Make sure user is task owner or admin
  if (task.createdBy.toString() !== req.user.id && req.user.role !== 'admin') {
    return next(
      new ErrorResponse(`User not authorized to update this task`, 401)
    );
  }

  if (!req.files) {
    return next(new ErrorResponse(`Please upload a file`, 400));
  }

  const files = Array.isArray(req.files.documents) ? req.files.documents : [req.files.documents];

  // Check if adding these files would exceed the 3 document limit
  if (task.documents.length + files.length > 3) {
    return next(
      new ErrorResponse(`Cannot upload more than 3 documents per task`, 400)
    );
  }

  files.forEach(file => {
    // Check file type
    if (!file.mimetype.startsWith('application/pdf')) {
      return next(new ErrorResponse(`Please upload PDF files only`, 400));
    }

    // Check file size
    if (file.size > process.env.MAX_FILE_UPLOAD) {
      return next(
        new ErrorResponse(
          `Please upload a file less than ${process.env.MAX_FILE_UPLOAD / 1000000}MB`,
          400
        )
      );
    }

    // Create custom filename
    file.name = `document_${task._id}${path.parse(file.name).ext}`;

    // Move file to uploads folder
    file.mv(`${process.env.FILE_UPLOAD_PATH}/${file.name}`, async err => {
      if (err) {
        console.error(err);
        return next(new ErrorResponse(`Problem with file upload`, 500));
      }
    });

    // Add to documents array
    task.documents.push({
      fileName: file.name,
      filePath: `/uploads/${file.name}`,
      fileType: file.mimetype,
      fileSize: file.size
    });
  });

  await task.save();

  res.status(200).json({
    success: true,
    data: task
  });
});

// @desc    Delete document from task
// @route   DELETE /api/v1/tasks/:id/documents/:docId
// @access  Private
exports.deleteTaskDocument = asyncHandler(async (req, res, next) => {
  const task = await Task.findById(req.params.id);

  if (!task) {
    return next(
      new ErrorResponse(`Task not found with id of ${req.params.id}`, 404)
    );
  }

  // Make sure user is task owner or admin
  if (task.createdBy.toString() !== req.user.id && req.user.role !== 'admin') {
    return next(
      new ErrorResponse(`User not authorized to update this task`, 401)
    );
  }

  // Find the document to remove
  const documentIndex = task.documents.findIndex(
    doc => doc._id.toString() === req.params.docId
  );

  if (documentIndex === -1) {
    return next(
      new ErrorResponse(`Document not found with id of ${req.params.docId}`, 404)
    );
  }

  // Remove file from filesystem
  const filePath = path.join(__dirname, '..', task.documents[documentIndex].filePath);
  if (fs.existsSync(filePath)) {
    fs.unlinkSync(filePath);
  }

  // Remove from documents array
  task.documents.splice(documentIndex, 1);

  await task.save();

  res.status(200).json({
    success: true,
    data: task
  });
});