import express from "express";
import * as dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import { createProxyMiddleware } from "http-proxy-middleware"; // Import http-proxy-middleware
import UserRoutes from "./routes/User.js";
import FoodRoutes from "./routes/Food.js";
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true }));

app.use("/api/user/", UserRoutes);
app.use("/api/food/", FoodRoutes);

// error handler
app.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || "Something went wrong";
  return res.status(status).json({
    success: false,
    status,
    message,
  });
});

app.get("/", async (req, res) => {
  res.status(200).json({
    message: "Test API",
  });
});

app.get('/api/time', async (req, res) => {
  try {
      // Use dynamic import for node-fetch
      const fetch = await import('node-fetch');
      const response = await fetch.default('http://worldtimeapi.org/api/timezone/Asia/Kolkata');
      const data = await response.json();
      res.json({ time: data.datetime });
  } catch (error) {
      console.error('Error fetching data:', error);
      res.status(500).json({ error: 'Internal Server Error' });
  }
});

const servers = [
  'http://localhost:8001',  
  'http://localhost:8002',
];

let currentServerIndex = 0;

// Round-robin load balancer middleware
const roundRobinBalancer = (req, res, next) => {
  const target = servers[currentServerIndex];
  currentServerIndex = (currentServerIndex + 1) % servers.length; // Cycle through servers
  createProxyMiddleware({
    target,
    changeOrigin: true,
  })(req, res, next);
};

// Use round-robin load balancer middleware for all routes
app.use(roundRobinBalancer);

const connectDB = () => {
  mongoose.set("strictQuery", true);
  mongoose
    .connect(process.env.MONGODB_URL)
    .then(() => console.log("Connected to Mongo DB"))
    .catch((err) => {
      console.error("failed to connect with mongo");
      console.error(err);
    });
};

const startServer = async () => {
  try {
    connectDB();
    app.listen(8000, () => console.log("Server started on port 8000"));
  } catch (error) {
    console.log(error);
  }
};

startServer();``
  
[
  {
    "name": "Chicken Curry",
    "desc": "Spicy chicken curry made with fresh chicken and spices from the south of India. Served with rice. A must-try!",
    "img": "https://www.kitchensanctuary.com/wp-content/uploads/2022/09/Air-Fryer-Chicken-Curry-square-FS-36.jpg",
    "price": {
      "org": 120.00,
      "mrp": 300.00,
      "off": 12.00
    },
    "ingredients": ["chicken", "rice", "spices", "oil", "onion", "tomato"],
    "category":["Curry", "Non-Veg"]
    }
]
