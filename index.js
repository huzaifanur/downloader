const express = require("express");
const fs = require("fs");
const app = express();
const path = require("path");
const { run } = require("./download.js");

app.use(express.static(__dirname));

// Define the endpoint

app.get("/downloadFile", async (req, res) => {
  await run();
  res.send("File downloaded");
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/contents/:absPath", (req, res) => {
  const { absPath } = req.params;
  const absolutePath = path.resolve("/", absPath); // Make sure the path starts from root (/)

  fs.readdir(absolutePath, (err, files) => {
    if (err) {
      return res
        .status(500)
        .json({ error: "Unable to read directory contents." });
    }

    const parentDirectory = path.join(
      "/",
      path.relative(__dirname, path.dirname(absolutePath))
    );
    const data = {
      currentDirectory: path.relative(__dirname, absolutePath),
      parentDirectory,
      files,
    };

    res.json(data);
  });
});

app.get("/navigate/:dir?", (req, res) => {
  let { dir } = req.params;

  // If "dir" parameter is not provided, set it to the current directory
  if (!dir) {
    dir = "./"; // Assuming the current directory is the root of your file system
  }

  const currentPath = path.join(__dirname, dir);

  fs.readdir(currentPath, (err, files) => {
    if (err) {
      return res
        .status(500)
        .json({ error: "Unable to read directory contents." });
    }

    const parentDirectory = path.join(
      "/",
      path.relative(__dirname, path.dirname(currentPath))
    );
    const data = {
      currentDirectory: dir,
      parentDirectory,
      files,
    };

    res.json(data);
  });
});
app.get("/nav/:stepsBack", (req, res) => {
  const { stepsBack } = req.params;
  const steps = parseInt(stepsBack);

  if (isNaN(steps) || steps < 0) {
    return res.status(400).json({ error: "Invalid number of steps." });
  }

  let currentPath = path.join(__dirname, ".");

  for (let i = 0; i < steps; i++) {
    const parentDir = path.dirname(currentPath);
    if (parentDir === currentPath) {
      return res.status(400).json({ error: "Reached the root directory." });
    }
    currentPath = parentDir;
  }

  fs.readdir(currentPath, (err, files) => {
    if (err) {
      return res
        .status(500)
        .json({ error: "Unable to read directory contents." });
    }

    const parentDirectory = path.join(
      "/",
      path.relative(__dirname, currentPath)
    );
    const data = {
      currentDirectory: path.relative(__dirname, currentPath),
      parentDirectory,
      files,
    };

    res.json(data);
  });
});
// Start the server
const port = 3000; // Choose any port number you prefer
app.listen(port, () => {
  console.log(`Server started on http://localhost:${port}`);
});
