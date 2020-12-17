module.exports = (app) => {
  const customers = require("./customers.js");

  // Retrieve all Customers
  app.get("/", customers.findAll);

  // Retrieve a single Customer with id
  app.get("/:id", customers.findOne);

  // Create a new Customer
  app.post("/", customers.create);

  // Update a Customer with id
  app.put("/:id", customers.update);

  // Delete a Customer with id
  app.delete("/:id", customers.delete);

  // Delete all Customers
  app.delete("/", customers.deleteAll);
};
