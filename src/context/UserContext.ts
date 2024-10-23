import { createContext, Dispatch, SetStateAction } from "react";


interface BlockSize {
  width: number;
  height: number;
}

export interface PlayerProps {
  num: number;
  taken: boolean;
}

export interface UserContextType {
  numberOfPlayers: number;
  setNumberOfPlayers: Dispatch<SetStateAction<number>>;
  blockSize: BlockSize;
  setBlockSize: Dispatch<SetStateAction<BlockSize>>;
  isVertical: boolean;
  setIsVertical: Dispatch<SetStateAction<boolean>>;
  playerTile: PlayerProps[];
  setPlayerTile: Dispatch<SetStateAction<PlayerProps[]>>;
  tickedShip: string;
  setTickedShip: Dispatch<SetStateAction<string>>;
  tileCount: number;
  setTileCount: Dispatch<SetStateAction<number>>;
}

// const UserContext = createContext<UserContextType | undefined>(undefined);
const UserContext = createContext<UserContextType | undefined>(undefined);

export default UserContext;
