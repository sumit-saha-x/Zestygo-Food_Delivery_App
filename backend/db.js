import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config(); 

const mongoURI =process.env.MONGO_URI;

const mongoDB = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(mongoURI);
    console.log("Connected to MongoDB");

    const fetchedData = await mongoose.connection.db.collection("food_items").find({}).toArray();     // Fetch food_items collection from mongo
  

                                                         // Fetch foodCategory collection
    const foodCategoryData = await mongoose.connection.db.collection("foodCategory").find({}).toArray();

                                                        // Store collections in global variables
    global.food_items = fetchedData;
    global.foodCategory = foodCategoryData;

    console.log("Global variables set successfully");
  } catch (err) {
    console.error("Error connecting to MongoDB or fetching data:", err);
  }
};

export default mongoDB;
