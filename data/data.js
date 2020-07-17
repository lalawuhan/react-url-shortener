const fs = require("fs");
const path = require("path");

let data = [];
try {
  const linksFilePath = path.join(__dirname, "./links.json");
  data = JSON.parse(fs.readFileSync(linksFilePath, "utf8"));
} catch (err) {
  if (err.code === "ENOENT") {
    const err = new Error("File does not exist.");
    err.status = 404;
    throw err;
  } else {
    const err = new Error("Error reading data");
    throw err;
  }
}

module.exports.data = data;
