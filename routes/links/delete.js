const renderList = require("../../templates/renderList");
const accepts = require("../../lib/accepts");
let { data } = require("../../data/data");
const fs = require("fs");

module.exports = (req, res) => {
  let id = req.params.id;
  let link = data.find((link) => link.id === id);
  if (link) {
    let linkData = link;
    let filteredData = data.filter((link) => link.id != req.params.id);
    data = filteredData;

    if (accepts(req) === "json") {
      res.writeHead(200, {
        "Content-Type": "application/json",
      });
      res.end(
        JSON.stringify({
          message: `${linkData.url} with id: ${linkData.id} deleted successfully.`,
          links: data,
        })
      );
      fs.writeFileSync("data/links.json", JSON.stringify(data));
    } else {
      res.writeHead(200, {
        "Content-Type": "text/html",
      });
      res.write(
        `<p> ${linkData.url} with id: ${linkData.id} deleted successfully.</p>`
      );
      res.write(renderList(data));
      res.end();
    }
  } else {
    res.statusCode = 404;
    res.end(
      JSON.stringify({
        status: 404,
        message: "Cannot delete link",
      })
    );
  }
};
