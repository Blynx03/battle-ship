import { useContext, useEffect, useState } from "react";
import UserContext, { UserContextType } from "../context/UserContext";
import assignBackgroundColor from "./assignBackgroundColor";

const GenerateOpponentShips = (): JSX.Element => {
    const context = useContext(UserContext) as UserContextType;
    const {
        playerSide,
        blockSize,
        isVertical,
        setIsVertical,
        playerTiles,
        opponentTiles,
        setOpponentTiles,
        setTickedShip,
        setTileCount,
        imagePath,
        setImagePath,
        setImageClass,
        imageClass,
        fleetState,
        setFleetState,
        counter,
        setCounter,
        chosenTiles,
        setColor,
        color,
    } = context;
    const [isResetted, setIsResetted] = useState<boolean>(false);

    let isHorizontal: boolean = true;
    let shipClass: string = "";
    let shipImagePath: string = "";

    // reset fleetState isGreen to false and other opponent parameters
    function resetParameters() {
        setIsVertical(false);
        setFleetState((prevState) =>
            prevState.map((ship) => ({
                ...ship,
                isGreen: false,
            }))
        );
        setCounter(0);
        setColor("red");
        setIsResetted(true);
    }

    // generate random tile number (1 to 100) and generate ship orientation
    function getRandomNumbers() {
        let tile: number = Math.ceil(Math.random() * 100);
        let orientation = Math.ceil(Math.random() * 2);
        isHorizontal = orientation === 1 ? true : false;
        return { tile, isHorizontal };
    }

    useEffect(() => {
        resetParameters();
        if (isResetted) {
            console.log("isResetted ? ", isResetted);
            
            let tile: number;
            let isHorizontal: boolean;
            let isTaken: boolean = false;
            let bgColor: string = "red";
            let tiles: number[];
            let tempOpponentTiles = [...opponentTiles];


            fleetState.forEach((ship) => {
                shipImagePath = `../images/${ship.ship}.png`;
                shipClass = `${ship.ship}-img ship-image`;

                function findValidTile(): { tile: number, isHorizontal: boolean, isTaken: boolean, bgColor: "red" | "palegreen", tiles: number[]} {
                    ({ tile, isHorizontal } = getRandomNumbers());
                    ({ isTaken, bgColor, tiles } = assignBackgroundColor(
                        tile,
                        "opponent-side",
                        isHorizontal,
                        ship.tile
                    ));

                    if (bgColor !== "palegreen") {
                        return findValidTile();
                    }

                    tiles.forEach(tile => {
                        let el = document.querySelector(`#opponent-side${tile}`) as HTMLElement;
                        el.setAttribute("taken", "");
                     });

                    return {tile, isHorizontal, isTaken, bgColor, tiles }
                }

                ({ tile, isHorizontal, isTaken, bgColor, tiles } = findValidTile());

   

                // Add tiles and set taken to true on opponentTiles
                tempOpponentTiles.push({
                    ship: ship.ship,
                    data: {
                        num: [...tiles],
                        taken: Array.from({length: tiles.length}, () => true)
                    }
                });

                setFleetState(
                    fleetState.map((fleet) =>
                        fleet.ship === ship.ship
                            ? { ...fleet, isGreen: true }
                            : fleet
                    )
                );

                //set or show opponent fleet on opponent side of the board
                let min = Math.min(...tiles);
                let max = Math.max(...tiles);

                let image = new Image();
                image.src = shipImagePath;

                if (isHorizontal) {
                    image.width = blockSize.height * ship.tile - 10;
                    image.height = blockSize.width - 20;
                    // get the element with the max value in the chosenTiles to position the image from the bottom tile
                    let tileEl = document.querySelector(
                        `.opponent-side${max}`
                    ) as HTMLElement;
                    tileEl?.appendChild(image);
                    image.style.transformOrigin = "top left";
                    image.style.transform = "rotate(270deg)";
                    image.style.left = "10px";
                    image.style.bottom = `-${blockSize.height - 10}px`;
                } else {
                    image.width = blockSize.width * ship.tile - 10;
                    image.height = blockSize.height - 10;
                    image.style.top = "5px";
                    image.style.left = "5px";

                    // get the element with the min value in the chosenTiles to position the image from the left tile
                    let tileEl = document.querySelector(`.opponent-side${min}`);
                    tileEl?.appendChild(image);
                }
                bgColor = "red";
            });
            setOpponentTiles(tempOpponentTiles)
        }
    }, [setIsResetted, isResetted]);

    // console.log('player Tiles = ', playerTiles)
    console.log('player tiles = ', playerTiles)
    console.log('opponent Tiles, ', opponentTiles);

    return <div />;
};

export default GenerateOpponentShips;
