

import React from 'react';


const Banner = () => {
  
  const row1 = [
    { src: "/h1.webp", text: "Evolution", icon: "🎥" },
    { src: "/h2.webp", text: "Live Casinos", icon: "🏛️" },
    { src: "/h3.webp", text: "Fishing Games", icon: "🎣" },
    { src: "/h4.webp", text: "Kabaddi", icon: "🤼" },
  ];

  const row2 = [
    { src: "/h4.webp", text: "Crash Games", icon: "💥" },
    { src: "/h5.webp", text: "Card Games", icon: "🃏" },
    { src: "/h4.webp", text: "Slot Games", icon: "🎰" },
    { src: "/h5.webp", text: "Casino", icon: "🎲" },
  ];

  const rows = [row1, row2];

  return (
    <div className="space-y-2">
      {rows.map((row, rowIndex) => (
        <div key={rowIndex} className="flex overflow-x-auto scrollbar-hide space-x-1">
          {row.map((item, i) => (
            <div
              key={i}
              className="relative lg:min-w-[44%] min-w-[35%] h-[50px] lg:h-[38px] rounded-md overflow-hidden flex-shrink-0"
            >
              <img
                src={item.src}
                alt={`icon-${rowIndex}-${i}`}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 flex items-center justify-start pl-2 bg-black bg-opacity-40">
                <p className="text-white text-xs font-semibold flex items-start gap-1">
                  <span>{item.icon}</span>
                  {item.text}
                </p>
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Banner;
