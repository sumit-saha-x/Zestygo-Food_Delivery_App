// connect mongodb with expressbackend
import express from "express";
import dotenv from "dotenv"; 
import mongoDB from "./db.js"
import createUserRoutes from "./routes/CreateUser.js"; // Import your routes as ES module
import DisplayDataRoutes from "./routes/DisplayData.js";
import OrderData from "./routes/OrderData.js";

dotenv.config();

const app=express();
const port=process.env.PORT || 5000;
mongoDB();

app.use((req,res,next)=>{
    res.setHeader("Access-Control-Allow-Origin",process.env.FRONTEND_URL || "http://localhost:3000");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Request-With, Content-Type, Accept"
    );
    next();
})

app.use(express.json());

app.get("/",(req,res)=>{
    res.send("Backend is Running!")
})

app.use("/api",createUserRoutes);     //Route to save all user info for bknd login ans signup
app.use("/api",DisplayDataRoutes);
app.use("/api",OrderData);


app.listen(port,()=>{
    console.log(`Server running on port ${port}.`)
});