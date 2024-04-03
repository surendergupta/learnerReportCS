const Student = require("../models/student.model");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const { log } = require("console");

const hashKey = process.env.HASH_KEY;
const jwtSecretKey = process.env.JWT_SECRET_KEY;

function Register(req, res) {
  console.log(req.body);
  let date = new Date();
  req.body.password = crypto
    .createHash("sha256", hashKey)
    .update(req.body.password)
    .digest("hex");

  Student.findOne({ email: req.body.email }, (err, user) => {
    if (user) {
      res.status(400).json({ message: "student already exist" });
    } else {
      const newStudent = new Student({ ...req.body });
      console.log(newStudent);
      newStudent.save(function (err, newSavedStudent) {
        if (err) {
          res.json({ message: "not registered", err: err }).status(200);
        } else {
          console.log({ newSavedStudent });
          res.json({ message: "registered" }).status(200);
        }
      });
      // res.json({message:'here'}).status(200)
    }
  });
}

const StudentLogin = async (req, res) => {
  console.log(req.body);
  const { email, password } = req.body;

  if (!email || !password) {
    console.log("Please fill all the details");
    res.send({ message: "Please fill all the details" });
  } else {
    await Student.findOne({ email: email }, (err, result) => {
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
            time: Date(),
            id: result._id,
          };
          const jwtToken = jwt.sign(data, jwtSecretKey, { expiresIn: "12m" });
          let resultpayload = {
            result: result,
            token: jwtToken,
          };
          // console.log(resultpayload);
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



module.exports = { Register, StudentLogin };
