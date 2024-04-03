const mongoose = require("mongoose");
const { Schema } = mongoose;

let AttendanceSchema = Schema(
  {
    BatchName: {
      type: String,
      require: true,
    },
    StudentName: {
      type: String,
      require: true,
    },
    Date: {
        presentDate:[],
        absentDate: []
    },
    
    TotalClass:{
        type: Number,
        default: 0,
    }
  },
  {
    collection: "AttendanceInfo",
  }
);

const Attendance = mongoose.model("AttendanceInfo", AttendanceSchema);

module.exports = Attendance;
