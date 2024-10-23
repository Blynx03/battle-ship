import { useContext, useState, useEffect } from "react";
import ReactDOM from "react-dom/client";
import GameName from "./GameName";
import FleetChoices from "./FleetChoices";
import UserContext from "../context/UserContext";
import generateBoardGrid from "./generateBoardGrid";
import { PlaceFleet } from "./PlaceFleet";


const LoadBoard = () => {
  const context = useContext(UserContext);
    if (!context) {
    return <div id="load-board">Loading the board...</div>;
  }
  const {
    isVertical,
    setIsVertical,
    tickedShip,
    setTickedShip,
    playerTile,
    setPlayerTile,
    tileCount,
    setTileCount,
  } = context;
  const [pageReady, setPageReady] = useState(false);

  useEffect(() => {
    if (pageReady) {
      // create board grid
      generateBoardGrid(tickedShip, tileCount, isVertical);

      // create fleet and information section
      const mainContainer = document.querySelector(
        ".main-page-container"
      ) as HTMLElement;
      const imgContainer = document.querySelector(
        ".main-page-image-container"
      ) as HTMLElement;
      const choicesContainer = document.querySelector(
        ".main-page-choices-container"
      ) as HTMLElement;
      const titleContainer = document.querySelector(
        ".main-page-title-container"
      ) as HTMLElement;
      const titleLetters = document.querySelectorAll(
        ".letters"
      ) as NodeListOf<HTMLElement>;

      if (imgContainer && choicesContainer && titleContainer) {
        imgContainer.style.animation = "fade-out 1000ms linear forwards";
        choicesContainer.style.animation = "fade-out 1000ms linear forwards";
        setTimeout(() => {
          imgContainer.remove();
          choicesContainer.remove();
        }, 1000);

        titleContainer.style.animation =
          "move-title-container 1000ms linear forwards";
        titleLetters.forEach(
          (letter) =>
            (letter.style.animation = "move-letters 1000ms linear forwards")
        );
      }
      if (mainContainer) {
        mainContainer.style.flexDirection = "row";
        mainContainer.style.alignItems = "stretch";
      }
    }
  }, [pageReady]);

  useEffect(() => {
    setPageReady(true);
  }, []);

       return (
        <>
          <GameName value="game" />
          {context && (
            <>
              <FleetChoices />
              {/* {generateBoardGrid(tickedShip, tileCount, isVertical)} */}
              <PlaceFleet />
            </>
          )}
        </>
      );

};

export default LoadBoard;
