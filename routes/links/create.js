const generateID = require("../../lib/generateNum");
const getData = require("../../data/data");
const fs = require("fs");

module.exports = (req, res) => {
  if (req.headers["content-length"] === "0") {
    res.writeHead(400, {
      "Content-Type": "application/json",
    });
    res.end(
      JSON.stringify({
        message: "Data is empty",
      })
    );
  } else {
    try {
      let body = req.body.url;
      let newLink = {
        id: generateID(getData()),
        url: body,
      };
      let data = getData();
      data.push(newLink);
      fs.writeFileSync("data/links.json", JSON.stringify(data));
      res.writeHead(200, {
        "Content-Type": "application/json",
      });
      res.end(
        JSON.stringify({
          status: res.statusCode,
          message: `Link successfully added`,
          links: getData(),
        })
      );
    } catch (error) {
      res.statusCode = 404;
      res.end(
        JSON.stringify({
          status: 404,
          message: `Cannot add link, ${error}`,
        })
      );
    }
  }
};
