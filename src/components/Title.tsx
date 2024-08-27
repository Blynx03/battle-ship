import React from "react";

const Title = () => {
  return (
    <div className="main-page-container">
      <div className="main-page-title-container">
        <span className="title-letters">B</span>
        <span className="title-letters">A</span>
        <span className="title-letters">T</span>
        <span className="title-letters">T</span>
        <span className="title-letters">L</span>
        <span className="title-letters">E</span>
        <span className="title-letters title-ship">SHIP</span>
      </div>
      <div className="main-page-image-container">
        <img
          src="../images/battleship.png"
          alt="battleship"
          className="battleship-image"
        />
        <div className="ocean-image"></div>
      </div>

      <div className="main-page-choices-container">
        <h3>GAME MODE</h3>
        <div className="main-page-button-container">
          <button className="btn single-player">Single Player</button>
          <button className="btn multi-player">Multiplayer</button>
        </div>
      </div>
    </div>
  );
};

export default Title;
