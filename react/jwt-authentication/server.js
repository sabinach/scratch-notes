const express = require("express");
const app = express();

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

app.use(express.json());

/****************** Users ******************/

// temp database
const users = [];

// get all users
app.get("/users", (req, res) => {
  res.json(users);
});

// create a user
//hash (salt + 'password') // dddddddd
//hash (salt2 + 'password') // eeeeeeee
app.post("/users", async (req, res) => {
  try {
    //const salt = await bcrypt.genSalt();
    //console.log(`salt: ${salt}`)
    const hashedPassword = await bcrypt.hash(req.body.password, 10); // generates and create hash in one step!
    console.log(`hashedPassword: ${hashedPassword}`); // salt info included within hashedPassword
    const user = {
      username: req.body.username,
      password: hashedPassword,
    };
    users.push(user);
    res.status(201).send("Created user");
  } catch {
    res.status(500).send("error");
  }
});

// login
app.post("/login", async (req, res) => {
  const user = users.find((user) => (user.username = req.body.username));
  console.log(`user: ${user}`);
  if (user === null) {
    return res.status(400).send("Cannot find user");
  }
  try {
    // compare requested/session hashedPassword with stored/database hashedPassword
    if (await bcrypt.compare(req.body.password, user.password)) {
      res.send("Authentication: Success");
    } else {
      res.send("Authentication: Failed");
    }
  } catch {
    res.status(500).send("error");
  }
});

/****************** Posts ******************/

// temp database
const posts = [
  {
    username: "Sabina",
    title: "Post 1",
  },
  {
    username: "Jim",
    title: "Post 2",
  },
];

// get all posts
app.get("/posts", (req, res) => {
  res.json(posts);
});

/****************** Login ******************/

// create a token
app.post("/login", (req, res) => {
  // authenticatication - confirms that users are who they say they are
  // authorization - gives those users permission to access a resource

  const username = req.body.username;
});

app.listen(3000);
