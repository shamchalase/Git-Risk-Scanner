const getSeverity = (type) => {
  switch (type) {
    case "Sensitive File":
      return "High";

    case "Exposed Secret":
      return "Medium";

    case "Missing Metadata":
      return "Low";

    default:
      return "Low";
  }
};

module.exports = getSeverity;
