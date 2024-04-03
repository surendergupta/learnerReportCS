const express = require("express");
const routes = express.Router();
const Attendance = require("../controllers/attendance.controller");


routes.post("/register", Attendance.attendanceRegister)

module.exports = routes;