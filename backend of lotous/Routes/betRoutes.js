const express = require('express');
const router = express.Router();
const { saveBet } = require('../Controller/betController.js');

// Save Bet Route
router.post('/bets', saveBet);

module.exports = router;
