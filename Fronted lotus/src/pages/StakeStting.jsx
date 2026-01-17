import React from "react";

const stakes = [100, 200, 500, 800, 3000, 1200, 100000, 4000, 4000, 20000];

const StakeSetting = () => {
  return (
    <div className="rounded-md w-full lg:max-w-[900px] p-2 lg:ml-1 mr-0 mb-5">
      <div className="w-[600px] bg-slate-50 shadow-lg px-4 rounded-md">
        <div className="font-semibold pl-3 mb-2">Stakes</div>
        <div className="flex flex-wrap font-semibold gap-2 pl-8 px-2">
          {stakes.map((stake, index) => (
            <div
              key={index}
              className="py-2 px-8 border bg-gray-100 border-black w-40 text-center cursor-pointer hover:bg-gray-200 rounded"
            >
              {stake}
            </div>
          ))}
        </div>
        <div className="pb-3">
                    <div className="bg-emerald-900 text-center w-[40%] p-3 text-white mx-auto py-2 mt-4 rounded cursor-pointer hover:bg-emerald-700">
          EDIT
        </div>
        </div>

      </div>
    </div>
  );
};

export default StakeSetting;
