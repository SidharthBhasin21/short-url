const express = require("express");
const urlRoute = require("./routes/url");
const connectMongo = require("./connect");

const app = express();
const PORT = 8000;

connectMongo("mongodb://127.0.0.1:27017/short-url").then(() =>
  console.log("Mongodb connected")
);

app.get("/", (req, res) => {
  return res.end("Hello the page is loading....");
});

app.use("url", urlRoute);

app.listen(PORT, () =>
  console.log(`Server started at http://localhost:${PORT}`)
);
