
import React from "react";
import { Link } from "react-router-dom";


const LaftSideNavbar = ({ isleftSidebarOpen, setIsleftSidebarOpen }) => {
  const menuItems = [
    { label: "🏏 CRICKET", path: "/ckricket" },
    { label: "🎾 TENNIS", path: "/tennis" },
    { label: "⚽ FOOTBALL", path: "/football" },
    { label: "🎮 MAC" },
    { label: "🤼 KABADI" },
    { label: "🐎 HORSE RACING" },
    { label: "🃏 TEEN PATTI" },
    { label: "🎯 RUMMY" },
    { label: "🎰 CASINO" },
    { label: "🎲 LUDO" },
    { label: "🧠 QUIZ" },
    { label: "🔢 NUMBER GUESSING" },
    { label: "🏇 VIRTUAL RACING" },
    { label: "🧧 ANDAR BAHAR" },
  ];

  return (
    <>
      {/* Overlay */}
      {isleftSidebarOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-40"
          onClick={() => setIsleftSidebarOpen(false)}
        ></div>
      )}

      {/* Left Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-96 bg-white shadow-lg z-50 transform ${
          isleftSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out overflow-y-auto scrollbar-hide `}
      >
       
       

        {/* Menu Items */}
        <ul className="divide-y divide-gray-200 text-lg text-gray-700">
          {menuItems.map((item, index) => (
            <li
              key={index}
              className="hover:text-base text-sm font-semibold flex items-start py-4 px-6 hover:bg-gray-100 cursor-pointer"
            >
              {item.path ? (
                <Link
                  to={item.path}
                  className="w-full"
                  onClick={() => setIsleftSidebarOpen(false)}
                >
                  {item.label}
                </Link>
              ) : (
                item.label
              )}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default LaftSideNavbar;
