const axios = require("axios");

const GITLAB_API = "https://gitlab.com/api/v4";

const getUserProjects = async (name) => {
  try {
    // 1. Try as GitLab User
    const userRes = await axios.get(
      `${GITLAB_API}/users?username=${encodeURIComponent(name)}`,
    );

    if (userRes.data && userRes.data.length > 0) {
      const user = userRes.data[0];

      console.log(`User Found: ${user.username}`);

      const projectsRes = await axios.get(
        `${GITLAB_API}/users/${user.id}/projects?per_page=100`,
      );

      console.log(`User Projects Returned: ${projectsRes.data.length}`);

      return projectsRes.data;
    }

    // 2. Try as GitLab Group
    const groupRes = await axios.get(
      `${GITLAB_API}/groups?search=${encodeURIComponent(name)}`,
    );

    if (groupRes.data && groupRes.data.length > 0) {
      const exactGroup =
        groupRes.data.find(
          (group) => group.path.toLowerCase() === name.toLowerCase(),
        ) || groupRes.data[0];

      console.log(`Group Found: ${exactGroup.name}`);

      const projectsRes = await axios.get(
        `${GITLAB_API}/groups/${exactGroup.id}/projects?per_page=100`,
      );

      console.log(`Group Projects Returned: ${projectsRes.data.length}`);

      return projectsRes.data;
    }

    throw new Error("GitLab user/group not found");
  } catch (error) {
    console.error("GitLab API Error:", error.message);
    throw error;
  }
};

const getProjectFiles = async (projectId) => {
  try {
    const response = await axios.get(
      `${GITLAB_API}/projects/${projectId}/repository/tree`,
      {
        params: {
          recursive: true,
          per_page: 1000,
        },
      },
    );

    return response.data || [];
  } catch (error) {
    console.error(
      `Repository tree error for project ${projectId}:`,
      error.message,
    );
    return [];
  }
};

const getFileContent = async (projectId, filePath, branch = "main") => {
  try {
    const encodedPath = encodeURIComponent(filePath);

    const response = await axios.get(
      `${GITLAB_API}/projects/${projectId}/repository/files/${encodedPath}`,
      {
        params: {
          ref: branch,
        },
      },
    );

    if (!response.data.content) {
      return "";
    }

    return Buffer.from(response.data.content, "base64").toString("utf8");
  } catch (error) {
    return "";
  }
};

module.exports = {
  getUserProjects,
  getProjectFiles,
  getFileContent,
};
