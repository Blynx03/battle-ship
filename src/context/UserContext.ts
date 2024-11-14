import React, { createContext, Dispatch, SetStateAction } from "react";

interface BlockSize {
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
    playerSide: "player-side" | "opponent-side";
    setPlayerSide: Dispatch<SetStateAction<"player-side" | "opponent-side">>;
    blockSize: BlockSize;
    setBlockSize: Dispatch<SetStateAction<BlockSize>>;
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
    imageRef: React.RefObject<HTMLImageElement>;
    gameOn: boolean;
    setGameOn: Dispatch<SetStateAction<boolean>>;
}

// const UserContext = createContext<UserContextType | undefined>(undefined);
const UserContext = createContext<UserContextType | undefined>(undefined);

export default UserContext;
