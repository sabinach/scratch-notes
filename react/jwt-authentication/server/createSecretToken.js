// To run: node createSecretToken.js
console.log(require("crypto").randomBytes(64).toString("hex"));
