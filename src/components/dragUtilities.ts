import React from "react";
import{ UserContextType } from "../context/UserContext";

// handles to show the orientation of the ship to be laid out 
// and how many tiles are needed to accommodate the ship. It will also
// show the background color red and green, where red is "not okay" and 
// green is "ok" to be dropped on the tile. Also this should change the 
// ship's name's color to red to mark as set.
export function handleDragOver(e: React.DragEvent, playerSide: string, tileNum: number, context: UserContextType) {
    e.preventDefault();
    const {isVertical, playerTiles, tileCount, chosenTiles, setChosenTiles, color, setColor} = context;

    // extract the number in the tile
    const el = e.target as HTMLElement;
    tileNum = parseInt(el.getAttribute('id')?.replace(playerSide, "") || "0", 10);

    let bgColor: string = ''
    let tempChosenTiles: number[] = [];
    let tiles: number[] = [];
    let redHorTwoTiles: number[] = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100];
    let redHorThreeTiles: number[] = [1, 10, 11, 20, 21, 30, 31, 40, 41, 50, 51, 60, 61, 70, 71, 80, 81, 90, 91, 100];
    let redHorFourTiles: number[] = [1, 9, 10, 11, 19, 20, 21, 29, 30, 31, 39, 40, 41, 49, 50, 51, 59, 60, 61, 69, 70, 71, 79, 80, 81, 89, 90, 91, 99, 100];
    let redHorFiveTiles: number[] = [1, 2, 9, 10, 11, 12, 19, 20, 21, 22, 29, 30, 31, 32, 39, 40, 41, 42, 49, 50, 51, 52, 59, 60, 61, 62, 69, 70, 71, 72, 79, 80, 81, 82, 89, 90, 91, 92, 99, 100];
    let taken: boolean = false;

    function checkIfTaken(tiles:number[]):boolean {
        return playerTiles.some(tile => tiles.includes(tile.num));
    }

    //get associated tiles based on orientation
    if (playerSide === "player-side") {
        switch(tileCount) {
            case 2: if (isVertical) {
                        tiles.push(tileNum - 10, tileNum);
                        // Check if any of the tiles exists in the playerTiles
                        taken = checkIfTaken(tiles);

                        bgColor = (tileNum < 11 || tileNum > 100 || taken) ? "red" : "palegreen";
                    } else {
                        tiles.push(tileNum, tileNum+1);
                        taken = checkIfTaken(tiles);
                        bgColor = (redHorTwoTiles.includes(tileNum) || taken) ? "red" : "palegreen";
                    }
                    break;

            case 3: if (isVertical) {
                        tiles.push(tileNum - 10, tileNum, tileNum + 10);
                        taken = checkIfTaken(tiles);
                        bgColor = (tileNum < 11 || tileNum > 90 || taken) ? "red" : "palegreen";
                    } else {
                        tiles.push(tileNum - 1, tileNum, tileNum + 1);
                        taken = checkIfTaken(tiles);
                        bgColor = (redHorThreeTiles.includes(tileNum) || taken) ? "red" : "palegreen";
                    } 
                    break;

            case 4: if (isVertical) {
                        tiles.push(tileNum - 10, tileNum, tileNum + 10, tileNum + 20);
                        taken = checkIfTaken(tiles);
                        bgColor = (tileNum < 11 || tileNum > 80 || taken) ? "red" : "palegreen";
                    } else {
                        tiles.push(tileNum - 1, tileNum, tileNum + 1, tileNum + 2);
                        taken = checkIfTaken(tiles);
                        bgColor = (redHorFourTiles.includes(tileNum) || taken) ? "red" : "palegreen";
                    }
                    break;

            case 5: if (isVertical) {
                        tiles.push(tileNum - 20, tileNum - 10, tileNum, tileNum + 10, tileNum + 20);
                        taken = checkIfTaken(tiles);
                        bgColor = (tileNum < 21 || tileNum > 80 || taken) ? "red" : "palegreen";
                    } else {
                        tiles.push(tileNum - 2, tileNum - 1, tileNum, tileNum + 1, tileNum + 2);
                        taken = checkIfTaken(tiles);
                        bgColor = (redHorFiveTiles.includes(tileNum) || taken) ? "red" : "palegreen";
                    }
                    break;

            default: break;
        }
        
        tempChosenTiles = tiles.filter(value => value >= 1 && value <= 100);
        
        // show background color result when dragged on tiles
        if (bgColor === "red" || taken) {
            el.style.background = bgColor;
        } else {
            for (let i = 0; i < tempChosenTiles.length; i++) {
                let tileElement = document.querySelector(`#${playerSide}${tempChosenTiles[i]}`) as HTMLElement;
                tileElement.style.background = bgColor;
            }
        }
    }
    setChosenTiles(tempChosenTiles)
    setColor(bgColor)
}

