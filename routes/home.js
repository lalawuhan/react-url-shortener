const getData = require("../data/data");

module.exports = (req, res) => {
  res.writeHead(200, {
    "Content-Type": "application/json",
  });
  res.end(
    JSON.stringify({
      links: getData(),
    })
  );
};
