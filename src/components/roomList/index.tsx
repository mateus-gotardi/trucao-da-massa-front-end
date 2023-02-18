import React from "react";
import * as Styled from "./styles";

interface RoomsListProps {
    rooms: String[];
}

const RoomsList: React.FC<RoomsListProps> = (props: { rooms: String[] }) => {
    return (<>
        <Styled.RoomsList>
            {props.rooms.map((room) => {
                return <h4>{room}</h4>
            })}
        </Styled.RoomsList>
    </>)
}

export default RoomsList;