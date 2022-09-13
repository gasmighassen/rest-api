const express = require("express");
const mongoose = require("mongoose");
const connectDB = require("./confing/dbConnect");
const User = require("./models/User");

const app = express();
require("dotenv").config();
const port = process.env.PORT;

//connect db
connectDB();
app.use(express.json());

// get all users

app.get("/all", async (req, res) => {
  try {
    await User.find({}).then((result) => {
      res.send(result);
    });
  } catch (error) {
    console.log(error);
  }
});

// add new user to db

app.post("/new", async (req, res) => {
  try {
    const user = new User(req.body);
    const result = await user.save();
    res.send(result);
  } catch (error) {
    console.log(error);
  }
});

//find by id and update
app.put("/put/:id", async (req, res) => {
  try {
    let result = await User.findOneAndUpdate(
      {
        _id: req.params.id,
      },

      { $set: { ...req.body } },
      { new: true }
    );
    res.send({ userUpdated: result, msg: "user updated" });
  } catch (error) {
    res.status(400).send({ msg: "can not modify the user" });
    console.log(error);
  }
});

//remove user
app.delete("/delete/:id", async (req, res) => {
  try {
    await User.findOneAndDelete({ _id: req.params.id });
    res.send({ msg: "user deleted" });
  } catch (error) {
    res.status(400).send({ msg: "can not delete the user" });
    console.log(error);
  }
});

app.listen(port, (err) => {
  err ? console.log(err) : console.log("server listening on port " + port);
});
