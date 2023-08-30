import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import app from "./app";

dotenv.config();

const port = process.env.PORT;
const MONGO_URL = process.env.MONGO_URL || "";

const mongooseConnect = async () => {
  try {
    await mongoose.connect(MONGO_URL);
    app.listen(port, () => {
      console.log(`Listening at http://localhost:${port}`);
    });
  } catch (error) {
    console.error(error);
  }
};
mongooseConnect();
