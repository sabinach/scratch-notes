const express = require("express");
const router = express.Router();
const customers = require("./customers.js");

// Retrieve all Customers
router.get("/", customers.findAll);

// Retrieve a single Customer with id
router.get("/:id", customers.findOne);

// Create a new Customer
router.post("/", customers.create);

// Update a Customer with id
router.put("/:id", customers.update);

// Delete a Customer with id
router.delete("/:id", customers.delete);

// Delete all Customers
router.delete("/", customers.deleteAll);

module.exports = Object.freeze(router);
