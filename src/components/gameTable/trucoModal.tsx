import React, { useState, useContext } from "react";
import { GameContext } from "GameContext";
import Button from "../button";
import { ModalStyles } from "./styles";
import socket from "@/common/connection/webSocket";


const TrucoModal: React.FC<{ setModal: () => void, type: string, asker: string }> = ({ setModal, type, asker }) => {
    const value = useContext(GameContext);
    const [partnerHelp, setPartnerHelp] = useState<string>('');
    const { gameState, playerState } = value;
    const handleAccept = (accept: boolean) => {
        switch (type) {
            case 'accept':
                socket.emit('responsetruco', { accepted: accept, playerId: playerState.playerId, roomId: gameState.tableId, asker: asker })
                break;
            case 'help':
                let help = accept ? 'yes' : 'no'
                socket.emit('helpfriend', { playerId: playerState.playerId, roomId: gameState.tableId, accept: help })
                break;
        }
        setModal()
    }
    const handleBet = () => {
        switch (type) {
            case 'accept':
                socket.emit('askmoretruco', { playerId: playerState.playerId, roomId: gameState.tableId, previousAsker: asker })
                break;
            case 'help':
                socket.emit('helpfriend', { playerId: playerState.playerId, roomId: gameState.tableId, accept: 'bet' })
        }
        setModal()
    }

    socket.on('helpfriend', (data: { accept: 'yes' | 'no' | 'bet' }) => {
        switch (data.accept) {
            case 'yes':
                setPartnerHelp('Seu parceiro disse para aceitar o truco')
                break;
            case 'no':
                setPartnerHelp('Seu parceiro disse para recusar o truco')
                break;
            case 'bet':
                setPartnerHelp('Seu parceiro disse para aumentar a aposta')
                break;
        }
    })

    return (
        <ModalStyles>

            <h4>Oponente pediu {
                gameState.points === 1 && "truco"
                || gameState.points === 3 && "seis"
                || gameState.points === 6 && "nove"
                || gameState.points === 9 && "doze"
            }</h4>
            {type === 'help' && <h4>Dê uma dica para o seu parceiro</h4>}
            {partnerHelp !== '' && <h5>{partnerHelp}</h5>}
            <Button available onClick={() => handleAccept(true)}>ACEITAR</Button>
            <Button available onClick={() => handleAccept(false)}>RECUSAR</Button>
            {gameState.points < 7 &&
                <Button available onClick={handleBet}>{
                    gameState.points === 1 && "SEIS"
                    || gameState.points === 3 && "NOVE"
                    || gameState.points === 6 && "DOZE"
                }</Button>
            }

        </ModalStyles>
    )
}
export default TrucoModal;