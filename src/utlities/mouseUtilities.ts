import React, { RefObject, SetStateAction, useContext } from "react";
import UserContext, {
    BlockSizeProps,
    SideType,
    UserContextType,
} from "../context/UserContext";
import startGame from "../components/startGame";
import { getTileNumber, checkTile } from "./operationUtilities";
import assignBackgroundColor from "../components/assignBackgroundColor";
import { ConnectionCheckOutFailedEvent } from "mongodb";

export const clickedShip = (
    targetEl: EventTarget,
    ship: string,
    shipRef: React.RefObject<HTMLDivElement>,
    {
        playerSide,
        setTickedShip,
        setTileCount,
        setImagePath,
        setImageClass,
        fleetState,
        imageRef,
    }: UserContextType
) => {
    setTickedShip(ship);
    setImagePath(`../images/${ship}.png`);
    setImageClass(`${ship}-img ship-image`);

    (targetEl as HTMLElement).style.color = "yellow";

    // set image element's draggable to true if it is false
    if (playerSide === "player-side") {
        let selectedShip = fleetState.find((fleet) => fleet.ship === ship);
        if (selectedShip) {
            setTileCount(selectedShip.tile);
        }
        if (imageRef.current) {
            imageRef.current.draggable = true;
        }
    }
    // clear drag error message if there is
    let clearDiv = document.querySelector(".drag-error-message") as HTMLElement;
    if (clearDiv) {
        clearDiv.textContent = "";
    }
    const el = document.querySelector(".ship-image") as HTMLElement;
    el.style.width = "100%";
    el.style.height = "auto";

    if (shipRef.current) {
        // shipElement.style.color = 'lime';
    }
};

export function handleMouseDown(
    imageRef: React.RefObject<HTMLImageElement>,
    showRotateBtn: boolean
) {
    let errorMessage = document.querySelector(
        ".drag-error-message"
    ) as HTMLElement;
    if (imageRef.current) {
        if (imageRef.current.draggable === false) {
            if (errorMessage) {
                errorMessage.textContent = !showRotateBtn
                    ? "You already placed this. Choose a different available ship."
                    : 'Click "Game On" to start the Game';
            }
        }
    }
}

// this is linked to GenerateBoardGrid under startButton function
// this will initialize all the logics with gameOn === true, which includes the change on page
// and onclick functions (e.g. handleFire, handleTargetTile in mouseUtilities.ts)
export function handleClickStartGame(
    setGameOn: React.Dispatch<SetStateAction<boolean>>,
    setShowButton: React.Dispatch<React.SetStateAction<boolean>>,
    infoContainerRef: React.RefObject<HTMLDivElement>,
    context: UserContextType
) {
    setGameOn(true);
    // remove start game button
    setShowButton(false);
    // remove info-container element then start animating

    if (infoContainerRef.current) {
        const parent = infoContainerRef.current.parentNode;
        const grandchild = document.querySelector("#game-page-title-container");
        if (parent && grandchild) {
            parent.insertBefore(grandchild, infoContainerRef.current);
            infoContainerRef.current.remove();
        }
    }
    startGame(context);
    // start animating game name(battleship) and the board
    // setAnimatePage(true);
}

// show crosshair on tiles when mouse hovers on any opponent tile, except on tiles that are already hit or missed
// function for mouse over on opponent side
export function handleTargetTile(
    e: React.MouseEvent<HTMLElement>,
    playerSide: SideType
) {
    // e.currentTarget.classList.add("show-crosshair");
    const checkEl = document.querySelector(".inside-tile-image");

    if (!checkEl) {
        const imgEl = document.createElement("img");
        imgEl.src = "/images/crosshair.gif";
        imgEl.alt = "Crosshair";
        imgEl.className = "inside-tile-image";
        e.currentTarget.appendChild(imgEl);
    }
}

export function handleMouseLeave(
    e: React.MouseEvent<HTMLDivElement>,
    participant: SideType
) {
    const target = e.currentTarget;
    const firstChild = target.firstChild as HTMLImageElement;
    const secondChild = target.lastChild as HTMLImageElement;
    console.log(firstChild);
    console.log(secondChild);
    if (
        (firstChild && firstChild.alt === "Crosshair") ||
        (secondChild && secondChild.alt === "Crosshair")
    ) {
        target.removeChild(firstChild);
    }
}

export function handleFire(
    e: React.MouseEvent<HTMLElement>,
    blockSize: BlockSizeProps
) {
    const image = e.target as HTMLElement;
    const parent = image.parentElement;
    const checkEl = document.querySelector(
        ".inside-tile-image"
    ) as HTMLImageElement;
    if (checkEl) {
        checkEl.style.transform = "rotate(270deg)";
        checkEl.style.width = `${blockSize.height}px`;
        checkEl.style.height = `${blockSize.width}px`;
        checkEl.style.left = "4px";
        checkEl.style.bottom = "-5px";
        checkEl.src = "/images/splash.gif";
        checkEl.alt = "Splash";
        setTimeout(() => {
            if (parent) {
                checkTile(getTileNumber(parent, "opponent-side"));
            }
        }, 3000);
    }
    // checkTileI(parent);
}
