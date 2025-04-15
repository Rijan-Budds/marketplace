// login-backend/server.js
const express = require("express");
const cors = require("cors");
const sqlite3 = require("sqlite3").verbose();

const app = express();
app.use(express.json());

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));

// SQLite setup
const db = new sqlite3.Database('./database.sqlite');

db.serialize(() => {
  db.run("CREATE TABLE IF NOT EXISTS users (email TEXT UNIQUE, password TEXT)");
  db.get("SELECT * FROM users WHERE email = ?", ["test@example.com"], (err, row) => {
    if (!row) {
      db.run("INSERT INTO users (email, password) VALUES (?, ?)", [
        "test@example.com",
        "password123"
      ]);
    }
  });
});

app.post("/login", (req, res) => {
  const { email, password } = req.body;
  db.get(
    "SELECT * FROM users WHERE email = ? AND password = ?",
    [email, password],
    (err, row) => {
      if (row) {
        res.json({ success: true, user: { email: row.email }, message: "Login successful" });
      } else {
        res.status(401).json({ success: false, message: "Invalid credentials" });
      }
    }
  );
});

app.listen(3001, () => console.log("Server running on http://localhost:3001"));
