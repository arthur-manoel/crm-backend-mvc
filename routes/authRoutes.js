const express = require("express");
const { login } = require("../controllers/auth/authControllers");
const { cadastro } = require("../controllers/auth/usuarioControllers");

const router = express.Router();

router.post("/login", login);

router.post("/cadastro", cadastro);

module.exports = router