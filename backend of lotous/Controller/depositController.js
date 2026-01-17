const db = require("../db");

const submitDeposit = async (req, res) => {
  try {
    const { amount, payment_type, transaction_id, userId,transaction_type } = req.body;
    const screenshot = req.file ? req.file.path : null;

    // Check each field and respond with specific missing field
    if (!amount) {
      return res.status(400).json({ message: "Amount is required." });
    }
    if (!payment_type) {
      return res.status(400).json({ message: "Payment type is required." });
    }
    if (!transaction_id) {
      return res.status(400).json({ message: "Transaction ID is required." });
    }
    if (!userId) {
      return res.status(400).json({ message: "User ID is required." });
    }
    if (!screenshot) {
      return res.status(400).json({ message: "Screenshot file is required." });
    }

    await db.execute(
      `INSERT INTO deposits (amount, payment_type, transaction_id, screenshot, userId ,transaction_type) VALUES (?, ?, ?, ?, ?,?)`,
      [
        amount.trim(),
        payment_type.trim(),
        transaction_id.trim(),
        screenshot,
        userId,
        transaction_type.trim(),
      ]
    );

    res.status(200).json({ message: "Deposit submitted successfully!" });
  } catch (error) {
    console.error("Error in submitDeposit:", error);
    res.status(500).json({ message: "Something went wrong." });
  }
};

// get balance
const getTotalDepositedAmount = (req, res) => {
  const userId = req.params.userId; // or req.body.userId if you want

  if (!userId) {
    return res.status(400).json({ message: "User ID is required." });
  }

  const sql =
    "SELECT SUM(CAST(amount AS DECIMAL(10,2))) AS totalDeposited FROM deposits WHERE userId = ?";

  db.query(sql, [userId], (err, results) => {
    if (err) {
      console.error("Error fetching total deposited amount:", err);
      return res.status(500).json({ message: "Something went wrong." });
    }

    // results is an array of rows
    const totalDeposited = results[0].totalDeposited || 0;

    res.status(200).json({ userId, totalDeposited });
  });
};


// subitwithdraw
const submitWithdraw = async (req, res) => {
  try {
    const { userId, amount, payment_type ,transaction_type } = req.body;

    if (!userId || !amount || !payment_type) {
      return res.status(400).json({ message: "Missing required fields." });
    }

    const withdrawAmount = parseFloat(amount);
    if (isNaN(withdrawAmount) || withdrawAmount <= 0) {
      return res.status(400).json({ message: "Invalid withdrawal amount." });
    }

    //  Step 1: Calculate current balance (sum of amount column)
    const [rows] = await db.promise().query(
      `SELECT IFNULL(SUM(amount), 0) AS balance FROM deposits WHERE userId = ?`,
      [userId]
    );

    const currentBalance = parseFloat(rows[0].balance);

    //  Step 2: Check if user has enough balance
    if (withdrawAmount > currentBalance) {
      return res
        .status(400)
        .json({ message: "Insufficient balance for withdrawal." });
    }

    //  Step 3: Insert negative amount as withdrawal
    await db.promise().execute(
      `INSERT INTO deposits (userId, amount, payment_type ,transaction_type) VALUES (?, ?, ?,?)`,
      [userId, -withdrawAmount, payment_type,transaction_type]
    );

    res.status(200).json({ message: "Withdrawal request submitted!" });
  } catch (err) {
    console.error("Withdraw error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

// history
const getTransactionHistory = async (req, res) => {
  const userId = req.params.userId;

  try {
    const [rows] = await db.promise().query(
      `SELECT id, amount, payment_type, transaction_id, screenshot, created_at, userId, transaction_type
       FROM deposits
       WHERE userId = ?
       ORDER BY created_at DESC`,
      [userId]
    );

    const deposits = rows.filter(tx => tx.transaction_type === 'deposit');
    const withdraws = rows.filter(tx => tx.transaction_type === 'withdraw');

    res.json({ deposits, withdraws });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};

// Get all rows where IsSettlement = 2
const getSettledBets = async (req, res) => {
  try {
    const [rows] = await db.promise().query(
      "SELECT * FROM bets WHERE IsSettlement = ?",
      [2]
    );

    res.status(200).json({ success: true, data: rows });
  } catch (err) {
    console.error("Error fetching settled bets:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

module.exports = { getTotalDepositedAmount, submitDeposit, submitWithdraw, getTransactionHistory,getSettledBets };
