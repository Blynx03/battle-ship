import React, { useContext } from "react";
import UserContext, { UserContextType } from "../context/UserContext";

interface Props {
    value: string;
}

const GameName: React.FC<Props> = ({ value }) => {
    const { mainPageTitleContainerRef, gamePageTitleContainerRef } = useContext(UserContext) as UserContextType;
    const correctClass =
        value === "main" ? "main-page-title-container" : value=== "game" ? "game-page-title-container" : undefined;
        if (value === "game") {
        }
    

  return (
    <div ref={value === "main" ? mainPageTitleContainerRef : gamePageTitleContainerRef} id={correctClass} className={correctClass}>
      <span className="title-battle-container">
        {"BATTLE".split("").map((letter, index) => 
          <span key={index} className="title-battle-letters letters">{letter}</span>
        )}
      </span>
      <span className="title-ship-container">
        {"SHIP".split("").map((letter, index) => 
            <span key={index} className="title-ship-letters letters">{letter}</span>)}
   
      </span>
    </div>
  );
};

export default GameName;
