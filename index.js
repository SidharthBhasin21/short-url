const express = require("express");
const urlRoute = require("./routes/url");
const connectMongo = require("./connect");
const path = require("path");
const URL = require("./models/url");
const staticRouter = require("./routes/staticRouter");

const app = express();
const PORT = 8000;

connectMongo("mongodb://127.0.0.1:27017/short-url").then(() =>
  console.log("Mongodb connected")
);

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

// app.get("/", async (req, res) => {
//   const allUrls = await URL.find({});
//   return res.render("home", {
//     urls: allUrls,
//   });
// });

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/url", urlRoute);
app.use("/", staticRouter);

app.get("/:shortid", async (req, res) => {
  const shortId = req.params.shortid;
  if (!shortId) return;
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
  res.redirect(entry?.redirectUrl);
});

app.listen(PORT, () =>
  console.log(`Server started at http://localhost:${PORT}`)
);
