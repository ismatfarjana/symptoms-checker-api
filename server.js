const dotenv = require("dotenv");
dotenv.config();
const cors = require("cors");
const express = require("express");
const app = express();
app.use(
  cors({
    methods: ["GET", "POST", "DELETE", "UPDATE", "PUT", "PATCH"],
  })
);
const bodyParser = require("body-parser");

const userApi = require("./routes/userRoutes");
const PORT = process.env.PORT;

//parse application/json and look for raw text
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/json" }));

// routes
app.get("/", (req, res) => {
  console.log("default route");
  res.send("App works!!!");
});

app.use("/userapi", userApi);

// Handle undefined and other routes
app.get("*", (req, res) => {
  res.send("Route not defined!!");
});
app.listen(PORT, () =>
  console.log(`API listening at http://localhost:${PORT}!`)
);

module.exports = app;
