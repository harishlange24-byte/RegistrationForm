import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

async function ConnectDB() {
    try {
        if (!process.env.MONGO_URI) {
            throw new Error("MONGO_URI is missing in environment variables");
        }

        await mongoose.connect(process.env.MONGO_URI);
        console.log("Connected to DB");
    } catch (err) {
        console.error("Database connection failed:", err.message);
        process.exit(1);
    }
}

export default ConnectDB;
