import React, { createContext, Dispatch, SetStateAction } from "react";


interface BlockSize {
  width: number;
  height: number;
}

export interface PlayerProps {
  num: number;
  taken: boolean;
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
  color: string;
  setColor: Dispatch<SetStateAction<string>>;
  imageRef: React.RefObject<HTMLImageElement>;
}

// const UserContext = createContext<UserContextType | undefined>(undefined);
const UserContext = createContext<UserContextType | undefined>(undefined);

export default UserContext;
