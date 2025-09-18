import express from "express";
const app = express();

import cors from "cors";
app.use(cors());

import * as dotenv from "dotenv";
dotenv.config()

app.use(express.json());

import clientesRouters from "./routes/clientesRoutes.js"
import authRouters from "./routes/authRoutes.js"
import dashboardRouters from "./routes/dashboardRoutes.js"
import niveis from "./routes/niveisRoute.js"

app.use(express.json());
app.use("/", authRouters);
app.use("/", clientesRouters);
app.use("/", dashboardRouters);
app.use("/", niveis);



export default app;