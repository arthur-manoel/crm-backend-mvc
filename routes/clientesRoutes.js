const express = require("express");
const { clientes, cadastrarcliente, excluircliente, atualizarcliente } = require("../controllers/clientesControllers");
const { VerificarToken } = require("../controllers/authControllers");

router = express.Router();

router.get("/clientes", VerificarToken, clientes);

router.post("/cadastrarcliente", VerificarToken, cadastrarcliente);

router.delete("/excluircliente/:id", VerificarToken, excluircliente);

router.put("/atualizarcliente/:id", VerificarToken, atualizarcliente);

module.exports = router;