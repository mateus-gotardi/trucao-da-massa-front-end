import { GameContext } from "GameContext";
import React, { useContext } from "react";
import { IPlayerState } from "utils/interfaces";
import { Button, colors } from "..";
import HiddenCard from "../hiddenCard";
import { OtherPlayerHand } from "./styles";
import { BsCheckLg, BsXLg } from "react-icons/bs";
import socket from "@/common/connection/webSocket";

const OtherPlayer: React.FC<{ player?: IPlayerState, side: string }> = ({ player, side }) => {

    const value = useContext(GameContext);
    const { gameState, playerState } = value;
    const kickPlayer = () => {
        socket.emit('kickplayer', { roomId: gameState.tableId, playerId: player?.playerId })
    }
    const addBot = () => {
        let team = side === 'left' || side === 'right' ? 'team2' : 'team1';
        socket.emit('addbot', { roomId: gameState.tableId, team })
    }


    return (
        <OtherPlayerHand side={side} colors={colors}>
            <h4>{player?.name} {player?.ready ? <BsCheckLg /> : <BsXLg />}</h4>
            {playerState.playerId === gameState.createdBy && !gameState.gameStarted && player?.playerId && <Button available size={[5, 3]} onClick={() => { kickPlayer() }}>Remover</Button>}
            {playerState.playerId === gameState.createdBy && !gameState.gameStarted && !player?.playerId && <Button available size={[5, 3]} onClick={() => { addBot() }}>Add Bot</Button>}
            <div id='cards'>
                {player?.hand?.map((card, index) => {
                    return (
                        <HiddenCard key={index}></HiddenCard>
                    )
                })}
            </div>
        </OtherPlayerHand>
    )
}

export default OtherPlayer;