
import React, { useState, useEffect } from "react";
import { useAuth } from "../context/Authcontext";

const DepositeAndWithdraw = () => {
  const [selectedTab, setSelectedTab] = useState("deposit");
  const [history, setHistory] = useState({ deposits: [], withdraws: [] });
const { backendurl ,user } = useAuth();
  const userId =user.id ; 

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const res = await fetch(`${backendurl}/api/deposit/history/${userId}`);
        const data = await res.json();
        setHistory(data);
      } catch (err) {
        console.error("Error fetching history:", err);
      }
    };

    fetchHistory();
  }, []);

  const transactions = selectedTab === "deposit" ? history.deposits : history.withdraws;


  let balance = 0;
  const transactionRows = transactions
    .slice()
    .reverse()
    .map((tx, index) => {
      const amt = parseFloat(tx.amount);
      const prev = balance;
      balance += amt;
      const dateObj = new Date(tx.created_at);
      return {
        ...tx,
        index: index + 1,
        prevBalance: prev,
        currentBalance: balance,
        date: dateObj.toLocaleDateString(),
        time: dateObj.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
    });

  return (
    <div className="rounded-md w-full max-w-[900px] mx-auto p-4 bg-white shadow-md shadow-gray-200">
      {/* Tabs */}
      <div className="flex mb-6 flex-wrap gap-2">
        <div
          onClick={() => setSelectedTab("deposit")}
          className={`py-2 px-6 font-semibold rounded-2xl text-sm cursor-pointer ${
            selectedTab === "deposit"
              ? "bg-emerald-800 text-white shadow-md"
              : "bg-gray-100 text-black"
          }`}
        >
          Deposit
        </div>
        <div
          onClick={() => setSelectedTab("withdraw")}
          className={`py-2 px-6 font-semibold rounded-2xl text-sm cursor-pointer ${
            selectedTab === "withdraw"
              ? "bg-emerald-800 text-white shadow-md"
              : "bg-gray-100 text-black"
          }`}
        >
          Withdraw
        </div>
      </div>

      {/* Table Header */}
      <div className="hidden md:grid grid-cols-7 text-gray-700 font-semibold text-xs py-2 px-3 rounded-t-md">
        <div>#</div>
        <div>{selectedTab === "deposit" ? "Deposit" : "Withdraw"} Amount</div>
        <div>Payment Type</div>
        <div>Date</div>
        <div>Time</div>
        <div>Prev Balance</div>
        <div>Current Balance</div>
      </div>
      <hr />

      {/* Desktop View */}
      <div className="hidden md:block">
        {transactionRows.map((tx) => (
          <div
            key={tx.id}
            className="grid grid-cols-7 text-xs border-b py-2 px-3"
          >
            <div>{tx.index}</div>
            <div className={`font-medium ${selectedTab === "deposit" ? "text-emerald-600" : "text-red-600"}`}>
              ₹{Math.abs(tx.amount)}
            </div>
            <div>{tx.payment_type}</div>
            <div>{tx.date}</div>
            <div>{tx.time}</div>
            <div>₹{tx.prevBalance}</div>
            <div>₹{tx.currentBalance}</div>
          </div>
        ))}
      </div>

      {/* Mobile View */}
      <div className="block md:hidden space-y-4">
        {transactionRows.map((tx) => (
          <div key={tx.id} className="rounded-md border p-3 text-xs bg-gray-50 shadow-sm">
            <div className="font-semibold mb-1">
              {selectedTab === "deposit" ? "Deposit" : "Withdraw"} ₹{Math.abs(tx.amount)}
            </div>
            <div>Method: {tx.payment_type}</div>
            <div>Date: {tx.date}</div>
            <div>Time: {tx.time}</div>
            <div>Prev Balance: ₹{tx.prevBalance}</div>
            <div>Current Balance: ₹{tx.currentBalance}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DepositeAndWithdraw;
