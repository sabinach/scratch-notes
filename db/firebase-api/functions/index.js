// Create and Deploy Your First Cloud Functions
// https://firebase.google.com/docs/functions/write-firebase-functions

const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");

// node express server
const app = express();
app.use(cors({ origin: true }));

// GET home page
app.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

// GET hello world
app.get("/hello-world", (req, res) => {
  return res.status(200).send("Hello World!");
});

// api routes
const indexRouter = require("./routes/index");
app.use("/api", indexRouter);

exports.app = functions.https.onRequest(app);
