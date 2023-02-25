import socket from "@/common/connection/webSocket";
import React from "react";
import { IRoomDetails } from "utils/interfaces";
import { Button, colors } from "..";
import * as Styled from "./styles";
import { FiRefreshCw } from "react-icons/fi";

interface RoomsListProps {
    rooms: IRoomDetails[];
    join: (type: "join" | "create", roomId: string) => void
}
const getRooms = () => {
    socket.emit("getrooms", {});
};

const RoomsList: React.FC<RoomsListProps> = (props) => {
    return (<>
        <Styled.RoomsList colors={colors}>
            <div>
                <Button available onClick={getRooms} size={[3,3]}>
                    <FiRefreshCw />
                </Button>
            </div>
            <h4><span>Sala</span><span>Jogadores</span></h4>
            {props.rooms.map((room) => {
                return (
                    <p onClick={() => props.join("join", room.roomId)}>
                        <span>{room.roomId}</span>
                        <span>{room.players}/4</span>
                    </p>
                )
            })}
        </Styled.RoomsList>
    </>)
}

export default RoomsList;