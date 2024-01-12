const shortid = require("shortid");
const URL = require("../models/url");

async function handleGenerateNewURL(req, res) {
  const shortID = shortid();

  const body = req.body;
  if (!body.url) return res.status(404).json({ Error: "URL is required" });

  await URL.create({
    shortId: shortID,
    redirectUrl: body.url,
    visitedHistory: [],
  });

  res.status(200).json({ id: shortID });
}

module.exports = {
  handleGenerateNewURL,
};
