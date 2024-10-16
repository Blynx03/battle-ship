import { useContext, useState, useEffect } from "react";
import ReactDOM from "react-dom/client";
import GameName from "./GameName";
import FleetChoices from "./FleetChoices";
import UserContext from "../context/UserContext";
import generateBoardGrid from "./generateBoardGrid";
import {PlaceFleet} from "./PlaceFleet";

const LoadBoard = () => {
  const context = useContext(UserContext);
    if (!context) {
    return <div id="load-board">Loading the board...</div>;
  }
  const {
    blockSize,
    setBlockSize,
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
      // create board
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

      // setTimeout(() => {
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

      // creating container that will contain all other information (e.g. title, fleets, buttons) and append to main page

      const infoContainerDiv: HTMLDivElement = document.createElement("div");
      infoContainerDiv.className = "info-container";
      mainContainer.append(infoContainerDiv);
      infoContainerDiv.append(titleContainer);

      const root = ReactDOM.createRoot(infoContainerDiv);
      root.render(
        <>
          <GameName value="game" />
          <FleetChoices
            blockSize={blockSize}
            setBlockSize={setBlockSize}
            isVertical={isVertical}
            setIsVertical={setIsVertical}
            tickedShip={tickedShip}
            setTickedShip={setTickedShip}
            tileCount={tileCount}
            setTileCount={setTileCount}
          />
          {generateBoardGrid(tickedShip, tileCount, isVertical)}
          <PlaceFleet
            isVertical={isVertical}
            setIsVertical={setIsVertical}
            playerTile={playerTile}
            setPlayerTile={setPlayerTile}
            tickedShip={tickedShip}
            setTickedShip={setTickedShip}
            tileCount={tileCount}
            setTileCount={setTileCount}
          />
        </>
      );

      return () => {root.unmount();
      infoContainerDiv.remove();
      };
    }
  }, [pageReady]);

  useEffect(() => {
    setPageReady(true);
  }, []);



  return null;
};

export default LoadBoard;
