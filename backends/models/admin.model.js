const mongoose = require("mongoose");
const { Schema } = mongoose;

let adminSchema = Schema(
  {
    username: {
      type: String,
      require: true,
    },
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
      default: "admin",
    },
  },
  {
    collection: "adminInfo",
  }
);

const Admin = mongoose.model("adminInfo", adminSchema);

module.exports = Admin;
