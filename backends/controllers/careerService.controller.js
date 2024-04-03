const { careerService } = require("../models/careerService.model");
const crypto = require("crypto");

const hashKey = process.env.HASH_KEY;
const jwt = require("jsonwebtoken");
const { type } = require("os");

const jwtSecretKey = process.env.JWT_SECRET_KEY;

const careerServiceRegister = (req, res) => {
  console.log(req.body);
  req.body.password = crypto
    .createHash("sha256", hashKey)
    .update(req.body.password)
    .digest("hex");
  const { email, password } = req.body;
  // if (!email || !password) {
  //   console.log("Please fill all the details");
  //   res.status(400).send({ message: "Please fill all the details" });
  // } else {
  careerService.findOne({ email: email }, (err, user) => {
    if (user) {
      res.send({ message: "user already exist" });
    } else {
      const user = new careerService({ ...req.body });
      user.save((err) => {
        if (err) {
          res.send(err);
        } else {
          res.send({ message: "User created successfully" });
        }
      });
    }
  });
  // }
};

const careerServiceLogin = (req, res) => {
  console.log(req.body);
  const { email, password } = req.body;
  if (!email && !password) {
    console.log("Please fill all the details");
    res.send({ message: "Please fill all the details" });
  } else {
    careerService.findOne({ email: email }, (err, result) => {
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
          const jwtToken = jwt.sign(data, jwtSecretKey, { expiresIn: "2m" });
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

function getAllCareerServices(req, res, next) {
  careerService.find({}, (err, result) => {
    console.log(result);
    res.json({ result });
  });
}

module.exports = {
  careerServiceRegister,
  careerServiceLogin,
  getAllCareerServices,
};
