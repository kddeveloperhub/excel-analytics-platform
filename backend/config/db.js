import mongoose from 'mongoose';

// Connect to MongoDB
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,        // Keep this for backward compatibility (still safe to use)
      useUnifiedTopology: true,     // Recommended for improved server monitoring
    });

    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error('❌ MongoDB connection failed:', error.message); // Log error message for clarity
    process.exit(1); // Exit the application with a failure code
  }
};

export default connectDB;
