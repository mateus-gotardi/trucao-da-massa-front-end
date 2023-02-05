import { io, Socket } from "socket.io-client";

const client = io("ws://localhost:3333/");

const socket = {
  on: console.log(client.on("join", () => console.log("connected"))),
};

export default socket;
