import mongoose from "mongoose";
import dotenv from 'dotenv';
dotenv.config();

const connection = mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
export default connection;