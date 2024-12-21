import React, { useContext } from 'react';
import GameName from './GameName'
import UserContext, { UserContextType } from '../context/UserContext';

type handleClickProps = {
    handleClick: (value: string) => void;
}

const MainPageContent = ({handleClick}:handleClickProps): JSX.Element => {
    const { mainPageImageContainerRef, mainPageChoicesContainerRef, singlePlayerButtonRef, multiPlayerButtonRef } = useContext(UserContext) as UserContextType;
    const MainPageImageContainer = (): JSX.Element => {
        return (
            <div ref={mainPageImageContainerRef} className="main-page-image-container">
                <img
                src="../images/battleship-front.png"
                alt="battleship"
                className="battleship-image"
                />
                <div className="ocean-image"></div>
            </div>
        )
    }

    const MainPageInfo = ({children}: {children: React.ReactNode}): JSX.Element => {
        return (
            <div ref={mainPageChoicesContainerRef} className="main-page-choices-container">
                <h3>
                CHOOSE <span>YOUR</span>
                <span>CHALLENGE!</span>
                </h3>
                {children}
            </div>
        )
    }
    
    const MainPageButtonContainer = (): JSX.Element => {
        return (
            <div className="main-page-button-container">
                <button
                    ref={singlePlayerButtonRef}
                    className="btn single-player"
                    onClick={() => handleClick("single")}
                >
                    Single Player
                </button>
                <button
                    ref={multiPlayerButtonRef}
                    className="btn multi-player"
                    onClick={() => handleClick("multi")}
                >
                    Multiplayer
                </button>
            </div>
        )
    }

    return (
        <>
            <GameName value="main" />
            <MainPageImageContainer />
            <MainPageInfo>
                <MainPageButtonContainer />
            </MainPageInfo>
        </>
  )
}

export default MainPageContent