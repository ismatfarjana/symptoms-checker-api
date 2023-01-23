const dotenv = require("dotenv");
dotenv.config();
const cors = require("cors");
const express = require("express");

const mongoose = require("mongoose");
const uri = process.env.MONGO_URL;
const dbname = process.env.NODE_ENV === "dev" ? "dev" : "test";

const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const healthRoutes = require("./routes/healthRoutes");
const previousDiagnosisRoutes = require("./routes/previousDiagnosisRoutes");
const PORT = process.env.PORT;

const app = express();

app.use(cors());
app.use(express.json());

// Mongo connection set up
mongoose.set("strictQuery", true);
mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  dbName: dbname,
});

mongoose.connection.once("open", async () => {
  console.log("Connected to MONGO DB!!");
});

mongoose.connection.on("error", (err) => {
  console.error("Error connecting to database  ", err);
});

// routes
app.get("/", (req, res) => {
  console.log("default route");
  res.send("App works!!!");
});

app.use(authRoutes);
app.use("/user", userRoutes);
app.use("/health", healthRoutes);
app.use("/previousDiagnosis", previousDiagnosisRoutes);

// Handle undefined and other routes
app.get("*", (req, res) => {
  res.send("Route not defined!!");
});
app.listen(PORT, () =>
  console.log(`API listening at http://localhost:${PORT}!`)
);

module.exports = app;
