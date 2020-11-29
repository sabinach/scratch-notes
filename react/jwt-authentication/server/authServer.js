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

/****************** Create Tokens ******************/

// temp database
let refreshTokens = [];

function generateAccessToken(user) {
  return jwt.sign(user, process.env.ACCESS_SECRET_TOKEN, { expiresIn: "15s" });
}

function generateRefreshToken(user) {
  return jwt.sign(user, process.env.REFRESH_SECRET_TOKEN);
}

// token = refreshToken, continuously generate refresh tokens
app.post("/token", (req, res) => {
  const refreshToken = req.body.refreshToken;
  console.log(`refreshToken: ${refreshToken}`);
  if (refreshToken === undefined) {
    return res.status(401).send("error: refreshToken not received");
  }
  if (!refreshTokens.includes(refreshToken)) {
    return res.status(403).send("error: refreshToken does not exist");
  }
  jwt.verify(refreshToken, process.env.REFRESH_SECRET_TOKEN, (err, user) => {
    if (err) {
      return res.sendStatus(403).send("error: invalid refreshToken");
    }
    const accessToken = generateAccessToken({ username: user.username });
    console.log(`user.username: ${user.username}`);
    console.log(`accessToken: ${accessToken}`);
    res.json({ accessToken: accessToken });
  });
});

/****************** Login ******************/

// create a token
app.post("/login", (req, res) => {
  // authenticatication - confirms that users are who they say they are
  // authorization - gives those users permission to access a resource

  // this is returned later in jwt.verify()
  const user = { username: req.body.username };

  // return an refreshToken if a user is signed in
  const refreshToken = generateRefreshToken(user);
  refreshTokens.push(refreshToken);
  console.log(`refreshToken: ${refreshToken}`);
  res.json({ refreshToken: refreshToken }); // save this accessToken in your current server/session as a cookie
});

/****************** Logout ******************/

// delete refresh tokens
app.delete("/logout", (req, res) => {
  refreshTokens = refreshTokens.filter(
    (refreshToken) => refreshToken !== req.body.refreshToken
  );
  res.sendStatus(204).send("deleted refreshToken");
});

app.listen(4000);
