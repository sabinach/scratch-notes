# Meteor

## Meteor Tutorials
- [Meteor Guide](https://guide.meteor.com/)
- [Meteor Docs](https://docs.meteor.com/commandline.html)
- [Meteor Tutorials](https://www.meteor.com/developers/tutorials/) - out of date
- [First Meteor Tutorial](http://meteortips.com/first-meteor-tutorial/)
- [Second Meteor Tutorial](http://meteortips.com/second-meteor-tutorial/)
- [Meteor Tutorials by Matthew Platts](https://www.softcover.io/read/4e73be6d/meteor-tutorial)
- [Summary](https://www.habilelabs.io/blog/meteor-js-tutorial-for-beginners)

## MongoDB Tutorials
- [MongoDB Docs](https://www.mongodb.com/docs/manual/introduction/)
- [MongoDB Crash Course by Web Dev Simplified](https://youtu.be/ofme2o29ngU)

## Meteor <> PostgreSQL Tutorials
- [Using Meteor with Postgresql ](https://satyavh.medium.com/using-meteor-with-postgresql-1385ff630b20)
  - `meteor create --react meteor-postgre-auth`
  - `cd meteor-postgre-auth`
  - `meteor remove mongo autopublish mobile-experience reactive-var insecure react-meteor-data`
  - `meteor add reload autoupdate`
  - `meteor add meteortesting:browser-tests meteortesting:mocha meteortesting:mocha-core`
  - To Run: `meteor run --port 3050`

## Project Details
- Meteor
- MongoDB (back-end)
- Node.js (back-end)
- React (front-end)
- Bonus: PostgreSQL

## To Install Meteor
1. `curl https://install.meteor.com/ | sh`
2. `meteor create project-name`

## To Install PG Client (for Postgresql)
1. `meteor npm install --save pg`
   
## To Run 
1. `cd project-name`
2. Meteor:
  - `meteor`
  - Go to: `http://localhost:3000/`
3. MongoDB:
  - `meteor mongo` (make sure a meteor project is running already)

---

## Example MongoDB Commands:
- `show dbs`
  ```
  admin   0.000GB
  config  0.000GB
  local   0.001GB
  meteor  0.000GB
  ```

- `use appdb`
  ```
  switched to db appdb
  ```

- `db`
  ```
  appdb
  ```

- `show collections`
  ```
  users
  ```

- `db.users`
  ```
  appdb.users
  ```

- `db.users.insertOne({name: "John"})`
  ```
  {
  	"acknowledged" : true,
  	"insertedId" : ObjectId("63b0ec070e29f1aae9adb07e")
  }
  ```

- ` db.users.insertOne({name: "Sally", age: 19, address: {street: "987 North St"}, hobbies: ["Running"]})`
  ```
  {
	"acknowledged" : true,
	"insertedId" : ObjectId("63b0ec670e29f1aae9adb07f")
  }
  ```

- `db.users.insertMany([{name: "Joe"}, {name: "Jill"}])`
  ```
  {
	"acknowledged" : true,
	"insertedIds" : [
		ObjectId("63b0ec950e29f1aae9adb080"),
		ObjectId("63b0ec950e29f1aae9adb081")
	]
  }
  ```

- `db.users.find()`
  ```
    { "_id" : ObjectId("63b0ec070e29f1aae9adb07e"), "name" : "John" }
    { "_id" : ObjectId("63b0ec670e29f1aae9adb07f"), "name" : "Sally", "age" : 19, "address" : { "street" : "987 North St" }, "hobbies" : [ "Running" ] }
    { "_id" : ObjectId("63b0ec950e29f1aae9adb080"), "name" : "Joe" }
    { "_id" : ObjectId("63b0ec950e29f1aae9adb081"), "name" : "Jill" }
  ```

- `db.users.find().limit(2)`
  ```
    { "_id" : ObjectId("63b0ec070e29f1aae9adb07e"), "name" : "John" }
    { "_id" : ObjectId("63b0ec670e29f1aae9adb07f"), "name" : "Sally", "age" : 19, "address" : { "street" : "987 North St" }, "hobbies" : [ "Running" ] }
  ```

- `db.users.find().sort({ name: 1 })` (ie. -1 is reverse)
  ```
    { "_id" : ObjectId("63b0ec950e29f1aae9adb081"), "name" : "Jill" }
    { "_id" : ObjectId("63b0ec950e29f1aae9adb080"), "name" : "Joe" }
    { "_id" : ObjectId("63b0ec070e29f1aae9adb07e"), "name" : "John" }
    { "_id" : ObjectId("63b0ec670e29f1aae9adb07f"), "name" : "Sally", "age" : 19, "address" : { "street" : "987 North St" }, "hobbies" : [ "Running" ] }
  ```

- `db.users.find().sort({ age: 1, name: -1 })`
  ```
    { "_id" : ObjectId("63b0ec070e29f1aae9adb07e"), "name" : "John" }
    { "_id" : ObjectId("63b0ec950e29f1aae9adb080"), "name" : "Joe" }
    { "_id" : ObjectId("63b0ec950e29f1aae9adb081"), "name" : "Jill" }
    { "_id" : ObjectId("63b0ec670e29f1aae9adb07f"), "name" : "Sally", "age" : 19, "address" : { "street" : "987 North St" }, "hobbies" : [ "Running" ] }
  ```

- ` db.users.find({ name: "Sally" }, { name: 1, age: 1, _id: 0})`
  ```
  { "name" : "Sally", "age" : 19 }
  ```

- `db.users.find({ name: { $eq: "Sally"  } })` (ie. $ne)
  ```
  { "_id" : ObjectId("63b0ec670e29f1aae9adb07f"), "name" : "Sally", "age" : 19, "address" : { "street" : "987 North St" }, "hobbies" : [ "Running" ] }
  ```

- `db.users.find({ age: { $gt: 13  } })` (ie. $gt, $gte, $lte, $lte)
  ```
  { "_id" : ObjectId("63b0ec670e29f1aae9adb07f"), "name" : "Sally", "age" : 19, "address" : { "street" : "987 North St" }, "hobbies" : [ "Running" ] }
  ```

- `db.users.find({ name: { $in: ["Kyle", "Sally"]  } })` (ie. $nin)
  ```
  { "_id" : ObjectId("63b0ec670e29f1aae9adb07f"), "name" : "Sally", "age" : 19, "address" : { "street" : "987 North St" }, "hobbies" : [ "Running" ] }
  ```

- `db.users.find({ age: { $exists: true  } })` (ie. false)
  ```
  { "_id" : ObjectId("63b0ec670e29f1aae9adb07f"), "name" : "Sally", "age" : 19, "address" : { "street" : "987 North St" }, "hobbies" : [ "Running" ] }
  ```

- `db.users.find({ age: { $gte: 18, $lte: 40 } })`
  ```
  { "_id" : ObjectId("63b0ec670e29f1aae9adb07f"), "name" : "Sally", "age" : 19, "address" : { "street" : "987 North St" }, "hobbies" : [ "Running" ] }
  ```

- `db.users.find({ age: { $gte: 18, $lte: 40 }, name: "Sally"  })`
  ```
  { "_id" : ObjectId("63b0ec670e29f1aae9adb07f"), "name" : "Sally", "age" : 19, "address" : { "street" : "987 North St" }, "hobbies" : [ "Running" ] }
  ```

- `db.users.find({ $or: [{ age: {$lte: 20}}, {name: "Kyle"}] })`
  ```
  { "_id" : ObjectId("63b0ec670e29f1aae9adb07f"), "name" : "Sally", "age" : 19, "address" : { "street" : "987 North St" }, "hobbies" : [ "Running" ] }
  ```

- `db.users.find({age: {$not: {$lte: 20}}})`
  ```
    { "_id" : ObjectId("63b0ec070e29f1aae9adb07e"), "name" : "John" }
    { "_id" : ObjectId("63b0ec950e29f1aae9adb080"), "name" : "Joe" }
    { "_id" : ObjectId("63b0ec950e29f1aae9adb081"), "name" : "Jill" }
  ```
