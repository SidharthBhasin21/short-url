const express = require("express");
const urlRoute = require("./routes/url");
const connectMongo = require("./connect");
const URL = require("./models/url");

const app = express();
const PORT = 8000;

connectMongo("mongodb://127.0.0.1:27017/short-url").then(() =>
  console.log("Mongodb connected")
);

app.get("/", (req, res) => {
  return res.end("Hello the page is loading....");
});

app.use(express.json());
app.use("/url", urlRoute);

app.get("/:shortid", async (req, res) => {
  const shortId = req.params.shortid;
  const entry = await URL.findOneAndUpdate(
    {
      shortId,
    },
    {
      $push: {
        visitHistory: { timestamp: Date.now() },
      },
    }
  );
  res.redirect(entry.redirectUrl);
});

app.listen(PORT, () =>
  console.log(`Server started at http://localhost:${PORT}`)
);
