import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { useAuth } from "../context/Authcontext";
import { motion, AnimatePresence } from "framer-motion";
import Tesseract from "tesseract.js";
const ProcessingModal = ({ onComplete }) => {
  const [timer, setTimer] = useState(5);

  useEffect(() => {
    if (timer === 0) {
      onComplete();
      return;
    }
    const interval = setInterval(() => setTimer((t) => t - 1), 1000);
    return () => clearInterval(interval);
  }, [timer, onComplete]);

  return (
    <motion.div
      key="modal"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0, opacity: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-50"
    >
      <div className="bg-white rounded-xl p-6 text-center w-[300px] shadow-lg flex flex-col items-center gap-6">
        <div className="relative w-16 h-16 mx-auto">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{
              repeat: Infinity,
              duration: 1,
              ease: "linear",
            }}
            className="absolute top-0 left-0 w-full h-full rounded-full border-4 border-dotted border-blue-500"
          />
          <div className="absolute inset-0 flex items-center justify-center text-lg font-bold text-blue-700">
            {timer}
          </div>
        </div>
        <div className="p-1">
          <h2 className="text-[15px] font-semibold mb-1">
            Your deposit is being processed...
          </h2>
          <p className="text-sm text-gray-600">Please wait...</p>
        </div>
      </div>
    </motion.div>
  );
};

