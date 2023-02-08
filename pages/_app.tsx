import type { AppProps } from "next/app";
import { GlobalStyle } from "styles/global";
import Layout from "@/components/layout";
import React, { useEffect, useState } from "react";
import { GameContext } from "GameContext";
import { IGameState, ILocalPlayer, IPlayer } from "utils/interfaces";
import socket from "@/common/connection/webSocket";
import { getStateFromLocalStorage } from "utils/functions";

export default function App({ Component, pageProps }: AppProps) {
  const [playerState, setPlayerState] = React.useState<IPlayer>({
    playerId: "",
    name: "",
    hand: [],
    team: null,
  });
  const [gameState, setGameState] = React.useState<IGameState>({
    tableId: "",
    team1: [],
    team2: [],
    score: {
      team1: 0,
      team2: 0,
    },
    partialScore: {
      team1: 0,
      team2: 0,
    },
    vira: null,
    turn: "",
    dealer: "",
    points: 1,
    playedCards: [],
    lastTruco: "",
    manilha: "",
  });

  useEffect(() => {
    let localState: ILocalPlayer = getStateFromLocalStorage("playerState");
    if (localState) {
      socket.emit("setupconnection", localState);
    }
  }, []);

  socket.on("setupconnection", (data: any) => {
    if (data.status) {
      setPlayerState(data.player);
      setGameState(data.table);
    }
  });

  socket.on("update", (data: IGameState) => {
    setGameState(data);
    console.log(data)
  })

  return (
    <GameContext.Provider
      value={{
        playerState,
        setPlayerState,
        gameState,
        setGameState,
      }}
    >
      <GlobalStyle />

      <Component {...pageProps} />
    </GameContext.Provider>
  );
}
