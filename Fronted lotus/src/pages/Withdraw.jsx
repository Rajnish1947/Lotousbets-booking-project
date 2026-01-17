import React, { useContext, useState } from "react";
import { useAuth } from "../context/Authcontext";
import { toast } from "react-toastify";

const Withdraw = () => {
  const [showAccountOptions, setShowAccountOptions] = useState(false);
  const [selectedAccount, setSelectedAccount] = useState("new");
  const [paymentType, setPaymentType] = useState("");
  const [amount, setAmount] = useState("");
  const { balance, user, fetchBalance,backendurl } = useAuth();

  const handleSubmit = async () => {
    const user = JSON.parse(localStorage.getItem("user"));
    const userId = user?.id || "42";

    if (!paymentType) {
      toast.error("Please select a payment type.");
      return;
    }

    try {
      const res = await fetch(`${backendurl}/api/deposit/withraw`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: userId,
          amount: amount,
          payment_type: paymentType,
          transaction_type:"withdraw",
        }),
      });

      const data = await res.json();

      if (res.ok) {
        setAmount("");
        setPaymentType("");
        setShowAccountOptions(false);
        toast.success(data.message);
        fetchBalance();
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong.");
    }
  };

  return (
    <div className="p-4">
      {/* Withdraw Instructions */}
      <div className="bg-slate-50 shadow-lg rounded-md font-light w-full lg:max-w-[900px] lg:ml-1 mr-0 mb-3 overflow-hidden">
        <div className="font-semibold py-2 px-4 text-lg">Withdraw Funds</div>
        <div className="px-4 pb-4 font-semibold text-[13px] ">
          <p>
            1. This form is for withdrawing the amount from the main wallet
            only.
          </p>
          <p>2. The bonus wallet amount cannot be withdrawn by this form.</p>
          <p>
            3. Do not put withdraw requests without betting with deposit amount.
            Such activity will be identified.
          </p>
          <p>
            4. If multiple users are using the same withdrawal account, all the
            linked users will be blocked.
          </p>
        </div>
      </div>

      <div className="ml-3 text-[16px] mb-2 font-semibold">
        Please fill in all required fields *
      </div>

      {!showAccountOptions ? (
        <>
          <div className="bg-slate-50 shadow-lg rounded-md w-full lg:max-w-[900px] lg:ml-1 mr-0 mb-5 overflow-hidden p-4">
            <div>
              <div className="p-1.5 bg-emerald-800 w-fit text-white rounded-md">
                <p className="text-sm">
                  Available to withdrawal:{" "}
                  <span className="text-[10px] mr-5">
                    ₹ {balance !== null ? balance : "0"}
                  </span>
                </p>
              </div>
            </div>

            <div className="font-semibold py-2 px-2 mt-3 text-sm">Amount *</div>

            <div className="flex justify-between items-center border border-green-800 rounded-md px-3 py-2 mb-4">
              <div className="flex items-center gap-2">
                <p>₹</p>
                <input
                  className="bg-slate-50 outline-none"
                  type="text"
                  placeholder="Enter Amount"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                />
              </div>
              <div className="font-semibold text-sm text-gray-700">
                Minimum 0
              </div>
            </div>
          </div>

          <div className="flex items-start gap-2 mb-4 text-sm">
            <input
              className="w-4 h-4 mt-1 accent-emerald-300"
              type="checkbox"
            />
            <p>
              I have read and agree with{" "}
              <span className="text-emerald-600 underline cursor-pointer">
                the terms of payment and withdrawal policy.
              </span>
            </p>
          </div>

          <button
            className={`bg-emerald-800 py-2 text-white font-semibold text-center rounded-md transition w-full ${
              !amount || isNaN(amount) || Number(amount) <= 0
                ? "opacity-50 cursor-not-allowed"
                : "hover:bg-emerald-700 cursor-pointer"
            }`}
            onClick={() => {
              if (!amount || isNaN(amount) || Number(amount) <= 0) return;

              if (Number(amount) > Number(balance)) {
                toast.error("You have selected more amount than available.");
                return;
              }

              setShowAccountOptions(true);
            }}
            disabled={!amount || isNaN(amount) || Number(amount) <= 0}
          >
            Continue to select account
          </button>
        </>
      ) : (
        <>
          <div className="flex py-2 justify-between mt-2 mb-2 rounded-md bg-slate-50">
            <div
              className={`ml-1 pl-8 font-semibold text-center text-gray-700 rounded-md py-2 w-1/2 px-1 cursor-pointer ${
                selectedAccount === "new" ? "bg-emerald-700 text-white" : ""
              }`}
              onClick={() => setSelectedAccount("new")}
            >
              Use New Account
            </div>
            <div
              className={`mr-1 text-center rounded-md text-gray-800 font-semibold py-2 w-1/2 pr-8 px-1 cursor-pointer ${
                selectedAccount === "previous"
                  ? "bg-emerald-700 text-white"
                  : ""
              }`}
              onClick={() => setSelectedAccount("previous")}
            >
              Use Previous Account
            </div>
          </div>

          {selectedAccount === "new" && (
            <>
              <div className="bg-slate-50 shadow-lg rounded-md w-full lg:max-w-[900px] lg:ml-1 mr-0 mb-5 overflow-hidden p-4">
                <div className="font-semibold mb-3">Select Payment Type</div>
                <div className="flex justify-center gap-4 mb-4">
                  <div
                    className={`px-8 py-3 border-2 rounded-md cursor-pointer text-center ${
                      paymentType === "UPI"
                        ? "bg-yellow-300 border-yellow-600"
                        : "border-gray-400"
                    }`}
                    onClick={() => setPaymentType("UPI")}
                  >
                    <img
                      className="w-8 mx-auto"
                      src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAACXBIWXMAAAsTAAALEwEAmpwYAAAET0lEQVR4nO3Zb2gbdRgH8O/P/sklWcfYGpyuQ+aLifhC9weddS69S7cOURGlik7xzd448Y1gLlnJLndp06ytda2rM3PW2UpaKoJjLwQR5gvxhTiHuk38g1h1NGmavxek4LZHUtcR0lzSRC+5F/nCvXrefJ48v9/d7y5APfXU87/lrxnYM9NYUEN4uVB97eAjh6xH98es/V0dMGIy05jMTIEyIaSSM1ifX7cOdF22BrrI7O+8AAKDkUIEpoYwlwmB1A9A6iR8uXVzYH+bNbCPLP69ZO51kFkRnoCRkpnG9hw8qaehpoNoXa5b+jsPLuM5Rche30OSboFRkgnBfRP/Pij9Hig1jt7lusXf+WEOfukyK/yTMErUSXyei0+Pg1KnoKbfhQ0z3Q1crxDLxS9dsnDREFOYm4A1PYnFPDylToJSQfRxPr59BX55CnLHU7X2IzWJxzXwlDzB1Hs8O4c5mS/YAGeEKainMaaBp+QYo2H/bXOcx07aUxC6a9pAehy/aOETxxldGWmkNvcuMuQUEhPYUgyfGGWUOMZIUTZTsSlwCv90TRpIj+NQKXz8DUZ/DjXSpmJTUPhLNZlC8h2cKYWPv84oNsRI8bYVn4LX8UxV8RREU+okUqvBxwYY/dFfYgoyf7mqU0gHYV8tPhZgtNDPyOcpNQX+2ao1kHob/nLwC32MZpVG2uQquhd+zD65q9JA8i12vhx81McoqjDy9ZSYgsI/pzs+PQJbYoxdKxcf9TKaPdJAbeIDxfbCT5Dsjbo2kBrD85Xg548wmvcw8rlK3pEO6NpA4k02USk+0sPoN3cDtbras09hrWX0ra5vX/FRFq4UH3Ez+sHVXLQBk8J/qVsDiRFs+y/4S2IzbXduI07qKIyX+W/W9O226dZA/BhcleIvuDi627lDG6/wX7X4HRugZ2LD7Fwl+K9FM2117iRO0rz7nMPR9hZd8XODsMaG2GK5+C9EK90h3l8MfxaSnYPeiQ/jsXLxn7paaKO4K3tM0FrzUwjuaEI1Ehtkx8vBnxHXkU1s18RzihCs6gEuNsB+Xi1+SlxP61wPaeNlYbSqX+gSg9iyWvwp0UYt7t3Flk0A1U48gJdWgz/hvJXWuB8ufNaRheuc7HgVtciCn31cCj8g3k4W9x4NPH/VpAgHa4InCY3RXpYshpecm4nryeILbta/OS//AmqVeR/2aOHDbnY9KG44q4mX+cWaf42OKqxPCx8R8Qrn6fhEA58x+RydNcVnE1XY+QL4qxEXXoTU3cwpgrryXCMkONnxIGqdKxJa573sWt6aX4y4sfR53CR3OArcJsNNCn8vjJCoFwfy8JmwE3uX6yZZGMg7Uc42S46tMErmPWzi5rJxsUTEifbcevbtKWfN/2qSHHfCSIl42O83fvlI5DDuy61lz+5LD6d/8d9ZJPtGGC3hw+yjiJtdjL6Gu1YUpUctNybw2Vpp34p/Juuppx7omn8A9lnTO7aOUG4AAAAASUVORK5CYII="
                      alt="UPI"
                    />
                    <p className="text-sm font-semibold mt-1">UPI</p>
                  </div>

                  <div
                    className={`px-8 py-3 border-2 rounded-md cursor-pointer text-center ${
                      paymentType === "BANK"
                        ? "bg-yellow-300 border-yellow-600"
                        : "border-gray-400"
                    }`}
                    onClick={() => setPaymentType("BANK")}
                  >
                    <img
                      className="w-8 mx-auto"
                      src="https://ukexch25.com/static/media/bankicon.bd51736454598dbb3611.png"
                      alt="Bank"
                    />
                    <p className="text-sm font-semibold mt-1">Bank</p>
                  </div>
                </div>

                {paymentType === "UPI" && (
                  <div className="p-1">
                    <label className="text-sm">Amount * *</label>
                    <input
                      className="border border-gray-200 w-full py-2 px-2 rounded-md"
                      type="text"
                      value={amount}
                      readOnly
                    />
                  </div>
                )}

                {paymentType === "BANK" && (
                  <>
                    <div className="p-1">
                      <label className="text-sm">Amount *</label>
                      <input
                        className="border border-gray-200 w-full py-2 px-2 rounded-md"
                        type="text"
                        value={amount}
                        readOnly
                      />
                    </div>
                  </>
                )}
              </div>
              <div className="flex items-start gap-2 mb-4 text-sm">
                <input
                  className="w-4 h-4 mt-1 accent-emerald-300"
                  type="checkbox"
                />
                <p>
                  I have read and agree with{" "}
                  <span className="text-emerald-600 underline cursor-pointer">
                    the terms of payment and withdrawal policy.
                  </span>
                </p>
              </div>
              <div
                onClick={handleSubmit}
                className="bg-emerald-800 py-2 text-white font-semibold text-center rounded-md cursor-pointer hover:bg-emerald-700 transition"
              >
                SUBMIT
              </div>
            </>
          )}

          {selectedAccount === "previous" && (
            <div className="ml-10 rounded-md w-full lg:max-w-[900px] justify-center items-center lg:ml-1 mr-0 mb-5 overflow-hidden p-4">
              <div className="ml-12">No Accounts Added.</div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Withdraw;
