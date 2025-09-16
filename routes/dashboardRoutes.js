const express = require("express");
const dashboard = require("../controllers/dashboardControllers");
const { VerificarToken } = require("../controllers/authControllers");

router = express.Router();

router.get("/dashboard", VerificarToken, dashboard);

module.exports = router;