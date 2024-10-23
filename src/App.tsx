import "./styles/App.scss";
import { useState } from "react";
import UserContext, { PlayerProps } from "./context/UserContext";
import MainPage from "./components/MainPage";

function App() {
  const [numberOfPlayers, setNumberOfPlayers] = useState<number>(1);
  const [blockSize, setBlockSize] = useState<{ width: number; height: number }>(
    { width: 0, height: 0 }
  );

  const [playerTile, setPlayerTile] = useState<PlayerProps[]>([]);
  // const [degree, setDegree] = useState<number>(0);
  const [isVertical, setIsVertical] = useState<boolean>(false);
  const [tickedShip, setTickedShip] = useState<string>("destroyer");
  const [tileCount, setTileCount] = useState<number>(0);
  const value = {
        numberOfPlayers,
        setNumberOfPlayers,
        blockSize,
        setBlockSize,
        isVertical,
        setIsVertical,
        playerTile,
        setPlayerTile,
        tickedShip,
        setTickedShip,
        tileCount,
        setTileCount,
      }

  return (
    <UserContext.Provider value={value}>
      <MainPage />
    </UserContext.Provider>
  );
}

export default App;
