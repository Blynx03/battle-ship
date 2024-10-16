import { createContext, Dispatch, SetStateAction } from "react";

export interface UserContextType {
  numberOfPlayers: string;
  setNumberOfPlayers: Dispatch<SetStateAction<string>>;
  blockSize: { width: number; height: number };
  setBlockSize: Dispatch<SetStateAction<{ width: number; height: number }>>;
  isVertical: boolean;
  setIsVertical: Dispatch<SetStateAction<boolean>>;
  playerTile: { num: number; taken: boolean }[];
  setPlayerTile: Dispatch<SetStateAction<{ num: number; taken: boolean }[]>>;
  tickedShip: string;
  setTickedShip: Dispatch<SetStateAction<string>>;
  tileCount: number;
  setTileCount: Dispatch<SetStateAction<number>>;
}

// const UserContext = createContext<UserContextType | undefined>(undefined);
const UserContext = createContext<UserContextType>({} as UserContextType);

export default UserContext;
