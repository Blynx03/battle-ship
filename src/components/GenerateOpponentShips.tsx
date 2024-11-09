import React, { useContext, useEffect } from "react";
import UserContext, { UserContextType } from "../context/UserContext";
import { handleDrop, handlePlaceShip } from "./dragUtilities";
import { clickedShip } from "./mouseUtilities";

const GenerateOpponentShips = (): JSX.Element => {
    const context = useContext(UserContext) as UserContextType;
    const {playerSide, isVertical, setIsVertical, setTickedShip, setTileCount, fleetState, setFleetState, counter, setCounter, chosenTiles, color} = context;
    let newTile: number = 0;
    let rotating: number = 0;
    let opponentTileElement: HTMLElement | null = null;


    // reset fleetState isGreen to false and other opponent parameters
    useEffect(() => {
        console.log('this is triggered')
        setIsVertical(false);
        setFleetState(prevState => 
            prevState.map(ship => ({
                ...ship, isGreen: false
            }))
        );
        setCounter(0);
    },[]);
        
    // checker to see if the above useEffect resetted the below three variables
    console.log('isVertical should be false = ', isVertical);
    console.log('counter should be 0 = ', counter);
    console.log('fleetState is Green should all be false = ', fleetState)

    function getRandomNumbers() {
        newTile = Math.ceil(Math.random() * 100);
        rotating = Math.ceil(Math.random() * 2);
        setIsVertical(rotating !== 1 ? false : true);
        opponentTileElement = document.querySelector(`#opponent-side${newTile}`) as HTMLElement;
        handlePlaceShip(opponentTileElement, newTile, context);
    }

    useEffect(() => {
        setTimeout(() => {
            console.log('this is running')
            const allGreenFalse = fleetState.every(ship => ship.isGreen === false);
            if (allGreenFalse) {
                console.log('this is also running')
                fleetState.forEach((ship) => {
                    setTickedShip(ship.ship);
                    setTileCount(ship.tile);
                    if (ship.isGreen !== true) {
                        clickedShip(ship.ship, ship.ref, context);
                        getRandomNumbers();
                        if (opponentTileElement) {
                            handleDrop(opponentTileElement, context);
                        }
                    }
                })
            }
        }, 1000)
    }, [])
    



    return (
        <div>Generating Opponent Ships</div>
    )
}

export default GenerateOpponentShips;