const mongoose = require("mongoose");
const { Schema } = mongoose;

let careerServiceRegisterSchema = new Schema(
  {
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
    department: {
      type: String,
    },
    accountCreated: {
      type: Date,
      default: Date.now,
    },
    userType: {
      type: String,
      default: "careerService",
    },
  },
  {
    collection: "careerServiceRegister",
  }
);



let careerServiceLoginSchema = new Schema(
  {
    email: {
      type: String,
      require: true,
    },
    password: {
      type: String,
      require: true,
    },
    userType: {
      type: String,
      default: "careerService",
    },
  },
  {
    collection: "careerServiceLogin",
  }
);


const careerService = mongoose.model("careerServiceRegister", careerServiceRegisterSchema);
const careerServiceLogin = mongoose.model("careerServiceLogin" , careerServiceLoginSchema)
module.exports = {careerService , careerServiceLogin};
