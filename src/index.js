const express = require("express");
const mongoose = require("mongoose");
const redis = require("redis");


const app = express();

const PORT = process.env.PORT || 4000;

// Connect to Redis
const REDIS_PORT = 6379;
const REDIS_HOST = "redis";
const redisClient = redis.createClient({
  url: `redis://${REDIS_HOST}:${REDIS_PORT}`,
});
redisClient.on("error", (err) => {
  console.log("Redis error: ", err);
});
redisClient.on("connect", () => {
  console.log("Redis connected");
});

redisClient.connect();
 

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
  // cache data in redis
  redisClient.set("products", "products");
  res.send("Hello World from docker compose dev!");
});


app.get("/data", async(req, res) => {
  const products = await redisClient.get("products");
  res.send(products);
}); 



app.listen(PORT, () => {
  console.log("Server running on port 4000");
});
