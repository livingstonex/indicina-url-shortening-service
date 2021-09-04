const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const colors = require('colors')
const connectDB = require('./config/db');
const errorHandler = require('./middleware/error');

// Load env files
dotenv.config({ path: './config/config.env' });

// Connect to Database
connectDB();

// Route files
const departments = require('./routes/departments');
const teams = require('./routes/teams');
const users = require('./routes/users');

const app = express();

// Body Parser
app.use(express.json());


// Dev logging middleware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}

app.get('/healthcheck', (req, res) => {
  res.send('Service is online.')
});

// Mount routers
app.use('/api/v1/departments', departments);
app.use('/api/v1/teams', teams);
app.use('/api/v1/users', users);

// Error handler middleware
app.use(errorHandler);

const PORT = 9000; // process.env.PORT || 9000;

const server = app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.blue);
});

process.on('unhandledRejection', (err, promise) => {
  console.log(`Error: ${err.message}`.red.bold);

  // Close server and exit process
  server.close(() => process.exit(1));
})