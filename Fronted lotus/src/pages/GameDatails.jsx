


import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { FaRegCirclePlay } from "react-icons/fa6";
import { FaChevronUp, FaChevronDown } from "react-icons/fa";
import { CiFootball } from "react-icons/ci";
import { GiTennisRacket, GiCricketBat } from "react-icons/gi";
import GamesHeader from "./GamesHeader";
import Matchodds from "../components/Matchodds";
import Bookmarker from "../components/Bookmarker";
import Fancy from "./Fancy";

const GameDetails = () => {
  const { eid, gameId, marketId } = useParams();
  const [activeTab, setActiveTab] = useState("LIVE");
  const [isOpen, setIsOpen] = useState(false);
  const [matchOdds, setMatchOdds] = useState(null);
  const [bookmakerData, setBookmakerData] = useState([]);
  const [fancyMarketData, setFancyMarketData] = useState([]);

  const getSportDetails = (eid) => {
    switch (eid) {
      case "1":
        return { name: "Football", icon: <CiFootball /> };
      case "2":
        return { name: "Tennis", icon: <GiTennisRacket /> };
      case "4":
        return { name: "Cricket", icon: <GiCricketBat /> };
      default:
        return { name: "Unknown Sport", icon: <FaRegCirclePlay /> };
    }
  };

  const { name: sportName, icon: sportIcon } = getSportDetails(eid);

  useEffect(() => {
    const fetchMatchOdds = async () => {
      try {
        const response = await fetch(
          `https://api.big1.live/checkGetMatchOdds/${marketId}/${gameId}`
        );
        const result = await response.json();
        console.log("result", result);
        setMatchOdds(result.Odds[0] || null);
        setBookmakerData(result.Bookmaker || []);
        setFancyMarketData(result.Fancy || []);
      } catch (error) {
        console.error("Error fetching match odds:", error);
      }
    };

    fetchMatchOdds();
  }, [gameId, marketId]);

  if (!matchOdds) return null;

  return (
    <>
      <GamesHeader
        sportName={sportName}
        sportIcon={sportIcon}
        matchOdds={matchOdds}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      />
      {/* You can uncomment these when ready */}
       <Matchodds data={matchOdds} />
 <Bookmarker data={bookmakerData[0]} />

      <Fancy data={fancyMarketData[0]} /> 
    </>
  );
};

export default GameDetails;
