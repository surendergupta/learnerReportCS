const AttendanceModel = require("../models/attendance.model");

const attendanceRegister = (req, res) => {
  const att =  req.body;
  console.log(att)
  att.forEach(element => {
  console.log("Ellleee" , element)
});
 
  // AttendanceModel.findOne((err) => {
  //     const newAttendance = new AttendanceModel({ ...req.body });
  //       newAttendance.save((err) => {
  //       if (err) {
  //         res.send(err);
  //       } else {
  //         res.send({ message: "Attandance Marked successfully" });
  //       }
  //     });
  //   })
};


module.exports = { attendanceRegister };