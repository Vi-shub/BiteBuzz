import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";

import imageRoute from "./routes/image.js";
import userRoute from "./routes/user.js";
const app = express();
dotenv.config();
import cors from "cors";
const port = process.env.PORT || 8000;
app.use(cors());
app.get("/", (req, res) => {
    res.send("Hello World!");
});
// cors
app.use(express.json());
// Connect to MongoDB 
const connection = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected");
  } catch (error) {
    console.error("MongoDB connection error", error);
  }
};
connection();
app.use("/api/v1/all", imageRoute);
app.use("/api/v1/user", userRoute);
app.use(express.json({limit: "3mb"}));

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
    }
);
