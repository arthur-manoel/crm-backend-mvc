import express from "express";
const app = express();

import cors from "cors";
app.use(cors());

import * as dotenv from "dotenv";
dotenv.config()

app.use(express.json());

import authRef from "./modules/auth/authRoutes.js";
import usuarioRef from "./modules/user/userRoutes.js";
import clienteRef from "./modules/client/clientRoutes.js";
import empresaRef from "./modules/company/companyRoutes.js"
import empresaClienteRef from "./modules/companyClient/companyClientRoutes.js";
import companyUser from "./modules/companyUser/companyUserRoutes.js";
import cnaeRef from "./modules/cnaes/cnaesRoutes.js";
import documentosRef from "./modules/documents/documentsRoutes.js";
import enderecoRef from "./modules/address/addressRouters.js";
import linkRef from "./modules/link/linkRoutes.js";
import dashboardRef from "./modules/dashboard/dashboardRoutes.js";
import processoRef from "./modules/process/processRouter.js";
import uploadRef from "./modules/upload/uploadRoute.js";

app.use("/", authRef);
app.use("/", usuarioRef);
app.use("/", clienteRef);
app.use("/", empresaRef);
app.use("/", empresaClienteRef);
app.use("/", companyUser);
app.use("/", cnaeRef);
app.use("/", documentosRef);
app.use("/", enderecoRef);
app.use("/", linkRef);
app.use("/", dashboardRef);
app.use("/", processoRef);
app.use("/", uploadRef);

app.get("/", (req, res) => {
  res.send("Rota GET na raiz");
});

export default app;