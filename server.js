const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const colors = require('colors')
const connectDB = require('./config/db');
const errorHandler = require('./middleware/error');

// Load env files
dotenv.config({ path: './config/config.env' });
const AppMiddleware = require('./middleware/app');

// Connect to Database
connectDB();

// Route files
const url = require('./routes/url');

const app = express();

// Body Parser
app.use(express.json());

// Response middleware
app.use(AppMiddleware.InjectResponseBody);

// Dev logging middleware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}

app.get('/healthcheck', (req, res) => {
  res.send('Service is online.')
});

// Mount routers
app.use('/api/v1', url);

// Error handler middleware
app.use(errorHandler);

const PORT = 8000; // process.env.PORT || 9000;

const server = app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.blue);
});

process.on('unhandledRejection', (err, promise) => {
  console.log(`Error: ${err.message}`.red.bold);

  // Close server and exit process
  server.close(() => process.exit(1));
});

module.exports = server;