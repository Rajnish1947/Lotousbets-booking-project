const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();
const db = require('./db');
const userRoutes = require('./Routes/userRoutes.js');
const betRoutes = require('./Routes/betRoutes.js');
const depositRoutes = require("./Routes/deposit.js");
const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use('/api/users', userRoutes);
app.use('/api', betRoutes);
app.use("/api/deposit", depositRoutes);

// Server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
