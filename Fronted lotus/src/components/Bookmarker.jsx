import React from "react";
import { useAuth } from "../context/Authcontext";
import { useLocation } from "react-router-dom";
const Bookmarker = ({ data }) => {
  const { setBetingDetial } = useAuth();
    const location = useLocation();
    const { state } = location;
  if (!data || !Array.isArray(data) || data.length === 0) return null;

  const displayValue = (val) => (val && val !== 0 ? val : "-");


  console.log("bookmark ", data);
  return (
    <div>
      <div className="flex justify-between mt-[1px] pl-2">
        <div className="bg-secondary py-2 flex justify-between items-center">
          <span className="text-textColor text-[0.8rem] md:text-[0.9rem]">
            Bookmaker
          </span>
          <span className="text-[10px] ml-3 text-gray-800"> Max: 50k</span>
        </div>
      </div>

      <div className="text-[#333]">
        {data.map((item, index) => {
          const hasAnyValue =
            item.b1 || item.b2 || item.b3 || item.l1 || item.l2 || item.l3;

          // Skip row if no values and not suspended
          if (!hasAnyValue && item.s !== "SUSPENDED") return null;

          return (
            <div
              key={index}
              className="flex justify-between mt-[1px] pl-2 h-11 bg-white relative"
            >
              {/* Team Name */}
              <div
                className="text-[13px] sm:text-[24px] md:text-[14px]  mb-2 font-extrabold"
                style={{ width: "calc(28%)", overflow: "hidden" }}
              >
                <span
                  style={{
                    maxWidth: "100%",
                    width: "100%",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    display: "inline-block",
                    lineHeight: "normal",
                  }}
                >
                  {item.nat}
                </span>
              </div>

              {/* Odds Section */}
              {hasAnyValue ? (
                <div className="relative flex gap-1">
                  {/* b2 */}
                  <div className="flex flex-col justify-center bg-gradient-to-r from-blue-300 to-blue-400 items-center w-[39px] sm:w-[120px] md:w-[50px] cursor-pointer">
                    <div className="leading-[15px] text-[15px] font-bold pt-2">
                      {displayValue(item.b2)}
                    </div>
                    <div className="text-[11px] md:text-[12px] font-light">
                      {displayValue(item.bs2)}
                    </div>
                  </div>

                  {/* l2 */}
                  <div className="flex flex-col justify-center bg-gradient-to-r from-blue-300 to-blue-400 items-center w-[39px] sm:w-[120px] md:w-[50px] cursor-pointer">
                    <div className="leading-[15px] text-[15px] font-bold pt-2">
                      {displayValue(item.l2)}
                    </div>
                    <div className="text-[11px] md:text-[12px] font-light">
                      {displayValue(item.ls2)}
                    </div>
                  </div>

                  {/* b1 */}
                  <div
                    onClick={() =>
                      setBetingDetial({
                        oddprice: item.b1,
                        type: "back",
                        market: "Bookmaker",
                        matchData: state,
                        Selection: item.nat,
                        SelectionId: item.sid,
                        runner: { ...item },
                      })
                    }
                    className="flex flex-col justify-center items-center w-[39px] bg-gradient-to-r from-blue-300 to-blue-400 sm:w-[120px] md:w-[50px] cursor-pointer"
                  >
                    <div className="leading-[15px] text-[15px] font-bold pt-2">
                      {displayValue(item.b1)}
                    </div>
                    <div className="text-[8px] md:text-[10px] font-light">
                      {displayValue(item.bs1)}
                    </div>
                  </div>

                  {/* l1 */}
                  <div
                    onClick={() =>
                      setBetingDetial({
                        oddprice: item.b1,
                        type: "lay",
                        market: "Bookmaker",
                        matchData: state,
                        Selection: item.nat,
                        SelectionId: item.sid,
                        runner: { ...item },
                      })
                    }
                    className="flex flex-col justify-center items-center bg-gradient-to-r from-pink-300 to-pink-400 w-[39px] sm:w-[120px] md:w-[50px] cursor-pointer"
                  >
                    <div className="leading-[15px] text-[15px] font-bold pt-2">
                      {displayValue(item.l1)}
                    </div>
                    <div className="text-[8px] md:text-[10px] font-light">
                      {displayValue(item.ls1)}
                    </div>
                  </div>

                  {/* b3 */}
                  <div className="flex flex-col justify-center items-center bg-gradient-to-r from-pink-300 to-pink-400 w-[39px] sm:w-[120px] md:w-[50px] cursor-pointer">
                    <div className="leading-[15px] text-[15px] font-bold pt-2">
                      {displayValue(item.b3)}
                    </div>
                    <div className="text-[11px] md:text-[12px] font-light">
                      {displayValue(item.bs3)}
                    </div>
                  </div>

                  {/* l3 */}
                  <div className="flex flex-col justify-center items-center w-[39px] bg-gradient-to-r from-pink-300 to-pink-400 sm:w-[120px] md:w-[50px] cursor-pointer">
                    <div className="leading-[15px] text-[15px] font-bold pt-2">
                      {displayValue(item.l3)}
                    </div>
                    <div className="text-[11px] md:text-[12px] font-light">
                      {displayValue(item.ls3)}
                    </div>
                  </div>

                 
                  {item.s === "SUSPENDED" && (
                    <div className="absolute top-0 bottom-0 left-0 right-0 text-red-500 bg-[#e6bfbfd4] flex justify-center items-center">
                      SUSPENDED
                    </div>
                  )}
                </div>
              ) : (
           
                <div className="flex-1 flex justify-center items-center bg-gradient-to-r from-blue-300 to-pink-300 text-blue-500 font-bold">
                  SUSPENDED
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Bookmarker;
