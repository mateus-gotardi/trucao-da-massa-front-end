export interface ITrucoCard {
  value: string;
  suit: "paus" | "copas" | "espadas" | "ouros";
}

export interface IPlayerState {
  playerId: string;
  name: string;
  hand: ITrucoCard[];
  ready: boolean;
}

export interface IPlayer extends IPlayerState {
  team: "team1" | "team2" | null;
}

export interface ILocalPlayer extends IPlayer {
  roomId: string;
}

export interface IPlayedCard {
  playerId: string;
  card: ITrucoCard;
}
export interface IGameState {
  tableId: string;
  team1: IPlayerState[];
  team2: IPlayerState[];
  score: {
    team1: number;
    team2: number;
  };
  partialScore: {
    team1: number;
    team2: number;
  };
  turn: string;
  dealer: string;
  vira: ITrucoCard | null;
  manilha: string;
  points: number;
  playedCards: IPlayedCard[];
  lastTruco: string;
  gameStarted: boolean;
  createdBy: string;
  elevenHand: boolean;
  gameFinished: boolean;
  winner: string;
  waiting: boolean;
}

export interface IColorProps {
  black: string; red: string; white: string, blue: string;
}
