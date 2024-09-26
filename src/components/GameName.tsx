import React from "react";

interface Props {
  value: string;
}

const GameName: React.FC<Props> = ({ value }) => {
  const correctClass =
    value === "main" ? "main-page-title-container" : value=== "game" ? "game-page-title-container" : undefined;

  return (
    <div className={correctClass}>
      <span className="title-battle-container">
        <span className="title-battle-letters letters">B</span>
        <span className="title-battle-letters letters">A</span>
        <span className="title-battle-letters letters">T</span>
        <span className="title-battle-letters letters">T</span>
        <span className="title-battle-letters letters">L</span>
        <span className="title-battle-letters letters">E</span>
      </span>
      <span className="title-ship-container">
        <span className="title-ship-letters letters">S</span>
        <span className="title-ship-letters letters">H</span>
        <span className="title-ship-letters letters">I</span>
        <span className="title-ship-letters letters">P</span>
      </span>
    </div>
  );
};

export default GameName;
