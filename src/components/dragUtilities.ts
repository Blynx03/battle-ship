import React from "react";
import { UserContextType } from "../context/UserContext";
import assignBackgroundColor from "./assignBackgroundColor";

// need to create this as a wrapper to execute preventDefault, and pass
// the event.target to the placeShip. The logic for the opponent
// side can only pass the event.target but not the event, so this is the
// best solution to get around with it
export function handleDragOver(
    event: React.DragEvent,
    tileNum: number,
    context: UserContextType
) {
    event.preventDefault();
    let targetEl = event.target as HTMLElement;
    handlePlaceShip(targetEl, tileNum, context);
}

// handles to show the orientation of the ship to be laid out
// and how many tiles are needed to accommodate the ship. It will also
// show the background color red and green, where red is "not okay" and
// green is "ok" to be dropped on the tile. Also this should change the
// ship's name's color to red to mark as set.
export function handlePlaceShip(
    targetElement: HTMLElement,
    tileNum: number,
    context: UserContextType
) {
    const {
        playerSide,
        tickedShip,
        isVertical,
        playerTiles,
        opponentTiles,
        tileCount,
        setChosenTiles,
        setColor,
    } = context;

    // extract the number in the tile
    tileNum =
        playerSide === "player-side"
            ? parseInt(
                  targetElement.getAttribute("id")?.replace(playerSide, "") ||
                      "0",
                  10
              )
            : tileNum;
    let tempChosenTiles: number[] = [];

    //get associated tiles based on orientation
    if (playerSide) {
        const { isTaken, bgColor, tiles } = assignBackgroundColor(
            tileNum,
            playerSide,
            isVertical,
            tileCount
        );

        tempChosenTiles = tiles.filter((value) => value >= 1 && value <= 100);

        // show background color result when dragged on tiles
        for (let i = 0; i < tempChosenTiles.length; i++) {
            let tileElement = document.querySelector(
                `#${playerSide}${tempChosenTiles[i]}`
            ) as HTMLElement;
            if (tileElement) {
                tileElement.style.background = bgColor as string;
            }
        }


        // if (targetElement && bgColor === "palegreen" && !isTaken) {
        //     targetElement.style.background = bgColor as string;
        // } else {
        //     for (let i = 0; i < tempChosenTiles.length; i++) {
        //         let tileElement = document.querySelector(
        //             `#${playerSide}${tempChosenTiles[i]}`
        //         ) as HTMLElement;
        //         if (tileElement) {
        //             tileElement.style.background = bgColor as string;
        //         }
        //     }
        // }
        setColor(bgColor);
    }
    setChosenTiles(tempChosenTiles);
    // setColor(bgColor);
}

// handles to reset the background color when mouse leaves the tile
export function handleDragLeave(playerSide: string, chosenTiles: number[]) {
    for (let i = 0; i < chosenTiles.length; i++) {
        let el = document.querySelector(
            `#${playerSide}${chosenTiles[i]}`
        ) as HTMLElement;
        el.style.background = "none";
        if (el && el.hasChildNodes()) {
            el.style.background = "none";
            for (let child of el.children) {
                (child as HTMLElement).style.background = "none";
            }
        }
    }
}

// handles if ship is okay to be dropped on the tile, if not, then it
// should kind of reset the image.
export function handleDrop(target: HTMLElement, context: UserContextType) {
    const {
        playerSide,
        blockSize,
        isVertical,
        setPlayerTiles,
        setOpponentTiles,
        tickedShip,
        tileCount,
        setFleetState,
        setCounter,
        chosenTiles,
        color,
        imageRef,
    } = context;

    // if ship is not okay to drop, then it resets
    if (color === "red" || !target.hasAttribute(playerSide)) {
        chosenTiles.map((tile) => {
            let tileEl = document.querySelector(
                `#${playerSide}${tile}`
            ) as HTMLElement;
            if (tileEl) {
                tileEl.style.background = "none";
            }
        });
        // setCounter(prev => prev);
        // if ship is OK to be dropped then image of ship will show up on the tiles with correct orientation
    } else {
        // stop drag on image
        if (imageRef.current) {
            imageRef.current.draggable = false;
        }
        // count ship placed on the board
        setCounter((prev) => prev + 1);
        // change ship's isGreen to "true" to disable the onClick and change the font color to red
        setFleetState((prevFleetState) =>
            prevFleetState.map((ship) =>
                ship.ship === tickedShip ? { ...ship, isGreen: true } : ship
            )
        );
        // min and max will determine the tile's positioning, while width and height will get the total blocks size
        let min = Math.min(...chosenTiles);
        let max = Math.max(...chosenTiles);
        let image = new Image();
        image.src = `./images/${tickedShip}.png`;
        image.style.zIndex = "8";

        // remove background color and add num to playerTiles and  set taken to true and add "taken" attribute to the element
        for (let i = 0; i < chosenTiles.length; i++) {
            let el = document.querySelector(
                `#${playerSide}${chosenTiles[i]}`
            ) as HTMLElement;
            el.style.background = "none";
            el.setAttribute("taken", "");
        }

        // set player/opponent tiles
        playerSide === "player-side"
            ? setPlayerTiles((prevTiles) => [
                  ...prevTiles,
                  {
                      ship: tickedShip,
                      data: {
                          num: [...chosenTiles],
                          taken: Array.from(
                              { length: chosenTiles.length },
                              () => true
                          ),
                      },
                  },
              ])
            : setOpponentTiles((prevTiles) => [
                  ...prevTiles,
                  {
                      ship: tickedShip,
                      data: {
                          num: [...chosenTiles],
                          taken: Array.from(
                              { length: chosenTiles.length },
                              () => true
                          ),
                      },
                  },
              ]);

        if (isVertical) {
            image.width = blockSize.height * tileCount - 10;
            image.height = blockSize.width - 20;
            // get the element with the max value in the chosenTiles to position the image from the bottom tile
            let tileEl = document.querySelector(
                `.${playerSide}${max}`
            ) as HTMLElement;
            tileEl?.appendChild(image);
            image.style.transformOrigin = "top left";
            image.style.transform = "rotate(270deg)";
            image.style.left = "10px";
            image.style.bottom = `-${blockSize.height - 10}px`;
        } else {
            image.width = blockSize.width * tileCount - 10;
            image.height = blockSize.height - 10;
            image.style.top = "5px";
            image.style.left = "5px";

            // get the element with the min value in the chosenTiles to position the image from the left tile
            let tileEl = document.querySelector(`.${playerSide}${min}`);
            tileEl?.appendChild(image);
        }
    }
}
