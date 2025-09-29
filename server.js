import express from "express";
import swaggerUi from "swagger-ui-express";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import serverless from "serverless-http";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

const swaggerPath = path.join(__dirname, "swagger.json");
const swaggerDocument = JSON.parse(fs.readFileSync(swaggerPath, "utf-8"));

// ✅ Serve apenas o Swagger JSON
app.get("/swagger.json", (req, res) => {
  res.sendFile(swaggerPath);
});

// ✅ Use swaggerUrl para evitar assets quebrados
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(null, {
  swaggerUrl: "/swagger.json", // importante: prefixado com "/api"
}));

app.listen(3000, () => console.log("Rodando localmente"));

// ✅ Exporta como handler
export default serverless(app);
