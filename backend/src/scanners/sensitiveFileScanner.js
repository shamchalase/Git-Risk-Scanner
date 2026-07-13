const sensitiveFiles = [
  ".env",
  ".env.local",
  ".env.production",
  ".env.development",

  ".pem",
  ".key",
  "id_rsa",
  "id_dsa",

  "config.json",
  "secrets.yml",
  "credentials.json",
  "aws_credentials",

  ".npmrc",

  "google-services.json",
  "firebase-adminsdk.json",

  ".p12",
  ".jks",

  "database.yml",

  ".dockerconfigjson",

  ".htpasswd",
];

const scanSensitiveFiles = (files) => {
  return files.filter((file) => {
    const filePath = file.path.toLowerCase();

    return sensitiveFiles.some((sensitive) =>
      filePath.includes(sensitive.toLowerCase()),
    );
  });
};

module.exports = scanSensitiveFiles;
