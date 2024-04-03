const express = require("express");
const routes = express.Router();
const RegisterBatch  = require("../controllers/batchRegistration.controller");


routes.post("/register", RegisterBatch.batchRegister)

module.exports = routes;