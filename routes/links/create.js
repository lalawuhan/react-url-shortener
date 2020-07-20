const generateID = require("../../lib/generateNum");
let { data } = require("../../data/data");

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
        id: generateID(data),
        url: body,
      };
      data.push(newLink);
      res.writeHead(200, {
        "Content-Type": "application/json",
      });
      res.end(
        JSON.stringify({
          status: res.statusCode,
          message: `Link successfully added`,
          links: data,
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
