const getData = require("../../data/data");

module.exports = (req, res) => {
  const id = req.params.id;
  let link = getData().find((link) => link.id === id);
  if (link) {
    res.setHeader("Content-Type", "application/json");
    res.writeHead(301, {
      Location: `${link.url}`,
    });
    res.end();
  } else {
    res.statusCode = 404;
    res.end(
      JSON.stringify({
        status: 404,
        message: "Link not found",
      })
    );
  }
};
