
import React from "react";
import { IoIosHeart } from "react-icons/io";

const CardsGames = () => {
  const images = [
    "https://ss.manage63.com/south247/casinolobbyimages/Casino-War.jpg",
    "https://ss.manage63.com/south247/casinolobbyimages/Trio.jpg",
    "https://ss.manage63.com/south247/casinolobbyimages/Teenpatti-Open.jpg",
    "https://ss.manage63.com/south247/casinolobbyimages/Teenpatti-Open.jpg",
    "https://ss.manage63.com/south247/casinolobbyimages/Teenpatti-Open.jpg",
    "https://ss.manage63.com/south247/casinolobbyimages/Teenpatti-Open.jpg",
    "https://ss.manage63.com/south247/casinolobbyimages/Teenpatti-Open.jpg",
    "https://ss.manage63.com/south247/casinolobbyimages/Teenpatti-Open.jpg",
    "https://ss.manage63.com/south247/casinolobbyimages/Teenpatti-Open.jpg",
    "https://ss.manage63.com/south247/casinolobbyimages/Teenpatti-Open.jpg",
    "https://ss.manage63.com/south247/casinolobbyimages/Teenpatti-Open.jpg",
    "https://ss.manage63.com/south247/casinolobbyimages/Teenpatti-Open.jpg",
    "https://ss.manage63.com/south247/casinolobbyimages/Casino-War.jpg",
    "https://ss.manage63.com/south247/casinolobbyimages/Trio.jpg",
    "https://ss.manage63.com/south247/casinolobbyimages/Teenpatti-Open.jpg",
    "https://ss.manage63.com/south247/casinolobbyimages/Teenpatti-Open.jpg",
    "https://ss.manage63.com/south247/casinolobbyimages/Teenpatti-Open.jpg",
    "https://ss.manage63.com/south247/casinolobbyimages/Teenpatti-Open.jpg",
    "https://ss.manage63.com/south247/casinolobbyimages/Teenpatti-Open.jpg",
    "https://ss.manage63.com/south247/casinolobbyimages/Teenpatti-Open.jpg",
    "https://ss.manage63.com/south247/casinolobbyimages/Teenpatti-Open.jpg",
    "https://ss.manage63.com/south247/casinolobbyimages/Teenpatti-Open.jpg",
    "https://ss.manage63.com/south247/casinolobbyimages/Teenpatti-Open.jpg",
    "https://ss.manage63.com/south247/casinolobbyimages/Teenpatti-Open.jpg",
  ];

  return (
    <div className="bg-slate-50 mt-2 mb-5 px-2 py-2 rounded">
      {/* Header */}
      <div className="px-4 font-bold text-xl flex items-center py-1">
        <IoIosHeart className="mr-2 text-red-600" />
        Indian Card Games
      </div>
      <hr className="mb-2" />

      {/* Outer Scrollable Container */}
      <div className="w-full overflow-x-auto scrollbar-hide">
        {/* Grid with 3 Fixed Rows */}
        <div
          className="grid gap-2 pl-4 min-w-max"
          style={{
            gridAutoFlow: "column",
            gridTemplateRows: "repeat(3, 128px)",
          }}
        >
          {images.map((src, index) => (
            <img
              key={index}
              src={src}
              alt={`game-${index}`}
              className="rounded-md mb-8 md:w-[128px]  h-[128px] object-cover shadow-md hover:scale-105 transition-transform duration-300"
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CardsGames;

