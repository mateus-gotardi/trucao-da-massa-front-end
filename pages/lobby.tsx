import React, { useContext, useEffect } from "react";
import { Button, CreateRoom, JoinRoom, RoomsList } from "@/components";
import socket from "@/common/connection/webSocket";
import Link from "next/link";
import { IGameState, ILocalPlayer, IPlayer } from "utils/interfaces";
import { GameContext } from "GameContext";
import { getStateFromLocalStorage, removeStateFromLocalStorage, saveStateInLocalStorage } from "utils/functions";
import { useRouter } from "next/router";

export default function Lobby() {
  const value = useContext(GameContext);
  const router = useRouter();
  const [rooms, setRooms] = React.useState<Array<String>>([]);

  useEffect(() => {
    let localState: ILocalPlayer = getStateFromLocalStorage("playerState");
    if (localState) {
      socket.emit("setupconnection", localState);
    }
  }, []);

  socket.on("setupconnection", (data: any) => {
    if (data.status === true) {
      value.setPlayerState(data.player);
      value.setGameState(data.table);
      router.replace("/game");
    } else {
      removeStateFromLocalStorage("playerState");
    }
  })

  const getRooms = () => {
    socket.emit("getrooms", {});
  };
  socket.on("getrooms", (data: any) => {
    console.log(data);
    setRooms(data);
  });



  socket.on("join", (data: { table: IGameState; player: IPlayer, team: 'team1' | 'team2' | null }) => {
    value.setGameState(data.table);
    let newPlayer = data.player;
    newPlayer.team = data.team
    value.setPlayerState(newPlayer);
    let localState: ILocalPlayer = {
      hand: data.player.hand,
      name: data.player.name,
      playerId: data.player.playerId,
      roomId: data.table.tableId,
      team: data.player.team,
      ready: data.player.ready,
    };
    saveStateInLocalStorage("playerState", localState);
    router.replace("/game");
  });

  return (
    <>
      <CreateRoom />
      <JoinRoom />
      <Button available onClick={getRooms}>
        Get Rooms
      </Button>
      <Link href="/game">Game</Link>
      <RoomsList rooms={rooms} />
    </>
  );
}
