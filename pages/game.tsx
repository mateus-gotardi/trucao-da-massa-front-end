import React from "react";

const GameRoom: React.FC = () => {
  const [playerState, setPlayerState] = React.useState({
    playerId: "123",
    name: "Player 1",
    hand: [
      { value: "A", suit: "copas" },
      { value: "4", suit: "ouros" },
      { value: "5", suit: "espadas" },
    ],
  });
  const [gameState, setGameState] = React.useState({
    tableId: 0,
    team1: [
      {
        playerId: "123",
        name: "Player 1",
        hand: [
          { value: "A", suit: "copas" },
          { value: "4", suit: "ouros" },
          { value: "5", suit: "espadas" },
        ],
      },
      {
        playerId: "456",
        name: "Player 2",
        hand: [
          { value: "A", suit: "ouros" },
          { value: "4", suit: "espadas" },
          { value: "5", suit: "copas" },
        ],
      },
    ],
    team2: [
      {
        playerId: "123",
        name: "Player 1",
        hand: [
          { value: "2", suit: "copas" },
          { value: "7", suit: "ouros" },
          { value: "Q", suit: "espadas" },
        ],
      },
      {
        playerId: "456",
        name: "Player 2",
        hand: [
          { value: "6", suit: "copas" },
          { value: "K", suit: "ouros" },
          { value: "3", suit: "espadas" },
        ],
      },
    ],
    score: {
      team1: 0,
      team2: 0,
    },
    vira: { value: "2", suit: "paus" },
  });

  return (
    <div>
      <h1>Game Room</h1>
    </div>
  );
};

export default GameRoom;
