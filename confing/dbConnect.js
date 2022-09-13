const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://ghassen:23671567@projetfinale.zghrtfp.mongodb.net/?retryWrites=true&w=majority"
    );
    console.log("database is connected..");
  } catch (error) {
    console.log(error);
  }
};

module.exports = connectDB;
