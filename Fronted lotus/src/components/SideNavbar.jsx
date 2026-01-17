import { Link } from "react-router-dom";
import React from "react";
import { CiMobile2, CiCircleCheck, CiSettings } from "react-icons/ci";
import { IoHomeOutline, IoLogOut } from "react-icons/io5";
import { FaArrowRightArrowLeft } from "react-icons/fa6";
import { useAuth } from "../context/Authcontext";
import {
  MdCable,
  MdOutlineEventNote,
  MdOutlineLock,
  MdOutlinePolicy,
} from "react-icons/md";
import { AiOutlineClose, AiOutlineGift } from "react-icons/ai";
import { IoBagAddSharp, IoBagRemoveSharp } from "react-icons/io5";

const SideNavbar = ({
  isSidebarOpen,
  setIsSidebarOpen,
  setShowRefer,
}) => {
  
  const { user, logout } = useAuth();

  return (
    <>
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-40"
          onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}

      <div
        className={`fixed grid grid-cols-1 top-0 right-0 h-full w-96 bg-white shadow-lg z-50 transform ${
          isSidebarOpen ? "translate-x-0" : "translate-x-full"
        } transition-transform duration-300 ease-in-out overflow-y-auto`}
      >
        <div className="flex justify-between items-center border w-full py-2 px-4">
          <div className="flex items-center gap-2">
            <CiMobile2 className="text-2xl font-bold text-red-600" />
            <span className="font-semibold text-lg">Demo</span>
          </div>
          <AiOutlineClose
            className="text-2xl cursor-pointer text-black"
            onClick={() => setIsSidebarOpen(false)}
          />
        </div>

        <div className="flex items-center border gap-2 py-2 px-4">
          <CiMobile2 className="text-xl text-red-600" />
          <span className="font-semibold text-sm">User Id:</span>
        </div>

        <div className="flex items-center gap-2 py-2 px-4">
          <IoHomeOutline className="text-xl text-red-600" />
          <span className="font-semibold text-sm">Balance Information</span>
        </div>

        <div className="p-2">
          <div className="bg-gray-200 mb-0.5 rounded-md text-[10px] text-green-500 py-2 pl-4">
            <p className="text-gray-600">BALANCE</p>
            <p className="font-semibold">₹ 0</p>
          </div>
          <div className="bg-gray-200 rounded-md mb-1 text-[10px] text-green-500 py-2 pl-4">
            <p className="text-gray-600">Net Exposure</p>
            <p className="font-semibold">₹ 0</p>
          </div>
        </div>

        <div className="grid gap-1 grid-cols-2 px-2">
          <Link
            to="/Deposite"
            className="bg-green-600 border border-white px-3 py-1 text-white flex flex-col items-center justify-center rounded"
            onClick={() => setIsSidebarOpen(false)}
          >
            <IoBagAddSharp className="text-lg" />
            <span className="text-[10px]">Deposit</span>
          </Link>

          <Link
            to="/withdraw"
            className="bg-red-600 border border-white px-3 py-1 text-white flex flex-col items-center justify-center rounded"
            onClick={() => setIsSidebarOpen(false)}
          >
            <IoBagRemoveSharp className="text-lg" />
            <span className="text-[10px]">Withdraw</span>
          </Link>
        </div>

        <div className="font-medium text-sm border bg-gray-100 py-1 pl-2 mt-2">
          Statements
        </div>
        <div className="pl-3 divide-y divide-gray-300">
          <SideNavItem
            to="/with&deposite"
            icon={<FaArrowRightArrowLeft className="text-red-500 text-lg" />}
            label="Deposit Withdraw Report"
            onClick={() => setIsSidebarOpen(false)}
          />
          <SideNavItem
            to="/open-bets"
            icon={<CiSettings className="text-red-500 text-lg" />}
            label="Open Bets"
            onClick={() => setIsSidebarOpen(false)}
          />
          <SideNavItem
            to="/profit-loss"
            icon={<MdCable className="text-red-500 text-lg" />}
            label="Betting Profit & Loss"
            onClick={() => setIsSidebarOpen(false)}
          />
          <SideNavItem
            to="/bank-details"
            icon={<FaArrowRightArrowLeft className="text-red-500 text-lg" />}
            label="My Bank Details"
            onClick={() => setIsSidebarOpen(false)}
          />
          <SideNavItem
            to="/bonus-statement"
            icon={<AiOutlineGift className="text-red-500 text-lg" />}
            label="Bonus Statement"
            onClick={() => setIsSidebarOpen(false)}
          />
          <SideNavItem
            to="/referral"
            icon={<AiOutlineGift className="text-red-500 text-lg" />}
            label="Referral"
            onClick={() => {
              setIsSidebarOpen(false);
              setShowRefer(true);
            }}
          />
          <SideNavItem
            to="/referral-statement"
            icon={<AiOutlineGift className="text-red-500 text-lg" />}
            label="Referral Statement"
            onClick={() => setIsSidebarOpen(false)}
          />
        </div>

        <div className="font-medium text-sm border bg-gray-100 py-1 pl-2 mt-2">
          Account Settings
        </div>
        <div className="pl-3 divide-y divide-gray-300">
          <SideNavItem
            to="/stake-settings"
            icon={<CiSettings className="text-red-500 text-lg" />}
            label="Stake Settings"
            onClick={() => setIsSidebarOpen(false)}
          />
        </div>

        <div className="font-medium text-[12px] border bg-gray-100 py-1 pl-2 mt-2">
          Legal & Compliance
        </div>
        <div className="pl-3 divide-y divide-gray-300">
          <SideNavItem
            to="/rules-regulations"
            icon={<MdOutlineEventNote className="text-red-500 text-lg" />}
            label="Rules & Regulations"
            onClick={() => setIsSidebarOpen(false)}
          />
          <SideNavItem
            to="/exclusion-policy"
            icon={<CiCircleCheck className="text-red-500 text-lg" />}
            label="Exclusion Policy"
            onClick={() => setIsSidebarOpen(false)}
          />
          <SideNavItem
            to="/responsible-gambling"
            icon={<MdOutlinePolicy className="text-red-500 text-lg" />}
            label="Responsible Gambling"
            onClick={() => setIsSidebarOpen(false)}
          />
          <SideNavItem
            to="/privacy-policy"
            icon={<MdOutlinePolicy className="text-red-500 text-lg" />}
            label="Privacy Policy"
            onClick={() => setIsSidebarOpen(false)}
          />
        </div>

        <div className="font-medium text-[12px] border bg-gray-100 py-1 pl-2 mt-2">
          Account Actions
        </div>
        <div className="pl-3 divide-y divide-gray-300">
          <SideNavItem
            to="/change-password"
            icon={<MdOutlineLock className="text-red-500 text-lg" />}
            label="Change Password"
            onClick={() => setIsSidebarOpen(false)}
          />
          <div onClick={logout}>
            <SideNavItem
              to="/"
              icon={<IoLogOut className="text-red-500 text-lg" />}
              label="Logout"
              onClick={() => setIsSidebarOpen(false)}
            />
          </div>
        </div>

        <div className="font-medium text-sm border-t py-3 pl-3 mb-3 text-green-700">
          Register online and play online
        </div>
      </div>
    </>
  );
};

const SideNavItem = ({ icon, label, to, onClick }) => (
  <Link
    to={to}
    onClick={onClick}
    className="flex items-center gap-3 p-3 cursor-pointer hover:bg-gray-100 text-sm"
  >
    <div className="text-lg">{icon}</div>
    <div>{label}</div>
  </Link>
);

export default SideNavbar;
