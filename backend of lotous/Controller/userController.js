const db = require('../db');
const bcrypt = require('bcrypt');

// Register New User
const registerUser = async (req, res) => {
  const { username, password, reenterpassword } = req.body;

  // Check username length
  if (username.length < 4) {
    return res.status(400).json({ message: 'Username must be at least 4 characters' });
  }

  // Check password match
  if (password !== reenterpassword) {
    return res.status(400).json({ message: 'Passwords do not match' });
  }

  // Check if user already exists
  const checkUserQuery = 'SELECT * FROM user WHERE username = ?';
  db.query(checkUserQuery, [username], async (err, result) => {
    if (err) return res.status(500).json({ message: 'Database error' });

    if (result.length > 0) {
      return res.status(400).json({ message: 'Username already exists' });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Insert new user
    const sql = 'INSERT INTO user (username, password) VALUES (?, ?)';
    db.query(sql, [username, hashedPassword], (err, result) => {
      if (err) return res.status(500).json({ message: 'Database error' });
      res.status(201).json({ message: 'User registered successfully' });
    });
  });
};

// Login User
const loginUser = (req, res) => {
  const { username, password } = req.body;

  const sql = 'SELECT * FROM user WHERE username = ?';
  db.query(sql, [username], async (err, result) => {
    if (err) return res.status(500).json({ message: 'Database error' });

    if (result.length === 0) {
      return res.status(400).json({ message: 'Invalid username or password' });
    }

    const user = result[0];
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid username or password' });
    }

    // You can send token here if you want to implement JWT later
    res.status(200).json({ message: 'Login successful', user: { id: user.id, username: user.username } });
  });
};



    // Find if any username starts with the same 4 letters
// Check username prefix API handler
const checkUsernamePrefix = (req, res) => {
  const { username } = req.body;

  if (!username || username.trim().length === 0) {
    return res.status(400).json({ message: 'Username is required' });
  }

  const sql = 'SELECT * FROM user WHERE username = ?';
  db.query(sql, [username.trim()], (err, result) => {
    if (err) return res.status(500).json({ message: 'Database error' });

    if (result.length > 0) {
      // username exists
      return res.status(200).json({ exists: true });
    } else {
      // username does not exist
      return res.status(200).json({ exists: false });
    }
  });
};



module.exports = { registerUser, loginUser ,checkUsernamePrefix};
