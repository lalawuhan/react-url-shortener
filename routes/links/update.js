let { data } = require("../../data/data");

module.exports = (req, res) => {
  const id = req.params.id;
  let link = data.find((link) => link.id === id);
  if (link) {
    let body = req.body;
    let newLink = body.url;
    let prevLink = link.url;
    link.url = newLink;
    res.writeHead(200, {
      "Content-Type": "application/json",
    });
    res.end(
      JSON.stringify({
        message: `${prevLink} successfully updated to ${newLink}.`,
        links: data,
      })
    );
  } else {
    res.statusCode = 404;
    res.end(
      JSON.stringify({
        status: 404,
        message: "Cannot update link",
      })
    );
  }
};
