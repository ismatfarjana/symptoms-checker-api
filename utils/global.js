const jwt = require("jsonwebtoken");
const { User } = require("./../models/users.model.js");
// middleware
function authenticated(req, res, next) {
  const header = req.get("Authorization") ?? "";
  const noAuth = { err: "Invalid Token", noAuth: true };

  if (header.toLowerCase().indexOf("bearer") === -1) {
    return res.status(401).send(noAuth);
  }

  const token = header.split(" ")[1];

  if (!token) {
    return res.status(401).send(noAuth);
  }

  jwt.verify(token, process.env.SECRET, (err, decoded) => {
    // error
    if (err) return res.status(401).send(noAuth);

    // valid token
    User.findById(decoded.id, (err, user) => {
      // err
      // no user
      if (err || !user) return res.status(401).send(noAuth);

      // user
      req.user = user;
      next();
    });
  });
}

const genders = ["male", "female", "boy", "girl"];

function handleParams(params) {
  const paramsForDiagnosis =
    params.name && params.symptoms && params.gender && params.yearOfBirth;
  const paramsForOneIssue = params.name === "issues" && params.id;
  const paramsForOneLocation = params.name === "body/locations" && params.id;
  const paramsForBodySymptoms =
    params.name === "symptoms" && params.locationId && params.gender;
  let allParams;
  if (paramsForOneIssue) {
    allParams = `${params.name}/${params.id}/info?`;
  } else if (paramsForOneLocation) {
    allParams = `${params.name}/${params.id}?`;
  } else if (paramsForBodySymptoms) {
    const genderIndex = genders.includes(params?.gender)
      ? genders.indexOf(params?.gender)
      : null;
    allParams = `${params.name}/${params.locationId}/${genderIndex}?`;
  } else if (paramsForDiagnosis) {
    allParams = `${params.name}?symptoms=${params.symptoms}&gender=${params.gender}&year_of_birth=${params.yearOfBirth}&`;
  } else {
    allParams = `${params.name}?`;
  }
  return allParams;
}

module.exports = {
  authenticated,
  handleParams,
};
