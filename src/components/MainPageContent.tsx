import GameName from './GameName'

type handleClickProps = {
    handleClick: (value: string)=>void;
}
const MainPageContent = ({handleClick}:handleClickProps) => {
  return (
    <>
          <GameName value="main" />
          <div className="main-page-image-container">
            <img
              src="../images/battleship-front.png"
              alt="battleship"
              className="battleship-image"
            />
            <div className="ocean-image"></div>
          </div>

          <div className="main-page-choices-container">
            <h3>
              CHOOSE <span>YOUR</span>
              <span>CHALLENGE!</span>
            </h3>
            <div className="main-page-button-container">
              <button
                className="btn single-player"
                onClick={() => handleClick("single")}
              >
                Single Player
              </button>
              <button
                className="btn multi-player"
                onClick={() => handleClick("multi")}
              >
                Multiplayer
              </button>
            </div>
          </div>
        </>
  )
}

export default MainPageContent