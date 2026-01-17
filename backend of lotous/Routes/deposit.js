
const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const { submitDeposit ,getTotalDepositedAmount ,submitWithdraw ,getTransactionHistory ,getSettledBets} = require("../Controller/depositController");

const router = express.Router();

const uploadsDir = path.join(__dirname, "../uploads");

if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir);
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadsDir),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname)),
});

const upload = multer({ storage });

router.post("/submit", upload.single("screenshot"), submitDeposit);
router.get("/total-deposited/:userId", getTotalDepositedAmount);
router.post("/withraw", submitWithdraw);
router.get('/history/:userId', getTransactionHistory);
router.get("/settlements/settled", getSettledBets);
module.exports = router;
