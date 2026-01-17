

import React from "react";

const Footer = () => {
  return (
    <div className="bg-slate-50 mt-8 w-fu py-4">
      {/* Centered Base64 Image */}
      <div className="flex justify-center px-3 py-4 ">
        <img
          className="w-8"
          src="data:image/jpeg;base64,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" // truncated for brevity
          alt=""
        />
      </div>

      {/* Responsive Payment & License Logos */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 px-4 py-8 mb-4 place-items-center">
        <img
          className="w-24"
          src="https://lotusbets.com/assets/upi.b1dbf1b2-B5GcSjrR.svg"
          alt=""
        />
        <img
          className="w-24"
          src="https://lotusbets.com/assets/bankTransfer.ec47485a-CYaLSDlP.svg"
          alt=""
        />
        <img
          className="w-24"
          src="https://lotusbets.com/assets/BegambleAware-DWwCJZuQ.svg"
          alt=""
        />
        <img
          className="w-24"
          src="https://lotusbets.com/assets/mga.d077581b-zefAtfgt.svg"
          alt=""
        />
        <img
          className="w-24"
          src="https://lotusbets.com/assets/cograE-BIFTWYpq.svg"
          alt=""
        />
        <img
          className="w-24"
          src="https://lotusbets.com/assets/gamblingCommission-4mfcxKt-.svg"
          alt=""
        />
      </div>

      {/* Footer Logo Centered */}
      <div className="bg-emerald-600 py-4 flex justify-center">
        <img
          className="h-10"
          src="https://api7.live/sitethemes/lotusbets.com/logo.png"
          alt="Logo"
        />
      </div>
    </div>
  );
};

export default Footer;
