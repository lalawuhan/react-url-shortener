const fs = require("fs");

module.exports = function getData() {
  let data = [];
  try {
    data = JSON.parse(fs.readFileSync("data/links.json", "utf8"));
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
  return data;
};
