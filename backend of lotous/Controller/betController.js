
// const db = require("../db");

// // Save Bet Function
// const saveBet = (req, res) => {
//   const data = req.body;

//   const sql = `
//     INSERT INTO bets (
//       SportId, BetId, EventId, Event, MarketId, Selection, SeriesId, Market,
//       SelectionId, OddsType, Type, OddsRequest, AmountStake, BetType, PlaceTime,
//       MatchedTime, SettleTime, DeleteTime, IsSettlement, IsDelete, Status,
//       UserId, DeletedBy, UpdatedBy, ResultType, ResultAmount, UpdatedDate,
//       IpAddress, IsMatched, Result, EventName, Profit, Liability, currentExposure
//     ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
//   `;

//   const values = [
//     data.SportId,
//     data.BetId,
//     data.EventId,
//     data.Event,
//     data.MarketId,
//     data.Selection,
//     data.SeriesId,
//     data.Market,
//     data.SelectionId,
//     data.OddsType,
//     data.Type,
//     data.OddsRequest,
//     data.AmountStake,
//     data.BetType,
//     data.PlaceTime,
//     data.MatchedTime,
//     data.SettleTime,
//     data.DeleteTime,
//     data.IsSettlement,
//     data.IsDelete,
//     data.Status,
//     data.UserId,
//     data.DeletedBy,
//     data.UpdatedBy,
//     data.ResultType,
//     data.ResultAmount,
//     data.UpdatedDate,
//     data.IpAddress,
//     data.IsMatched,
//     data.Result,
//     data.EventName,
//     data.Profit,
//     data.Liability,
//     data.currentExposure
//   ];

//   db.query(sql, values, (err, result) => {
//     if (err) {
//       console.error("❌ Error inserting bet:", err);
//       return res.status(500).json({ message: "Error saving bet" });
//     }

    
//     console.log("📝 Received Data from Frontend:", data);

//     return res.status(201).json({
//       message: "Bet saved successfully",
    
//       betId: result.insertId,
    
//     });
//   });
// };

// module.exports = { saveBet };

const db = require("../db");

// Save Bet Function
const saveBet = (req, res) => {
  const data = req.body;

  const insertSql = `
    INSERT INTO bets (
      SportId, BetId, EventId, Event, MarketId, Selection, SeriesId, Market,
      SelectionId, OddsType, Type, OddsRequest, AmountStake, BetType, PlaceTime,
      MatchedTime, SettleTime, DeleteTime, IsSettlement, IsDelete, Status,
      UserId, DeletedBy, UpdatedBy, ResultType, ResultAmount, UpdatedDate,
      IpAddress, IsMatched, Result, EventName, Profit, Liability, currentExposure
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  const values = [
    data.SportId,
    data.BetId,
    data.EventId,
    data.Event,
    data.MarketId,
    data.Selection,
    data.SeriesId,
    data.Market,
    data.SelectionId,
    data.OddsType,
    data.Type,
    data.OddsRequest,
    data.AmountStake,
    data.BetType,
    data.PlaceTime,
    data.MatchedTime,
    data.SettleTime,
    data.DeleteTime,
    data.IsSettlement,
    data.IsDelete,
    data.Status,
    data.UserId,
    data.DeletedBy,
    data.UpdatedBy,
    data.ResultType,
    data.ResultAmount,
    data.UpdatedDate,
    data.IpAddress,
    data.IsMatched,
    data.Result,
    data.EventName,
    data.Profit,
    data.Liability,
    data.currentExposure
  ];

  db.query(insertSql, values, (err, result) => {
    if (err) {
      console.error("❌ Error inserting bet:", err);
      return res.status(500).json({ message: "Error saving bet" });
    }

    // Now deduct the stake amount from user's amount
    const updateamountSql = `
      UPDATE deposits
      SET amount = amount - ?
      WHERE id = ?
    `;

    db.query(updateamountSql, [data.AmountStake, data.UserId], (err2, result2) => {
      if (err2) {
        console.error("❌ Error updating amount:", err2);
        // You might want to rollback the bet insertion or handle this case properly
        return res.status(500).json({ message: "Error updating user amount" });
      }

      console.log("📝 Bet saved and amount updated:", data);

      return res.status(201).json({
        message: "Bet saved successfully and amount updated",
        betId: result.insertId,
      });
    });
  });
};

module.exports = { saveBet };
