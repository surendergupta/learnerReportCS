const Batch = require("../models/batchRegistration.model");
const batchRegister = (req, res) => {
  const BatchName  = req.body.BatchName;

  Batch.findOne({ BatchName }, (err, user) => {
    if (user) {
      res.send({ message: "Batch already exist" });
    } else {
      const newBatch = new Batch({ ...req.body });
      newBatch.save((err) => {
        if (err) {
          res.send(err);
        } else {
          res.send({ message: "Batch created successfully" });
        }
      });
    }
  });
};


module.exports = { batchRegister };
