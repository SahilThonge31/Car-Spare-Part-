import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();  // This loads environment variables from the .env file

const connectDB = async () => {
    try {
        
        await mongoose.connect(process.env.MONGO_URI);

        console.log(`MongoDB Connected successfully`);
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1); // Exit with failure
    }
};

export default connectDB;
