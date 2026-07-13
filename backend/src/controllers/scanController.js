const scanService = require("../services/scanService");

// const scanGitlabUser = async (req, res) => {
//   try {
//     const { username } = req.body;

//     if (!username) {
//       return res.status(400).json({
//         success: false,
//         message: "Username is required",
//       });
//     }

//     const report = await scanService.scanUser(username);

//     res.status(200).json({
//       success: true,
//       data: report,
//     });
//   } catch (error) {
//     console.error("SCAN ERROR:", error);

//     res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };

const scanGitlabUser = async (req, res) => {
  try {
    console.log("REQUEST BODY:", req.body);

    const { username } = req.body;

    const report = await scanService.scanUser(username);

    console.log("REPORT:", report);

    res.status(200).json({
      success: true,
      data: report,
    });
  } catch (error) {
    console.error("SCAN ERROR FULL:", error);

    res.status(500).json({
      success: false,
      message: error.message,
      stack: error.stack,
    });
  }
};
module.exports = {
  scanGitlabUser,
};
