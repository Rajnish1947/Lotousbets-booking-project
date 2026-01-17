
import React from "react";
import { IoClose } from "react-icons/io5";
import { toast } from "react-toastify";

const PopRefferel = ({ setShowRefer }) => {
  const referLink = "https://lotusbets.com/ref/2";

  const handleCopy = () => {
    navigator.clipboard.writeText(referLink);
    toast.success("Referral link copied successfully!  ");
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 z-[999] flex items-center justify-center">
      <div className="bg-white p-2 rounded-lg w-[450px] md:max-w-[90%] lg:max-w-full shadow-xl relative animate-zoomIn">
        <button style={{ margin: "-20px -25px 37px 8px" }} onClick={() => setShowRefer(false)} className=" z-12 bg-black rounded-full text-white right-3 absolute  text-xl ">
          <IoClose />
        </button>

        <div className="flex justify-center w-full py-2 bg-emerald-600 mb-4 rounded">
          <img src="https://api7.live/sitethemes/lotusbets.com/logo.png" alt="Logo" className="h-11" />
        </div>

        <h2 className="text-xl font-semibold  mb-2">Refer and Earn</h2>

        <p className=" text-gray-800 text-[12px] mb-2 px-1">
          Be our brand hero, refer your friend using your referral code.
        </p>

        <div className="flex items-center justify-between bg-gray-200 border border-gray-300 rounded p-2 mb-1">
          <span className="text-xs overflow-hidden text-ellipsis">{referLink}</span>
          <button onClick={handleCopy} className="ml-2 bg-emerald-600 text-white px-2 py-2 text-sm rounded">
            Copy
          </button>
        </div>

      
      </div>
    </div>
  );
};

export default PopRefferel;
