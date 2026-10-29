const express = require("express");
const router = express.Router();
const dbSingleton = require("../dbSingleton.js");

const db = dbSingleton.getConnection();

// POST /html/index.html
// Authenticating user's log-in information
router.post("/", (req, res) => {
  const { name, password } = req.body;

  const query =
    "SELECT name, password FROM users WHERE name = ? AND password = ?";

  db.query(query, [name, password], (err, results) => {
    if (err) {
      res.status(500).send(err);
      console.log(err);
      return;
    }

    if (results.length > 0) {
      res.status(200).send("Successfully authenticated");
    } else {
      res.status(404).send("user not found");
    }
  });
});

module.exports = router;
