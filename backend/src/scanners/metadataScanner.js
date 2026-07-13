const scanMetadata = (files) => {
  const names = files.map((f) => f.path.toLowerCase());

  const issues = [];

  if (!names.includes("readme.md")) {
    issues.push("Missing README.md");
  }

  if (!names.includes("license")) {
    issues.push("Missing LICENSE");
  }

  return issues;
};

module.exports = scanMetadata;
