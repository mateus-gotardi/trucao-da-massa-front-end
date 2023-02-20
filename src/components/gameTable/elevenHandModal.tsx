import React, { useContext, useState } from "react";
import { ITrucoCard } from "utils/interfaces";
import Button from "../button";
import Card from "../card";
import { ElevenModal } from "./styles";
import { GameContext } from "GameContext";
import socket from "@/common/connection/webSocket";

const ElevenHandModal: React.FC<{ partnerHand: ITrucoCard[]|undefined, myHand: ITrucoCard[], showModal: () => void }> = ({ partnerHand, myHand, showModal }) => {
    const value = useContext(GameContext);
    const { gameState, playerState } = value;
    const [info, setInfo] = useState<string>('');

    const handlePlay = (accept: boolean) => {
        socket.emit('playeleven', { roomId: gameState.tableId, team: playerState.team, accept })
        showModal();
    }

    socket.on('playeleven', (data: {team: string, accept: boolean}) => {
        if (data.team === playerState.team && data.accept === true) {
            showModal();
        } else if (data.team === playerState.team && data.accept === false) {
            setInfo('Seu parceiro quer correr')
        }
    })

    return (
        <ElevenModal>
            <h3>Mão de Onze</h3>
            <h4>Escolha se vai jogar ou não</h4>
            <h4>{info}</h4>
            <div>
                <h5>Mão do parceiro</h5>
                {partnerHand?.map((card, index) => {
                    return <Card card={card} key={index} />;
                })}
            </div>
            <div>
                <h5>Sua mão</h5>
                {myHand.map((card, index) => {
                    return <Card card={card} key={index+'b'} />;
                })}
            </div>
            <Button available onClick={() => handlePlay(true)}>Jogar</Button>
            <Button available onClick={() => handlePlay(false)}>Correr</Button>
        </ElevenModal>
    );
}
export default ElevenHandModal;