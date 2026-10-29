const express = require("express");
const router = express.Router();
const dbSingleton = require("../dbSingleton");

const db = dbSingleton.getConnection();

// Middleware to check if the information provided already exists in the database
router.post("/", (req, res, next) => {
  const { email, name, password } = req.body;

  const query =
    "SELECT name, password FROM users WHERE name = ? AND password = ?";

  db.query(query, [name, password], (err, results) => {
    if (err) {
      res.status(500).send(err);
    }

    if (results.length !== 0) {
      res.status(400).send("User already exists");
    } else {
      next();
    }
  });
});

// POST /html/signup.html
// Adding the user's information provided by the frontend to the databse
router.post("/", (req, res) => {
  const { email, name, password } = req.body;

  const query = "INSERT INTO users (email, name, password) VALUES (?, ?, ?)";

  db.query(query, [email, name, password], (err, results) => {
    if (err) {
      res.status(500).send(err);
      return;
    }

    res.status(200).send("Successfully added user to DB");
  });
});

module.exports = router;
