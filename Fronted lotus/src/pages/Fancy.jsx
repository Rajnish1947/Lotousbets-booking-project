import React from "react";
import { useAuth } from "../context/Authcontext";
import { useLocation } from "react-router-dom";
const Fancy = ({ data }) => {
  const { batingdetails, setBetingDetial } = useAuth();
  const location = useLocation();
  const { state } = location;
  if (!data || data.length === 0) return null;
  console.log("fancy", data);

  return (
    <div className="p-2">
      {/* Header */}
      <div className="flex justify-between items-center bg-secondary py-2 px-3 rounded-t">
        <span className="text-textColor text-lg font-semibold">
          Fancy Market
        </span>
        <div className="gap-1 grid grid-cols-4 text-xs pr-4 md:pr-[7.75rem] font-semibold">
          <div className="text-left text-[15px]">No</div>
          <div className="text-center"></div>
          <div className="text-right  text-[15px]">Yes</div>
          <div className="text-center"></div>
        </div>
      </div>

      {/* Dynamic Fancy Rows */}
      {data.map((item, index) => (
        <div
          key={index}
          className="flex justify-between items-center bg-white text-black font-semibold mt-2 p-1 rounded relative shadow"
        >
          {/* Market Name */}
          <div className="text-[10px] p-1 font-semibold sm:text-[16px] md:text-[14px]  w-full break-words">
            {item.RunnerName}
          </div>

          {/* Odds Section */}
          <div className="flex gap-1">
            {/* Lay (No) with Gradient */}
            <div
              onClick={() => {
                setBetingDetial({
                  oddprice: item.LayPrice1,
                  oddprice1:item.LaySize1,
                  type: "lay",
                  market: "fancy",
                  matchData: state, // Pass event state like MatchOdds
                  Selection: item.RunnerName,
                  SelectionId: item.SelectionId, // If selectionId exists
                  runner: { ...item },
                });
              }}
              className="flex flex-col justify-center items-center w-[4rem] md:w-[7rem]  bg-gradient-to-r from-pink-200 to-pink-100 cursor-pointer hover:from-pink-300 hover:to-pink-200 rounded"
            >
              <div className="leading-[15px] font-bold pt-2">
                {item.LayPrice1}
              </div>
              <div className="text-[11px] font-light pb-1">{item.LaySize1}</div>
            </div>

            {/* Back (Yes) with Gradient */}
            <div
              onClick={() => {
                setBetingDetial({
                  oddprice: item.BackPrice1,
                   oddprice1:item.BackSize1,
                  type: "back",
                  market: "fancy",
                  matchData: state, // Pass event state like MatchOdds
                  Selection: item.RunnerName,
                  SelectionId: item.SelectionId, // If selectionId exists
                  runner: { ...item },
                });
              }}
              className="flex flex-col justify-center items-center w-[4rem] md:w-[7rem] bg-gradient-to-r from-cyan-200 to-cyan-100 cursor-pointer hover:from-cyan-300 hover:to-cyan-200 rounded"
            >
              <div className="leading-[15px] font-bold pt-2">
                {item.BackPrice1}
              </div>
              <div className="text-[11px] font-light pb-1">
                {item.BackSize1}
              </div>
            </div>

            {/* Min & Max */}
            <div className="flex flex-col justify-center items-center w-[3rem] md:w-24 sm text-[10px] cursor-pointer">
              <div className="leading-[15px] pt-2">Max Bet: 100k</div>
              <div className="text-[11px]">Min: 100</div>
            </div>
          </div>

          {/* Suspended Overlay - Display Only When Suspended */}
          {item.GameStatus === "SUSPENDED" && (
            <div className="absolute top-0 bottom-0 left-0 right-0 bg-gradient-to-r from-black to-gray-800 opacity-80 text-red-500 flex justify-center items-center rounded">
              SUSPENDED
            </div>
          )}
        </div>
      ))}

      {/* Example Static Row */}
    </div>
  );
};

export default Fancy;
