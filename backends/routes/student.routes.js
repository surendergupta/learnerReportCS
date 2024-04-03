const express = require("express");
const { Register } = require("../controllers/student.controller");
const { StudentLogin } = require("../controllers/student.controller");
const {getAllStudent} = require("../controllers/common/fetchAll")
// const authorization = require("../middlewares/middleware");

const routes = express.Router();

routes.post("/register", Register);
routes.post("/login", StudentLogin);
routes.get("/getstudent",  getAllStudent);

module.exports = routes;

