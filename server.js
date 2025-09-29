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

dotenv.config();

const PORT = process.env.PORT;

const swaggerDocument = JSON.parse(fs.readFileSync("./swagger.json", "utf-8"));

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.get("./swagger.json", (req, res) => {
  res.sendFile("swagger.json", { root: "." });
});

app.listen(PORT, () => console.log("Servidor rodando na porta " + PORT));
