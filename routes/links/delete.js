let { data } = require("../../data/data");
const fs = require("fs");

module.exports = (req, res) => {
  let id = req.params.id;
  let link = data.find((link) => link.id === id);
  if (link) {
    let linkData = link;
    let filteredData = data.filter((link) => link.id != req.params.id);
    data = filteredData;
    res.writeHead(200, {
      "Content-Type": "application/json",
    });
    res.end(
      JSON.stringify({
        status: 200,
        message: `${linkData.url} with id: ${linkData.id} deleted successfully.`,
        links: data,
      })
    );
    fs.writeFileSync("data/links.json", JSON.stringify(data));
  } else {
    res.statusCode = 404;
    res.end(
      JSON.stringify({
        status: 404,
        message: "Cannot delete link",
        links: data,
      })
    );
  }
};
