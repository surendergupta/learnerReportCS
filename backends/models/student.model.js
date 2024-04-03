const mongoose = require("mongoose");
const { Schema } = mongoose;

let studentSchema = Schema(
  {
    batchName: {
      type: String,
      require: true
    },
    userId: {
      type: Number
    },
    username: {
      type: String,
      require: true,
    },
    email: {
      type: String,
      require: true,
    },
    fullname: {
      type: String,
      require: true,
    },
    phoneNo: {
      type: String,
      require: true,
    },
    userImage: {
      type: String,
    },
    password: {
      type: String,
      require: true,
    },
    workingStatus: {
      type: String,
    },
    currentCTC: {
      type: String,
    },
    courseName: {
      type: String,
    },
    yearOfExp: {
      type: Number,
    },
    qualification: {
      type: String,
    },
    accountCreated: {
      type: Date,
      default: Date.now,
    },
    userType: {
      type: String,
      default: "student",
    },
  },
  {
    collection: "studentInfo",
  }
);

const Student = mongoose.model("studentInfo", studentSchema);

module.exports = Student;
