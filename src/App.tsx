import "./styles/app.scss";
import React, { useState, useRef } from "react";
import UserContext, {
    FleetProps,
    PlayerProps,
    BlockSizeProps,
    SideType,
} from "./context/UserContext";
import MainPage from "./components/MainPage";

function App() {
    const [numberOfPlayers, setNumberOfPlayers] = useState<number>(1);
    const [playerSide, setPlayerSide] = useState<SideType>("player-side");
    const [blockSize, setBlockSize] = useState<BlockSizeProps>({
        width: 0,
        height: 0,
    });

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
    const [showRotateBtn, setShowRotateBtn] = useState<boolean>(true);
    const imageRef = useRef<HTMLImageElement>(null);
    const [gameOn, setGameOn] = useState<boolean>(false);
    const [animatePage, setAnimatePage] = useState<boolean>(false);
    const mainPageContainerRef = useRef<HTMLDivElement>(null);
    const mainPageImageContainerRef = useRef<HTMLDivElement>(null);
    const mainPageChoicesContainerRef = useRef<HTMLDivElement>(null);
    const singlePlayerButtonRef = useRef<HTMLButtonElement>(null);
    const multiPlayerButtonRef = useRef<HTMLButtonElement>(null);
    const mainPageTitleContainerRef = useRef<HTMLDivElement>(null);
    const gamePageTitleContainerRef = useRef<HTMLDivElement>(null);
    const infoContainerRef = useRef<HTMLDivElement>(null);
    const rotateBtnRef = useRef<HTMLButtonElement>(null);
    const boardgameContainerRef = useRef<HTMLDivElement>(null);
    const topContainerRef = useRef<HTMLDivElement>(null);
    const targetImageRef = useRef<HTMLImageElement>(null);
    const bottomContainerRef = useRef<HTMLDivElement>(null);

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
        showRotateBtn,
        setShowRotateBtn,
        imageRef,
        gameOn,
        setGameOn,
        animatePage,
        setAnimatePage,
        mainPageContainerRef,
        mainPageImageContainerRef,
        mainPageChoicesContainerRef,
        singlePlayerButtonRef,
        multiPlayerButtonRef,
        mainPageTitleContainerRef,
        gamePageTitleContainerRef,
        infoContainerRef,
        rotateBtnRef,
        boardgameContainerRef,
        topContainerRef,
        targetImageRef,
        bottomContainerRef,
    };

    return (
        <UserContext.Provider value={value}>
            <MainPage />
        </UserContext.Provider>
    );
}

export default App;
