const express = require("express");
const router = express.Router();

const { findUserByEmail, createUser } = require("../repositories/user");
const { User } = require("./../models/user.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(422).send({
      err: "Please supply email and password",
    });
  }

  const user = await findUserByEmail(email);
  if (!user)
    return res
      .status(401)
      .send({ err: "the user name and/or password is incorrect!" });

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
