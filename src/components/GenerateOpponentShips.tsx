import React, { useContext, useEffect } from "react";
import UserContext, { UserContextType } from "../context/UserContext";

const GenerateOpponentShips: React.FC = () => {
    const context = useContext(UserContext) as UserContextType;
    const {setIsVertical, setTickedShip, counter, setCounter, fleetState} = context;
    let newTile: number = 0;
    let rotating: number = 0;
    let getShip: number = 0;

    // reset fleetState
    fleetState.map(ship => ship.isGreen = true);
        
    function getRandomNumbers() {
        newTile = Math.ceil(Math.random() * 100);
        rotating = Math.ceil(Math.random() * 2);
        setIsVertical(rotating === 1 ? false: true)
        let opponentTile = document.querySelector(`#opponent-side${newTile}`);

    }

    useEffect(() => {
        if (counter < 5) {
            getRandomNumbers();
            setIsVertical(rotating === 1 ? false : true);
            console.log(newTile)
        
        }
        console.log(rotating)
    }, [counter])
    



    return (
        <div>Generating Opponent Ships</div>
    )
}

export default GenerateOpponentShips;