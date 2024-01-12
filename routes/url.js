const express = require("express");
const { handleGenerateNewURL, handleAnalytics } = require("../controllers/url");

const router = express.Router();

router.post("/", handleGenerateNewURL);

router.get("/analytics/:shortId", handleAnalytics);

module.exports = router;
