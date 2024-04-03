const mongoose = require("mongoose");
const { Schema } = mongoose;

let batchRegistrationSchema = Schema(
  {
    BatchName: {
      type: String,
      require: true,
    },
    StartDate: {
      type: String,
      default: Date.now(),
    },
    TotalEnroll: {
      type: Number,
      default: 0,

    },
    StatusActive: {
      type: Number,
      default: 0,
    },
    Dropout: {
        type: Number,
        default: 0
    }
  },
  {
    collection: "BatchRegistrationInfo",
  }
);

const Batch = mongoose.model("BatchRegistrationInfo", batchRegistrationSchema);

module.exports = Batch;
