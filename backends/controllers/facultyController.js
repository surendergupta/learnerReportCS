
const facultyLogin = require('../models/faculty.model')
  
const crypto = require("crypto");
const hashKey = process.env.HASH_KEY;
const jwt = require("jsonwebtoken");
const jwtSecretKey = process.env.JWT_SECRET_KEY;
const facultyRegister = (req, res) => {
  req.body.password = crypto
    .createHash("sha256", hashKey)
    .update(req.body.password)
    .digest("hex");
  const { email } = req.body;
  facultyLogin.findOne({ email: email }, (err, user) => {
    if (user) {
      res.send({ message: "user already exist" });
    } else {
      const user = new facultyLogin({ ...req.body });
      user.save((err) => {
        if (err) {
          res.send(err);
        } else {
          res.send({ message: "sucessfull" });
        }
      });
    }
  });
};

const facultyLoginMethod = (req, res) => {
  console.log(req.body);
  const { email, password } = req.body;
  if (!email || !password) {
    console.log("Please fill all the details");
    res.send({ message: "Please fill all the details" });
  } else {
    facultyLogin.findOne({ email: email }, (err, result) => {
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
          const jwtToken = jwt.sign(data, jwtSecretKey, {expiresIn: '2m'});
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
        res.status(400).send("Invalid User");
      }
    });
  }
};

function getAllFaculty(req, res, next){
  facultyLogin.find({}, (err, result) => {
     console.log(result);
     res.json({ result})
   })
 
   
 }

module.exports = { facultyRegister , facultyLoginMethod,getAllFaculty };