import React from "react";
import { UserContextType } from "../context/UserContext";


  function setTile(tile:EventTarget, playerSide: string, tickedShip:string) {
    const el = document.querySelector(`${tickedShip}`);
      if (el) {
      el.remove();
    }

    // console.log("settile ", tile)
    if (tile) {
      if (playerSide === "player-side") {
      (tile as HTMLElement).style.background = "hsla(120, 85%, 85%, 1)";
      } else {
      (tile as HTMLElement).style.background = "red";
      }
    }
  
  }
  
  function handleTileDragOver(tile: EventTarget, tickedShip: string, tileCount: number, isVertical:boolean) {
      // console.log("handle tile drag over tickedShip, tile, tileCount, number = ", tickedShip, tile, tileCount, isVertical);
      // console.log(tileCount);
    const targetTile = tile as HTMLDivElement;
    if (targetTile.hasAttribute("player-side")) {
      targetTile.style.background = "hsla(120, 85%, 85%, 1)";
    } else {
      targetTile.style.background = "red";
    }
  }

  function handleTileDragLeave(tile: EventTarget) {
    const targetTile = tile as HTMLDivElement;
      targetTile.style.background = "none"
  }

const PlaceFleet = ({
  isVertical,
  setIsVertical,
  playerTile,
  setPlayerTile,
  tickedShip,
  setTickedShip,
  tileCount, 
  setTileCount
}: Pick<
  UserContextType,
  | "isVertical"
  | "setIsVertical"
  | "playerTile"
  | "setPlayerTile"
  | "tickedShip"
  | "setTickedShip"
  | "tileCount"
  | "setTileCount"
>): JSX.Element => {
 


  
};

export {PlaceFleet, setTile, handleTileDragOver, handleTileDragLeave};
