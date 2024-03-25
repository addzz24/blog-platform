import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const mongoUri = 'mongodb://127.0.0.1:27017/blog-platform';

const connectDB = async () => {
  try {
    console.log('DB CONN INIT')
    await mongoose.connect(mongoUri);
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1); // Exit process with failure
  }
};

export default connectDB;
