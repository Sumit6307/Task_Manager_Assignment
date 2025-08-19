const express = require('express');
const path = require('path');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const mongoSanitize = require('express-mongo-sanitize');
const helmet = require('helmet');
const xss = require('xss-clean');
const rateLimit = require('express-rate-limit');
const hpp = require('hpp');
const errorHandler = require('./middleware/error');

// Load env vars
require('dotenv').config();

// Add this at the very top of app.js
require('dotenv').config({ path: __dirname + '/.env' });
console.log('Environment:', process.env.NODE_ENV);
console.log('MongoDB:', process.env.MONGO_URI ? 'Configured' : 'Missing');

// Import route files
const authRouter = require('./routes/authRoutes');
const taskRouter = require('./routes/taskRoutes');
const userRouter = require('./routes/userRoutes');


const app = express();

app.use(cors({
  origin: 'http://localhost:5173', // Your Vite frontend URL
  credentials: true
}));

// Body parser
app.use(express.json());

// Cookie parser
app.use(cookieParser());

// Sanitize data
app.use(mongoSanitize());

// Set security headers
app.use(helmet());

// Prevent XSS attacks
app.use(xss());

// Rate limiting
const limiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 mins
  max: 100
});
app.use(limiter);

// Prevent http param pollution
app.use(hpp());

// Enable CORS
app.use(cors());

// Set static folder
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Mount routers
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/tasks', taskRouter);
app.use('/api/v1/users', userRouter);

// Error handler (must be after all routes)
app.use(errorHandler);

module.exports = app;