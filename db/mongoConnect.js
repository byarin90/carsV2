import mongoose from "mongoose";
import { config } from 'dotenv'
config()

export const connectToMongoDB = () => {
    mongoose.set('strictQuery', true);
    mongoose.connect(process.env.MONGO_CONNECTION, {
        useNewUrlParser: true,
        useUnifiedTopology: true,

    }, () => console.log("MongoDb ATLAS Connect..."));
}