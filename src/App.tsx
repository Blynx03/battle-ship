import "./styles/App.scss";
import { useState } from "react";
import UserContext from "./context/UserContext";
import MainPage from "./components/MainPage";

function App() {
  const [numberOfPlayers, setNumberOfPlayers] = useState<string>("");
  const [blockSize, setBlockSize] = useState<{ width: number; height: number }>(
    { width: 0, height: 0 }
  );

  interface PlayerProps {
    num: number;
    taken: boolean;
  }

  const [playerTile, setPlayerTile] = useState<PlayerProps[]>([
    {} as PlayerProps,
  ]);
  // const [degree, setDegree] = useState<number>(0);
  const [isVertical, setIsVertical] = useState<boolean>(false);
  const [tickedShip, setTickedShip] = useState<string>("carrier");
  const [tileCount, setTileCount] = useState<number>(0);

  return (
    <UserContext.Provider
      value={{
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
      }}
    >
      <MainPage />
    </UserContext.Provider>
  );
}

export default App;
