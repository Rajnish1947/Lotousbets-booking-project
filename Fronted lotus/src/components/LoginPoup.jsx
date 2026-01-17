
import React, { useState, useEffect } from "react";
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";
import { IoClose } from "react-icons/io5";
import { FaTag } from "react-icons/fa";
import { useAuth } from "../context/Authcontext";
import { toast } from "react-toastify";

const LoginPoup = ({ setShowLogin, initialMode = "Login" }) => {
  const [showLogin, setShowLoginMode] = useState(initialMode);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [referralCode, setReferralCode] = useState("");

  const { login, register, checkUsernameUnique } = useAuth();

  const [isUsernameUnique, setIsUsernameUnique] = useState(true);
  const [checkingUsername, setCheckingUsername] = useState(false);

  // Check username uniqueness on username change (debounced)
  useEffect(() => {
    if (showLogin !== "Register") return; 
    if (username.length < 4) {
      setIsUsernameUnique(false);
      return;
    }

    let isMounted = true;

    const check = async () => {
      setCheckingUsername(true);
      const unique = await checkUsernameUnique(username);
      if (isMounted) {
        setIsUsernameUnique(unique);
        console.log(setCheckingUsername);
        setCheckingUsername(false);
      }
    };

    check();

    return () => {
      isMounted = false;
    };
  }, [username, showLogin, checkUsernameUnique]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (showLogin === "Register") {
      if (password !== confirmPassword) {
        toast.error("Passwords do not match!");
        return;
      }

      if (!isUsernameUnique) {
        toast.error("Username already exists!");
        return;
      }

      await register({
        username,
        password,
        reenterpassword: confirmPassword,
      });

      setShowLoginMode("Login");
    } else {
      await login({ username, password });
      setShowLogin(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 z-[999] flex items-center justify-center">
      <div className="bg-white p-1 rounded-lg w-[550px] max-w-full shadow-xl animate-zoomIn relative">
   
                <button style={{ margin: "-20px -25px 37px 8px" }} onClick={() =>setShowLogin(false) } className=" z-18 bg-black rounded-full text-white right-3 absolute  text-xl ">
                  <IoClose />
                </button>

        <div className="flex justify-center w-full py-1 bg-emerald-600 mb-4 rounded">
          <img
            src="https://api7.live/sitethemes/lotusbets.com/logo.png"
            alt="Logo"
            className="h-11"
          />
        </div>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            {showLogin === "Login" && (
              <label className="block text-sm">Username / Mobile No.</label>
            )}
            <input
              type="text"
              autoComplete="off"
              placeholder={
                showLogin === "Login" ? "Enter username" : "User Name"
              }
              className="w-full p-3 border border-gray-300 rounded"
              value={username}
              onChange={(e) => setUsername(e.target.value.trim())}
              disabled={checkingUsername}
            />
            {showLogin === "Register" && username.length >= 4 && (
              <p
                className={`text-xs mt-1 ${
                  isUsernameUnique ? "text-green-600" : "text-red-600"
                }`}
              >
                {checkingUsername
                  ? "Checking username..."
                  : isUsernameUnique
                  ? "Username available"
                  : "Username already exists"}
              </p>
            )}
          </div>

          {(showLogin === "Login" || showLogin === "Register") && (
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                autoComplete="off"
                placeholder="Password"
                className="w-full p-3 border border-gray-300 rounded pr-10"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <span
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 text-gray-500 cursor-pointer"
              >
                {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
              </span>
            </div>
          )}

          {showLogin === "Register" && (
            <>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  autoComplete="off"
                  placeholder="Re-enter password"
                  className="w-full p-3 border border-gray-300 rounded pr-10"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <span
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-2.5 text-gray-500 cursor-pointer"
                >
                  {showConfirmPassword ? (
                    <AiOutlineEyeInvisible />
                  ) : (
                    <AiOutlineEye />
                  )}
                </span>
              </div>

              <div className="relative">
                <input
                  type="text"
                  autoComplete="off"
                  placeholder="Referral Code"
                  className="w-full p-3 border border-gray-300 rounded pr-10"
                  value={referralCode}
                  onChange={(e) => setReferralCode(e.target.value)}
                />
                <span className="absolute right-3 top-2.5 text-gray-500">
                  <FaTag />
                </span>
              </div>
            </>
          )}

          {showLogin === "Login" && (
            <p className="text-emerald-600 underline text-xs cursor-pointer">
              Forgot Password?
            </p>
          )}

          <button
            type="submit"
            disabled={
              showLogin === "Register" &&
              (username.length < 4 || !isUsernameUnique)
            }
            className="w-full bg-emerald-600 mt-3 text-white py-2 rounded font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {showLogin === "Login" ? "Log In" : "Register"}
          </button>

          {showLogin === "Login" && (
            <button className="w-full mt-2 bg-emerald-600 py-2 rounded text-white border font-medium">
              Demo Login
            </button>
          )}

          <div className="mt-2 text-xs text-center">
            {showLogin === "Login" ? (
              <>
                New User?{" "}
                <span
                  className="text-blue-600 cursor-pointer font-medium"
                  onClick={() => setShowLoginMode("Register")}
                >
                  Create an account
                </span>
              </>
            ) : (
              <>
                Already have an account?{" "}
                <span
                  className="text-blue-600 cursor-pointer font-medium"
                  onClick={() => setShowLoginMode("Login")}
                >
                  Log in here
                </span>
              </>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPoup;
