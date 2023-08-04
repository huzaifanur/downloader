const express = require("express");

const app = express();

const { run } = require("./download.js");

// Define the endpoint

app.get("/", (req, res) => {
  res.send("Hello World");
});
app.get("/downloadFile/:storeNumber", async (req, res) => {
  const storeNumber = req.params.storeNumber;
  console.log(storeNumber);
  const cook = await run(storeNumber);
  res.json(cook);
});

const port = 3000; // Choose any port number you prefer
app.listen(port, () => {
  console.log(`Server started on http://localhost:${port}`);
});
