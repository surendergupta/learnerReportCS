const mongoose = require("mongoose");
const { Schema } = mongoose;

let questionUploadSchema = new Schema(
  {
    question: {
      type: String,
      require: true,
    },
    question_title:{
        type: String,
        require: true
    },
    total_marks: {
      type: Number,
      require: true,
    },
    skill_tag: {
      type: String,
      require: true,
    },
    sub_tag: {
      type: String,
      require: true,
    },
    tag_level: {
      type: String,
      require: true,
    },
    solution: {
      type: String,
    },
    file_upload: {
      type: String,
    },
  },
  {
    collection: "questionUpload",
  }
);
const questions = mongoose.model("questionUpload", questionUploadSchema);

module.exports = questions;

