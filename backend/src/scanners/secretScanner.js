const regexPatterns = require("../utils/regexPatterns");

const scanSecrets = (content) => {
  for (const pattern of regexPatterns) {
    if (pattern.test(content)) {
      return true;
    }
  }

  return false;
};

module.exports = scanSecrets;
