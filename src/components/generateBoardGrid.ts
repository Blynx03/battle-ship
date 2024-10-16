import React from "react";
import { handleTileDragOver, handleTileDragLeave, setTile } from "./PlaceFleet";


const generateBoardGrid = (tickedShip:string, tileCount:number,isVertical:boolean) => {

  // Setting up the board/grid
  const mainContainer = document.querySelector(
    ".main-page-container"
  ) as HTMLElement;
  const boardElement: HTMLDivElement = document.createElement("div");
  mainContainer.append(boardElement);
  boardElement.classList.add("boardgame-container");

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
      const tile: HTMLDivElement = document.createElement("div");
      tile.className = `tile ` + `${playerSide}${i}`;
      tile.setAttribute(`${playerSide}`, "");
    if (playerSide === "player-side") {
      tile.addEventListener("drop", (e) => {
        e.preventDefault();
        const droppedTile = e.target;
        console.log('dropped Tile = ', droppedTile)
        if (droppedTile) {
        setTile(droppedTile, playerSide, tickedShip);
        }
    });
    }
      tile.addEventListener("dragleave", ((e) => {
        const leftTile = e.target;
        if (leftTile) {
          handleTileDragLeave(leftTile);
        }
      }))
      tile.addEventListener("dragover", ((e)=> {
        const draggedTile = e.target;
      if (draggedTile) {
        handleTileDragOver(draggedTile, tickedShip, tileCount, isVertical)
      }
    }));
      tile.id = `${playerSide}${i}`;
      side.append(tile);
      if (playerSide === "player-side") {
      }
    }
  };

  createTiles("opponent-side", topBoardContainer);
  createTiles("player-side", bottomBoardContainer);
};

export default generateBoardGrid;
