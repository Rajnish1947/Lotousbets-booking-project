import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

const BetProcessingPopup = ({ isOpen, onClose }) => {
  const [timer, setTimer] = useState(5);

  useEffect(() => {
    if (isOpen && timer > 0) {
      const countdown = setTimeout(() => {
        setTimer(timer - 1);
      }, 1000);
      return () => clearTimeout(countdown);
    } else if (timer === 0) {
      onClose();
      setTimer(5);
    }
  }, [isOpen, timer, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-50">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0 }}
        className="bg-white rounded-xl p-6 text-center w-[300px] shadow-lg"
      >
        <h2 className="text-lg font-semibold mb-2">Your bet is being processed...</h2>
        <p className="text-sm text-gray-600 mb-4">Please Wait...</p>

        <div className="flex justify-center mb-2">
          <div className="relative w-16 h-16">
            <div className="absolute top-0 left-0 w-full h-full rounded-full border-4 border-gray-300"></div>
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
              className="absolute top-0 left-0 w-full h-full rounded-full border-4 border-blue-500 border-t-transparent"
            ></motion.div>
            <div className="absolute inset-0 flex items-center justify-center text-lg font-bold">
              {timer}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default BetProcessingPopup;
