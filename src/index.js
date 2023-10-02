const express = require("express");
const mongoose = require("mongoose");

const app = express();

const PORT = process.env.PORT || 4000;

// Connect to MongoDB
const DB_USER = 'root';
const DB_PASSWORD = 'example';
const DB_PORT = 27017
const DB_HOST = 'mongo'
const URI = `mongodb://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}`;
mongoose
  .connect(URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch((err) => {
    console.log("MongoDB connection error", err);
  });

app.get("/", (req, res) => {
  res.send("Hello World from docker compose dev!");
});

app.listen(PORT, () => {
  console.log("Server running on port 4000");
});
