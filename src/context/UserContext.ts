import { createContext, Dispatch, SetStateAction, RefObject } from "react";

export interface BlockSizeProps {
    width: number;
    height: number;
}

interface shipProps {
    num: number[];
    taken: boolean[];
}
export interface PlayerProps {
    ship: string;
    data: shipProps;
}

export interface FleetProps {
    ship: string;
    ref: React.RefObject<HTMLDivElement>;
    tile: number;
    isGreen: boolean;
}

export type SideType = "player-side" | "opponent-side";
// interface FleetRefProps {
//   destroyerRef: React.RefObject<HTMLDivElement>;
//   submarineRef: React.RefObject<HTMLDivElement>;
//   cruiserRef: React.RefObject<HTMLDivElement>;
//   battleshipRef: React.RefObject<HTMLDivElement>;
//   carrierRef: React.RefObject<HTMLDivElement>;
// }

export interface UserContextType {
    numberOfPlayers: number;
    setNumberOfPlayers: Dispatch<SetStateAction<number>>;
    playerSide: SideType;
    setPlayerSide: Dispatch<SetStateAction<SideType>>;
    blockSize: BlockSizeProps;
    setBlockSize: Dispatch<SetStateAction<BlockSizeProps>>;
    isVertical: boolean;
    setIsVertical: Dispatch<SetStateAction<boolean>>;
    playerTiles: PlayerProps[];
    setPlayerTiles: Dispatch<SetStateAction<PlayerProps[]>>;
    opponentTiles: PlayerProps[];
    setOpponentTiles: Dispatch<SetStateAction<PlayerProps[]>>;
    tickedShip: string;
    setTickedShip: Dispatch<SetStateAction<string>>;
    tileCount: number;
    setTileCount: Dispatch<SetStateAction<number>>;
    imagePath: string;
    setImagePath: Dispatch<SetStateAction<string>>;
    imageClass: string;
    setImageClass: Dispatch<SetStateAction<string>>;
    fleetState: FleetProps[];
    setFleetState: Dispatch<SetStateAction<FleetProps[]>>;
    counter: number;
    setCounter: Dispatch<SetStateAction<number>>;
    chosenTiles: number[];
    setChosenTiles: Dispatch<SetStateAction<number[]>>;
    color: "red" | "palegreen";
    setColor: Dispatch<SetStateAction<"red" | "palegreen">>;
    imageRef: RefObject<HTMLImageElement>;
    showRotateBtn: boolean;
    setShowRotateBtn: Dispatch<SetStateAction<boolean>>;
    gameOn: boolean;
    setGameOn: Dispatch<SetStateAction<boolean>>;
    animatePage: boolean;
    setAnimatePage: Dispatch<SetStateAction<boolean>>;
    mainPageContainerRef: RefObject<HTMLDivElement>;
    mainPageImageContainerRef: RefObject<HTMLDivElement>;
    mainPageChoicesContainerRef: RefObject<HTMLDivElement>;
    singlePlayerButtonRef: RefObject<HTMLButtonElement>;
    multiPlayerButtonRef: RefObject<HTMLButtonElement>;
    mainPageTitleContainerRef: RefObject<HTMLDivElement>;
    gamePageTitleContainerRef: RefObject<HTMLDivElement>;
    infoContainerRef: RefObject<HTMLDivElement>;
    rotateBtnRef: RefObject<HTMLButtonElement>;
    boardgameContainerRef: RefObject<HTMLDivElement>;
    topContainerRef: RefObject<HTMLDivElement>;
    targetImageRef: RefObject<HTMLImageElement>;
    bottomContainerRef: RefObject<HTMLDivElement>;
}

// const UserContext = createContext<UserContextType | undefined>(undefined);
const UserContext = createContext<UserContextType | undefined>(undefined);

export default UserContext;
