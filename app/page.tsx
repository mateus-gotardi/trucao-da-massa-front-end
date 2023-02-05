"use client";
import socket from "@/common/connection/webSocket";
import styled from "styled-components";
import { Card } from "@/components";
import { TrucoCard } from "utils/interfaces";


const H1 = styled.h1`
  color: red;
`;



export default function Home() {
  const handleJoin = () => {
    socket.on("join", (data) => {
      console.log(data);
    });

    socket.emit("join", { name: "test" });
  };

  const sampleCard: TrucoCard = {
    value: "A",
    suit: "copas"
  }

  return (
    <div>
      <H1>Main</H1>
      <button onClick={handleJoin}>Join</button>
      <Card card={sampleCard} />
    </div>
  );
}
