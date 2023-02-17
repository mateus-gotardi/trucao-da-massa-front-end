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
      router.push("/game");
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



  socket.on("join", (data: { table: IGameState; player: IPlayer }) => {
    value.setGameState(data.table);
    value.setPlayerState(data.player);
    let localState: ILocalPlayer = {
      hand: data.player.hand,
      name: data.player.name,
      playerId: data.player.playerId,
      roomId: data.table.tableId,
      team: data.player.team,
    };
    saveStateInLocalStorage("playerState", localState);
  });

  return (
    <>
      <CreateRoom />
      <JoinRoom />
      <Button available onClick={getRooms}>
        Get Rooms
      </Button>
      <Button available onClick={() => {
        console.log(value.playerState)
        console.log(value.gameState)
      }}>
        Get states
      </Button>
      <Link href="/game">Game</Link>
      <RoomsList rooms={rooms} />
    </>
  );
}
