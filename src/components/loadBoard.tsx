import { createElement } from "react";

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

  imgContainer.style.animation = "fade-out 1000ms linear forwards";
  choicesContainer.style.animation = "fade-out 1000ms linear forwards";

  setTimeout(() => {
    imgContainer.remove();
    choicesContainer.remove();
    // titleContainer.style.display = "block";
    titleContainer.style.animation =
      "move-title-container 1000ms linear forwards";
    titleLetters.forEach(
      (letter) =>
        (letter.style.animation = "move-letters 1000ms linear forwards")
    );
    mainContainer.style.flexDirection = "row";
    mainContainer.style.alignItems = "stretch";
  }, 1000);

  // if (player === "single") console.log("single");
  // if (player === "multi") console.log("multiplayer");

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
      side.append(block);
    }
  };

  createTiles("top-side", topBoardContainer);
  createTiles("bottom-side", bottomBoardContainer);

  const fleetElement: HTMLDivElement = document.createElement("div");
  mainContainer.append(fleetElement);
  fleetElement.classList.add("fleet-container");
};

export default loadBoard;
