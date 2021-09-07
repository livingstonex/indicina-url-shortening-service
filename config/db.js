const mongoose = require('mongoose');
const colors = require('colors');

const connectDb = async () => {
  const conn = await mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
  });
  
  console.log(`MongoDB Connected on: ${conn.connection.host}:${conn.connection.port}`.cyan.bold);
}

module.exports = connectDb;