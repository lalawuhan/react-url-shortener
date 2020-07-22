const fs = require("fs");
const polka = require("polka");
const bodyParser = require("body-parser");
const home = require("./routes/home");
const links = require("./routes/links");
const getData = require("./data/data");

const path = require("path");
const serveStatic = require("serve-static");
const cors = require("cors");

const port = process.env.PORT || 5000;
let dataPath = "./data/links.json";

const app = polka({
  onError(err, req, res, next) {
    const http = require("http");
    let code = (res.statusCode = err.code || err.status || 500);
    res.end((err.length && err) || err.message || http.STATUS_CODES[code]);
  },
});

app.use(serveStatic(path.join(__dirname, "client/build")));
app.use(cors());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get("/", home);

app.get("/links", home);

app.get("/links/:id", links.read);

app.post("/links", links.create);

app.put("/links/:id", links.update);
app.post("/links/put/:id", links.update); // for form

app.delete("/links/:id", links.delete);
app.post("/links/delete/:id", links.delete); // for form

app.listen(port, (err) => {
  if (err) throw err;
  console.log(`> Running on localhost:${port}`);
});

//exit events
function saveFile() {
  let latestData = getData();
  fs.writeFileSync(dataPath, JSON.stringify(latestData));
  console.log("data successfully saved:", latestData);
}

//catches ctrl+c event
process.on("SIGINT", () => {
  saveFile();
  process.exit();
});
// test by using kill [PID_number]
process.on("SIGTERM", () => {
  saveFile();
  server.close(() => {
    console.log("SIGTERM signal received.");
  });
});
