import React, { useState, useContext, useEffect } from "react";
import UserContext, { UserContextType } from "../context/UserContext";
import GenerateOpponentShips from "./GenerateOpponentShips";
import { handleDragLeave, handleDragOver, handleDrop } from "./dragUtilities";


const GenerateBoardGrid = () => {
    const [enemySide, setEnemySide] = useState<boolean>(false);
    const context = useContext(UserContext) as UserContextType;
    const { tickedShip, counter, color, chosenTiles } = context;
    // let chosenTiles:number[] = [];
    let tileNum: number = 0;

    function setTile(tile:EventTarget, playerSide: string) {
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

    // Setting up the board/grid
    const createTiles = (playerSide: string) => {
        const tiles = [];
        for (let i = 1; i <= 100; i++) {
            tiles.push(
                <div
                    key={`${playerSide}${i}`} 
                    id={`${playerSide}${i}`} 
                    className={`tile ${playerSide}${i}`}
                    {...{[playerSide]: ""}}
                    onDragOver={(e)=> handleDragOver(e, playerSide, tileNum, context)}
                    onDragLeave={(e)=> handleDragLeave(e, playerSide, color, chosenTiles)}
                    onDrop={(e)=>handleDrop(e, playerSide, context)}
                >

            </div>
            )
        }
        return tiles;
    }

    useEffect(() => {
        if (counter === 5 && !enemySide) {
            setEnemySide(true);
        }
    },[counter])
    

    return (
        <>
            <div className="top-container">
                {createTiles("opponent-side")}
                {enemySide && <GenerateOpponentShips />}
            </div>
            <div className="bottom-container">
                {createTiles("player-side")}
            </div>
        </>
    )
};

export default GenerateBoardGrid;
