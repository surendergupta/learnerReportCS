const Questions = require("../models/questionUpload.model");

const addQuestion =  (req, res) => {
  const question_title = req.body.question_title;

  Questions.findOne({ question_title }).then(async(user) => {


    if (user) {
      res.status(400).json({ message: "Question already exist" });
    } else {

      if (que) {
        res.status(201).json({ message: "Question already exist" });
        return;
      } else if (
        !req.body.question ||
        !req.body.total_marks ||
        !req.body.skill_tag ||
        !req.body.sub_tag ||
        !req.body.tag_level
      ) {
        return res.json({ message: "Please fill all the details", data: req.body });
      } else {
        try {
           await newQuestion.save({
            ...req.body,
          });
          res.status(200).json({ message: "question uploaded successfully", status: "done" });
        } catch (error) {
          res.status(400).json({ message: error.message });
        }
      }
    }
    });


  

    
};

const getAllQuestions = (req, res) => {
  Questions.find({}, (err, result) => {
    console.log(result);
    res.send(result);
  });
};

module.exports = { addQuestion, getAllQuestions };
