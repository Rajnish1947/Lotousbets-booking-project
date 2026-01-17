

import React from "react";
import { IoPlayCircleOutline } from "react-icons/io5";
import { IoLogoYoutube } from "react-icons/io5";
import { FaChevronUp, FaChevronDown } from "react-icons/fa";

const GamesHeader = ({ sportName, matchOdds, activeTab, setActiveTab, isOpen, setIsOpen }) => {
  return (
    <div>
      <div className="px-2 flex font-semibold py-6 text-emerald-500 text-xl">
        <div className="mt-1 mr-2">
      <IoPlayCircleOutline className="text-xl"/>
        </div>
        <div>
          {matchOdds.runners && matchOdds.runners.length >= 2
            ? `${matchOdds.runners[0].runnerName} vs ${matchOdds.runners[1].runnerName}`
            : "Match Details"}
        </div>
      </div>
      {/* Tabs */}
      <div className="bg-white mb-4">
        <div className="border border-gray-300 bg-white text-sm grid grid-cols-3 lg:hidden text-emerald-400 text-center w-full rounded-md">
          {["LIVE", "VIDEO", "OPEN BETS"].map((tab) => (
            <div
              key={tab}
              className={`flex justify-center items-center py-2 font-semibold cursor-pointer ${
                activeTab === tab
                  ? "border-b-4 border-emerald-500 text-emerald-700 bg-white rounded-t-md"
                  : "border-b-4 border-transparent hover:text-emerald-600"
              }`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </div>
          ))}
        </div>

        {/* LIVE Tab */}
        {activeTab === "LIVE" && (
          <div className="pt-4 bg-gray-200">
            {/* <div className="py-2 mt-3 bg-white justify-center items-center text-sm flex">
              <div className="p-1">Video</div>
              <div>
                <IoLogoYoutube className="text-red-700" />
              </div>
            </div> */}
          </div>
        )}

        {/* VIDEO Tab */}
        {activeTab === "VIDEO" && (
          <div className="p-8 lg:hidden">
            <p>
              Sorry for the inconvenience. Please log in to watch streaming.
            </p>
          </div>
        )}

        {/* OPEN BETS Tab */}
        {activeTab === "OPEN BETS  " && (
          <div className="rounded-md mt-3 w-full lg:hidden lg:max-w-[900px] lg:ml-1 mr-0 mb-5 overflow-hidden">
            <div
              className="rounded-md bg-emerald-800 py-2 text-white font-normal px-4 flex justify-between cursor-pointer"
              onClick={() => setIsOpen(!isOpen)}
            >
              <div>Open Bets</div>
              {isOpen ? <FaChevronUp /> : <FaChevronDown />}
            </div>

            {isOpen && (
              <div className="bg-white shadow-xl text-black py-2 pl-4 font-semibold text-sm rounded-md mt-2">
                You have no Open Bets.
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default GamesHeader;
