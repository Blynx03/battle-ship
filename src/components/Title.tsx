import React from "react";

const Title = () => {
  return (
    <div className="main-page-container">
      <div className="main-page-image-container">
        <img
          src="../images/battleship.png"
          alt="battleship"
          className="battleship-image"
        />
        <div className="ocean-image"></div>
      </div>
      <div className="title-container">
        <span className="title-letters">B</span>
        <span className="title-letters">A</span>
        <span className="title-letters">T</span>
        <span className="title-letters">T</span>
        <span className="title-letters">L</span>
        <span className="title-letters">E</span>
        <span className="title-letters title-ship">SHIP</span>
      </div>
      <div className="choices-container">
        <h3>GAME MODE</h3>
        <div className="btn single-player">Single Player</div>
        <div className="btn multi-player">Multiplayer</div>
      </div>
    </div>
  );
};

export default Title;
