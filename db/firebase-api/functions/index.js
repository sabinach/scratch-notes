// Create and Deploy Your First Cloud Functions
// https://firebase.google.com/docs/functions/write-firebase-functions

const functions = require("firebase-functions");
const serviceAccount = require("./fir-api-309a8-firebase-adminsdk-8l7dh-fe5b98407c.json");
const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors({ origin: true }));

const admin = require("firebase-admin");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL:
    "https://us-central1-fir-api-309a8.cloudfunctions.net/app/hello-world",
});
const db = admin.firestore();

// read
app.get("/hello-world", (req, res) => {
  return res.status(200).send("Hello World!");
});

// create
app.post("/api/create", (req, res) => {
  (async () => {
    try {
      console.log("req.body.item: ", req.body.item);
      await db
        .collection("items")
        .doc("/" + req.body.id + "/")
        .create({ item: req.body.item });
      return res.status(200).send();
    } catch (error) {
      console.log(error);
      return res.status(500).send(error);
    }
  })();
});

exports.app = functions.https.onRequest(app);
