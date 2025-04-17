const express = require("express");
const cors = require("cors");
const sqlite3 = require("sqlite3").verbose();
const bcrypt = require("bcrypt"); 

const app = express();
app.use(express.json());

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));

const db = new sqlite3.Database('./database.sqlite');

db.serialize(() => {
  db.run("CREATE TABLE IF NOT EXISTS users (email TEXT UNIQUE, password TEXT)");

  const users = [
    { email: "rijan1@rijan.com", password: "rijan123" },
    { email: "rijan2@rijan.com", password: "rijan123" },
    { email: "rijan3@rijan.com", password: "rijan123" },
  ];

  users.forEach(({ email, password }) => {
    db.get("SELECT * FROM users WHERE email = ?", [email], (err, row) => {
      if (!row) {
        bcrypt.hash(password, 10, (err, hash) => {
          if (!err) {
            db.run("INSERT INTO users (email, password) VALUES (?, ?)", [email, hash]);
          }
        });
      }
    });
  });
});
app.post("/login", (req, res) => {
  const { email, password } = req.body;

  db.get("SELECT * FROM users WHERE email = ?", [email], (err, user) => {
    if (err) {
      return res.status(500).json({ success: false, message: "Database error" });
    }

    if (!user) {
      return res.status(401).json({ success: false, message: "Invalid credentials" });
    }

    bcrypt.compare(password, user.password, (err, result) => {
      if (err || !result) {
        return res.status(401).json({ success: false, message: "Invalid credentials" });
      }

      res.json({
        success: true,
        user: { email: user.email },
        message: "Login successful",
      });
    });
  });
});


app.post("/register", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ success: false, message: "Missing fields" });
  }

  db.get("SELECT * FROM users WHERE email = ?", [email], (err, row) => {
    if (row) {
      return res.status(409).json({ success: false, message: "User already exists" });
    }

    bcrypt.hash(password, 10, (err, hash) => {
      if (err) {
        return res.status(500).json({ success: false, message: "Hashing error" });
      }

      db.run("INSERT INTO users (email, password) VALUES (?, ?)", [email, hash], function (err) {
        if (err) {
          return res.status(500).json({ success: false, message: "Database error" });
        }
        return res.status(201).json({ success: true, message: "User registered successfully" });
      });
    });
  });
});

app.listen(3001, () => console.log("Server running on http://localhost:3001"));