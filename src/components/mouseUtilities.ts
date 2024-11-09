import React from "react";
import { UserContextType } from "../context/UserContext";

export const clickedShip = (ship: string, shipRef: React.RefObject<HTMLDivElement>, {playerSide, setTickedShip, setTileCount, setImagePath, setImageClass, fleetState, imageRef}:UserContextType) => {
    setTickedShip(ship);
    setImagePath(`../images/${ship}.png`);
    setImageClass(`${ship}-img ship-image`);

    // set image element's draggable to true if it is false
    if (playerSide === "player-side") {
        let selectedShip = fleetState.find(fleet => fleet.ship === ship)
        if (selectedShip) {
            setTileCount(selectedShip.tile)
        }   
        if (imageRef.current) {
            imageRef.current.draggable = true
        }
    }
    // clear drag error message if there is 
    let clearDiv = document.querySelector(".drag-error-message") as HTMLElement;
    if (clearDiv) {
        clearDiv.textContent = "";
    }
    const el = document.querySelector('.ship-image') as HTMLElement;
    el.style.width = "100%";
    el.style.height = "auto";

    if (shipRef.current) {
        // shipElement.style.color = 'lime';
    }

    // fleetState.forEach(fleet => {
    //     if (fleet.ship === ship) {
    //         setTileCount(fleet.tile)
    //     }
    // })

    // switch (ship) {
    // case "destroyer": setTileCount(2)
    //     break;
    // case "submarine": setTileCount(3)
    //     break;
    // case "cruiser": setTileCount(3)
    //     break;
    // case "battleship": setTileCount(4)
    //     break;
    // case "carrier": setTileCount(5);
    //     break;
    // default:
    //     break;
    // }
}

export function handleMouseDown(imageRef: React.RefObject<HTMLImageElement>) {
    let errorMessage = document.querySelector('.drag-error-message') as HTMLElement;
    if (imageRef.current) {
        if (imageRef.current.draggable === false) {
            if (errorMessage) {
                errorMessage.textContent = "You already placed this. Choose a different available ship."
            }
        }
    }
}