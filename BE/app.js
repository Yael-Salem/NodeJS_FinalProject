/**
 * Yail Salem
 */
const path = require("path");
const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const loginRoutes = require("./routes/login.js");
const signupRoutes = require("./routes/signup.js");
const charRoutes = require("./routes/characters.js");

app.use(express.json());

app.use("/html/index.html", loginRoutes);
app.use("/html/signup.html", signupRoutes);
app.use("/html/characters", charRoutes);

app.use(express.static(path.join(__dirname, "../", "FE")));

app.use((req, res, next) => {
  res.status(404).sendFile(path.join(__dirname, "../", "FE/html/404.html"));
});

app.listen(port, () => {
  console.log(`App running on port ${port}`);
});
