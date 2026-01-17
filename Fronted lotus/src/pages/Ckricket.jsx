

import React, { useEffect, useState } from "react";
import { FaPlayCircle, FaCircleNotch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { CiBasketball } from "react-icons/ci";

const API_URL = "https://api.parker999.live/GetInPlaySportEvents";

const Ckricket = () => {
  const navigate = useNavigate();

  const [inPlayMatches, setInPlayMatches] = useState([]);
  const [upcomingMatches, setUpcomingMatches] = useState([]);

  useEffect(() => {
    async function fetchMatches() {
      try {
        const res = await fetch(API_URL);
        const json = await res.json();

        if (json.message === "In Play Data fetched Successfully") {
          setInPlayMatches(json.data.sportsEventModelInPlay.filter((m) => m.eid === "4"));
          setUpcomingMatches(json.data.sportsEventModelToday.filter((m) => m.eid === "4"));
        }
      } catch (error) {
        console.error("Failed to fetch matches:", error);
      }
    }

    fetchMatches();
  }, []);

  const handleRowClick = (match) => {
    console.log(match)
    const id = match.gameId || match.SrNo;
    const marketId = match.marketId; // Make sure this exists in your API data
    navigate(`/game-details/${match.eid}/${id}/${marketId}`, 
      {state:match}
    );
  };

  const renderMatches = (matches) =>
    matches.length === 0 ? (
      <div className="text-center py-4">No matches available</div>
    ) : (
      matches.map((match) => (
        <div
          key={match.SrNo}
          className="grid grid-cols-5 md:grid-cols-7 w-full border border-gray-200 text-[10px] sm:text-sm md:text-[14px] cursor-pointer hover:bg-gray-100"
          onClick={() => handleRowClick(match)}
        >
          <div className="col-span-1 border-r border-gray-200 px-2 py-1 text-green-600">
            {match.eventDate
              ? `Today ${new Date(match.eventDate).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}`
              : "Today 1:30"}
          </div>
          <div className="col-span-2 border-r border-gray-200 font-semibold flex items-center p-2">
            {match.eventName || "Cricket Match"}
          </div>

          {match.Status !== 1 ? (
            <div className="col-span-2 md:col-span-4 flex items-center justify-center bg-gradient-to-r from-green-200 to-pink-100 font-semibold text-blue-800 p-2">
              SUSPENDED
            </div>
          ) : (
            <div className="col-span-2 md:col-span-4 grid grid-cols-3 md:grid-cols-6 text-center font-bold m-1 gap-1">
              <div className="p-1 bg-blue-400 border border-gray-300">
                {match.back12 || "-"}
                <p className="text-[8px] md:text-[10px] font-bold text-gray-500">
                  {match.back1Size || " "}
                </p>
              </div>
              <div className="p-1 bg-blue-400 border border-gray-300">{match.back11 || "-"}</div>
              <div className="p-1 bg-green-300 border border-gray-300">{match.back1 || "-"}</div>
              <div className="hidden md:block p-1 bg-green-300 border border-gray-300">{match.lay1 || "-"}</div>
              <div className="hidden md:block p-1 bg-red-100 border border-gray-300">{match.lay11 || "-"}</div>
              <div className="hidden md:block p-1 bg-red-100 border border-gray-300">
                {match.lay12 || "-"}
                <p className="text-[8px] md:text-[10px] font-bold text-gray-700">{match.lay12Size || " "}</p>
              </div>
            </div>
          )}
        </div>
      ))
    );

  return (
    <>
      {/* In Play Section */}
      <div className="shadow-lg bg-slate-50 rounded-sm w-full lg:max-w-[590px] lg:ml-1 mr-0 mb-5 overflow-hidden">
        <div className="bg-emerald-600 flex items-center gap-2 text-lg p-2 text-white font-bold">
          <FaPlayCircle className="text-white text-xl" /> In Play
        </div>

        {/* Category Bar */}
        <div className="text-black font-semibold px-2 py-2 flex justify-between items-center border-b border-gray-300 text-lg">
          <div className="flex items-center w-1/2 gap-2">
            <CiBasketball className="text-red-600" />
            <span>Cricket</span>
          </div>
          <div className="flex w-32 md:w-60 lg:w-72 justify-between mr-5 text-[12px] md:text-base">
            <p className="ml-2 md:ml-3">1</p>
            <p>X</p>
            <p>2</p>
          </div>
        </div>

        {renderMatches(inPlayMatches)}
      </div>

      {/* Upcoming Events Section */}
      <div className="shadow-lg bg-slate-50 rounded-sm w-full lg:max-w-[590px] lg:ml-1 mr-0 overflow-hidden">
        <div className="bg-emerald-600 flex items-center gap-2 text-lg p-2 text-white font-bold">
          <FaCircleNotch className="text-white text-xl" /> Upcoming Events
        </div>

        {/* Category Bar */}
        <div className="text-black font-semibold px-2 py-2 flex justify-between items-center border-b border-gray-300 text-lg">
          <div className="flex items-center w-1/2 gap-2">
            <CiBasketball className="text-red-600" />
            <span>Cricket</span>
          </div>
          <div className="flex w-32 md:w-60 lg:w-72 justify-between mr-5 text-[12px] md:text-base">
            <p className="ml-2 md:ml-3">1</p>
            <p>X</p>
            <p>2</p>
          </div>
        </div>

        {renderMatches(upcomingMatches)}
      </div>
    </>
  );
};

export default Ckricket;
