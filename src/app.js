import express from "express";
const app = express();

import cors from "cors";
app.use(cors());

import * as dotenv from "dotenv";
dotenv.config()

app.use(express.json());

// import clientesRouters from "./routes/clientesRoutes.js";
import dashboardRouters from "./routes/dashboardRoutes.js";
import niveis from "./routes/niveisRoute.js";
import cnae from "./routes/cnaeRoute.js";
import upload from "./routes/uploadRoute.js";
import cnpj from "./routes/cnpjRoute.js";
import cliente_cnpjs from "./routes/cliente_cnpjRoute.js";
import atividadesCliente from "./routes/atividadeRoute.js";
import cliente_cnae from "./routes/clienteCnaeRoute.js";
import processos from "./routes/processosRoute.js";
import links from "./routes/linkRoute.js";
import documentos from "./routes/documentosRoute.js";
import endereco from "./routes/enderecoRoute.js";

app.use(express.json());
// app.use("/", clientesRouters);
app.use("/", dashboardRouters);
app.use("/", niveis);
app.use("/", cnae);
app.use("/", cnpj);
app.use("/uploads/", express.static("uploads"));
app.use("/", upload);
app.use("/", cliente_cnpjs)
app.use("/", atividadesCliente)
app.use("/", cliente_cnae)
app.use("/", processos)
app.use("/", links)
app.use("/", documentos)
app.use("/", endereco)

app.get("/", (req, res) => {
  res.send("Rota GET na raiz");
});

//refatorados
import authRef from "./modules/auth/authRoutes.js";
import usuarioRef from "./modules/usuario/usuarioRoutes.js";
import clienteRef from "./modules/cliente/clienteRoutes.js";
import empresaRef from "./modules/empresa/empresasRoutes.js"

app.use("/", authRef);
app.use("/", usuarioRef);
app.use("/", clienteRef);
app.use("/", empresaRef);

export default app;