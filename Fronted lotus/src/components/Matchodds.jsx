
import React from "react";
import { useAuth } from "../context/Authcontext";
import { useLocation } from "react-router-dom";

const Matchodds = ({ data }) => {
  const { setBetingDetial } = useAuth();
  const location = useLocation();
  const { state } = location;
  if (!data) return null;

  return (
    <div>
      <div className="flex justify-between mt-[1px] pl-2">
        <div className="bg-secondary py-2 flex justify-between items-center">
          <span className="text-textColor text-[0.8rem] md:text-[0.9rem]">Match Odds</span>
          <span className="text-[10px] ml-3 text-gray-800">Max: 15k</span>
        </div>

        <div className="flex">
          <div className="w-[45px] sm:w-[120px] md:w-[70px] text-center"><div></div></div>
          <div className="w-[45px] sm:w-[120px] md:w-[70px] ms-[1px] text-center"><div></div></div>
          <div className="flex justify-center items-center w-[45px] sm:w-[120px] md:w-[70px] ms-[1px]"><div>Back</div></div>
          <div className="flex justify-center items-center w-[45px] sm:w-[120px] md:w-[70px] ms-[1px]"><div>Lay</div></div>
          <div className="w-[45px] sm:w-[120px] md:w-[70px] ms-[1px] text-center"><div></div></div>
          <div className="w-[45px] sm:w-[120px] md:w-[70px] ms-[1px] text-center"><div></div></div>
        </div>
      </div>

      {/* Dynamic Odds Rows */}
      <div className="text-[#333] py-2">
        {data?.runners?.map((runner, index) => (
          <div
            key={index}
            className="flex justify-between bg-[#f2f2f2] mt-[1px] pl-2 h-11"
          >
            <div
              className="text-[13px] sm:text-[24px] md:text-[14px] font-extrabold"
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
                {runner.runnerName}
              </span>
            </div>

            <div className="relative flex">
              {runner.ex.availableToBack.slice(0, 3).map((odd, idx) => (
                <div
                  key={idx}
                  onClick={
                    idx === 2
                      ? () => {
                          setBetingDetial({
                            oddprice: odd.price,
                            type: "back",
                            market: "MatchOdds",
                            matchData: state,
                            Selection: runner.runnerName,
                            SelectionId: runner.selectionId,
                            runner: { ...runner },
                          });
                        }
                      : undefined
                  }
                  className={`flex flex-col justify-center items-center w-[45px] m-0.5 sm:w-[120px] md:w-[70px] ms-[1px] ${
                    idx === 2 ? "cursor-pointer" : "cursor-default"
                  }`}
                  style={{ backgroundColor: "#b8dcf5" }}
                >
                  <div className="leading-[15px] text-[15px] font-bold pt-2">{odd.price}</div>
                  <div className="text-[11px] md:text-[12px] font-light">{odd.size}</div>
                </div>
              ))}

              {runner.ex.availableToLay.slice(0, 3).map((odd, idx) => (
                <div
                  key={idx}
                  onClick={
                    idx === 0
                      ? () => {
                          setBetingDetial({
                            oddprice: odd.price,
                            type: "lay",
                            market: "MatchOdds",
                            matchData: state,
                            Selection: runner.runnerName,
                            SelectionId: runner.selectionId,
                            runner: { ...runner },
                          });
                        }
                      : undefined
                  }
                  className={`flex flex-col justify-center items-center w-[45px] m-0.5 sm:w-[120px] md:w-[70px] ms-[1px] ${
                    idx === 2 ? "cursor-pointer" : "cursor-default"
                  }`}
                  style={{ backgroundColor: "#fad0d9" }}
                >
                  <div className="leading-[15px] text-[15px] font-bold pt-2">{odd.price}</div>
                  <div className="text-[11px] md:text-[12px] font-light">{odd.size}</div>
                </div>
              ))}

              {data.status === "SUSPENDED" && (
                <div className="absolute top-0 bottom-0 left-0 right-0 text-red-500 bg-[#000000d4] flex justify-center items-center">
                  SUSPENDED
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Matchodds;
