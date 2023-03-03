import { io } from "socket.io-client";

const client = io(process.env.NEXT_PUBLIC_BACKEND_URL as string);

const socket = {
  on: (event: string, callback: (data: any) => void) => {
    client.on(event, callback);
    return () => client.off(event, callback);
  },

  emit: (event: string, data: any) => {
    client.emit(event, data);
    console.log("emit", event, data);
    return () => client.off(event);
  },
};

export default socket;
