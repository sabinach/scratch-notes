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
 * Read all items
 * @name GET /api/items/
 * @returns list<object>
 *    WHERE each object consists of the following:
 *      {
 *        id: string,
 *        item: string
 *      }
 * @throws {500} if server error
 */
router.get("/", (req, res) => {
  (async () => {
    try {
      let query = db.collection("items");
      let response = [];
      await query.get().then((querySnapshot) => {
        let docs = querySnapshot.docs;
        for (let doc of docs) {
          const selectedItem = {
            id: doc.id,
            item: doc.data().item,
          };
          response.push(selectedItem);
        }
      });
      return res.status(200).send(response);
    } catch (error) {
      console.log(error);
      return res.status(500).send(error);
    }
  })();
});

/**
 * Read item
 * @name GET /api/items/:id
 * @returns {id: string}
 * @throws {500} if server error
 */
router.get("/:id", (req, res) => {
  (async () => {
    try {
      const document = db.collection("items").doc(req.params.id);
      let item = await document.get();
      let response = item.data();
      return res.status(200).send(response);
    } catch (error) {
      console.log(error);
      return res.status(500).send(error);
    }
  })();
});

/**
 * Create new item
 * @name POST /api/items/:id
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

/**
 * Edit item
 * @name PUT /api/items/:id
    {
      "item": "item",
    }
 * @throws {500} if server error
 */
router.put("/:id", (req, res) => {
  (async () => {
    try {
      const document = db.collection("items").doc(req.params.id);
      await document.update({
        item: req.body.item,
      });
      return res.status(200).send();
    } catch (error) {
      console.log(error);
      return res.status(500).send(error);
    }
  })();
});

/**
 * Delete item
 * @name DELETE /api/items/:id
 * @throws {500} if server error
 */
router.delete("/:id", (req, res) => {
  (async () => {
    try {
      const document = db.collection("items").doc(req.params.id);
      await document.delete();
      return res.status(200).send();
    } catch (error) {
      console.log(error);
      return res.status(500).send(error);
    }
  })();
});

module.exports = Object.freeze(router);
