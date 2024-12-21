import { useEffect, useContext } from "react";
import UserContext, { UserContextType } from "../context/UserContext";
import { clickedShip, handleMouseDown } from "../utlities/mouseUtilities";
import { handleRotate, getTileSize } from "../utlities/operationUtilities";

const FleetChoices = (): JSX.Element | null => {
    const context = useContext(UserContext) as UserContextType;
    const {
        playerSide,
        blockSize,
        setBlockSize,
        isVertical,
        setIsVertical,
        tickedShip,
        imagePath,
        imageClass,
        fleetState,
        showRotateBtn,
        imageRef,
        rotateBtnRef,
        gameOn,
    } = context;

    useEffect(() => {
        window.addEventListener("resize", () => getTileSize(setBlockSize));
        if (blockSize !== undefined) {
        }
        return () => {
            window.removeEventListener("resize", () =>
                getTileSize(setBlockSize)
            );
        };
    }, [blockSize]);

    function handleDragEnd() {}

    useEffect(() => {
        let element = document.querySelector(".tile");
        if (element) {
            let rect = element?.getBoundingClientRect();
            setBlockSize({ width: rect.width, height: rect.height });
        }
    }, []);

    const RenderShips = () => {
        return fleetState.map((ship) => {
            return (
                <div
                    key={ship.ship}
                    className={`${ship.ship}-container ship-name-container`}
                >
                    <div
                        ref={ship.ref}
                        className={`${ship.ship} ship-name`}
                        style={
                            ship.isGreen && playerSide === "player-side"
                                ? { color: "#F25050" }
                                : {}
                        }
                        onClick={
                            !ship.isGreen && playerSide === "player-side"
                                ? (e) =>
                                      clickedShip(
                                          e.target,
                                          ship.ship,
                                          ship.ref,
                                          context
                                      )
                                : undefined
                        }
                    >
                        {ship.ship.charAt(0).toUpperCase() + ship.ship.slice(1)}
                    </div>
                    <div className={`${ship.ship}-tile info-num-tiles`}>
                        ({ship.tile} Tiles)
                    </div>
                </div>
            );
        });
    };

    const rotateButton = (): JSX.Element | null => {
        return showRotateBtn ? (
            <button
                ref={rotateBtnRef}
                className="rotate-btn"
                onClick={() => handleRotate(setIsVertical, rotateBtnRef)}
            >
                Rotate Ship
            </button>
        ) : null;
    };

    return (
        // gameOn = true removes all of these
        !gameOn ? (
            <>
                <div className="fleet-info">
                    Click on a ship type, then drag the image, and place all
                    five ships onto the bottom part of the gameboard.
                </div>
                <div className="fleet-container">
                    <div className="fleet-name-container">
                        <RenderShips />
                    </div>
                    <div className="image-btn-container">
                        <div className="ship-image-container">
                            <img
                                id={tickedShip}
                                ref={imageRef}
                                className={imageClass}
                                style={{
                                    transform: isVertical
                                        ? "rotate(270deg)"
                                        : "rotate(0deg)",
                                }}
                                src={
                                    imagePath
                                        ? imagePath
                                        : `../images/destroyer.png`
                                }
                                onMouseDown={() =>
                                    handleMouseDown(imageRef, showRotateBtn)
                                }
                                onClick={() =>
                                    handleRotate(setIsVertical, rotateBtnRef)
                                }
                                onDragEnd={handleDragEnd}
                                draggable="true"
                            />
                        </div>
                        <div className="drag-error-message"></div>
                        {rotateButton()}
                        {/* <button
                            ref={rotateBtnRef}
                            className="rotate-btn"
                            onClick={() =>
                                handleRotate(setIsVertical, rotateBtnRef)
                            }
                        >
                            Rotate Ship
                        </button> */}
                    </div>
                </div>
            </>
        ) : null
    );
};

export default FleetChoices;
