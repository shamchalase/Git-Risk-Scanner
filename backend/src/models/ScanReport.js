const mongoose = require("mongoose");

const IssueSchema = new mongoose.Schema({
  repository: String,
  issue: String,
  severity: String,
});

const ScanReportSchema = new mongoose.Schema(
  {
    username: String,
    issues: [IssueSchema],
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("ScanReport", ScanReportSchema);
