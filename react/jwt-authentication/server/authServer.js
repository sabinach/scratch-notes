require("dotenv").config();

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
  res.status(200).json(users);
});

// create a user
//hash (salt + 'password') // dddddddd
//hash (salt2 + 'password') // eeeeeeee
app.post("/users", async (req, res) => {
  console.log("creating new user...");
  try {
    //const salt = await bcrypt.genSalt();
    //console.log(`salt: ${salt}`)
    const hashedPassword = await bcrypt.hash(req.body.password, 10); // generates and create hash in one step!
    console.log(`username: ${req.body.username}`); // requested username
    console.log(`hashedPassword: ${hashedPassword}`); // salt info included within hashedPassword
    const user = {
      username: req.body.username,
      hashedPassword: hashedPassword,
    };
    users.push(user);
    users.forEach((user) =>
      console.log(
        `added user to users database:\n\t username: ${user.username} \n\t hashedPassword: ${user.hashedPassword}`
      )
    );
    res.status(201).send("Created user");
  } catch {
    res.status(500).send("error");
  }
});

/****************** Login ******************/

// login
app.post("/login", async (req, res) => {
  console.log("logging in...");
  // authenticatication - confirms that users are who they say they are
  // authorization - gives those users permission to access a resource

  // this is returned later in jwt.verify()
  const username = req.body.username;
  const password = req.body.password;

  // this will be calling the database
  const loggedInUser = users.find((user) => user.username === username); // this will be email

  if (loggedInUser === null) {
    return res.status(400).send("Cannot find loggedInUser");
  }
  try {
    // compare requested/session password (raw) with stored/database hashedPassword
    if (await bcrypt.compare(password, loggedInUser.hashedPassword)) {
      // return an refreshToken if a user is signed in
      // save this refreshToken in your current server/session as a cookie
      const refreshToken = generateRefreshToken(loggedInUser);
      refreshTokens.push(refreshToken);
      refreshTokens.forEach((refreshToken) =>
        console.log(`added refreshToken to database: ${refreshToken}`)
      );
      res.status(200).json({
        message: "Authentication: Success",
        refreshToken: refreshToken,
      });
    } else {
      res.status(200).json({
        message: "Authentication: Failed",
        refreshToken: null,
      });
    }
  } catch {
    res.status(500).send("error");
  }
});

/****************** Create Tokens ******************/

// temp database
let refreshTokens = [];

// USER IS THE PAYLOAD!!! - username, email, jwt_token
function generateAccessToken(user) {
  return jwt.sign(user, process.env.ACCESS_SECRET_TOKEN, { expiresIn: "15s" });
}

function generateRefreshToken(user) {
  return jwt.sign(user, process.env.REFRESH_SECRET_TOKEN);
}

// token = refreshToken, continuously generate refresh tokens
app.post("/token", (req, res) => {
  console.log("generate new refreshToken...");
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
    res.status(200).json({ accessToken: accessToken });
  });
});

/****************** Logout ******************/

// delete refresh tokens
app.delete("/logout", (req, res) => {
  console.log("logging out...");
  refreshTokens = refreshTokens.filter(
    (refreshToken) => refreshToken !== req.body.refreshToken
  );
  refreshTokens.forEach((refreshToken) =>
    console.log(`deleted refreshToken from database: ${refreshToken}`)
  );
  res.sendStatus(204).send("deleted refreshToken");
});

app.listen(4000);
