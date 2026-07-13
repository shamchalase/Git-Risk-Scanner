const swaggerJsdoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "GitLab Risk Scanner API",
      version: "1.0.0",
      description: "API Documentation for GitLab Repository Risk Scanner",
    },
    servers: [
      {
        url: "http://localhost:5000",
      },
    ],
  },
  apis: ["./routes/*.js"], // Path to route files
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;
