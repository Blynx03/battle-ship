import "./styles/App.scss";
import { useState, useRef } from "react";
import UserContext, { FleetProps, PlayerProps } from "./context/UserContext";
import MainPage from "./components/MainPage";

function App() {
    const [numberOfPlayers, setNumberOfPlayers] = useState<number>(1);
    const [playerSide, setPlayerSide] = useState<
        "player-side" | "opponent-side"
    >("player-side");
    const [blockSize, setBlockSize] = useState<{
        width: number;
        height: number;
    }>({ width: 0, height: 0 });

    const destroyerRef = useRef<HTMLDivElement>(null);
    const submarineRef = useRef<HTMLDivElement>(null);
    const cruiserRef = useRef<HTMLDivElement>(null);
    const battleshipRef = useRef<HTMLDivElement>(null);
    const carrierRef = useRef<HTMLDivElement>(null);

    const [playerTiles, setPlayerTiles] = useState<PlayerProps[]>([]);
    const [opponentTiles, setOpponentTiles] = useState<PlayerProps[]>([]);
    const [isVertical, setIsVertical] = useState<boolean>(false);
    const [tickedShip, setTickedShip] = useState<string>("destroyer");
    const [tileCount, setTileCount] = useState<number>(2);
    const [imagePath, setImagePath] = useState<string>(
        "../images/destroyer.png"
    );
    const [imageClass, setImageClass] = useState<string>(
        "destroyer-img ship-image"
    );
    const [fleetState, setFleetState] = useState<FleetProps[]>([
        { ship: "destroyer", ref: destroyerRef, tile: 2, isGreen: false },
        { ship: "submarine", ref: submarineRef, tile: 3, isGreen: false },
        { ship: "cruiser", ref: cruiserRef, tile: 3, isGreen: false },
        { ship: "battleship", ref: battleshipRef, tile: 4, isGreen: false },
        { ship: "carrier", ref: carrierRef, tile: 5, isGreen: false },
    ]);
    const [counter, setCounter] = useState<number>(0);
    const [chosenTiles, setChosenTiles] = useState<number[]>([]);
    const [color, setColor] = useState<"red" | "palegreen">("red");
    const imageRef = useRef<HTMLImageElement>(null);
    const [gameOn, setGameOn] = useState<boolean>(false);

    const value = {
        numberOfPlayers,
        setNumberOfPlayers,
        playerSide,
        setPlayerSide,
        blockSize,
        setBlockSize,
        isVertical,
        setIsVertical,
        playerTiles,
        setPlayerTiles,
        opponentTiles,
        setOpponentTiles,
        tickedShip,
        setTickedShip,
        tileCount,
        setTileCount,
        imagePath,
        setImagePath,
        imageClass,
        setImageClass,
        fleetState,
        setFleetState,
        counter,
        setCounter,
        chosenTiles,
        setChosenTiles,
        color,
        setColor,
        imageRef,
        gameOn,
        setGameOn,
    };

    return (
        <UserContext.Provider value={value}>
            <MainPage />
        </UserContext.Provider>
    );
}

export default App;
