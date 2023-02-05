"use client";
import socket from "@/common/connection/webSocket";
import { Inter } from "@next/font/google";
import styled from "styled-components";

const inter = Inter({ subsets: ["latin"] });

const H1 = styled.h1`
  color: red;
`;

export default function Home() {
  socket.on;

  return (
    <div>
      <H1 className={inter.className}>Main</H1>
    </div>
  );
}
