const express = require("express");
const jwt = require("jsonwebtoken");
const db = require("./Model/db");
const bcrypt = require("bcrypt");

const authRouters = require("./routes/authRoutes");
const clientesRouters = require("./routes/clientesRoutes");
const dashboardRouters = require("./routes/dashboardRoutes");

const app = express();

app.use(express.json());
app.use("/", authRouters);
app.use("/", clientesRouters);
app.use("/", dashboardRouters);

app.listen(3000, () => {

    console.log("Servidor rodando na porta 3000");

});