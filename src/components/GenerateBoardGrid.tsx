import React, { useState, useContext, useEffect, useRef } from "react";
import UserContext, { SideType, UserContextType } from "../context/UserContext";
import GenerateOpponentShips from "./GenerateOpponentShips";
import {
    handleDragLeave,
    handleDrop,
    handleDragOver,
} from "../utlities/dragUtilities";
import {
    handleClickStartGame,
    handleFire,
    handleMouseLeave,
    handleTargetTile,
} from "../utlities/mouseUtilities";

const GenerateBoardGrid = () => {
    const context = useContext(UserContext) as UserContextType;
    const buttonRef = useRef<HTMLButtonElement | null>(null);
    const {
        playerSide,
        setPlayerSide,
        blockSize,
        tickedShip,
        playerTiles,
        opponentTiles,
        counter,
        setCounter,
        color,
        chosenTiles,
        boardgameContainerRef,
        setShowRotateBtn,
        gameOn,
        setGameOn,
        setAnimatePage,
        infoContainerRef,
        rotateBtnRef,
        topContainerRef,
        targetImageRef,
        bottomContainerRef,
    } = context;

    const [showButton, setShowButton] = useState<boolean>(false);
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
    const createTiles = (participant: SideType) => {
        const tiles = [];

        const mouseOver =
            participant === "opponent-side" && gameOn
                ? (e: React.MouseEvent<HTMLElement>) =>
                      handleTargetTile(e, participant)
                : undefined;

        const mouseLeave =
            participant === "opponent-side" && gameOn
                ? (e: React.MouseEvent<HTMLDivElement>) =>
                      handleMouseLeave(e, participant)
                : undefined;

        const dragOver =
            participant === "player-side"
                ? (e: React.DragEvent) => handleDragOver(e, tileNum, context)
                : undefined;

        const dragLeave = () => handleDragLeave(participant, chosenTiles);

        const drop = (e: React.DragEvent) =>
            handleDrop(e.target as HTMLElement, context);

        const fire =
            gameOn && participant === "opponent-side"
                ? (e: React.MouseEvent<HTMLElement>) => handleFire(e, blockSize)
                : undefined;

        for (let i = 1; i <= 100; i++) {
            tiles.push(
                <div
                    key={`${participant}${i}`}
                    id={`${participant}${i}`}
                    className={`tile ${participant}${i} ${participant}`}
                    {...{ [participant]: "" }}
                    onMouseOver={mouseOver}
                    onMouseLeave={mouseLeave}
                    onDragOver={dragOver}
                    onDragLeave={dragLeave}
                    onDrop={drop}
                    onClick={fire}
                ></div>
            );
        }
        return tiles;
    };

    useEffect(() => {
        if (counter === 5) {
            if (playerSide === "player-side") {
                setPlayerSide("opponent-side");
                setCounter(0);
            } else {
                setShowButton(true);
                if (rotateBtnRef.current) {
                    rotateBtnRef.current.style.animation =
                        "fade-out 500ms ease forwards";
                }
                const rotateTimeout = setTimeout(() => {
                    setShowRotateBtn(false);
                }, 500);
                clearTimeout(rotateTimeout);
            }
        }
    }, [counter]);

    const startButton = (): JSX.Element | undefined => {
        if (boardgameContainerRef.current) {
            return (
                <button
                    ref={buttonRef}
                    className="start-button"
                    onClick={() =>
                        handleClickStartGame(
                            setGameOn,
                            setShowButton,
                            infoContainerRef,
                            context
                        )
                    }
                >
                    Game On!
                </button>
            );
        }
    };

    return (
        <>
            <div ref={topContainerRef} className="top-container">
                {createTiles("opponent-side")}
                {playerSide === "opponent-side" ? (
                    <GenerateOpponentShips />
                ) : null}
            </div>
            <div ref={bottomContainerRef} className="bottom-container">
                {createTiles("player-side")}
            </div>
            {showButton && startButton()}
        </>
    );
};

export default GenerateBoardGrid;
