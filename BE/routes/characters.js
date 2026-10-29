const express = require("express");
const router = express.Router();
const dbSingleton = require("../dbSingleton");

const db = dbSingleton.getConnection();

// GET /html/characters.html
// Returns a list of all characters in the DB as a JSON
router.get("/", (req, res) => {
  const charQuery = "SELECT * FROM characters";
  const itemQuery = "SELECT * FROM items";

  // Getting all the characters
  db.query(charQuery, (err, characters) => {
    if (err) {
      res.status(500).send(err);
      return;
    }

    db.query(itemQuery, (err, items) => {
      if (err) {
        res.status(500).send(err);
        return;
      }

      res.status(200).json({ characters, items });
    });
  });
});

// POST /html/characters.html
// Adds a character to the DB using the information provided by the user
router.post("/", (req, res) => {
  const { name, strength, description } = req.body;

  const query =
    "INSERT INTO characters (name, strength, description) VALUES (?, ?, ?)";

  db.query(query, [name, strength, description], (err, results) => {
    if (err) {
      res.status(500).send(err);
      return;
    }

    res.status(200).send(`Added successfully: ${results.insertId}`);
  });
});

// DELETE /html/characters.html/:id
// Deletes a character from the DB based on the ID provided by the frontend
router.delete("/:id", (req, res) => {
  const { id } = req.params;

  const query = "DELETE FROM characters WHERE id = ?";

  db.query(query, [id], (err, results) => {
    if (err) {
      res.status(500).send(err);
      return;
    }

    res.status(200).send("Character deleted successfully");
  });
});

module.exports = router;
