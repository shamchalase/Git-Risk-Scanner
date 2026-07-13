const {
  getUserProjects,
  getProjectFiles,
  getFileContent,
} = require("./gitlabService");

const scanSensitiveFiles = require("../scanners/sensitiveFileScanner");
const scanMetadata = require("../scanners/metadataScanner");
const scanSecrets = require("../scanners/secretScanner");
const { saveReport } = require("./reportService");

const sensitiveFiles = [".env", ".pem", "id_rsa", "config.json", "secrets.yml"];

const secretPatterns = [
  /api[_-]?key/i,
  /token/i,
  /password/i,
  /secret/i,
  /AKIA[0-9A-Z]{16}/,
];

const scanUser = async (username) => {
  const projects = await getUserProjects(username);

  console.log("Projects Found:", projects.length);

  const issues = [];

  for (const project of projects) {
    try {
      console.log("\n======================");
      console.log("Scanning:", project.name);

      const files = await getProjectFiles(project.id);

      console.log("Files Found:", files.length);

      if (!files.length) {
        console.log("No files found in repository");
        continue;
      }

      const fileNames = files.map((file) => file.path.toLowerCase());

      console.log("Sample Files:", fileNames.slice(0, 10));
      console.log(
        "README Exists:",
        fileNames.some((f) => f.includes("readme")),
      );

      console.log(
        "LICENSE Exists:",
        fileNames.some((f) => f.includes("license")),
      );
      // README Check
      const metadataIssues = scanMetadata(files);

      metadataIssues.forEach((issue) => {
        issues.push({
          repository: project.name,
          issue,
          severity: "Low",
        });
      });

      // LICENSE Check
      //   const hasLicense = fileNames.some((file) => file.includes("license"));

      //   if (!hasLicense) {
      //     issues.push({
      //       repository: project.name,
      //       issue: "Missing LICENSE",
      //       severity: "Low",
      //     });

      //     console.log("Issue Found: Missing LICENSE");
      //   }

      // Sensitive File Scan
      const sensitiveResults = scanSensitiveFiles(files);

      sensitiveResults.forEach((file) => {
        issues.push({
          repository: project.name,
          issue: `Sensitive File Found: ${file.path}`,
          severity: "High",
        });
      });

      // Secret Scan
      const filesToScan = files.slice(0, 20);

      for (const file of filesToScan) {
        try {
          if (file.type !== "blob") continue;

          const content = await getFileContent(
            project.id,
            file.path,
            project.default_branch || "main",
          );

          if (!content) continue;

          const foundSecret = scanSecrets(content);

          if (foundSecret) {
            issues.push({
              repository: project.name,
              issue: `Possible Secret Found in ${file.path}`,
              severity: "Medium",
            });

            console.log("Possible Secret Found:", file.path);
          }
        } catch (err) {
          console.log(`Secret scan skipped: ${file.path}`);
        }
      }
    } catch (err) {
      console.error(`Error scanning ${project.name}:`, err.message);
    }
  }

  console.log("\n======================");
  console.log("Total Issues Found:", issues.length);
  console.log("======================\n");

  const report = await saveReport(username, issues);

  return report;
};

module.exports = {
  scanUser,
};
