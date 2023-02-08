import React from "react";
import { Button } from "@/components";
import socket from "@/common/connection/webSocket";

export default function Lobby() {
    const handleCreateGame = () => {
        socket.emit("create-game", "test");
        const test = socket.on("create-game", (data) => {
            console.log(data);
        });
        console.log(test)
    }
    
  return (
    <>
      <Button onClick={handleCreateGame} available>Lobby</Button>
    </>
  );
}
