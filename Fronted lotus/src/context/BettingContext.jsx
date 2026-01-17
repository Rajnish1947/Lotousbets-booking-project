

import React, { createContext, useContext, useState } from "react";
import axios from "axios";

const BettingContext = createContext();

export const BettingProvider = ({ children }) => {
  const [bettingDetails, setBettingDetails] = useState(null);


  const placeBet = (stake, odds) => {
    if (!bettingDetails) return;

    let profit = 0;
    let liability = 0;

    if (bettingDetails.type === "back") {
      profit = (odds - 1) * stake;
      liability = stake;
    } else if (bettingDetails.type === "lay") {
      profit = stake;
      liability = (odds - 1) * stake;
    }

    const betData = {
      ...bettingDetails,
      BetId: "BET" + new Date().getTime(),
      OddsRequest: odds,
      AmountStake: stake,
      Profit: profit,
      Liability: liability,
      PlaceTime: new Date().toISOString().slice(0, 19).replace('T', ' '),
      MatchedTime: new Date().toISOString().slice(0, 19).replace('T', ' '),
      Result: "Pending",
    };

    // Post API here
    axios.post('http://localhost:3000/api/bets', betData)
      .then(response => {
        console.log('Bet placed successfully:', response.data);
      })
      .catch(error => {
        console.error('Error placing bet:', error);
      });
  };

  return (
    <BettingContext.Provider value={{ bettingDetails, setBettingDetails, placeBet }}>
      {children}
    </BettingContext.Provider>
  );
};

export const useBetting = () => useContext(BettingContext);
