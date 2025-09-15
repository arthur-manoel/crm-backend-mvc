const express = require("express");
const dashboard = require("../controllers/dashboard/dashboardControllers");
const { VerificarToken } = require("../controllers/auth/authControllers");

router = express.Router();

router.get("/dashboard", VerificarToken, dashboard);

module.exports = router;