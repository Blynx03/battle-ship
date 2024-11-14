import React, { useState, useContext, useEffect, useMemo } from "react";
import UserContext, { UserContextType } from "../context/UserContext";
import GenerateOpponentShips from "./GenerateOpponentShips";
import { handleDragLeave, handleDragOver, handleDrop } from "./dragUtilities";

const GenerateBoardGrid = () => {
    const context = useContext(UserContext) as UserContextType;
    const {
        playerSide,
        setPlayerSide,
        tickedShip,
        playerTiles,
        opponentTiles,
        counter,
        setCounter,
        color,
        chosenTiles,
        setGameOn,
    } = context;

    let tileNum: number = 0;

    function setTile(tile: EventTarget) {
        const el = document.querySelector(`${tickedShip}`);
        if (el) {
            el.remove();
        }

        // console.log("settile ", tile)
        if (tile) {
            if (playerSide === "player-side") {
                (tile as HTMLElement).style.background =
                    "hsla(120, 85%, 85%, 1)";
            } else {
                (tile as HTMLElement).style.background = "red";
            }
        }
    }

    // Setting up the board/grid
    const createTiles = (participant: string) => {
        const tiles = [];
        for (let i = 1; i <= 100; i++) {
            tiles.push(
                <div
                    key={`${participant}${i}`}
                    id={`${participant}${i}`}
                    className={`tile ${participant}${i}`}
                    {...{ [participant]: "" }}
                    onDragOver={(e) => handleDragOver(e, tileNum, context)}
                    onDragLeave={() =>
                        handleDragLeave(participant, chosenTiles)
                    }
                    onDrop={(e) => handleDrop(e.target as HTMLElement, context)}
                ></div>
            );
        }
        return tiles;
    };

    useEffect(() => {
        if (counter === 5) {
            if (playerSide === "player-side") {
                setPlayerSide("opponent-side");
            } else {
                console.log("GAME ON!!!");
                console.log("player tiles = ", playerTiles);
                console.log("opponent tiles = ", opponentTiles);
                setGameOn(true);
            }
        }
    }, [counter]);

    return (
        <>
            <div className="top-container">
                {createTiles("opponent-side")}
                {playerSide === "opponent-side" && <GenerateOpponentShips />}
            </div>
            <div className="bottom-container">{createTiles("player-side")}</div>
        </>
    );
};

export default GenerateBoardGrid;
