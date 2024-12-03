import mongoose from 'mongoose';
import dotenv from 'dotenv'
dotenv.config();

const connectDb = async () => {
    try {
      const connection = await mongoose.connect(process.env.MONGODB_URL);
        console.log("connected to Dataabase" , connection.connection.host);
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        process.exit(1);
    }
}

    export default connectDb;     
