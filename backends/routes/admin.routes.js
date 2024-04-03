const express = require("express");
const { adminRegister, AdminLogin} = require("../controllers/admin.controller");
const authorization = require("../middlewares/middleware");


const routes = express.Router();

routes.post("/login", AdminLogin);
routes.post("/register", adminRegister);

module.exports = routes;
