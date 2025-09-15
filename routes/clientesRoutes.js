const express = require("express");
const { clientes, cadastrarclientes } = require("../controllers/clientes/clientesControllers");
const { VerificarToken } = require("../controllers/auth/authControllers");

router = express.Router();

router.get("/clientes", VerificarToken, clientes);

router.post("/cadastrarclientes", VerificarToken, cadastrarclientes);

module.exports = router;