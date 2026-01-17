import { useState, useEffect } from "react";
import { FaChevronDown, FaChevronUp, FaRegClock } from "react-icons/fa";
import { AiFillGift } from "react-icons/ai";
import { useAuth } from "../context/Authcontext";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import axios from "axios";

const MAX_STAKE = 15000;

const SideBarRight = ({ isLoggedIn, initialOdds }) => {
  const {
    batingdetails,
    setBetingDetial,
    balance,
    user,
    fetchBalance,
    backendurl,
    setBalance
  } = useAuth();

  const [bonusOn, setBonusOn] = useState(false);
  const [showCreditDetails, setShowCreditDetails] = useState(false);
  const [showMatchedBets, setShowMatchedBets] = useState(false);

  const [backendMessage, setBackendMessage] = useState("");
  const [odds, setOdds] = useState(initialOdds || 0);
  const [stake, setStake] = useState("");
  console.log("selected fancy " + batingdetails.SelectionId);
  console.log("bagdetails" + batingdetails);
  const [showPopup, setShowPopup] = useState(false);
  const [timer, setTimer] = useState(5);

  useEffect(() => {
    setOdds(initialOdds);
  }, [initialOdds]);

  const handleStakeClick = (value) => {
    setStake(value.toString());
  };

  const increaseOdds = () => {
    setOdds((prev) => (parseFloat(prev) + 0.01).toFixed(2));
  };

  const decreaseOdds = () => {
    setOdds((prev) => (parseFloat(prev) - 0.01).toFixed(2));
  };

  const handlePlaceBet = async () => {
    if (!stake) {
      toast.error("Please enter a stake.", { autoClose: 3000 });
      return;
    }

    const amountStake = parseFloat(stake);

    if (amountStake > MAX_STAKE) {
      toast.error("Check Maximum Bet Limit.", { autoClose: 3000 });
      return;
    }

    if (!bonusOn && parseFloat(balance) < amountStake) {
      toast.error("Insufficient balance.", { autoClose: 3000 });
      return;
    }

    try {
      const matchData = batingdetails?.matchData || {};
      const market = batingdetails?.market?.toLowerCase();
      const oddPrice = parseFloat(
        market === "fancy" ? batingdetails?.oddprice1 : batingdetails?.oddprice
      );
      const { type } = batingdetails;

      let profit = 0;
      let liability = 0;

      if (market === "matchodds") {
        if (type === "back") {
          profit = Math.floor((oddPrice - 1.0) * amountStake);
          liability = -Math.floor(amountStake);
        } else if (type === "lay") {
          profit = Math.floor(amountStake);
          liability = -Math.floor((oddPrice - 1.0) * amountStake);
        }
      } else if (market === "bookmaker") {
        if (type === "back") {
          profit = Math.floor((oddPrice / 100) * amountStake);
          liability = -Math.floor(amountStake);
        } else if (type === "lay") {
          profit = Math.floor(amountStake);
          liability = -Math.floor((oddPrice / 100) * amountStake);
        }
      } else if (market === "fancy") {
        if (type === "back") {
          profit = Math.floor((batingdetails?.oddprice1 / 100) * amountStake);
          liability = -Math.floor(amountStake);
        } else if (type === "lay") {
          profit = Math.floor(amountStake);
          liability = -Math.floor(
            (batingdetails?.oddprice1 / 100) * amountStake
          );
        }
      }

      const betPayload = {
        SportId: matchData.eid,
        BetId:
          Math.random().toString(36).substring(2, 18) +
          Math.random().toString(36).substring(2, 6),
        EventId: matchData.gameId,
        Event: matchData.eventName,
        MarketId: matchData.marketId || 0,
        Selection: batingdetails?.Selection || 0,
        SeriesId: null,
        Market: batingdetails?.market,
        SelectionId: batingdetails?.SelectionId || 0,
        OddsType: 1,
        Type: batingdetails.type,
        OddsRequest: oddPrice,
        AmountStake: amountStake,
        BetType: 1,
        PlaceTime: new Date(),
        MatchedTime: new Date(),
        SettleTime: null,
        DeleteTime: null,
        IsSettlement: 2,
        IsDelete: 0,
        Status: 1,
        UserId: user?.id,
        DeletedBy: null,
        UpdatedBy: null,
        ResultType: null,
        ResultAmount: 0,
        UpdatedDate: null,
        IpAddress: "127.0.0.1",
        IsMatched: 1,
        Result: null,
        EventName: matchData.eventName,
        Profit: profit,
        Liability: liability,
        currentExposure: liability,
      };

      const response = await axios.post(`${backendurl}/api/bets`, betPayload);
// there is one problem
      if (response.status === 201) {
        setBackendMessage(response.data.message);
        setShowPopup(true);
        const newBalance = parseFloat(balance) - amountStake;
        setBalance(newBalance) 
        console(newBalance)
        setTimer(5);
        fetchBalance();
       
      } else {
        toast.error("Failed to place bet.", { autoClose: 3000 });
      }
    } catch (error) {
     
     
    }
  };

  useEffect(() => {
    if (showPopup && timer > 0) {
      const countdown = setTimeout(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
      return () => clearTimeout(countdown);
    } else if (showPopup && timer === 0) {
      setShowPopup(false);

      const market = batingdetails?.market?.toLowerCase();
      const oddPrice = parseFloat(
        market === "fancy" ? batingdetails?.oddprice1 : batingdetails?.oddprice
      );

      // Validate odds based on market
      const isInvalidOdds =
        (market === "matchodds" && oddPrice > 7) ||
        ((market === "fancy" || market === "bookmaker") && oddPrice < 1);

      if (isInvalidOdds) {
        toast.error("Invalid odds selected for this market.", {
          autoClose: 3000,
        });
      } else if (backendMessage) {
        toast.success(backendMessage, { autoClose: 3000 });
      }
    }
  }, [
    showPopup,
    timer,
    backendMessage,
    batingdetails?.oddprice,
    batingdetails?.oddprice1,
  ]);

  return (
    <div className="hidden w-80 lg:flex">
      <div className="p-2 mb-5 h-[80vh] bg-white rounded-md shadow overflow-y-auto scrollbar-hidden">
        {!isLoggedIn ? (
          <p className="text-gray-800 mt-3 text-sm">
            Please login to see your open bets.{" "}
            <span className="text-red-700 cursor-pointer underline">Login</span>
          </p>
        ) : (
          <>
            <div
              className="flex justify-between items-center p-4 py-1 px-2 w-[300px] bg-emerald-800 rounded text-white text-[12px] cursor-pointer"
              onClick={() => setShowCreditDetails(!showCreditDetails)}
            >
              <div>
                <p>Available Credit</p>
                <p>₹ 0</p>
              </div>
              {showCreditDetails ? <FaChevronUp /> : <FaChevronDown />}
            </div>

            {showCreditDetails && (
              <div className="border mt-2 border-gray-300 w-[300px] rounded">
                <div className="py-2 px-2 space-y-2 text-[10px]">
                  <div className="bg-gray-100 border shadow-lg border-gray-200 rounded p-2">
                    <p className="font-medium">Balance</p>
                    <p>₹ 0</p>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div className="bg-gray-100 rounded shadow-lg pl-2 py-2">
                      <p>Free Cash</p>
                      <p>₹ 0.00</p>
                    </div>
                    <div className="bg-gray-100 shadow-lg rounded pl-2 py-2">
                      <p>Net Exposure</p>
                      <p>₹ 0.00</p>
                    </div>
                  </div>

                  <div className="flex items-center p-1 gap-1 mt-2">
                    <AiFillGift className="text-green-600 text-xl" />
                    <span className="text-[14px] font-semibold">
                      Bonus Information
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 mt-2">
                    <div className="bg-gray-100 rounded shadow-lg pl-2 py-2">
                      <p>Bonus Balance</p>
                      <p>₹ 0</p>
                    </div>
                    <div className="bg-gray-100 rounded shadow-lg pl-2 py-2">
                      <p>Net Exposure</p>
                      <p>₹ 0</p>
                    </div>
                  </div>

                  <div className="flex justify-between items-center mt-3 border py-2 px-2 bg-gray-100 border-gray-200 shadow-lg rounded">
                    <span className="font-medium text-[12px]">
                      Play With Bonus
                    </span>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        className="sr-only peer"
                        checked={bonusOn}
                        onChange={() => setBonusOn(!bonusOn)}
                      />
                      <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none rounded-full peer peer-checked:bg-green-500 transition duration-300">
                        <div
                          className={`absolute top-[2px] left-[2px] w-5 h-5 bg-white rounded-full shadow-md transform transition-transform duration-300 ${
                            bonusOn ? "translate-x-5" : ""
                          }`}
                        ></div>
                      </div>
                    </label>
                  </div>
                </div>
              </div>
            )}

            <div className={`${batingdetails?.oddprice ? "" : "hidden"}`}>
              <div className="border-2 mt-2 text-sm w-[300px] rounded border-green-400">
                <div className="p-1">
                  <div className="flex justify-between text-[10px] pt-3 px-3">
                    <div className="font-medium">ODDS</div>
                    <div className="flex justify-between gap-2">
                      <div className="mr-4">STAKE</div>
                      <div>Max Mkt: 15k</div>
                    </div>
                  </div>

                  <div className="grid ml-2 grid-cols-2 gap-3 text-center p-2">
                    <div className="flex text-center justify-between border border-gray-500 w-[120px] px-2 py-1 gap-1">
                      <div className="text-center ml-7 mt-1">
                        {batingdetails?.oddprice}
                      </div>
                      <div className="flex flex-col text-sm text-gray-500 cursor-pointer">
                        <FaChevronUp
                          onClick={increaseOdds}
                          className="hover:text-black"
                        />
                        <FaChevronDown
                          onClick={decreaseOdds}
                          className="hover:text-black"
                        />
                      </div>
                    </div>
                    <input
                      className="border text-center border-gray-300 px-2 py-1 text-xs w-[120px]"
                      type="text"
                      placeholder="Max: 25k"
                      value={stake}
                      onChange={(e) => setStake(e.target.value)}
                    />
                  </div>

                  <div className="m-2 p-2 bg-gray-200 rounded-lg border border-gray-300">
                    <div className="grid grid-cols-3 gap-2 mb-2 text-xs">
                      {[
                        "100",
                        "200",
                        "300",
                        "500",
                        "1000",
                        "2000",
                        "5000",
                        "75000",
                        "1000000",
                        "1250000",
                      ].map((amount, index) => (
                        <div
                          key={index}
                          onClick={() => handleStakeClick(amount)}
                          className="bg-emerald-800 text-white text-center px-2 py-2 rounded cursor-pointer hover:bg-emerald-600"
                        >
                          +{amount}
                        </div>
                      ))}
                    </div>

                    <div className="grid grid-cols-3 gap-1 py-2 text-center">
                      <div
                        onClick={() => handleStakeClick(100)}
                        className="bg-gradient-to-r from-blue-400 to-blue-600 text-white text-[10px] px-3 py-2 rounded cursor-pointer"
                      >
                        MIN
                      </div>
                      <div
                        onClick={() => handleStakeClick(1250000)}
                        className="bg-gradient-to-r from-emerald-800 to-emerald-600 text-white text-[10px] px-3 py-2 rounded cursor-pointer"
                      >
                        MAX
                      </div>
                      <div
                        className="bg-gradient-to-r from-pink-700 to-pink-500 text-center text-[10px] text-white px-3 py-2 rounded cursor-pointer"
                        onClick={() => setStake("")}
                      >
                        CLEAR
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2 p-2 text-xs">
                    <div
                      onClick={() => {
                        setBetingDetial("");
                      }}
                      className="text-emerald-500 text-center py-3 rounded-md px-2 border border-emerald-400 cursor-pointer"
                    >
                      Cancel Bet
                    </div>
                    <div
                      onClick={handlePlaceBet}
                      className="flex items-center gap-1 text-white bg-emerald-700 px-2 py-3 text-center rounded-md cursor-pointer"
                    >
                      Place Bet <FaRegClock className="text-sm" /> 5s
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div
              className="flex justify-between items-center bg-emerald-800 text-white mt-3 px-2 py-2 rounded text-[12px] cursor-pointer"
              onClick={() => setShowMatchedBets(!showMatchedBets)}
            >
              <span>Matched Bets</span>
              {showMatchedBets ? <FaChevronUp /> : <FaChevronDown />}
            </div>
            {showMatchedBets && (
              <div className="shadow-md border border-gray-100 text-sm mt-2 font-semibold text-center py-2 px-1 rounded">
                You have no Matched Bets.
              </div>
            )}

            {showPopup && (
              <div className=" absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-50">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  className="bg-white rounded-xl p-6 text-center w-[300px] shadow-lg flex flex-col items-center gap-6"
                >
                  <div className="relative w-16 h-16 mx-auto">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{
                        repeat: Infinity,
                        duration: 1,
                        ease: "linear",
                      }}
                      className="absolute top-0 left-0 w-full h-full rounded-full border-4 border-dotted border-blue-500"
                    />
                    <div className="absolute inset-0 flex items-center justify-center text-lg font-bold text-blue-700">
                      {timer}
                    </div>
                  </div>
                  <div>
                    <h2 className="text-[15px] font-semibold mb-1">
                      Your bet is being processed...
                    </h2>
                    <p className="text-sm text-gray-600">Please Wait...</p>
                  </div>
                </motion.div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default SideBarRight;
