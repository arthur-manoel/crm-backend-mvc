/*
import dotenv from "dotenv";
import swaggerUi from "swagger-ui-express";
import app from "./src/app.js";
import swaggerDocument from "./swagger.json" assert { type: "json" };

dotenv.config();

const PORT = process.env.PORT || 3000;


app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));


app.listen(PORT, () => console.log("Servidor rodando na porta " + PORT));

*/

import dotenv from "dotenv";
import swaggerUi from "swagger-ui-express";
import fs from "fs";
import app from "./src/app.js";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();

const PORT = process.env.PORT;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const swaggerPath = path.join(__dirname, "swagger.json");

const swaggerDocument = JSON.parse(fs.readFileSync(swaggerPath, "utf-8"));

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.get("/swagger.json", (req, res) => {
  res.sendFile(swaggerPath);
});

app.listen(PORT, () => console.log("Servidor rodando na porta " + PORT));
