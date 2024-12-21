import { useContext, useMemo, useState } from "react";
import UserContext, { UserContextType } from "../context/UserContext";
import MainPageContent from "./MainPageContent";
import BoardGame from "./BoardGame";

const MainPage = () => {
  const [showLoadBoard, setShowLoadBoard] = useState(false);
  const { setNumberOfPlayers, gameOn, setGameOn, mainPageContainerRef, singlePlayerButtonRef, multiPlayerButtonRef } = useContext(UserContext) as UserContextType;


  // load board game
  const handleClick = (players: string) => {
    if (!setNumberOfPlayers) {
      console.error;
      return;
    }

    // animate clicked button
    if (singlePlayerButtonRef.current && multiPlayerButtonRef.current) {
        if (players === "single") {
            setNumberOfPlayers(1);
            singlePlayerButtonRef.current.style.animation = "button-click 1000ms linear forwards";
        } else if (players === "multi") {
            setNumberOfPlayers(2);
            multiPlayerButtonRef.current.style.animation = "button-click 1000ms linear forwards";
        }
    }
    
    // animate battleship image
    const shipImage = document.querySelector(
      ".battleship-image"
    ) as HTMLElement;
    // shipImage.style.animation = "move-ship 3000ms ease linear";
    shipImage.style.animation = "move-ship 1000ms linear forwards";
    setTimeout(() => {
      setShowLoadBoard(true);
    }, 1000);
  };

  function loadPage(): React.ReactNode {
      if (!showLoadBoard) {
        return <MainPageContent handleClick={handleClick} />
      } else {
        return <BoardGame />
      }
  }


  const loadMain: React.ReactNode = useMemo(() => loadPage(), [gameOn, setGameOn, showLoadBoard, setShowLoadBoard]);

    return (
        <div ref={mainPageContainerRef} className="main-page-container">
          {loadMain}
        </div>
    );
};

export default MainPage;
