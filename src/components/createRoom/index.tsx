import React, { useState, useContext } from "react";
import socket from "@/common/connection/webSocket";

const CreateRoom: React.FC = () => {
  const [room, setRoom] = useState("");
  const [nickname, setNickname] = useState("");
  const [error, setError] = useState("");
  const createRoom = (e: any) => {
    e.preventDefault();
    if (nickname !== '' && room !== '' &&
      nickname !== "null" && room !== "null" &&
      nickname !== null && room !== null &&
      nickname !== undefined && room !== undefined &&
      nickname !== "undefined" && room !== "undefined") {
      socket.emit("create", {
        roomId: room,
        name: nickname,
        team: 1,
        playerId: nickname,
      });
    } else {
      setError("Nome da sala ou nickname inválidos");
    }
  };

  socket.on("error-create", (data: string) => {
    setError(data);
  });
  return (
    <>
      <form onSubmit={createRoom}>
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
        <input type="submit" value="Criar Sala" />
      </form>
      <h3>{error}</h3>
    </>
  );
};

export default CreateRoom;
