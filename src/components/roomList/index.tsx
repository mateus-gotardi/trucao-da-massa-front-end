import socket from "@/common/connection/webSocket";
import React, { useEffect } from "react";
import { IRoomDetails } from "utils/interfaces";
import { Button, colors } from "..";
import * as Styled from "./styles";
import { FiRefreshCw } from "react-icons/fi";

interface RoomsListProps {
    rooms: IRoomDetails[];
    getNickname: ()=>string;
    getTeam: ()=>number;
}
const getRooms = () => {
    socket.emit("getrooms", {});
};

const RoomsList: React.FC<RoomsListProps> = (props) => {
    const bcgs = ['tartaruga.png', 'astronauta.png', 'samurai.png', 'submerso.png', 'psicodelico.png', 'ratos.png',
        'terror.png', 'old.png', 'viking.png']

    useEffect(() => {
        socket.emit("getrooms", {});
    }, [])

    const {getNickname, getTeam} = props
    const join = (room: string) => {
        const nickname = getNickname()
        const team = getTeam()
        console.log(props)
        if (nickname !== '' && room !== '' &&
            nickname !== "null" && room !== "null" &&
            nickname !== null && room !== null &&
            nickname !== undefined && room !== undefined &&
            nickname !== "undefined" && room !== "undefined" &&
            nickname !== " " && room !== " " &&
            nickname !== "draw" && room !== "draw" &&
            nickname !== "bot" && nickname !== "Bot") {
            socket.emit('join', {
                roomId: room,
                name: nickname,
                team: team,
                playerId: nickname,
            });
        }
        console.log(nickname, room, team)
    }

    return (<>
        <Styled.RoomsList colors={colors}>
            <div>
                <Button available onClick={getRooms} size={[3, 3]}>
                    <FiRefreshCw />
                </Button>
                <h3>Mesas Disponíveis</h3>
            </div>
            <div id='showRooms'>
                {props.rooms.map((room, index) => {
                    const bcg = bcgs[Math.floor(Math.random() * bcgs.length)]
                    return (
                        <Styled.RoomStyle key={index} bcg={bcg} colors={colors} onClick={() => { join(room.roomId) }}>
                            <p>{room.roomId}</p>
                            <p>Players: {room.players}/4</p>
                        </Styled.RoomStyle>
                    )
                })}
            </div>

        </Styled.RoomsList>
    </>)
}

export default RoomsList;