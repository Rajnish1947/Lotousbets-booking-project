
import React from "react";
import { FaFire } from "react-icons/fa";

const Casino = () => {
  return (
    <div className="bg-slate-50 mt-2 mb-5 px-2 py-1 rounded-md">
      <div className="px-4 m-1 font-bold text-xl flex items-center py-1">
        <FaFire className="mr-2 text-red-600" />
        Casino Providers
      </div>
      <hr />

      <div className="grid grid-cols-2 sm:grid-cols-2 px-4 py-3 gap-4">
        <div className="shadow-md px-1 py-1 flex justify-center items-center bg-white rounded">
          <img
            className="w-20 h-20 transition-transform duration-300 transform hover:scale-110"
            src="f1.svg"
            alt="f1"
          />
        </div>
        <div className="shadow-md px-1 py-1 flex justify-center items-center bg-white rounded">
          <img
            className="w-20 h-20 transition-transform duration-300 transform hover:scale-110"
            src="f4.svg"
            alt="f4"
          />
        </div>
        <div className="shadow-md px-1 py-1 flex justify-center items-center bg-white rounded">
          <img
            className="w-20 h-10 transition-transform duration-300 transform hover:scale-110"
            src="f5.webp"
            alt="f5"
          />
        </div>
        <div className="shadow-md px-1 py-1 flex justify-center items-center bg-white rounded">
          <img
            className="w-20 h-20 transition-transform duration-300 transform hover:scale-110"
            src="f2.svg"
            alt="f2"
          />
        </div>
        <div className="shadow-md px-1 py-1 flex justify-center items-center bg-white rounded">
          <img
            className="w-20 h-20 transition-transform duration-300 transform hover:scale-110"
            src="f3.svg"
            alt="f3"
          />
        </div>
        <div className="w-20 h-20 bg-white flex items-center justify-center rounded shadow-lg" />
      </div>
    </div>
  );
};

export default Casino;
