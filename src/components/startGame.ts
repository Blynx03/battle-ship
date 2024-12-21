import React, { useContext, useEffect } from 'react'
import UserContext, { UserContextType } from '../context/UserContext';
import { getTileSize } from '../utlities/operationUtilities';

// show game name and boardgame only with players ships on display
// add onclick on opponent tiles to handle firing (source for nice looking crosshair image)
// crosshair only shows on opponent side tiles and non-hit tiles


const startGame = (context: UserContextType) => {
    const { blockSize, setBlockSize, gameOn, mainPageContainerRef, gamePageTitleContainerRef, infoContainerRef, boardgameContainerRef } = context;
        
        // change the class of main page container as well, to layout the game name and game board accordingly
        // the goal is to have the gamename to show as big as possible on top of the gameboard
    if (mainPageContainerRef.current) {
        mainPageContainerRef.current.removeAttribute("style");
    
        mainPageContainerRef.current.classList.add("start-game-page");

        getTileSize(setBlockSize);
    }

    return null

}

export default startGame;