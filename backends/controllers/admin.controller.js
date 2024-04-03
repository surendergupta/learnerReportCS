const Admin = require("../models/admin.model");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const hashKey = process.env.HASH_KEY;
const jwtSecretKey = process.env.JWT_SECRET_KEY;

function adminRegister(req, res) {
  const {email, password}  = req.body
  console.log(req.body);
  let date = new Date();
  req.body.password = crypto
    .createHash("sha256", hashKey)
    .update(req.body.password)
    .digest("hex");

  Admin.findOne({ email: email }, (err, user) => {
    if (user) {
      res.send({ message: "admin already exist" });
    } else {
      const newAdmin = new Admin({ ...req.body });
      console.log(newAdmin);
      newAdmin.save(function (err, newSavedAdmin) {
        if (err) {
          res.json({ message: "not registered", err: err }).status(200);
        } else {
          console.log({ newSavedAdmin });
          res.json({ message: "registered" }).status(200);
        }
      });
      // res.json({message:'here'}).status(200)
    }
  });
}

const AdminLogin = (req, res) => {
  console.log(req.body);
  const { email, password } = req.body;
  if (!email || !password) {
    console.log("Please fill all the details");
    res.json({ message: "Please fill all the details" ,login:false});
  } else {
    Admin.findOne({ email: email }, (err, result) => {
      if (result) {
        req.body.password = crypto
          .createHash("sha256", hashKey)
          .update(req.body.password)
          .digest("hex");
        if (req.body.password === result.password) {
          //create jwt token
          let data = {
            email: req.body.email,
            userType: req.body.userType,
          };
          const jwtToken = jwt.sign(data, jwtSecretKey, {expiresIn: '12m'});
          let resultpayload = {
            result: result,
            token: jwtToken,
          };
          console.log("resultpayload" , resultpayload);
          res.send(resultpayload);
        } else {
          res.status(400).send("Wrong Password");
        }
      } else {
        res.send("Invalid User");
      }
    });
  }
};
module.exports = { adminRegister, AdminLogin };
