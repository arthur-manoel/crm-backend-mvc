const express = require("express");
const { clientes, cadastrarcliente, excluircliente, atualizarcliente } = require("../controllers/clientesControllers");
const { VerificarToken } = require("../controllers/authControllers");

const router = express.Router();

router.get("/clientes", VerificarToken, clientes);

router.post("/cadastrarcliente", VerificarToken, cadastrarcliente);

router.put("/atualizarcliente/:id", VerificarToken, atualizarcliente);

router.delete("/excluircliente/:id", VerificarToken, excluircliente);


module.exports = router;
