import React, { useState, useEffect } from "react";
import { CiSearch, CiLogin, CiSettings } from "react-icons/ci";
import { IoReorderThreeOutline } from "react-icons/io5";
import { IoBagAddSharp, IoBagRemoveSharp } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/Authcontext";

const Navbar = ({
  setShowLogin,
  setAuthMode,
  setIsSidebarOpen,
  isleftSidebarOpen,
  setIsleftSidebarOpen,
}) => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const navigate = useNavigate();

  // user and logout from Auth Context
  const { user, logout, backendurl, balance, setBalance, fetchBalance } =
    useAuth();

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formattedDate = currentTime.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  const formattedTime = currentTime.toLocaleTimeString("en-US", {
    hour12: true,
  });

  const Games = [
    { label: "Cricket", path: "/ckricket" },
    { label: "Football", path: "/football" },
    { label: "Tennis", path: "/tennis" },
    { label: "Horse", path: "/horse" },
    { label: "KABBDI", path: "/kabbdi" },
    { label: "LIVE CASINO", path: "/live-casino" },
    { label: "SLOTS", path: "/slots" },
    { label: "MAC", path: "/mac" },
    { label: "CRASH GAME", path: "/crash-game" },
    { label: "FINISHING GAME", path: "/finishing-game" },
  ];

  return (
    <div className="w-auto m-0 bg-white">
      {/* Top Navbar */}
      <nav className="flex items-center justify-between bg-emerald-700 py-4 md:py-2 px-4 ">
        {/* Left: Logo & Menu */}
        <div className="flex items-center gap-3">
          <IoReorderThreeOutline
            onClick={() => setIsleftSidebarOpen(!isleftSidebarOpen)}
            className="text-white text-2xl md:4xl lg:hidden cursor-pointer"
          />
          <img
            onClick={() => navigate("/")}
            className="w-[100px] md:w-[200px] md:h-[30px] h-[20px] cursor-pointer"
            src="/logo.png"
            alt="Logo"
          />
        </div>

        {/* Center: Search */}
        <div className="lg:flex hidden items-center bg-white rounded-3xl px-4 py-1 shadow-md w-[50%] sm:w-[35%] md:w-[25%] lg:w-[22%]">
          <CiSearch className="text-xl hidden md:flex text-gray-500 mr-3" />
          <input
            type="text"
            placeholder="Search (Min 3 letters)"
            className="w-full outline-none text-sm text-gray-700 placeholder-gray-400"
          />
        </div>

        {/* Center: Date Time */}
        <div className="hidden lg:flex flex-col text-white text-[12px] text-center mx-4 min-w-[120px]">
          <p className="text-[10px]">{formattedDate}</p>
          <p>{formattedTime}</p>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center space-x-2 text-sm">
          {!user ? (
            <>
              <button
                onClick={() => {
                  setAuthMode("Login");
                  setShowLogin(true);
                }}
                className="flex items-center border-2 border-gray-300 bg-green-900 hover:bg-green-700 transition-colors text-white px-3 py-1 rounded-full font-semibold shadow-sm"
              >
                <CiLogin className="mr-1 hidden md:flex text-lg" />
                Log In
              </button>

              <button
                onClick={() => {
                  setAuthMode("Register");
                  setShowLogin(true);
                }}
                className="bg-white px-3 py-1 rounded-full text-green-900 border border-green-900 hover:bg-gray-100 transition"
              >
                Register
              </button>

              <button className="bg-white px-3 py-1 rounded-full text-green-900 border border-green-900 hover:bg-gray-100 transition">
                Get ID
              </button>
            </>
          ) : (
            <>
              <div className="text-white mr-2 hidden md:block">
                Log in as {user.username || "User"}
              </div>
              <div className="text-white mr-2 hidden md:block">
                {" "}
                Balance:{" "}
                <span className="text-[10px] mr-5">
                  ₹ {balance !== null ? balance : "0"}
                </span>
              </div>

              {/* Deposit and Withdraw Buttons */}
              <div className="hidden lg:grid grid-cols-2 gap-2">
                <Link
                  to="/Deposite"
                  className="bg-green-600 border border-green-300 px-3 py-1 text-white flex flex-col items-center justify-center rounded-md"
                >
                  <IoBagAddSharp className="text-xl" />
                  <span className="text-[10px]">Deposit</span>
                </Link>

                <Link
                  to="/withdraw"
                  className="bg-red-600 px-3 py-1 shadow-md text-white flex flex-col items-center justify-center rounded-md"
                >
                  <IoBagRemoveSharp className="text-xl" />
                  <span className="text-[10px]">Withdraw</span>
                </Link>
              </div>

              <button
                onClick={() => setIsSidebarOpen(true)}
                className="bg-emerald-900 border shadow-md flex border-white px-3 py-2 gap-2 mr-2 rounded-full text-white hover:bg-emerald-700 transition"
              >
                <CiSettings className="text-white text-xl" />
                <span className="text-sm hidden sm:block">Account</span>
              </button>
            </>
          )}
        </div>
      </nav>

      {/* Bottom Game Navigation Bar */}
      <div className="w-full bg-white overflow-x-auto scrollbar-hide shadow-lg">
        <div className="max-w-screen-xl mx-auto py-1">
          <div className="flex font-bold justify-start lg:justify-center gap-3 px-2">
            <Link
              to="/"
              className="flex-shrink-0 px-3 shadow-md py-1 font-light text-[12px] lg:hidden rounded-3xl bg-gray-100 hover:bg-gray-200 transition whitespace-nowrap"
            >
              HOME
            </Link>

            {Games.map((item, index) => (
              <Link
                key={index}
                to={item.path}
                className="flex-shrink-0 shadow-md px-4 py-2 md:py-1 font-light text-[12px] cursor-pointer rounded-3xl bg-gray-100 hover:bg-gray-200 transition whitespace-nowrap"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
