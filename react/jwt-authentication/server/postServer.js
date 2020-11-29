require("dotenv").config();

const express = require("express");
const app = express();
const jwt = require("jsonwebtoken");

app.use(express.json());

/****************** Middleware ******************/

function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"]; // Bearer TOKEN
  const token = authHeader && authHeader.split(" ")[1]; // get second value of request: TOKEN
  console.log(`authHeader: ${authHeader}`);
  console.log(`token: ${token}`);
  if (token === undefined) {
    return res.status(401).send("error: token not received");
  }
  jwt.verify(token, process.env.ACCESS_SECRET_TOKEN, (err, user) => {
    if (err) {
      return res.sendStatus(403).send("error: invalid token");
    }
    console.log(`user: ${user}`);
    console.log(`user.username: ${user.username}`);
    req.user = user; // valid user
    next(); // move on from middleware
  });
}

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

// get all posts, make sure user is signed in by requiring checking accessToken
app.get("/posts", authenticateToken, (req, res) => {
  res.json(posts.filter((post) => post.username === req.user.username)); // filter for only user's posts
});

app.listen(3000);
