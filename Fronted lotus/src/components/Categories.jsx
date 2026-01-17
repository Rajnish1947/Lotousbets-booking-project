

import React, { useState } from "react";

const Categories = () => {
  const categories = ["Originals", "Scratch", "Card", "Lottery", "Crash Games"];
  const [selected, setSelected] = useState(0); // default first category selected

  // Images grouped by category
  const imageData = {
    Originals: [
      "https://luckmedia.link/evo_dream_catcher/thumb_3_4_custom.webp",
      "https://i.imgur.com/oBhfORL.jpeg",
      "https://i.imgur.com/oBhfORL.jpeg",

      "https://i.imgur.com/oBhfORL.jpeg",
      "https://i.imgur.com/oBhfORL.jpeg",
      "https://i.imgur.com/oBhfORL.jpeg",
      "https://i.imgur.com/oBhfORL.jpeg",
    ],
    Scratch: [
      "https://luckmedia.link/evo_poker_lobby/thumb_3_4_custom.webp?q=65&w=600&px=auto&auto=format",
      "https://luckmedia.link/evo_poker_lobby/thumb_3_4_custom.webp?q=65&w=600&px=auto&auto=format",
      "https://luckmedia.link/evo_poker_lobby/thumb_3_4_custom.webp?q=65&w=600&px=auto&auto=format",
      "https://luckmedia.link/evo_poker_lobby/thumb_3_4_custom.webp?q=65&w=600&px=auto&auto=format",
      "https://luckmedia.link/evo_poker_lobby/thumb_3_4_custom.webp?q=65&w=600&px=auto&auto=format",
    ],
    Card: [
      "https://luckmedia.link/hcw_balloons/thumb_3_4_custom.webp?q=65&w=600&px=auto&auto=format",
      "https://luckmedia.link/hcw_balloons/thumb_3_4_custom.webp?q=65&w=600&px=auto&auto=format",
      "https://luckmedia.link/hcw_balloons/thumb_3_4_custom.webp?q=65&w=600&px=auto&auto=format",
      "https://luckmedia.link/hcw_balloons/thumb_3_4_custom.webp?q=65&w=600&px=auto&auto=format",
      "https://luckmedia.link/hcw_balloons/thumb_3_4_custom.webp?q=65&w=600&px=auto&auto=format",
      "https://luckmedia.link/hcw_balloons/thumb_3_4_custom.webp?q=65&w=600&px=auto&auto=format",
    ],
    Lottery: [
      "https://luckmedia.link/tvb_keno/thumb_3_4_custom.webp?q=65&w=600&px=auto&auto=format",
      "https://luckmedia.link/jdb_jogo_do_bicho/thumb_3_4_custom.webp?q=65&w=600&px=auto&auto=format",
      "https://luckmedia.link/kng_color_game/thumb_3_4_custom.webp?q=65&w=600&px=auto&auto=format",
      "https://luckmedia.link/jil_bingo_carnaval/thumb_3_4_custom.webp?q=65&w=600&px=auto&auto=format",
      "https://luckmedia.link/jil_bingo_carnaval/thumb_3_4_custom.webp?q=65&w=600&px=auto&auto=format",

    ],
    "Crash Games": [
       "https://luckmedia.link/evo_poker_lobby/thumb_3_4_custom.webp?q=65&w=600&px=auto&auto=format",
      "https://luckmedia.link/evo_poker_lobby/thumb_3_4_custom.webp?q=65&w=600&px=auto&auto=format",
      "https://luckmedia.link/evo_poker_lobby/thumb_3_4_custom.webp?q=65&w=600&px=auto&auto=format",
      "https://luckmedia.link/evo_poker_lobby/thumb_3_4_custom.webp?q=65&w=600&px=auto&auto=format",
      "https://luckmedia.link/evo_poker_lobby/thumb_3_4_custom.webp?q=65&w=600&px=auto&auto=format",
    ],
  };

  const currentCategory = categories[selected];
  const images = imageData[currentCategory] || [];

  return (
    <div className="bg-slate-50 mt-6 mb-3 rounded-md  ">
      {/* Category List */}
      <ul className="flex gap-3 justify-start font-semibold pl-2 text-sm sm:text-base text-black">
        {categories.map((item, idx) => (
          <li
            key={idx}
            onClick={() => setSelected(idx)}
            className={`relative cursor-pointer transition-colors ${
              selected === idx ? "text-red-900" : ""
            }`}
          >
            {item}
            {selected === idx && (
              <span className="absolute left-0 -bottom-1 w-full h-[2px] bg-green-600 rounded-full" />
            )}
          </li>
        ))}
      </ul>

      <hr className="my-3" />

      {/* Image Thumbnails */}
      <div className="flex overflow-x-auto scrollbar-hide gap-1 mt-2 pl-2 pb-3">
        {images.map((src, i) => (
          <img
            key={i}
            className="h-[175px] w-35 rounded-md shadow flex-shrink-0"
            src={src}
            alt={`game-${i}`}
          />
        ))}
      </div>
    </div>
  );
};

export default Categories;
