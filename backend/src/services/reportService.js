const ScanReport = require("../models/ScanReport");

const saveReport = async (username, issues) => {
  const report = await ScanReport.create({
    username,
    issues,
  });

  return report;
};

module.exports = {
  saveReport,
};
