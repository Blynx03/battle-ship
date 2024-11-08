import React, { useRef, useEffect, useContext, RefObject } from "react";
import UserContext, { UserContextType } from "../context/UserContext";
import { clickedShip } from "./mouseUtilities";


const FleetChoices = (): JSX.Element => {
    const context = useContext(UserContext) as UserContextType;
    const {blockSize, setBlockSize, isVertical, setIsVertical, tickedShip, setTickedShip, tileCount, setTileCount, imagePath, imageClass, fleetState, imageRef} = context;

    const rotateBtn = useRef<HTMLButtonElement>(null);

    useEffect(() => {
        window.addEventListener("resize", handleSize);
        if (blockSize !== undefined) {
        }
        return () => {
        window.removeEventListener("resize", handleSize);
        };
    }, [blockSize]);

    function handleSize() {
        const el = document.querySelector("#top-side1") as HTMLElement;
        if (el && setBlockSize) {
        setBlockSize({ width: el.offsetWidth, height: el.offsetHeight });
        }
    }

    function handleRotate() {
        setIsVertical((prev) => { 
        const newIsVertical = !prev;
        return newIsVertical;
        });

        if (rotateBtn.current) {
        rotateBtn.current.style.transform = "scale(1)";
        setTimeout(() => {
            if (rotateBtn.current) {
            rotateBtn.current.style.transform = "scale(1.2)";
            }
        }, 100);
        }
    }

    useEffect(() => {
        let element = document.querySelector(".tile");
        if (element) {
        let rect = element?.getBoundingClientRect();
        setBlockSize({ width: rect.width, height: rect.height });
        }
    }, [tickedShip, setTickedShip]);

    function handleMouseDown() {
        let errorMessage = document.querySelector('.drag-error-message') as HTMLElement;
        if (imageRef.current) {
            if (imageRef.current.draggable === false) {
                if (errorMessage) {
                    errorMessage.textContent = "You already placed this. Choose a different available ship."
                }
            }
        }
    }

    function handleDragEnd() {
        // const el = event.target as HTMLElement;
        // if (imageRef.current) {
        // imageRef.current.style.display = "block"
        // }
        // el.remove();
    }

    const RenderShips = () => {
    
        return fleetState.map((ship) => { 
            return (
            <div key={ship.ship} className={`${ship.ship}-container ship-name-container`}>
                <div ref={ship.ref}
                    className={`${ship.ship} ship-name`}
                    style={ship.isGreen ? {color: "#F25050"} : {}}
                    onClick={!ship.isGreen ? () => clickedShip(ship.ship, ship.ref, context) : undefined}>
                    {ship.ship.charAt(0).toUpperCase() + ship.ship.slice(1)}
                </div>
                <div className={`${ship.ship}-tile info-num-tiles`}>
                    ({ship.tile} Tiles)
                </div>
            </div>
            )
        });
    }

    return (
        <>
        <div className="fleet-info">
            Click on a ship type, then drag the image, and place all five ships onto the bottom
            part of the boardgame.
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
                style = {{
                    transform: isVertical ? "rotate(270deg)" : "rotate(0deg)"
                }}
                src={imagePath ? imagePath : `../images/destroyer.png`}
                onMouseDown={handleMouseDown}
                // onDragStart={handleDragStart}
                onDragEnd={handleDragEnd}
                draggable="true"
                />
            </div>
            <div className="drag-error-message"></div>
            <button ref={rotateBtn} className="rotate-btn" onClick={() => handleRotate()}>
                Rotate Ship
            </button>
            </div>
        </div>
        </>
    );
};

export default FleetChoices;
