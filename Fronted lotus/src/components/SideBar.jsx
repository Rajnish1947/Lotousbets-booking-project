
import React from "react";
import { Link } from "react-router-dom"; // 👈 import Link

const SideBar = () => {
  const menuItems = [
    { label: "🏏 CRICKET", path: "/ckricket" },
    { label: "🎾 TENNIS",path:"/tennis" },
    { label: "⚽ FOOTBALL",path:"/football" },
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
    <div className="hidden ml-6 lg:flex">
      <ul className="bg-white h-[30rem] overflow-y-auto w-60 border border-gray-100 rounded-lg divide-y divide-gray-200 text-lg text-gray-700">
        {menuItems.map((item, index) => (
          <li
            key={index}
            className="hover:text-base text-sm font-semibold flex items-start py-4 px-6 hover:bg-gray-100 cursor-pointer"
          >
            {item.path ? (
              <Link to={item.path} className="w-full">
                {item.label}
              </Link>
            ) : (
              item.label
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SideBar;
