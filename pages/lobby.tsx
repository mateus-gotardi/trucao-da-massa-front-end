import React, { useContext, useEffect, useState } from "react";
import { Button, RoomsList } from "@/components";
import socket from "@/common/connection/webSocket";
import Link from "next/link";
import { IGameState, ILocalPlayer, IPlayer, IRoomDetails } from "utils/interfaces";
import { GameContext } from "GameContext";
import { getStateFromLocalStorage, removeStateFromLocalStorage, saveStateInLocalStorage } from "utils/functions";
import { useRouter } from "next/router";

export default function Lobby() {
  const value = useContext(GameContext);
  const router = useRouter();
  const [rooms, setRooms] = useState<Array<IRoomDetails>>([]);
  const [room, setRoom] = useState("");
  const [nickname, setNickname] = useState("");
  const [team, setTeam] = useState(1);
  const [error, setError] = useState("");

  useEffect(() => {
    let localState: ILocalPlayer = getStateFromLocalStorage("playerState");
    if (localState) {
      socket.emit("setupconnection", localState);
    }
    socket.emit("getrooms", {});
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

  socket.on("getrooms", (data: any) => {
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

  const joinRoom = (type: 'create' | 'join', roomId: string) => {
    if (nickname !== '' && roomId !== '' &&
      nickname !== "null" && roomId !== "null" &&
      nickname !== null && roomId !== null &&
      nickname !== undefined && roomId !== undefined &&
      nickname !== "undefined" && roomId !== "undefined" &&
      nickname !== " " && roomId !== " " &&
      nickname !== "draw" && roomId !== "draw" && 
      nickname !== "bot" && nickname !== "Bot") {
      socket.emit(type, {
        roomId: roomId,
        name: nickname,
        team: team,
        playerId: nickname,
      });
    } else {
      setError("Nome da sala ou nickname inválidos");
    }

  };

  socket.on('error-join', (data: string) => {
    console.log(data)
    setError(data);
  })
  socket.on('error-create', (data: string) => {
    setError(data);
  })

  return (
    <>
      <input
        type="text"
        placeholder="Nome da Sala"
        value={room}
        onChange={(e) => setRoom(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Nickname"
        value={nickname}
        onChange={(e) => setNickname(e.target.value)}
        required
      />
      <select value={team} onChange={(e) => setTeam(Number(e.target.value))} required>
        <option value={1}>Equipe 1</option>
        <option value={2}>Equipe 2</option>
      </select>
      <h3>{error}</h3>
      <Button available onClick={() => joinRoom('join', room)}>Entrar</Button>
      <Button available onClick={() => joinRoom('create', room)}>Criar</Button>
      <RoomsList rooms={rooms} join = {joinRoom}/>
    </>
  );
}
