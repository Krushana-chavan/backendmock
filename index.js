require("dotenv").config();
const mongoose = require("mongoose");
const express = require("express");
const UserModel = require("./Models/Signup.model");
const bcrypt = require("bcrypt");
const app = express();

app.use(express.urlencoded({ extended: true }));

app.use(express.json());

app.post("/signup", (req, res) => {
  const { email, password } = req.body;

  bcrypt.hash(password, 10, (err, hash) => {
    if (err) {
      return res.status(500).json({
        error: err,
      });
    } else {
      const user = new UserModel({
        email: email,
        password: hash,
      });
      user
        .save()
        .then((result) => {
          res.status(201).json({
            message: "User created",
          });
        })
        .catch((err) => {
          console.log(err);
          res.status(500).json({
            error: err,
          });
        });
    }
  });
});

mongoose.connect(process.env.db_url).then(() => {
  app.listen(8080, () => {
    console.log("server statrted on port 8080");
});
});