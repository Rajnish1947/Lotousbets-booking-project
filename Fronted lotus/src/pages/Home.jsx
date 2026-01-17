

import React, { useState } from "react";
import Navbar from "../components/Nabar";
import SideBar from "../components/SideBar";
import { Header } from "../components/Header";
import SideBarRight from "../components/SideBarRight";
import LoginPoup from "../components/LoginPoup";

const Home = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [authMode, setAuthMode] = useState("Login"); 

  return (
    <>
      {showLogin && (
        <LoginPoup setShowLogin={setShowLogin} initialMode={authMode} />
      )}

    
      <div className="flex pt-[120px] bg-gray-200 min-h-screen px-4 lg:px-12">
    
        <main className="md:w-full md:mr-0">
          <Header />
        </main>

 
      </div>
    </>
  );
};

export default Home;
