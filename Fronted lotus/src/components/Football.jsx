import React, { useEffect, useState } from "react";
import { RiFootballLine } from "react-icons/ri";

const API_URL = "https://api.parker999.live/GetInPlaySportEvents";

const Football = () => {
  const [inPlayMatches, setInPlayMatches] = useState([]);
  const [upcomingMatches, setUpcomingMatches] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        const res = await fetch(API_URL);
        const json = await res.json();
        if (json.message === "In Play Data fetched Successfully") {
          const inPlay = (json.data.sportsEventModelInPlay || []).filter(
            (m) => m.eid === "1"
          );
          const today = (json.data.sportsEventModelToday || []).filter(
            (m) => m.eid === "1"
          );

          setInPlayMatches(inPlay);
          setUpcomingMatches(today);
        }
      } catch (err) {
        console.error("Fetch error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchMatches();
  }, []);

  const formatTime = (iso) => {
    const d = new Date(iso);
    const now = new Date();
    const isToday = d.toDateString() === now.toDateString();
    return isToday
      ? `Today ${d.getHours().toString().padStart(2, "0")}:${d
          .getMinutes()
          .toString()
          .padStart(2, "0")}`
      : d.toLocaleDateString();
  };

  if (loading) return <div>Loading matches...</div>;

  const renderMatchRow = (m) => {
    const suspended = m.Status !== 1;
    return (
      <div
        key={m.SrNo}
        className="grid grid-cols-6 w-full border-b border-gray-200 text-sm"
      >
        <div className="col-span-1 border-r border-gray-200 p-2 text-green-600">
          {formatTime(m.eventDate)}
        </div>

        <div className="col-span-2 border-r border-gray-200 text-sm font-semibold flex items-center p-2">
          {m.eventName}
        </div>

        {suspended ? (
          <div className="col-span-3 flex items-center justify-center bg-gradient-to-r from-green-200 to-pink-100 font-semibold text-blue-800 p-2">
            SUSPENDED
          </div>
        ) : (
          <div className="col-span-3 grid grid-cols-6 text-center font-bold">
            <div className="p-1 bg-blue-400 border border-gray-300">
              {m.back1 ?? "-"}
              <p className="text-[10px] font-bold text-gray-500">
                {m.back11 ?? "-"}
              </p>
            </div>
            <div className="p-1 bg-blue-400 border border-gray-300">
              {m.lay1 ?? "-"}
            </div>
            <div className="p-1 bg-green-300 border border-gray-300">
              {m.back12 ?? "-"}
            </div>
            <div className="p-1 bg-green-300 border border-gray-300">
              {m.lay12 ?? "-"}
            </div>
            <div className="p-1 bg-red-100 border border-gray-300">
              {m.back12 ?? "-"}
            </div>
            <div className="p-1 bg-red-100 border border-gray-300">
              {m.lay12 ?? "-"}
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div>
      {/* In Play Section */}
      <div className="text-black font-bold px-4 py-2 flex justify-between items-center border-b border-gray-300 text-lg">
        <div className="flex items-center w-1/2 gap-2">
          <RiFootballLine />
          <span>Football – In Play</span>
        </div>
        <div className="flex w-1/2 justify-between">
          <p>1</p>
          <p>X</p>
          <p>2</p>
        </div>
      </div>
      {inPlayMatches.length ? (
        inPlayMatches.map(renderMatchRow)
      ) : (
        <div className="p-4 text-center">No In‑Play matches.</div>
      )}

      {/* Upcoming Section */}
      <div className="text-black font-bold px-4 py-2 flex justify-between items-center border-b border-gray-300 text-lg mt-6">
        <div className="flex items-center w-1/2 gap-2">
          <RiFootballLine />
          <span>Football – Upcoming</span>
        </div>
        <div className="flex w-1/2 justify-between">
          <p>1</p>
          <p>X</p>
          <p>2</p>
        </div>
      </div>
      {upcomingMatches.length ? (
        upcomingMatches.map(renderMatchRow)
      ) : (
        <div className="p-4 text-center">No Upcoming matches.</div>
      )}
    </div>
  );
};

export default Football;
