import { useContext, useEffect, useState } from "react";
import UserContext from "../context/UserContext";
import LoadBoard from "./LoadBoard";
import MainPageContent from "./MainPageContent";

const MainPage = () => {
  const context = useContext(UserContext);
  const [showLoadBoard, setShowLoadBoard] = useState(false);
  const setPlayerCount = context?.setNumberOfPlayers;

  // load board game
  const handleClick = (players: string) => {
    if (!setPlayerCount) {
      console.error;
      return;
    }

    // animate clicked button
    if (players === "single") {
      setPlayerCount(1);
      const singleBtn = document.querySelector(".single-player") as HTMLElement;
      singleBtn.style.animation = "button-click 1000ms linear forwards";
    } else if (players === "multi") {
      setPlayerCount(2);
      const multiBtn = document.querySelector(".multi-player") as HTMLElement;
      multiBtn.style.animation = "button-click 1000ms linear forwards";
    }

    // animate battleship image
    const shipImage = document.querySelector(
      ".battleship-image"
    ) as HTMLElement;
    // shipImage.style.animation = "move-ship 3000ms ease linear";
    shipImage.style.animation = "move-ship 1000ms linear forwards";
    setTimeout(() => {
      setShowLoadBoard(true);
    }, 1000);
  };

  return (
    <div className="main-page-container">
      {!showLoadBoard 
      ? <MainPageContent handleClick={handleClick}/> 
      : 
      <div className="info-container" >
      <LoadBoard /></div>}
      
    </div>
  );
};

export default MainPage;
