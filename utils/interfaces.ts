export interface ITrucoCard {
  value: string;
  suit: "paus" | "copas" | "espadas" | "ouros";
}

export interface IPlayerState {
  playerId: string;
  name: string;
  hand: ITrucoCard[];
}

export interface IPlayer extends IPlayerState {
  team: "team1" | "team2";
}
export interface IGameState {
  tableId: string;
  team1: IPlayerState[];
  team2: IPlayerState[];
  score: {
    team1: number;
    team2: number;
  };
  turn: string;
  dealer: string;
  vira: ITrucoCard;
}

export interface IColorProps {
  colors: { black: string; red: string; white: string };
}
