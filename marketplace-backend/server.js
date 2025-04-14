const express = require("express");
const cors = require("cors");
const sqlite3 = require("sqlite3").verbose();

const app = express();

// Enhanced CORS configuration
app.use(cors({
  origin: 'http://localhost:5173', // Your frontend origin
  credentials: true
}));

app.use(express.json());

// Use file-based database instead of in-memory for persistence
const db = new sqlite3.Database('./database.sqlite');

// Initialize database
db.serialize(() => {
  db.run("CREATE TABLE IF NOT EXISTS users (email TEXT UNIQUE, password TEXT)");
  
  // Add test user if not exists
  db.get("SELECT * FROM users WHERE email = ?", ["test@example.com"], (err, row) => {
    if (!row) {
      db.run("INSERT INTO users (email, password) VALUES (?, ?)", [
        "test@example.com",
        "password123",
      ]);
    }
  });
});

// Login route with enhanced response
app.post("/login", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ success: false, message: "Email and password required" });
  }

  db.get(
    "SELECT * FROM users WHERE email = ? AND password = ?",
    [email, password],
    (err, row) => {
      if (err) {
        return res.status(500).json({ success: false, message: "Database error" });
      }
      if (row) {
        res.json({ 
          success: true,
          message: "Login successful",
          user: { email: row.email } // Return user data
        });
      } else {
        res.status(401).json({ 
          success: false,
          message: "Invalid credentials" 
        });
      }
    }
  );
});

app.listen(3001, () => {
  console.log("Server running on http://localhost:3001");
});