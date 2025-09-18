import express from "express";
const app = express();

import cors from "cors";
app.use(cors());

import * as dotenv from "dotenv";
dotenv.config()

app.use(express.json());

import db from "./database/db.js"
db.connect();

import clientesRouters from "./routes/clientesRoutes.js"
import authRouters from "./routes/authRoutes.js"
import dashboardRouters from "./routes/dashboardRoutes.js"

app.use(express.json());
app.use("/", authRouters);
app.use("/", clientesRouters);
app.use("/", dashboardRouters);



export default app;