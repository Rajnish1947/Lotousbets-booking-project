import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useAuth } from "./context/Authcontext"; 
import Navbar from "./components/Nabar";
import LoginPoup from "./components/LoginPoup";
import SideBar from "./components/SideBar";
import SideBarRight from "./components/SideBarRight";
import Footer from "./components/Footer";
import Header from "./components/Header";
import AllGames from "./components/AllGames";
import Ckricket from "./pages/Ckricket";
import Tennis from "./pages/Tennis";
import Football from "./pages/Football";
import GameDetails from "./pages/GameDatails";
import SideNavbar from "./components/SideNavbar";
import LaftSideNavbar from "./components/LaftSideNavbar";
import Deposite from "./pages/Deposite";
import Withdraw from "./pages/Withdraw";
import DepositeAndWithdraw from "./pages/DepositeAndWithdraw";
import Openbets from "./pages/Openbets";
import Profitloss from "./pages/Profitloss";
import BanckDetails from "./pages/BanckDetails";
import Bonous from "./pages/Bonous";
import PopRefferel from "./pages/PopRefferel";
import Refferelstatement from "./pages/Refferelstatement";
import Refferel from "./pages/Refferel";
import StakeStting from "./pages/StakeStting";
import RulesandRegulation from "./pages/RulesandRegulation";
import Exclusion from "./pages/Exclusion";
import Responsibilty from "./pages/Responsibilty";
import Privacy from "./pages/Privacy";
import ChangePassword from "./pages/ChangePassword";

import { ToastContainer } from 'react-toastify';


const App = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isleftSidebarOpen, setIsleftSidebarOpen] = useState(false);
  const [authMode, setAuthMode] = useState("Login");
  const [showRefer, setShowRefer] = useState(false);

  const { user } = useAuth(); 
  const isLoggedIn = !!user;   

  return (
    <Router>
<ToastContainer position="top-center" autoClose={2000} className="p-4 tetx-black "/>
      {/* Login Popup */}
      {showLogin && (
        <LoginPoup setShowLogin={setShowLogin} initialMode={authMode} />
      )}

      {/* Referral Popup */}
      {showRefer && <PopRefferel setShowRefer={setShowRefer} />}

      {/* Navbar */}
      <div className="fixed top-0 left-0 right-0 z-50">
        <Navbar
          setShowLogin={setShowLogin}
          setAuthMode={setAuthMode}
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
          isleftSidebarOpen={isleftSidebarOpen}
          setIsleftSidebarOpen={setIsleftSidebarOpen}
        />
      </div>

      

      <div className="flex pt-[60px] bg-gray-200 min-h-screen px-4 mb-5 lg:px-12">
        {/* Sidebar Navigation */}
        <SideNavbar
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
          isLoggedIn={isLoggedIn}
          showRefer={showRefer}
          setShowRefer={setShowRefer}
        />
        <LaftSideNavbar isleftSidebarOpen={isleftSidebarOpen} setIsleftSidebarOpen={setIsleftSidebarOpen} />
        
        {/* Page Layout */}
        <div className="flex w-full mt-[20px]">
          {/* Left Sidebar */}
          <aside className="hidden pt-[40px] lg:block w-64 mb-8 ml-6">
            <div className="sticky top-[80px]">
              <SideBar />
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex flex-col pt-[40px] bg-gray-200 min-h-screen w-full mb-5 lg:px-1">
            <Routes>
              <Route path="/" element={<Header />} />
              <Route path="/games" element={<AllGames />} />
              <Route path="/ckricket" element={<Ckricket />} />
              <Route path="/tennis" element={<Tennis />} />
              <Route path="/football" element={<Football />} />
              <Route path="/rules-regulations" element={<RulesandRegulation />} />
              <Route  path="/game-details/:eid/:gameId/:marketId" element={<GameDetails />} />
              <Route path="/Deposite" element={<Deposite />} />
              <Route path="/withdraw" element={<Withdraw />} />
              <Route path="/with&deposite" element={<DepositeAndWithdraw />} />
              <Route path="/open-bets" element={<Openbets />} />
              <Route path="/profit-loss" element={<Profitloss />} />
              <Route path="/bank-details" element={<BanckDetails />} />
              <Route path="/bonus-statement" element={<Bonous />} />
              <Route path="/referral" element={<Refferel />} />
              <Route path="/stake-settings" element={<StakeStting />} />
              <Route path="/rules-regulations" element={<RulesandRegulation />} />
              <Route path="/exclusion-policy" element={<Exclusion />} />
              <Route path="/responsible-gambling" element={<Responsibilty />} />
              <Route path="/referral-statement" element={<Refferelstatement />} />
              <Route path="/privacy-policy" element={<Privacy />} />
              <Route path="/change-password" element={<ChangePassword />} />
         
              
            </Routes>
          </main>

          {/* Right Sidebar */}
          <aside className="hidden pt-[40px] lg:block ml-3 mr-12">
            <div className="sticky top-[80px]">
              <SideBarRight isLoggedIn={isLoggedIn} />
            </div>
          </aside>
        </div>
      </div>

      {/* Footer */}
      <footer className="py-2 text-center w-full">
        <Footer />
      </footer>
    </Router>
  );
};

export default App;



