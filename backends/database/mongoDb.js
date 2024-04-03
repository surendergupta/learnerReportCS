const mongoose = require("mongoose");

const connect = () => {
  try {
    //  mongoose.connect(process.env.MONGO,{autoIndex:true});
    mongoose
      .connect(process.env.ATLAS_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      .then(() => console.log("db Connected"));
    // console.log("Connected to MongoDB");
  } catch (err) {
    console.log(err);
  }
};

module.exports = connect;