const Deposite = () => {
  const { backendurl ,user,fetchBalance } = useAuth();

  const [amount, setAmount] = useState("");
  const [transactionId, setTransactionId] = useState("");
  const [file, setFile] = useState(null);
  const [showPaymentSection, setShowPaymentSection] = useState(false);
  const [selectedMethod, setSelectedMethod] = useState("UPI");
  const [loading, setLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const [message, setMessage] = useState("");
  const [showProcessingModal, setShowProcessingModal] = useState(false);

  const handleFileChange = (e) => {
    const uploadedFile = e.target.files[0];
    if (!uploadedFile) return;

    setFile(uploadedFile);
    setImagePreview(URL.createObjectURL(uploadedFile));
    setTransactionId(""); 
    setMessage("");
    toast.info("Scanning image for UTR...");

    Tesseract.recognize(uploadedFile, "eng", {
      logger: (m) => console.log(m),
    })
      .then(({ data: { text } }) => {
        console.log("OCR Text:", text);

        const utrMatch = text.match(/UTR[:\-\s]*([A-Za-z0-9]+)/i);
        if (utrMatch && utrMatch[1]) {
          setTransactionId(utrMatch[1]);

          return;
        }

        const fallback = text.match(/\b[A-Za-z0-9]{10,}\b/g);
        if (fallback?.length) {
          setTransactionId(fallback[0]);
        
        } else {
          setMessage("UTR not found in your image. Please upload clear image manually.");
        }
      })
      .catch((err) => {
        console.error("OCR Error:", err);
        setMessage("Image scan failed. Please try again.");
        toast.error("Image scan failed.");
      });
  };

  const handleProceed = () => {
    setShowPaymentSection(true);
  };

  const handleMethodSelect = (method) => {
    if (!amount) {
      toast.error("Please select or enter amount first.");
      return;
    }
    setSelectedMethod(method);
  };

  const resetForm = () => {
    setAmount("");
    setTransactionId("");
    setFile(null);
    setShowPaymentSection(false);
    setImagePreview(null);
    setMessage("");
    setSelectedMethod("UPI");
  };

  const handleSubmit = async () => {
    if (!amount || !transactionId || !file || !selectedMethod) {
      toast.error("Please fill all fields before submitting.");
      return;
    }

    const formData = new FormData();
    formData.append("amount", amount);
    formData.append("payment_type", selectedMethod);
    formData.append("transaction_id", transactionId);
    formData.append("screenshot", file);
  formData.append("userId", user.id);
formData.append("transaction_type", "deposit");
    console.log("user id",user.id)

    try {
      setLoading(true);
      const res = await axios.post(
        `${backendurl}/api/deposit/submit`,
        formData
      );

      if (res.status === 200) {
        setLoading(false);
        setShowProcessingModal(true); 
      } else {
        setLoading(false);
        toast.error("Submission failed. Try again.");
      }
    } catch (err) {
      console.error("Error:", err);
      setLoading(false);
      toast.error("Something went wrong.");
    }
  };

  // Called when 5-second processing modal timer ends
  const onProcessingComplete = () => {
    setShowProcessingModal(false);
    toast.success("Deposit submitted successfully!", { autoClose: 3000 });
    fetchBalance();
    resetForm();
  };

  return (
    <div className="bg-white rounded-md shadow-md relative">
      {/* ...amount input & payment selection UI remains unchanged... */}
      <div className="bg-slate-50 shadow-lg rounded-md w-full lg:max-w-[900px] lg:ml-1 mr-0 mb-5 overflow-hidden">
        <div className="font-semibold py-1 px-4 w-[600px]">Amount*</div>
        <div className="px-2 py-2 m-2 border justify-between flex border-gray-500">
          <input
            className="bg-slate-50"
            type="text"
            placeholder="Enter Amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
          <div className="font-semibold text-end">INR</div>
        </div>

        <div className="grid grid-cols-3 ml-4">
          {["300", "400", "600", "500", "700", "800"].map((amt, i) => (
            <div key={i}>
              <div
                className="bg-emerald-800 text-white mt-1 mb-2 py-1.5 font-bold rounded-md px-6 w-40 text-center cursor-pointer"
                onClick={() => setAmount(amt)}
              >
                +{amt}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex m-1 gap-1 py-2 justify-center items-center">
        <input className="accent-emerald-300 w-6" type="checkbox" />
        <p>
          I have read and agree with{" "}
          <span className="text-sm underline text-emerald-600">
            the terms of payment and withdrawal policy.
          </span>
        </p>
      </div>

      {!showPaymentSection && (
        <div
          className="bg-emerald-800 py-2 text-white font-semibold text-center mt-2 rounded-md cursor-pointer"
          onClick={handleProceed}
        >
          Proceed to select payment method
        </div>
      )}

      {showPaymentSection && (
        <div className="p-6">
          <div className="font-semibold">Payment Method</div>
          <div className="flex justify-center items-center">
            {["UPI", "BANK"].map((method) => (
              <div
                key={method}
                className={`px-8 py-3 border-2 m-1 rounded-md cursor-pointer ${
                  selectedMethod === method
                    ? "bg-yellow-500 border-none"
                    : "border-black"
                }`}
                onClick={() => handleMethodSelect(method)}
              >
                <img
                  className="w-10"
                  src={
                    method === "UPI"
                      ? "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAACXBIWXMAAAsTAAALEwEAmpwYAAAET0lEQVR4nO3Zb2gbdRgH8O/P/sklWcfYGpyuQ+aLifhC9weddS69S7cOURGlik7xzd448Y1gLlnJLndp06ytda2rM3PW2UpaKoJjLwQR5gvxhTiHuk38g1h1NGmavxek4LZHUtcR0lzSRC+5F/nCvXrefJ48v9/d7y5APfXU87/lrxnYM9NYUEN4uVB97eAjh6xH98es/V0dMGIy05jMTIEyIaSSM1ifX7cOdF22BrrI7O+8AAKDkUIEpoYwlwmB1A9A6iR8uXVzYH+bNbCPLP69ZO51kFkRnoCRkpnG9hw8qaehpoNoXa5b+jsPLuM5Rche30OSboFRkgnBfRP/Pij9Hig1jt7lusXf+WEOfukyK/yTMErUSXyei0+Pg1KnoKbfhQ0z3Q1crxDLxS9dsnDREFOYm4A1PYnFPDylToJSQfRxPr59BX55CnLHU7X2IzWJxzXwlDzB1Hs8O4c5mS/YAGeEKainMaaBp+QYo2H/bXOcx07aUxC6a9pAehy/aOETxxldGWmkNvcuMuQUEhPYUgyfGGWUOMZIUTZTsSlwCv90TRpIj+NQKXz8DUZ/DjXSpmJTUPhLNZlC8h2cKYWPv84oNsRI8bYVn4LX8UxV8RREU+okUqvBxwYY/dFfYgoyf7mqU0gHYV8tPhZgtNDPyOcpNQX+2ao1kHob/nLwC32MZpVG2uQquhd+zD65q9JA8i12vhx81McoqjDy9ZSYgsI/pzs+PQJbYoxdKxcf9TKaPdJAbeIDxfbCT5Dsjbo2kBrD85Xg548wmvcw8rlK3pEO6NpA4k02USk+0sPoN3cDtbras09hrWX0ra5vX/FRFq4UH3Ez+sHVXLQBk8J/qVsDiRFs+y/4S2IzbXduI07qKIyX+W/W9O226dZA/BhcleIvuDi627lDG6/wX7X4HRugZ2LD7Fwl+K9FM2117iRO0rz7nMPR9hZd8XODsMaG2GK5+C9EK90h3l8MfxaSnYPeiQ/jsXLxn7paaKO4K3tM0FrzUwjuaEI1Ehtkx8vBnxHXkU1s18RzihCs6gEuNsB+Xi1+SlxP61wPaeNlYbSqX+gSg9iyWvwp0UYt7t3Flk0A1U48gJdWgz/hvJXWuB8ufNaRheuc7HgVtciCn31cCj8g3k4W9x4NPH/VpAgHa4InCY3RXpYshpecm4nryeILbta/OS//AmqVeR/2aOHDbnY9KG44q4mX+cWaf42OKqxPCx8R8Qrn6fhEA58x+RydNcVnE1XY+QL4qxEXXoTU3cwpgrryXCMkONnxIGqdKxJa573sWt6aX4y4sfR53CR3OArcJsNNCn8vjJCoFwfy8JmwE3uX6yZZGMg7Uc42S46tMErmPWzi5rJxsUTEifbcevbtKWfN/2qSHHfCSIl42O83fvlI5DDuy61lz+5LD6d/8d9ZJPtGGC3hw+yjiJtdjL6Gu1YUpUctNybw2Vpp34p/Juuppx7omn8A9lnTO7aOUG4AAAAASUVORK5CYII="
                      : "https://ukexch25.com/static/media/bankicon.bd51736454598dbb3611.png"
                  }
                  alt=""
                />
                <p className="text-center font-semibold mt-1">{method}</p>
              </div>
            ))}
          </div>

          <div className="border border-gray-500 mt-4 rounded">
            <div className="font-semibold p-2">Scan QR Code</div>
            <div className="flex flex-col items-center justify-center p-6">
              <img
                className="w-64"
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSi6wHRjT4Liiuh0CQkOdR2WFU9xFyeQA0TJZ-bQIqwiv6Ib-Slk7fqKDlvRqcXdLBvG-o&usqp=CAU"
                alt=""
              />
            </div>
            <div className="p-2 font-semibold">
              Payment Type: {selectedMethod}
            </div>
            {selectedMethod === "UPI" ? (
              <>
                <div className="p-2 font-semibold">
                  Display Name: Krishan Kant Nayak
                </div>
                <div className="p-2 font-semibold">
                  UPI ID: 9001464993@kotak811
                </div>
              </>
            ) : (
              <>
                <div className="p-2 font-semibold">
                  Account Name: Krishan Kant Nayak
                </div>
                <div className="p-2 font-semibold">
                  Account Number: 1234567890
                </div>
                <div className="p-2 font-semibold">IFSC: KKBK0000001</div>
                <div className="p-2 font-semibold">
                  Bank: Kotak Mahindra Bank
                </div>
              </>
            )}
          </div>

          <div className="p-6 border-[1px] border-gray-800 mt-4 rounded">
            <div className="text-lg font-semibold mb-2">
              Upload Payment Slip
            </div>
            <p className="mb-4 text-gray-600 text-sm">
              Take screenshot & upload below.
            </p>

            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white text-sm text-gray-700 cursor-pointer"
            />

            {/* Display uploaded image preview */}
            {imagePreview && (
              <div className="flex items-center justify-center mt-4">
                <img
                  className="w-32 h-auto rounded-md border"
                  src={imagePreview}
                  alt="Uploaded slip"
                />
              </div>
            )}
          </div>

          <div className="p-6 border-[1px] shadow-lg border-gray-600 mt-4 rounded">
            <div className="text-lg font-semibold mb-2">
              Enter Transaction ID
            </div>
            <p className="mb-4 text-gray-600">
              Paste the ID shown in payment confirmation screen.
            </p>

            <input
              type="text"
              placeholder="Enter Transaction ID"
              value={transactionId}
            readOnly
              className="px-4 py-2 w-[50%] border border-gray-300 rounded-md text-sm"
            />

            {/* Show dynamic message from OCR */}
            {message && (
              <div className="text-red-700 font-semibold p-2">{message}</div>
            )}
          </div>

          <div className="py-4 px-2  mt-8  text-center">
            {!loading && (
              <div
                className="bg-yellow-400 font-semibold rounded-lg shadow-lg py-2 cursor-pointer"
                onClick={handleSubmit}
              >
                Submit
              </div>
            )}
          </div>
        </div>
      )}

      <AnimatePresence>
        {showProcessingModal && (
          <ProcessingModal onComplete={onProcessingComplete} />
        )}
      </AnimatePresence>
    </div>
  );
};

export default Deposite;
// import React, { useState } from "react";
// import Tesseract from "tesseract.js";

// const DepositWithOCR = () => {
//   const [file, setFile] = useState(null);
//   const [utrNumber, setUtrNumber] = useState("");
//   const [loadingOCR, setLoadingOCR] = useState(false);

//   const handleFileChange = (e) => {
//     const uploadedFile = e.target.files[0];
//     setFile(uploadedFile);
//     setUtrNumber("");
//     if (!uploadedFile) return;

//     setLoadingOCR(true);
//     Tesseract.recognize(uploadedFile, "eng", {
//       logger: (m) => console.log(m),
//     })
//       .then(({ data: { text } }) => {
//         console.log("OCR Text:", text);

//         // 1. Try to find "UTR" label and capture what comes right after
//         const utrMatch = text.match(/UTR[:\s]*([A-Za-z0-9\-]+)/i);
//         if (utrMatch && utrMatch[1]) {
//           setUtrNumber(utrMatch[1]);
//           return;
//         }

//         // 2. Fallback: any long alphanumeric string
//         const genericMatch = text.match(/\b[A-Za-z0-9]{10,}\b/g) || [];
//         // filter out common false positives
//         const filtered = genericMatch.filter((s) => !/^Transaction$/i.test(s));
//         if (filtered.length) {
//           setUtrNumber(filtered[0]);
//         } else {
//           alert("UTR number not found in image.");
//         }
//       })
//       .catch((err) => {
//         console.error("OCR error:", err);
//         alert("OCR failed. Please enter UTR manually.");
//       })
//       .finally(() => {
//         setLoadingOCR(false);
//       });
//   };

//   return (
//     <div className="space-y-4">
//       <div>
//         <label className="block font-medium">Upload Payment Slip:</label>
//         <input
//           type="file"
//           accept="image/*"
//           onChange={handleFileChange}
//           className="mt-1"
//         />
//       </div>

//       {loadingOCR && (
//         <p className="text-blue-600">Scanning image for UTR number…</p>
//       )}

//       <div>
//         <label className="block font-medium">
//           Transaction ID (UTR Number):
//         </label>
//         <input
//           type="text"
//           value={utrNumber}
//           onChange={(e) => setUtrNumber(e.target.value)}
//           placeholder="UTR Number will auto-fill here"
//           className="mt-1 w-full border px-2 py-1 rounded"
//         />
//       </div>
//     </div>
//   );
// };

// export default DepositWithOCR;
// import React, { useState } from "react";
// import Tesseract from "tesseract.js";

// const DepositWithOCR = () => {
//   const [file, setFile] = useState(null);
//   const [utrNumber, setUtrNumber] = useState("");
//   const [loadingOCR, setLoadingOCR] = useState(false);
//   const [utrNotFound, setUtrNotFound] = useState(false);
//   const [preview, setPreview] = useState("");

//   const handleFileChange = (e) => {
//     const uploadedFile = e.target.files[0];
//     setFile(uploadedFile);
//     setUtrNumber("");
//     setUtrNotFound(false);

//     if (!uploadedFile) return;

//     setPreview(URL.createObjectURL(uploadedFile));
//     setLoadingOCR(true);

//     Tesseract.recognize(uploadedFile, "eng", {
//       logger: (m) => console.log(m),
//     })
//       .then(({ data: { text } }) => {
//         console.log("OCR Text:", text);

//         // Multiple keyword support
//         const regexes = [
//           /(?:UTR|Ref(?:erence)? No|Txn ID)[:\s\-]*([A-Za-z0-9\-]+)/i,
//         ];

//         let found = false;
//         for (const regex of regexes) {
//           const match = text.match(regex);
//           if (match && match[1]) {
//             setUtrNumber(match[1].trim());
//             found = true;
//             break;
//           }
//         }

//         // Fallback: Find any long alphanumeric strings
//         if (!found) {
//           const genericMatch = text.match(/\b[A-Za-z0-9]{10,}\b/g) || [];
//           const filtered = genericMatch.filter((s) => !/^Transaction$/i.test(s));
//           if (filtered.length) {
//             setUtrNumber(filtered[0]);
//             found = true;
//           }
//         }

//         if (!found) setUtrNotFound(true);
//       })
//       .catch((err) => {
//         console.error("OCR error:", err);
//         setUtrNotFound(true);
//       })
//       .finally(() => {
//         setLoadingOCR(false);
//       });
//   };

//   return (
//     <div className="space-y-5 max-w-md mx-auto mt-6 p-4 border rounded shadow">
//       <h2 className="text-lg font-semibold text-center">Upload Payment Slip (OCR Enabled)</h2>

//       <div>
//         <label className="block font-medium">Upload Payment Slip:</label>
//         <input
//           type="file"
//           accept="image/*"
//           onChange={handleFileChange}
//           className="mt-1 w-full text-sm border border-gray-300 rounded p-2"
//         />
//       </div>

//       {preview && (
//         <div className="mt-2 text-center">
//           <img src={preview} alt="Slip Preview" className="w-48 mx-auto rounded border" />
//         </div>
//       )}

//       {loadingOCR && <p className="text-blue-600 text-sm">🔍 Scanning image for UTR number...</p>}
//       {utrNotFound && <p className="text-red-600 text-sm">❌ UTR not found in image.</p>}

//       <div>
//         <label className="block font-medium">Transaction ID (UTR Number):</label>
//         <input
//           type="text"
//           value={utrNumber}
//           onChange={(e) => setUtrNumber(e.target.value)}
//           placeholder="Auto-filled or enter manually"
//           className="mt-1 w-full border px-3 py-2 text-sm rounded"
//         />
//       </div>
//     </div>
//   );
// };

// export default DepositWithOCR;
