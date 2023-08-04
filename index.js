const express = require("express");

const app = express();

const { run } = require("./download.js");

// Define the endpoint

app.get("/", (req, res) => {
  res.send("Hello World");
});
app.get("/downloadFile", async (req, res) => {
  const cook = await run();
  res.json(cook);
});

const port = 3000; // Choose any port number you prefer
app.listen(port, () => {
  console.log(`Server started on http://localhost:${port}`);
});
