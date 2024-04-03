const Student = require("../../models/student.model");
const Batch = require("../../models/batchRegistration.model");

const getAllStudent = (req, res) => {
    Student.find({}, (err, result) => {
      console.log(result);
      res.send(result);
    });
  };

  const getBatchStudent = (req, res) => {
    const batchName  = req.body.batchName;
    console.log("batchName" , batchName)
    Student.find({batchName}, (err, result) => {
        console.log("batchName1" , batchName)
    //   console.log(result);
      res.send(result);
    });
  };

  const getAllBatch = (req, res) => {
    Batch.find({}, (err, result) => {
      console.log(result);
      res.send(result);
    });
  };

  

module.exports = { getAllStudent, getBatchStudent , getAllBatch };