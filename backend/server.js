import express, { urlencoded } from "express";
import dotenv from "dotenv";
import mongoose, { mongo } from "mongoose";

dotenv.config()

const app = express();
app.use(express.json())
app.use(urlencoded({ extended: true}))
app.use(cors({
    
}))

import authRoutes from "./routes/authRoutes.js"
import taskRoutes from "./routes/taskRoutes.js"

app.use("/api/auth", authRoutes)
app.use("/api/tasks", taskRoutes)

mongoose.connect(process.env.MONGODB_URI).
    then(() => {
        console.log("MongoDb connected");
        app.listen(process.env.PORT || 4000, () =>{
            console.log(`Server is running on ${process.env.PORT}`);
            
        })
    })
    .catch((error) => {
        console.error("Error connecting to MongoDB", error);
    })
