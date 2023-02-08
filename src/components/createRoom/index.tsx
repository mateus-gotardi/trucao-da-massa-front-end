import React, { useState, useContext } from "react";
import socket from "@/common/connection/webSocket";

const CreateRoom: React.FC = () => {
  const [room, setRoom] = useState("");
  const [nickname, setNickname] = useState("");
  const [error, setError] = useState("");
  const createRoom = (e: any) => {
    e.preventDefault();
    socket.emit("create", {
      roomId: room,
      name: nickname,
      team: 1,
      playerId: nickname,
    });
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
