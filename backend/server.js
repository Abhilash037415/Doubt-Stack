const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Connect to MySQL
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "K4153r.1mp4c7",
  database: "doubtstack",
});

db.connect((err) => {
  if (err) throw err;
  console.log("MySQL connected!");
});

app.post("/signup", (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ error: "All fields required" });
  }

  const query =
    "INSERT INTO users (username, email, password) VALUES (?, ?, ?)";
  db.query(query, [username, email, password], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Database error" });
    }
    res.json({ message: "User registered successfully!" });
  });
});

app.post("/login", (req, res) => {
  const { usernameOrEmail, password } = req.body;

  if (!usernameOrEmail || !password) {
    return res.status(400).json({ error: "All fields required" });
  }

  const query = `
    SELECT * FROM users 
    WHERE (username = ? OR email = ?) AND password = ?
  `;
  db.query(
    query,
    [usernameOrEmail, usernameOrEmail, password],
    (err, results) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: "Database error" });
      }

      if (results.length === 0) {
        return res.status(401).json({ error: "Invalid credentials" });
      }

      res.json({ message: "Login successful" });
    }
  );
});

app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});
