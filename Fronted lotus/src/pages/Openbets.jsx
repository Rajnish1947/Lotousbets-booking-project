import React, { useEffect, useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

const Openbets = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [bets, setBets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBets = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/deposit/settlements/settled");
        const json = await res.json();
        if (Array.isArray(json.data)) {
          setBets(json.data);
        }
      } catch (err) {
        console.error("Fetch error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchBets();
  }, []);

  return (
    <div className="w-full flex justify-center px-1 sm:px-4 mb-5">
      <div className="w-full max-w-[590px]">
        {/* Header */}
        <div
          className="bg-emerald-800 text-white rounded-md py-2 px-4 flex justify-between items-center cursor-pointer"
          onClick={() => setIsOpen(!isOpen)}
        >
          <div className="text-sm font-semibold">Settled Bets</div>
          {isOpen ? <FaChevronUp /> : <FaChevronDown />}
        </div>

        {/* Content */}
        {isOpen && (
          <div className="bg-white shadow-md rounded-md mt-2">
            {loading ? (
              <div className="text-sm text-gray-600 p-4">Loading...</div>
            ) : bets.length === 0 ? (
              <div className="text-sm text-gray-600 p-4">No settled bets available.</div>
            ) : (
              <>
                {/* Desktop View */}
                <div className="hidden md:block overflow-x-auto">
                  <table className="w-full text-[10px] text-left">
                    <thead className="bg-gray-100 text-gray-700">
                      <tr>
                        <th className="py-1 px-1">sr. no</th>
                        <th className="py-1 px-1">Match</th>
                        <th className="py-1 px-1">Selection</th>
                        <th className="py-1 px-1">Market</th>
                        <th className="py-1 px-1">Type</th>
                        <th className="py-1 px-1">Odds</th>
                        <th className="py-1 px-1">Stake</th>
                        <th className="py-1 px-1 text-green-600">Profit</th>
                        <th className="py-1 px-1 text-red-600">Liability</th>
                        <th className="py-1 px-1">Time</th>
                      </tr>
                    </thead>
                    <tbody>
                      {bets.map((bet, index) => (
                        <tr key={bet.Id} className="border-b hover:bg-gray-50">
                          <td className="py-1 px-1">{index + 1}</td>
                          <td className="py-1 px-1">{bet.Event}</td>
                          <td className="py-1 px-1">{bet.Selection}</td>
                          <td className="py-1 px-1">{bet.Market}</td>
                          <td className="py-1 px-1 capitalize">{bet.Type}</td>
                          <td className="py-1 px-1">{bet.OddsRequest}</td>
                          <td className="py-1 px-1">₹{bet.AmountStake}</td>
                          <td className="py-1 px-1 text-green-600">₹{bet.Profit}</td>
                          <td className="py-1 px-1 text-red-600">₹{Math.abs(bet.Liability)}</td>
                          <td className="py-1 px-1">
                            {new Date(bet.PlaceTime).toLocaleString()}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Mobile View */}
                <div className="block md:hidden space-y-3 p-3">
                  {bets.map((bet, index) => (
                    <div
                      key={bet.Id}
                      className="border rounded-md p-3 bg-gray-50 text-xs shadow-sm"
                    >
                      <div className="font-semibold mb-1">
                        #{index + 1} - {bet.Event}
                      </div>
                      <div>Selection: {bet.Selection}</div>
                      <div>Market: {bet.Market}</div>
                      <div>Type: {bet.Type}</div>
                      <div>Odds: {bet.OddsRequest}</div>
                      <div>Stake: ₹{bet.AmountStake}</div>
                      <div className="text-green-600 font-medium">
                        Profit: ₹{bet.Profit}
                      </div>
                      <div className="text-red-600">
                        Liability: ₹{Math.abs(bet.Liability)}
                      </div>
                      <div className="text-gray-600">
                        Time: {new Date(bet.PlaceTime).toLocaleString()}
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Openbets;
