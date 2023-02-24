import React, { useContext, useEffect, useState } from "react";
import { IGameState, IPlayer, ITrucoCard } from "utils/interfaces";
import { Button, Card, colors, HiddenCard } from "..";
import * as Styled from "./styles";
import { ImExit } from "react-icons/im";
import { BsQuestionLg, BsFillGearFill } from "react-icons/bs";
import { GiCardPlay } from "react-icons/gi";
import { GameContext } from "GameContext";
import socket from "@/common/connection/webSocket";
import TrucoModal from "./trucoModal";
import ElevenHandModal from "./elevenHandModal";
import InfoModal from "./infoModal";
import { useRouter } from "next/router";

const ScoreBall: React.FC<{ fillColor: boolean }> = ({ fillColor }) => {
  return <Styled.ScoreBall fillColor={fillColor} />;
};

const GameTable: React.FC = () => {
  const [trucoShake, setTrucoShake] = useState<boolean>(false);
  const [trucoModal, setTrucoModal] = useState<string>('');
  const [elevenModal, setElevenModal] = useState<boolean>(false);
  const [finished, setFinished] = useState<boolean>(false);
  const [info, setInfo] = useState<string>('');
  const [trucoAsker, setTrucoAsker] = useState<string>('');
  const [hideCard, setHideCard] = useState<boolean>(false);
  const value = useContext(GameContext);
  const gameState: IGameState = value.gameState;
  const playerState: IPlayer = value.playerState;

  const router = useRouter();

  useEffect(() => {
    if (playerState.playerId === '') {
      router.replace('/')
    }
  }, [])

  const getPartner = () => {
    if (playerState.team === "team1") {
      return gameState.team1.find(
        (player) => player.playerId !== playerState.playerId
      );
    } else {
      return gameState.team2.find(
        (player) => player.playerId !== playerState.playerId
      );
    }
  };
  const getOpponent = () => {
    if (playerState.team === "team1") {
      return "team2";
    } else {
      return "team1";
    }
  };
  const getTeam = () => {
    if (playerState.team === "team1") {
      return "team1";
    } else {
      return "team2";
    }
  }

  socket.on('handofeleven', (data: { team: string }) => {
    if (data.team === playerState.team) {
      setElevenModal(true);
    } else {
      setInfo('O outro time esta decidindo se vai jogar ou não')
    }
  })
  socket.on('playelevenres', (data: { message: string }) => {
    setInfo(data.message)
    setTimeout(() => {
      setInfo('')
    }, 3000);
  })

  socket.on('responsetruco', (data: { team: string, accept: boolean }) => {
    setTrucoModal('')
    setInfo('')
  })

  const handleTruco = () => {
    if (!gameState.waiting) {
      socket.emit("asktruco", { roomId: gameState.tableId, playerId: playerState.playerId });
    }
  };

  socket.on("acceptTruco", (data: { team: string, player: string, asker: string }) => {
    console.log(data)
    console.log(playerState)
    setTrucoShake(true);
    setTimeout(() => {
      setTrucoShake(false);
    }, 1000);
    setTrucoAsker(data.asker);
    if (data.player === playerState.playerId) {
      setTrucoModal("accept");
    } else if (data.team === playerState.team) {
      setTrucoModal("help");
    } else {
      setTrucoModal('')
      setInfo("Esperando resposta do outro time");
    }
  })

  const toggleReady = () => {
    socket.emit("setready", { roomId: gameState.tableId, playerId: playerState.playerId });
  }

  const startGame = () => {
    socket.emit("startgame", { roomId: gameState.tableId, playerId: playerState.playerId });
  }

  const playCard = (card: ITrucoCard) => {
    socket.emit("playcard", { roomId: gameState.tableId, playerId: playerState.playerId, card, hidden: hideCard });
  }

  const getLeftOpponent = () => {
    switch (playerState.playerId) {
      case gameState.team1[0]?.playerId:
        return gameState.team2[1];
      case gameState.team1[1]?.playerId:
        return gameState.team2[0];
      case gameState.team2[0]?.playerId:
        return gameState.team1[0];
      case gameState.team2[1]?.playerId:
        return gameState.team1[1];
    }
  }
  const getRightOpponent = () => {
    switch (playerState.playerId) {
      case gameState.team1[0]?.playerId:
        return gameState.team2[0];
      case gameState.team1[1]?.playerId:
        return gameState.team2[1];
      case gameState.team2[0]?.playerId:
        return gameState.team1[1];
      case gameState.team2[1]?.playerId:
        return gameState.team1[0];
    }
  }

  const partner = getPartner();
  const leftOpponent = getLeftOpponent();
  const rightOpponent = getRightOpponent();

  socket.on('update', (data:any)=>{
    if (data.gameFinished) {
      setFinished(true)
    }
  })

  return (
    <Styled.GameTableStyles truco={trucoShake}>
      {trucoModal !== '' && <TrucoModal setModal={() => setTrucoModal('')} type={trucoModal} asker={trucoAsker} />}
      {elevenModal && <ElevenHandModal showModal={() => setElevenModal(false)} partnerHand={partner?.hand} myHand={playerState.hand} />}
      {info !== '' && <InfoModal close={() => setInfo('')}><h3>{info}</h3></InfoModal>}
      {gameState.gameFinished && finished && <InfoModal close={() => { setFinished(false) }}>
        <h2>Vencedor: {gameState.winner}</h2>
        <h3>Placar: {gameState.score.team1} X {gameState.score.team2}</h3>
      </InfoModal>}
      <Styled.Section alignItems="flex-start">
        <Styled.ScoreStyles>
          <div id='score'>
            <div>
              <h1>PONTOS</h1>
              <h2>
                NÓS: {gameState.score[getTeam()]}
              </h2>
              <h2>ELES: {gameState.score[getOpponent()]}</h2>
            </div>
            <div>
              <h1>RODADA</h1>
              <h3>
                <ScoreBall
                  fillColor={
                    playerState.team
                      ? gameState.partialScore[playerState.team] >= 1
                      : false
                  }
                />
                <ScoreBall
                  fillColor={
                    playerState.team
                      ? gameState.partialScore[playerState.team] >= 2
                      : false
                  }
                />
                <ScoreBall
                  fillColor={
                    playerState.team
                      ? gameState.partialScore[playerState.team] >= 3
                      : false
                  }
                />
              </h3>
              <h3>
                <ScoreBall fillColor={gameState.partialScore[getOpponent()] >= 1} />
                <ScoreBall fillColor={gameState.partialScore[getOpponent()] >= 2} />
                <ScoreBall fillColor={gameState.partialScore[getOpponent()] >= 3} />
              </h3>
            </div>
            <div>
              <h1>TENTOS</h1>
              <h4>{gameState.points}</h4>
            </div>
          </div>
          <div id='turn'>
            {gameState.gameStarted && gameState.playedCards.length !== 4 &&
              <h4>{gameState.turn === playerState.name ? 'SUA VEZ' : "VEZ DE " + gameState.turn}</h4>
            }
          </div>

        </Styled.ScoreStyles>
        <Styled.OtherPlayerHand>
          <h4>{partner?.name}</h4>
          {partner?.hand.map((card, index) => {
            return <HiddenCard key={index}></HiddenCard>;
          })}
        </Styled.OtherPlayerHand>
        <Styled.ConfigStyles colors={colors}>
          <div>
            <Styled.Deck>
              <div className="vira">
                {gameState.vira && gameState.gameStarted && <Card card={gameState.vira}></Card>}
              </div>
              <div className="monte">
                <HiddenCard></HiddenCard>
                <HiddenCard></HiddenCard>
                <HiddenCard></HiddenCard>
                <HiddenCard></HiddenCard>
              </div>
            </Styled.Deck>
          </div>
          <section>
            <BsQuestionLg size={30} />

            <BsFillGearFill size={30} />

            <ImExit size={30} onClick={() => {
              socket.emit('exit', { roomId: gameState.tableId, playerId: playerState.playerId })
              router.push('/')
            }} />
          </section>
        </Styled.ConfigStyles>
      </Styled.Section>

      <Styled.Section>
        <Styled.OtherPlayerHand left>
          <h4>{leftOpponent?.name}</h4>
          {leftOpponent?.hand.map((card, index) => {
            return <HiddenCard key={index}></HiddenCard>;
          })}
        </Styled.OtherPlayerHand>
        <Styled.PublicTable>
          <Styled.LeftPlayed>
            {gameState.playedCards.map((played, index) => {
              if (played.playerId === leftOpponent?.playerId) {
                if (played.card.value === 'hidden') {
                  return <HiddenCard key={index}></HiddenCard>;
                } else return <Card key={index} card={played.card}></Card>;
              }
            })}
          </Styled.LeftPlayed>
          <Styled.TeamPlayed>
            <div>
              {gameState.playedCards.map((played, index) => {
                if (
                  playerState.team &&
                  played.playerId ===
                  gameState[playerState.team].filter(
                    (player) => player.playerId !== playerState.playerId
                  )[0].playerId
                ) {
                  if (played.card.value === 'hidden') {
                    return <HiddenCard key={index}></HiddenCard>;
                  } else return <Card key={index} card={played.card}></Card>;
                }
              })}
            </div>
            <div>
              {gameState.playedCards.map((played, index) => {
                if (played.playerId === playerState.playerId)
                  if (played.card.value === 'hidden') {
                    return <HiddenCard key={index}></HiddenCard>;
                  } else return <Card key={index} card={played.card}></Card>;
              })}
            </div>
          </Styled.TeamPlayed>
          <Styled.RightPlayed>
            {gameState.playedCards.map((played, index) => {
              if (played.playerId === rightOpponent?.playerId) {
                if (played.card.value === 'hidden') {
                  return <HiddenCard key={index}></HiddenCard>;
                } else return <Card key={index} card={played.card}></Card>;
              }
            })}
          </Styled.RightPlayed>
        </Styled.PublicTable>
        <Styled.OtherPlayerHand right>
          <h4>{rightOpponent?.name}</h4>
          {rightOpponent?.hand.map((card, index) => {
            return <HiddenCard key={index}></HiddenCard>;
          })}
        </Styled.OtherPlayerHand>
      </Styled.Section>
      <Styled.Section alignItems="flex-end" >
        {gameState.gameStarted && playerState.hand.length <= 2 && gameState.turn === playerState.playerId ? <>
          <Button onClick={() => { setHideCard(!hideCard) }} available>
            <GiCardPlay />
            {hideCard ? <p>REVELAR</p> : <p>ESCONDER</p>}
          </Button>
        </> : <div id='placeholder'></div>}
        <Styled.PlayerHand>
          {playerState.hand.map((card, index) => {
            return <Card card={card} key={index} activable onClick={() => playCard(card)}></Card>;
          })}
        </Styled.PlayerHand>
        {gameState.gameStarted ?
          <Button
            onClick={handleTruco}
            available={playerState.playerId !== gameState.lastTruco && partner?.playerId !== gameState.lastTruco && gameState.points < 12}
          >{gameState.elevenHand && "TRUCO"}
            {!gameState.elevenHand && gameState.points === 1 && "TRUCO"}
            {!gameState.elevenHand && gameState.points === 3 && "SEIS"}
            {!gameState.elevenHand && gameState.points === 6 && "NOVE"}
            {!gameState.elevenHand && gameState.points === 9 && "DOZE"}
            {!gameState.elevenHand && gameState.points === 12 && "FIM DE JOGO"}
          </Button> :
          <div id='ready-toggler'>
            {playerState.playerId === gameState.createdBy &&
              <Button available onClick={startGame}>
                INICIAR
              </Button>}
            <Button onClick={toggleReady} available>
              {playerState.ready ? "CANCELAR" : "PRONTO"}
            </Button>
          </div>

        }

      </Styled.Section>
    </Styled.GameTableStyles>
  );
};

export default GameTable;
