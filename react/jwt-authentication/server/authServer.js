require("dotenv").config();

const express = require("express");
const app = express();

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

app.use(express.json());

/****************** Users ******************/

/*
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
      res.status(200).send("Authentication: Success");
    } else {
      res.status(200).send("Authentication: Failed");
    }
  } catch {
    res.status(500).send("error");
  }
});
*/

/****************** Tokens ******************/

function generateAccessToken(user) {
  return jwt.sign(user, process.env.ACCESS_SECRET_TOKEN, { expiresIn: "15s" });
}

function generateRefreshToken(user) {
  return jwt.sign(user, process.env.REFRESH_SECRET_TOKEN);
}

/****************** Login ******************/

// create a token
app.post("/login", (req, res) => {
  // authenticatication - confirms that users are who they say they are
  // authorization - gives those users permission to access a resource

  // this is returned later in jwt.verify()
  const user = { username: req.body.username };

  // return an access token if a user is signed in
  const accessToken = generateAccessToken(user);
  const refreshToken = generateRefreshToken(user);
  console.log(`accessToken: ${accessToken}`);
  console.log(`refreshToken: ${refreshToken}`);
  res.json({ accessToken: accessToken, refreshToken: refreshToken }); // save this accessToken in your current server/session as a cookie
});

app.listen(4000);
