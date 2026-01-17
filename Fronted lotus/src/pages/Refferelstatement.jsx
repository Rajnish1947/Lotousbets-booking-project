
import React, { useState, useRef } from "react";
import { FiCalendar } from "react-icons/fi";

const Refferelstatement = () => {
  const today = new Date().toISOString().split('T')[0];
  const [fromDate, setFromDate] = useState(today);
  const [toDate, setToDate] = useState(today);
  const [showSummary, setShowSummary] = useState(false);

  const fromDateRef = useRef(null);
  const toDateRef = useRef(null);

  const handleClearFromDate = () => {
    setFromDate("");
    setTimeout(() => {
      fromDateRef.current.showPicker();
    }, 0);
  };

  const handleClearToDate = () => {
    setToDate("");
    setTimeout(() => {
      toDateRef.current.showPicker();
    }, 0);
  };

  return (
    <div className="rounded-md w-full lg:max-w-[900px] p-4 lg:ml-1 mr-0 mb-5 overflow-hidden">
      <style>
        {`
          input::-webkit-calendar-picker-indicator {
            display: none;
          }
        `}
      </style>

      <div className="w-[600px]">
        <div className="flex p-2 gap-4">
          {/* From Date */}
          <div className="m-1">
            <div>From Date</div>
            <div className="flex bg-white items-center border px-2 rounded relative">
              <input
                ref={fromDateRef}
                type="date"
                value={fromDate}
                onChange={(e) => setFromDate(e.target.value)}
                className="outline-none py-1 appearance-none" // Hide browser calendar icon
              />
              {fromDate === "" ? (
                <FiCalendar
                  className="ml-2 cursor-pointer text-gray-500 text-lg"
                  onClick={() => fromDateRef.current.showPicker()}
                />
              ) : (
                <div
                  className="ml-2 cursor-pointer text-gray-500 font-bold text-sm hover:text-red-500"
                  onClick={handleClearFromDate}
                >
                  ✕
                </div>
              )}
            </div>
          </div>

          {/* To Date */}
          <div className="m-1">
            <div>To Date</div>
            <div className="flex bg-white items-center border px-2 rounded relative">
              <input
                ref={toDateRef}
                type="date"
                value={toDate}
                onChange={(e) => setToDate(e.target.value)}
                className="outline-none py-1 appearance-none" // Hide browser calendar icon
              />
              {toDate === "" ? (
                <FiCalendar
                  className="ml-2 cursor-pointer text-gray-500 text-lg"
                  onClick={() => toDateRef.current.showPicker()}
                />
              ) : (
                <div
                  className="ml-2 cursor-pointer text-gray-500 font-bold text-sm hover:text-red-500"
                  onClick={handleClearToDate}
                >
                  ✕
                </div>
              )}
            </div>
          </div>

          {/* Submit Button */}
          <button
            onClick={() => setShowSummary(true)}
            className="bg-emerald-700 px-4 py-2 text-white rounded-md self-end"
          >
            Submit
          </button>
        </div>

        {/* Summary Section */}
        {showSummary && (
          <div className="flex justify-between bg-white py-2 p-2 text-center text-sm mt-4">
            <div>
              <div>Total Clients</div>
              <div>0</div>
            </div>
            <div>
              <div>Total Deposit</div>
              <div>0</div>
            </div>
            <div>
              <div>Total Withdraw</div>
              <div>0</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Refferelstatement;
