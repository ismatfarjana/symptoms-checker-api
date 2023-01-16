const express = require("express");
const router = express.Router();

const { findUser, createUser } = require("../repositories/user.repository");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(422).send({
      err: "Please supply email and password",
    });
  }

  const user = await findUser(email);
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
    const user = createUser(email, hash);

    if (err) return res.status(400).send(err);
    if (!user) return res.status(400).send({ err: "Something went wrong!" });

    let token = jwt.sign({ id: user._id }, process.env.SECRET, {
      expiresIn: 86400,
    });

    res.send({ token, userId: user._id });
  });
});

module.exports = router;
