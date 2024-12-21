import React, { useContext } from 'react'
import LoadBoard from './LoadBoard'
import GenerateBoardGrid from './GenerateBoardGrid'
import UserContext, { UserContextType } from '../context/UserContext'

const BoardGame = () => {
    const { infoContainerRef, boardgameContainerRef } = useContext(UserContext) as UserContextType;
    return (
        <>
            <div ref={infoContainerRef} className="info-container" >
                < LoadBoard />
            </div>
            <div ref={boardgameContainerRef} className="boardgame-container">
                <GenerateBoardGrid />
            </div>
        </>
    )
}

export default BoardGame