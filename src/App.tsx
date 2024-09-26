import "./styles/App.scss";
import { useState } from "react";
import UserContext from "./context/UserContext";
import MainPage from "./components/MainPage";

function App() {
  const [numberOfPlayers, setNumberOfPlayers] = useState<string>("");
  const [ blockSize, setBlockSize ] = useState<{width:number, height: number}>({width: 0, height: 0});

  return (
    <UserContext.Provider value={{ numberOfPlayers, setNumberOfPlayers, blockSize, setBlockSize }}>
      <MainPage />
    </UserContext.Provider>
  );
}

export default App;
