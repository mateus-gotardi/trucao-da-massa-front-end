import { createContext, Dispatch, SetStateAction } from "react";

interface ContextProps {
  gameState: any;
  setGameState: Dispatch<SetStateAction<any>>;
  playerState: any;
  setPlayerState: Dispatch<SetStateAction<any>>;
}

export const GameContext = createContext<ContextProps>({
  gameState: {},
  setGameState: () => {},
  playerState: {},
  setPlayerState: () => {},
});
