# Task Manager - MERN Stack Application

A complete task management system built with MongoDB, Express.js, React, and Node.js.

## Features

- User authentication with JWT
- Create, read, update, delete tasks
- Assign tasks to users
- Upload PDF documents (up to 3 per task)
- Filter and sort tasks
- Admin and user roles
- Responsive design with Tailwind CSS

## Prerequisites

- Node.js (v16 or higher)
- MongoDB
- npm or yarn

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd task-manager
```

2. Install backend dependencies:
```bash
cd backend
npm install
```

3. Install frontend dependencies:
```bash
cd ../vite-project
npm install
```

4. Create environment files:

**Backend (.env):**
```
NODE_ENV=development
PORT=5000
MONGO_URI=mongodb://localhost:27017/taskmanager
JWT_SECRET=your_jwt_secret_here
JWT_EXPIRE=30d
JWT_COOKIE_EXPIRE=30
FILE_UPLOAD_PATH=./uploads
MAX_FILE_UPLOAD=5000000
```

**Frontend (.env):**
```
VITE_API_BASE_URL=http://localhost:5000/api/v1
```

## Running the Application

1. Start MongoDB service

2. Start the backend server:
```bash
cd backend
npm run dev
```

3. Start the frontend development server:
```bash
cd vite-project
npm run dev
```

4. Open http://localhost:5173 in your browser

## Default Admin Account

After first run, create an admin user through the registration page or directly in MongoDB.

## API Endpoints

- `POST /api/v1/auth/register` - User registration
- `POST /api/v1/auth/login` - User login
- `GET /api/v1/tasks` - Get tasks
- `POST /api/v1/tasks` - Create task
- `PUT /api/v1/tasks/:id` - Update task
- `DELETE /api/v1/tasks/:id` - Delete task

## Project Structure

```
backend/
  config/     - Database and multer configuration
  controllers/ - Route controllers
  middleware/ - Custom middleware
  models/     - MongoDB models
  routes/     - API routes
  uploads/    - Uploaded files
  app.js      - Express app
  server.js   - Server entry point

client/
  src/
    components/ - React components
    context/    - React context providers
    pages/      - Page components
    services/   - API services
    utils/      - Utility functions
```

## Technologies Used

- **Frontend**: React, Vite, Tailwind CSS, React Router
- **Backend**: Node.js, Express.js, MongoDB, Mongoose
- **Authentication**: JWT, bcryptjs
- **File Upload**: Multer
- **Development**: Nodemon, ESLint

## License

MIT License - feel free to use this project for learning and development purposes.