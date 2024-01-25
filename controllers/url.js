const shortid = require("shortid");
const URL = require("../models/url");

async function handleGenerateNewURL(req, res) {
  const shortID = shortid();

  const body = req.body;
  if (!body.url) return res.status(400).json({ Error: "URL is required" });

  await URL.create({
    shortId: shortID,
    redirectUrl: body.url,
    visitHistory: [],
    createdBy: req.user._id
  });

  res.status(200).render("home",{ id: shortID });
}

async function handleAnalytics(req, res) {
  const shortId = req.params.shortId;
  const result = await URL.findOne({ shortId });
  return res.json({
    url: result.redirectUrl,
    totalClicks: result.visitHistory.length,
    analytics: result.visitHistory,
  });
}

module.exports = {
  handleGenerateNewURL,
  handleAnalytics,
};
