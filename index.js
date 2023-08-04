const express = require("express");
const fs = require("fs");
const app = express();
const path = require("path");
const { run } = require("./download.js");

app.use(express.static(__dirname));

// Define the endpoint

app.get("/", (req, res) => {
  res.send("Hello World");
});
app.get("/downloadFile", async (req, res) => {
  await run();
  res.send("File downloaded");
});

const port = 3000; // Choose any port number you prefer
app.listen(port, () => {
  console.log(`Server started on http://localhost:${port}`);
});
