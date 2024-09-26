import { useContext } from "react";
import loadBoard from "./loadBoard";
import UserContext from "../context/UserContext";
import GameName from "./GameName";

const MainPage = () => {
  const players = useContext(UserContext);
  // const playerCount = players?.numberOfPlayers;
  const setPlayerCount = players?.setNumberOfPlayers;

  // load board game
  const handleClick = (players: string) => {
    if (!setPlayerCount) {
      console.error;
      return;
    }

    // animate clicked button
    if (players === "single") {
      const singleBtn = document.querySelector(".single-player") as HTMLElement;
      singleBtn.style.animation = "button-click 1000ms linear forwards";
    } else if (players === "multi") {
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
      loadBoard(players);
    }, 1000);
  };

  return (
    <div className="main-page-container">
      <GameName value="main" />
      <div className="main-page-image-container">
        <img
          src="../images/battleship-front.png"
          alt="battleship"
          className="battleship-image"
        />
        <div className="ocean-image"></div>
      </div>

      <div className="main-page-choices-container">
        <h3>
          CHOOSE <span>YOUR</span>
          <span>CHALLENGE!</span>
        </h3>
        <div className="main-page-button-container">
          <button
            className="btn single-player"
            onClick={() => handleClick("single")}
          >
            Single Player
          </button>
          <button
            className="btn multi-player"
            onClick={() => handleClick("multi")}
          >
            Multiplayer
          </button>
        </div>
      </div>
    </div>
  );
};

export default MainPage;
