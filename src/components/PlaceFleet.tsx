import React from "react";


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
    const getTileId = targetTile.id;
    const tileNum = +getTileId.replace("player-side", "") || getTileId.replace("opponent-side", "");
    // console.log('tickedShip = ', tickedShip)
    // console.log('tileCount = ', tileCount)
    // console.log('is vertical = ', isVertical)

    if (targetTile.hasAttribute("player-side")) {
      if (tileCount === 2) {
        if (isVertical) {
          if (+tileNum - 10 < 1 || +tileNum > 90) {
            targetTile.style.background = "red";
          }
        }
      }
      targetTile.style.background = "hsla(120, 85%, 85%, 1)";
    } 
  }

  function handleTileDragLeave(tile: EventTarget) {
    const targetTile = tile as HTMLDivElement;
      targetTile.style.background = "none"
  }

  function PlaceFleet(): JSX.Element {
    return (
      <div> This is placefleet container</div>
    )
  }


export {PlaceFleet, setTile, handleTileDragOver, handleTileDragLeave};
