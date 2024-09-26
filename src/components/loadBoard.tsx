import { ReactElement, useContext } from "react";
import ReactDOM from "react-dom/client";
import GameName from "./GameName";
import FleetChoices from "./FleetChoices";

const loadBoard = (player: string) => {
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
  imgContainer.remove();
  choicesContainer.remove();
  // titleContainer.style.display = "block";
  titleContainer.style.animation =
    "move-title-container 1000ms linear forwards";
  titleLetters.forEach(
    (letter) => (letter.style.animation = "move-letters 1000ms linear forwards")
  );
  mainContainer.style.flexDirection = "row";
  mainContainer.style.alignItems = "stretch";
  // }, 1000);

  imgContainer.style.animation = "fade-out 1000ms linear forwards";
  choicesContainer.style.animation = "fade-out 1000ms linear forwards";

  // creating container to contain all other information (e.g. title, fleets, buttons) and append to main page
  const infoContainerDiv: HTMLDivElement = document.createElement("div");
  infoContainerDiv.className = "info-container";
  mainContainer.append(infoContainerDiv);
  const infoContainer = document.querySelector(
    ".info-container"
  ) as HTMLElement;
  infoContainer.append(titleContainer);

  // Setting up the board game
  const boardElement: HTMLDivElement = document.createElement("div");
  mainContainer.append(boardElement);
  boardElement.classList.add("boardgame-container");

  // Setting up top player
  const topContainerElement: HTMLDivElement = document.createElement("div");
  const bottomContainerElement: HTMLDivElement = document.createElement("div");
  const boardGameContainer = document.querySelector(
    ".boardgame-container"
  ) as HTMLElement;
  boardGameContainer.append(topContainerElement);
  boardGameContainer.append(bottomContainerElement);
  topContainerElement.className = "top-container";
  bottomContainerElement.className = "bottom-container";
  const topBoardContainer = document.querySelector(
    ".top-container"
  ) as HTMLElement;
  const bottomBoardContainer = document.querySelector(
    ".bottom-container"
  ) as HTMLElement;

  // Setting up the tiles
  const createTiles = (playerSide: string, side: HTMLElement): void => {
    for (let i = 1; i <= 100; i++) {
      const block: HTMLDivElement = document.createElement("div");
      block.className = `block ` + `${playerSide}${i}`;
      block.id = `${playerSide}${i}`;
      side.append(block);
    }
  };

  createTiles("top-side", topBoardContainer);
  createTiles("bottom-side", bottomBoardContainer);

  interface Props {
    value: "main" | "game";
  }

  const ShowFleet = (): JSX.Element => (
    <>
      <GameName value="game" />
      <FleetChoices />
    </>
  );

  const root = ReactDOM.createRoot(infoContainer);
  if (infoContainer) {
    root.render(<ShowFleet />);
  }
};

export default loadBoard;
