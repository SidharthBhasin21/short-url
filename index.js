const express = require("express");
const connectMongo = require("./connect");
const path = require("path");
const URL = require("./models/url");
const coodieParser = require("cookie-parser");

const staticRoute = require("./routes/staticRouter");
const urlRoute = require("./routes/url");
const userRoute = require("./routes/users");
const { restrictToLoggedInUserOnly ,checkAuth} = require("./middlewares/auth");


const app = express();
const PORT = 8000;

connectMongo("mongodb://127.0.0.1:27017/short-url").then(() =>
  console.log("Mongodb connected")
);

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));


app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(coodieParser());



app.use("/url",restrictToLoggedInUserOnly , urlRoute);
app.use("/user", userRoute);
app.use("/",checkAuth,staticRoute);

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
