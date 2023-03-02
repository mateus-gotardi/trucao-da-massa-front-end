import React, { useContext, useEffect, useState } from "react";
import { Button, colors, RoomsList } from "@/components";
import socket from "@/common/connection/webSocket";
import { IGameState, ILocalPlayer, IPlayer, IRoomDetails } from "utils/interfaces";
import { GameContext } from "GameContext";
import { getStateFromLocalStorage, removeStateFromLocalStorage, saveStateInLocalStorage } from "utils/functions";
import { useRouter } from "next/router";
import { LobbyStyle } from "./styles";
import { useForm } from "react-hook-form";

export type FormValues = {
  roomName: string;
  nickname: string;
  team: string;
};

const LobbyComponent: React.FC = () => {
  const value = useContext(GameContext);
  const router = useRouter();
  const [rooms, setRooms] = useState<Array<IRoomDetails>>([]);
  const [error, setError] = useState<string>("");
  const { register, getValues } = useForm<FormValues>();


  const onSubmit = (type: 'create' | 'join') => {
    const { roomName, nickname, team } = getValues();
    if (nickname !== '' && roomName !== '' &&
      nickname !== "null" && roomName !== "null" &&
      nickname !== null && roomName !== null &&
      nickname !== undefined && roomName !== undefined &&
      nickname !== "undefined" && roomName !== "undefined" &&
      nickname !== " " && roomName !== " " &&
      nickname !== "draw" && roomName !== "draw" &&
      nickname !== "bot" && nickname !== "Bot") {
      socket.emit(type, {
        roomId: roomName,
        name: nickname,
        team: type ==='create'? 1 : team,
        playerId: nickname,
      });
    } else {
      setError("Nome da mesa ou nickname inválidos");
    }
  };

  const handleCreateClick = (event: any) => {
    event.preventDefault();
    onSubmit('create')
  };

  const handleJoinClick = (event: any) => {
    event.preventDefault();
    onSubmit('join')
  };

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


  socket.on('error-join', (data: string) => {
    console.log(data)
    setError(data);
  })
  socket.on('error-create', (data: string) => {
    setError(data);
  })
  const getNick = () => {
    return getValues().nickname;
  }
  const getTeam = () => {
    return Number(getValues().team)
  }
  return (
    <LobbyStyle colors={colors}>
      <form id='joinform'>
        <label>Nome da Mesa:</label>
        <input required placeholder="Nome da Mesa" {...register('roomName')} />

        <label>Nickname:</label>
        <input required placeholder="Apelido" {...register('nickname')} />

        <label>Equipe:</label>
        <select {...register('team')}>
          <option value="1">Equipe 1</option>
          <option value="2">Equipe 2</option>
        </select>

        <button onClick={(e) => handleJoinClick(e)}>
          <span id="transition"></span>
          <span id="gradient"></span>
          <span id="label">ENTRAR</span>
        </button>
        <button onClick={(e) => handleCreateClick(e)}>
          <span id="transition"></span>
          <span id="gradient"></span>
          <span id="label">CRIAR</span></button>
        {error !== '' && <h3>{error}</h3>}
      </form>
      <RoomsList rooms={rooms} getNickname={getNick} getTeam={getTeam} />
    </LobbyStyle>
  );
}
export default LobbyComponent;