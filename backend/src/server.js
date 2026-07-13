require("dotenv").config();

const app = require("./app");
const connectDB = require("./config/db");

const PORT = process.env.PORT || 5000;
connectDB();
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("../swagger");

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
