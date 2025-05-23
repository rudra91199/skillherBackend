import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import bodyparser from "body-parser";
import cookieParser from "cookie-parser";
import router from "./routes/route.index.js";

const app = express();
const port = process.env.PORT || 5000;
dotenv.config();

//connection
const connection = async () => {
  try {
    mongoose.set("strictQuery", true);
    await mongoose.connect(process.env.MONGO_URI);
    app.listen(port, () => {});
    console.log("connected to MongoDB.");
  } catch (error) {
    throw error;
  }
};
connection();

//middlewares
app.use(cors());

app.use(bodyparser.json({ limit: "50mb" }));

app.use(bodyparser.urlencoded({ extended: true, limit: "50mb" }));

app.use(cookieParser());

//routes
app.use("/api/", router);

app.get("/", async (req, res) => {
  res.send("SKILLHER server.");
});
