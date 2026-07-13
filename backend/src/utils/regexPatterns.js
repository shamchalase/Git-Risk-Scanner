module.exports = [
  /api[_-]?key\s*[:=]\s*['"]?.+/i,
  /password\s*[:=]\s*['"]?.+/i,
  /secret\s*[:=]\s*['"]?.+/i,
  /token\s*[:=]\s*['"]?.+/i,

  /AKIA[0-9A-Z]{16}/,
  /aws_access_key_id/i,
  /aws_secret_access_key/i,

  /glpat-[a-zA-Z0-9_-]+/,

  /github_pat_[a-zA-Z0-9_]+/,

  /eyJ[a-zA-Z0-9_-]+\.[a-zA-Z0-9_-]+\.[a-zA-Z0-9_-]+/,

  /mongodb\+srv:\/\/.+/i,

  /sk_live_[a-zA-Z0-9]+/,

  /BEGIN RSA PRIVATE KEY/,
  /BEGIN OPENSSH PRIVATE KEY/,
];
