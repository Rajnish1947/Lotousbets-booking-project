
import React from "react";
import { FaFire } from "react-icons/fa";

const PopularGames = () => {
  const images = [
    "https://luckmedia.link/ezg_speed_roulette/thumb_3_4_custom.webp?q=65&w=600&px=auto&auto=format",
    "https://luckmedia.link/ezg_speed_roulette/thumb_3_4_custom.webp?q=65&w=600&px=auto&auto=format",
    "https://luckmedia.link/ezg_speed_roulette/thumb_3_4_custom.webp?q=65&w=600&px=auto&auto=format",
    "https://luckmedia.link/ezg_speed_roulette/thumb_3_4_custom.webp?q=65&w=600&px=auto&auto=format",
    "https://luckmedia.link/ezg_speed_roulette/thumb_3_4_custom.webp?q=65&w=600&px=auto&auto=format",
    "https://luckmedia.link/ezg_speed_roulette/thumb_3_4_custom.webp?q=65&w=600&px=auto&auto=format",
    "https://luckmedia.link/ezg_speed_roulette/thumb_3_4_custom.webp?q=65&w=600&px=auto&auto=format",
    "https://luckmedia.link/ezg_speed_roulette/thumb_3_4_custom.webp?q=65&w=600&px=auto&auto=format",
    "https://luckmedia.link/ezg_speed_roulette/thumb_3_4_custom.webp?q=65&w=600&px=auto&auto=format",
    "https://luckmedia.link/ezg_speed_roulette/thumb_3_4_custom.webp?q=65&w=600&px=auto&auto=format",
    "https://luckmedia.link/ezg_speed_roulette/thumb_3_4_custom.webp?q=65&w=600&px=auto&auto=format",
    "https://luckmedia.link/ezg_speed_roulette/thumb_3_4_custom.webp?q=65&w=600&px=auto&auto=format",
    "https://luckmedia.link/ezg_speed_roulette/thumb_3_4_custom.webp?q=65&w=600&px=auto&auto=format",
    "https://luckmedia.link/ezg_speed_roulette/thumb_3_4_custom.webp?q=65&w=600&px=auto&auto=format",
    "https://luckmedia.link/ezg_speed_roulette/thumb_3_4_custom.webp?q=65&w=600&px=auto&auto=format",
    "https://luckmedia.link/ezg_speed_roulette/thumb_3_4_custom.webp?q=6t",
    "https://luckmedia.link/tvb_keno/thumb_3_4_custom.webp?q=65&w=600&px=auto&auto=format",
    "https://luckmedia.link/jdb_jogo_do_bicho/thumb_3_4_custom.webp?q=65&w=600&px=auto&auto=format",
    "https://luckmedia.link/kng_color_game/thumb_3_4_custom.webp?q=65&w=600&px=auto&auto=format",
    "https://luckmedia.link/jil_bingo_carnaval/thumb_3_4_custom.webp?q=65&w=600&px=auto&auto=format",
    "https://luckmedia.link/jil_bingo_carnaval/thumb_3_4_custom.webp?q=65&w=600&px=auto&auto=format",
  ];

  return (
    <div className="bg-slate-50 mt-2 mb-5 px-2 py-2 rounded-md">
      {/* Header */}
      <div className="px-4 font-bold text-xl flex items-center py-1">
        <FaFire className="mr-2 text-red-600" />
        Popular Games
      </div>
      <hr className="mb-2" />

      {/* Outer Scrollable Container */}
      <div className="w-full overflow-x-auto scrollbar-hide">
        {/* Grid with 2 Fixed Rows */}
        <div
          className="grid gap-1 px-4 min-w-max"
          style={{
            gridAutoFlow: "column",
            gridTemplateRows: "repeat(2, 180px)", // increased height here
          }}
        >
          {images.map((src, index) => (
            <img
              key={index}
              src={src}
              alt={`game-${index}`}
              className="rounded-md mb-8 w-[140px] h-[180px] object-cover shadow-md hover:scale-105 transition-transform duration-300" // height increased, width adjusted
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default PopularGames;

