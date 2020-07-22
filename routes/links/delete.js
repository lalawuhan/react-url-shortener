const getData = require("../../data/data");
const fs = require("fs");
const dataPath = "data/links.json";

module.exports = (req, res) => {
  let id = req.params.id;
  let link = getData().find((link) => link.id === id);
  let data = getData();
  if (link) {
    let linkData = link;
    let filteredData = getData().filter((link) => link.id !== req.params.id);
    console.log("filtrt", filteredData);
    data = filteredData;
    res.writeHead(200, {
      "Content-Type": "application/json",
    });
    res.end(
      JSON.stringify({
        status: 200,
        message: `${linkData.url} with id: ${linkData.id} deleted successfully.`,
        links: filteredData,
      })
    );
    fs.writeFileSync(dataPath, JSON.stringify(filteredData));
  } else {
    res.statusCode = 404;
    res.end(
      JSON.stringify({
        status: 404,
        message: "Cannot delete link",
        links: getData(),
      })
    );
  }
};
