const express = require("express");
const router = express.Router();

// firebase credentials
const serviceAccount = require("../fir-api-309a8-firebase-adminsdk-8l7dh-fe5b98407c.json");
const admin = require("firebase-admin");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL:
    "https://us-central1-fir-api-309a8.cloudfunctions.net/app/hello-world",
});
const db = admin.firestore();

/**
 * Create new item
 * @name POST /api/:id
    {
      "item": "item",
    }
 * @throws {500} if server error
 */
router.post("/:id", (req, res) => {
  (async () => {
    try {
      console.log("req.body.item: ", req.body.item);
      await db
        .collection("items")
        .doc("/" + req.params.id + "/")
        .create({ item: req.body.item });
      return res.status(200).send();
    } catch (error) {
      console.log(error);
      return res.status(500).send(error);
    }
  })();
});

module.exports = Object.freeze(router);
