import type { AppProps } from "next/app";
import { GlobalStyle } from "styles/global";
import Layout from "@/components/layout";
import React, { useEffect, useState } from "react";
import { GameContext } from "GameContext";
import { IGameState, ILocalPlayer, IPlayer } from "utils/interfaces";
import socket from "@/common/connection/webSocket";
import { getStateFromLocalStorage, removeStateFromLocalStorage } from "utils/functions";
import ScenarioProvider from "ScenarioContext";
import { useRouter } from "next/router";
import Head from "next/head";

export default function App({ Component, pageProps }: AppProps) {
  const [playerState, setPlayerState] = React.useState<IPlayer>({
    playerId: "",
    name: "",
    hand: [],
    team: null,
    ready: false,
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
    gameStarted: false,
    createdBy: "",
    elevenHand: false,
    gameFinished: true,
    winner: '',
    waiting: true
  });

  useEffect(() => {
    let localState: ILocalPlayer = getStateFromLocalStorage("playerState");
    if (localState) {
      socket.emit("setupconnection", localState);
    }
  }, []);

  const router = useRouter();

  socket.on("setupconnection", (data: any) => {
    if (data.status === true) {
      setPlayerState(data.player);
      setGameState(data.table);
      router.push("/game");
    } else {
      removeStateFromLocalStorage("playerState")
    }
  });

  socket.on("update", (data: IGameState) => {
    setGameState(data);
    let newPlayerState = playerState;
    let team: 'team1' | 'team2' | null = null;
    let searchPlayer
    if (data.team1.find((player) => player.playerId === playerState.playerId)) {
      searchPlayer = data.team1.find((player) => player.playerId === playerState.playerId);
      team = 'team1'
    } else if (!searchPlayer) {
      searchPlayer = data.team2.find((player) => player.playerId === playerState.playerId);
      team = 'team2'
    }
    if (searchPlayer) {
      newPlayerState.hand = searchPlayer.hand;
      newPlayerState.ready = searchPlayer.ready;
      newPlayerState.team = team;
      setPlayerState(newPlayerState);
    }
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
      <ScenarioProvider>
      <Head>
        <title>Bar do Truco</title>
        <meta name="description" content="Truco paulista online com os amigos" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <GlobalStyle />

      <Component {...pageProps} />
      </ScenarioProvider>
    </GameContext.Provider>
  );
}
