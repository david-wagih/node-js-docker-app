const express = require("express");

const app = express();

const PORT = process.env.PORT || 4000;

app.get("/", (req, res) => {
  res.send("Hello World from docker compose dev!");
});

app.listen(PORT, () => {
  console.log("Server running on port 4000");
});
