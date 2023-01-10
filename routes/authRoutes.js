const express = require("express");
const router = express.Router();
const { User } = require("./../models/users.model.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

router.post("/login", (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(422).send({
      err: "Please supply email and password",
    });
  }

  // To find one user 3 things can happen,
  User.findOne({ email }, (err, user) => {
    // we can get an err
    if (err) return res.status(404).send({ err: "Something went wrong" });
    // or we can not find the user
    if (!user)
      return res
        .status(401)
        .send({ err: "the user name and/or password is incorrect!" });
    // or we can find the user
    bcrypt.compare(password, user.password, (err, result) => {
      if (err) return res.status(400).send(err);
      if (!result) {
        return res
          .status(401)
          .send({ err: "The username and/or password is incorrect!" });
      }
      let token = jwt.sign({ id: user._id }, process.env.SECRET, {
        expiresIn: 86400,
      });
      return res.send({ token, userId: user._id, profile: user.profile });
    });
  });
});

router.post("/register", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(422).send({
      err: "Please supply email and password",
    });
  }
  bcrypt.hash(password, 8, (err, hash) => {
    User.create(
      {
        _id: crypto.randomBytes(16).toString("hex"),
        email,
        password: hash,
        profile: {},
      },
      (err, user) => {
        if (err) return res.status(400).send(err);

        let token = jwt.sign({ id: user._id }, process.env.SECRET, {
          expiresIn: 86400,
        });

        res.send({ token, userId: user._id });
      }
    );
  });
});

module.exports = router;
