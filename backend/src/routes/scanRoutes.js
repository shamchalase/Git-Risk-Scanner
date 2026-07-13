const express = require("express");
const router = express.Router();

const { scanGitlabUser } = require("../controllers/scanController");

router.post("/", scanGitlabUser);

module.exports = router;
