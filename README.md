# GitLab Public Repository Risk Scanner

A security analysis tool that scans public GitLab repositories for potential security risks and misconfigurations. The scanner identifies accidentally committed sensitive files, exposed credentials using regex-based detection, and missing repository metadata such as README or LICENSE files.

## Features
- Detect sensitive files (.env, .pem, id_rsa, config.json, secrets.yml)
- Identify exposed API keys, tokens, passwords, and cloud credentials
- Check for missing README.md and LICENSE files
- Generate structured reports with severity levels
- Export results in JSON, HTML, or CLI format
- Optional dashboard for visualization

## Tech Stack
- Next.js / React
- Node.js / Express
- GitLab REST API
- TypeScript
- Regex-based Secret Detection

## Output
- Repository Name
- Detected Issues
- Severity Level (High / Medium / Low)
