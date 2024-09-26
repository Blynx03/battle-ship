import { createContext, Dispatch, SetStateAction } from "react";

interface UserContextType {
  numberOfPlayers: string;
  setNumberOfPlayers: Dispatch<SetStateAction<string>>;
  blockSize: {width:number; height:number};
  setBlockSize: Dispatch<SetStateAction<{width:number; height: number}>>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export default UserContext;
