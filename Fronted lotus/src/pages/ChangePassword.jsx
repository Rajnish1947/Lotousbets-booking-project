
import React from "react";
import { FaLock } from "react-icons/fa";
import { AiOutlineEyeInvisible } from "react-icons/ai";

const ChangePassword = () => {
  return (
    <div className="rounded-lg shadow-md w-full lg:max-w-[900x]p ml-2 lg:ml-1 mr-0 mb-5 overflow-hidden">
      <div className="lg:w-[750px] w-[700px]">
        <div className="bg-slate-50 p-4 space-y-4">
          
          {/* Old Password */}
          <div className="w-full">
            <label className="block mb-1 font-medium">Old Password</label>
            <div className="bg-gray-200 flex items-center justify-between p-2 rounded-md">
              <div className="flex items-center w-full">
                <FaLock className="text-emerald-600 mr-2" />
                <input
                  type="password"
                  placeholder="Enter old password"
                  className="bg-gray-200 flex-1 outline-none placeholder-gray-600"
                />
              </div>
              <AiOutlineEyeInvisible className="text-emerald-600 cursor-pointer" />
            </div>
          </div>

          {/* New Password */}
          <div>
            <label className="block mb-1 font-medium">New Password</label>
            <div className="bg-gray-200 flex items-center w-full justify-between p-2 rounded-md">
              <div className="flex items-center w-full">
                <FaLock className="text-emerald-600 mr-2" />
                <input
                  type="password"
                  placeholder="Enter new password"
                  className="bg-gray-200 flex-1 outline-none placeholder-gray-600"
                />
              </div>
              <AiOutlineEyeInvisible className="text-emerald-600 cursor-pointer" />
            </div>
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block mb-1 font-medium">Confirm Password</label>
            <div className="bg-gray-200 flex items-center justify-between p-2 rounded-md">
              <div className="flex items-center w-full">
                <FaLock className="text-emerald-600 mr-2" />
                <input
                  type="password"
                  placeholder="Confirm new password"
                  className="bg-gray-200 flex-1 outline-none placeholder-gray-600"
                />
              </div>
              <AiOutlineEyeInvisible className="text-emerald-600 cursor-pointer" />
            </div>
          </div>

          {/* Buttons */}
          <div className="flex justify-center items-center mt-4">
            <div className="py-1.5 px-6 mr-5 w-40 text-center font-semibold rounded-md border border-emerald-600 text-emerald-500 cursor-pointer">
              Cancel
            </div>
            <div className="py-1.5 px-6 mr-5 w-40 text-center font-semibold rounded-md bg-emerald-600 text-white cursor-pointer">
              Save
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;
