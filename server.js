require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./src/config/database");
const swaggerUi = require("swagger-ui-express");
const YAML = require("yamljs");

const app = express();
app.use(cors());
app.use(express.json());

// Conexão com DB
connectDB();

// Rotas
app.use("/api/v1/auth", require("./src/routes/authRoutes"));
app.use("/api/v1/users", require("./src/routes/userRoutes"));

// Swagger
const swaggerDocument = YAML.load("./src/docs/swagger.json");
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Healthcheck
app.get("/api/v1/health", (req, res) => res.status(200).json({ status: "OK", timestamp: new Date().toISOString() }));

// Apenas escuta se não estiver em ambiente de teste
if (process.env.NODE_ENV !== "test") {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
}

module.exports = app;
