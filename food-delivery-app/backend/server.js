import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import { mongodb } from "./config/database.js";
import foodRouter from "./routes/foodRoute.js";
import userRouter from "./routes/userRoute.js";
import cartRouter from "./routes/cartRoute.js";
import orderRouter from "./routes/orderRoute.js";
// import { json } from "body-parser";

// Load environment variables
// Determine which environment file to use
const environment = process.env.NODE_ENV || 'development'; //development or production
dotenv.config({path:`.env.${environment}`});

// app config
const app = express();
const PORT = process.env.PORT || 4000;

// Use environment variable for base URL
const BASE_URL = process.env.BASE_URL || 'http://localhost:4000';

// Middleware
app.use(express.json())
app.use(cors())


// API EndPoints
app.use("/api/food",foodRouter);
app.use("/api/images", express.static("uploads"));
app.use("/api/auth",userRouter);
app.use("/api/cart", cartRouter);
app.use("/api/order",orderRouter);

app.get('/',(req, res)=>{
    res.json({"message": " API Working"})
})

// database connection then start server
mongodb()
.then(()=>{
    app.listen(PORT,()=>{
        console.log(`Server Started on http://localhost:${PORT}`);
    })

})
.catch((error)=>{
    console.log(`Error starting the server !!`, error);
});

