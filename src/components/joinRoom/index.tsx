import React, { useState, useContext } from "react";
import socket from "@/common/connection/webSocket";
import { GameContext } from "GameContext";

const JoinRoom: React.FC = () => {
  const [room, setRoom] = useState("");
  const [nickname, setNickname] = useState("");
  const [team, setTeam] = useState(1);
  const [error, setError] = useState("");
  const value = useContext(GameContext);
  const joinRoom = (e: any) => {
    e.preventDefault();
    socket.emit("join", {
      roomId: room,
      name: nickname,
      team: team,
      playerId: nickname,
    });
  };

  socket.on("error-join", (data: string) => {
    setError(data);
  });

  return (
    <>
      <form onSubmit={joinRoom}>
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
        <input type="submit" value="Entrar na Sala" />
      </form>
      <h3>{error}</h3>
    </>
  );
};
export default JoinRoom;
