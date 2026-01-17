import React from "react";
import Banner from "./Banner";
import Categories from "./Categories";
import AllGames from "./AllGames";

import Casino from "./Casino";
import CardsGames from "./CardsGames";

import Populargames from "./Populargames";
import Lastcomponenet from "./Lastcomponenet";
const Header = () => {
  return (
    <div className="w-full lg:max-w-[600px]  lg:ml-2 mr-0 ">
      <Banner />

      <Categories />

      <AllGames />

      <Casino />
      <CardsGames />
      <Populargames />
      <Lastcomponenet />
    </div>
  );
};
export default Header;
