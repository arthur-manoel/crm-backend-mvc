const express = require("express");
const { login } = require("../controllers/authControllers");
const { cadastro } = require("../controllers/usuarioControllers");

const router = express.Router();

router.post("/login", login);

router.post("/cadastro", cadastro);

module.exports = router