// handles to reset the background color when mouse leaves the tile
export function handleDragLeave(e: React.DragEvent, playerSide: string, color: string, chosenTiles: number[]) {
    let element = e.target as HTMLElement;
    console.log('chosenTiles', chosenTiles)
    if (color === "red") {
        element.style.background = "none";
    } else {
        console.log('this is palegreen')
        for (let i = 0; i < chosenTiles.length; i++) {
            let el = document.querySelector(`#${playerSide}${chosenTiles[i]}`) as HTMLElement;
            if (el) {
                console.log("el = ", el)
                el.style.background = "none"
            }
        }
    }
}


// handles if ship is okay to be dropped on the tile, if not, then it
// should kind of reset the image.
export function handleDrop(e: React.DragEvent, playerSide: string, context: UserContextType) {
    let element = e.target as HTMLElement;
    const {blockSize, isVertical, setPlayerTiles, tickedShip, tileCount, setFleetState, setCounter, chosenTiles, color, imageRef} = context;

    // if ship is not okay to drop, then it resets
    if (color === "red") {
        if (element) {
            element.style.background = "none";
        }
    
    // if ship is OK to be dropped then image of ship will show up on the tiles with correct orientation
    } else {
        // stop drag on image
        if (imageRef.current) {
            imageRef.current.draggable = false;
        }
        // count ship placed on the board
        setCounter(prev => prev + 1);
        // change ship's isGreen to "true" to disable the onClick and change the font color to red
        setFleetState(prevFleetState => prevFleetState.map(ship => ship.ship === tickedShip ? {...ship, isGreen: true} : ship));
        // min and max will determine the tile's positioning, while width and height will get the total blocks size
        let min = Math.min(...chosenTiles);
        let max = Math.max(...chosenTiles);
        let image = new Image();
        image.src = `./images/${tickedShip}.png`

        // remove background color and set playerTiles num and taken to true and add "taken" attribute to the element
        for (let i = 0; i < chosenTiles.length; i++) {
            let el = document.querySelector(`#${playerSide}${chosenTiles[i]}`) as HTMLElement;
            el.style.background = "none";
            el.setAttribute("taken","");
            setPlayerTiles(prevTiles => [...prevTiles, {num: chosenTiles[i], taken: true}])
        }

        if (isVertical) {
            image.width = (blockSize.height * tileCount) - 10;
            image.height = blockSize.width - 20;
            // get the element with the max value in the chosenTiles to position the image from the bottom tile
            let tileEl = document.querySelector(`.${playerSide}${max}`) as HTMLElement;
            tileEl?.appendChild(image);
            image.style.transformOrigin = "top left"
            image.style.transform = "rotate(270deg)";
            image.style.left = "10px";
            image.style.bottom = `-${blockSize.height - 10}px`;

        } else {
            image.width = (blockSize.width * tileCount) - 10;
            image.height = blockSize.height - 10;
            image.style.top = "5px";
            image.style.left = "5px"

            // get the element with the min value in the chosenTiles to position the image from the left tile
            let tileEl = document.querySelector(`.${playerSide}${min}`);
            tileEl?.appendChild(image);
        }
    }
}