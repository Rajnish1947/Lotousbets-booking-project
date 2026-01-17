

import React, { useEffect, useState } from "react";
import { FaPlayCircle } from "react-icons/fa";
import { CiBasketball } from "react-icons/ci";
import { IoIosFootball, IoIosTennisball } from "react-icons/io";
import { useNavigate } from "react-router-dom";

const API_URL = "https://api.parker999.live/GetInPlaySportEvents";

const AllGames = () => {
  const navigate = useNavigate();
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        const res = await fetch(API_URL);
        const json = await res.json();
        if (json.message === "In Play Data fetched Successfully") {
          const inPlay = json.data.sportsEventModelInPlay || [];
          setMatches(inPlay);
        }
      } catch (error) {
        console.error("Failed to fetch matches", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMatches();
  }, []);

  const filterBySport = (eid) => matches.filter((m) => m.eid === eid.toString());

  const formatDateTime = (eventDate) => {
    const event = new Date(eventDate);
    const now = new Date();
    const isToday = event.getDate() === now.getDate() && event.getMonth() === now.getMonth() && event.getFullYear() === now.getFullYear();
    const hours = event.getHours().toString().padStart(2, "0");
    const minutes = event.getMinutes().toString().padStart(2, "0");
    return isToday ? `Today ${hours}:${minutes}` : event.toLocaleDateString();
  };

  const renderMatches = (matchList, sportType) => matchList.map((match) => {
    const isSuspended = match.Status !== 1;

    return (
      <div
        key={match.SrNo}
 onClick={() => navigate(`/game-details/${match.eid}/${match.id}/${match.marketId}`, { state: match })}

        className="grid grid-cols-5 md:grid-cols-7 w-full border border-gray-200 text-[10px] sm:text-sm md:text-[14px] cursor-pointer hover:bg-gray-100 transition"
      >
        <div className="col-span-1 border-r border-gray-200 px-2 py-1 text-green-600">
          {formatDateTime(match.eventDate)}
        </div>
        <div className="col-span-2 border-r border-gray-200 font-semibold flex items-center p-2">
          {match.eventName}
        </div>
        {isSuspended ? (
          <div className="col-span-2 md:col-span-4 flex items-center justify-center bg-gradient-to-r from-green-200 to-pink-100 font-semibold text-blue-800 p-2">
            SUSPENDED
          </div>
        ) : (
          <div className="col-span-2 md:col-span-4 grid grid-cols-3 md:grid-cols-6 text-center font-bold m-1 gap-1">
            <div className="p-1 bg-blue-400 border border-gray-300">{match.back11 || "-"}</div>
            <div className="p-1 bg-blue-400 border border-gray-300">{match.lay11 || "-"}</div>
            <div className={`p-1 border border-gray-300 ${sportType === 'tennis' ? 'bg-green-300' : 'bg-red-100'}`}>{match.back1 || "-"}</div>
            <div className="hidden md:block p-1 bg-red-100 border border-gray-300">{match.lay1 || "-"}</div>
            <div className="hidden md:block p-1 bg-red-100 border border-gray-300">{match.back12 || "-"}</div>
            <div className="hidden md:block p-1 bg-red-100 border border-gray-300">{match.lay12 || "-"}</div>
          </div>
        )}
      </div>
    );
  });

  const GameSection = ({ title, icon, eid, type }) => {
    const filteredMatches = filterBySport(eid);

    if (!filteredMatches.length) return null;

    return (
      <div className="bg-slate-50 rounded-sm w-full lg:max-w-[590px] lg:ml-1 mr-0 mb-5 overflow-hidden">
        <div className="text-black font-semibold px-2 py-2 flex justify-between items-center border-b border-gray-300 text-lg">
          <div className="flex items-center w-1/2 gap-2">
            {icon}
            <span>{title}</span>
          </div>
          <div className="flex w-32 md:w-60 lg:w-72 justify-between mr-5 text-[12px] md:text-base">
            <p className="ml-2 md:ml-3">1</p>
            <p>X</p>
            <p>2</p>
          </div>
        </div>

        {renderMatches(filteredMatches, type)}
      </div>
    );
  };

  if (loading) return <div>Loading matches...</div>;

  return (
    <div className="bg-slate-50 rounded-sm w-full lg:max-w-[600px] lg:ml-1 mr-0 mb-5 overflow-hidden">
      <div className="bg-emerald-600 flex items-center gap-2 text-lg p-2 text-white font-bold">
        <FaPlayCircle className="text-white text-xl" /> In Play
      </div>

      <GameSection title="Cricket" icon={<CiBasketball className="text-red-600" />} eid={4} type="cricket" />
      <GameSection title="Football" icon={<IoIosFootball className="text-black" />} eid={1} type="football" />
      <GameSection title="Tennis" icon={<IoIosTennisball className="text-green-600" />} eid={2} type="tennis" />
    </div>
  );
};

export default AllGames;
