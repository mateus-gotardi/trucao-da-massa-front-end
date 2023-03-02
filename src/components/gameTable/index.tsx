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
import OtherPlayer from "./otherPlayer";
import { ScenarioContext } from "ScenarioContext";
import ConfigModal from "./config";

const ScoreBall: React.FC<{ fillColor: boolean }> = ({ fillColor }) => {
  return <Styled.ScoreBall fillColor={fillColor} />;
};

const GameTable: React.FC = () => {
  const [trucoShake, setTrucoShake] = useState<boolean>(false);
  const [trucoModal, setTrucoModal] = useState<string>('');
  const [elevenModal, setElevenModal] = useState<boolean>(false);
  const [showConfig, setShowConfig] = useState<boolean>(false);
  const [finished, setFinished] = useState<boolean>(false);
  const [info, setInfo] = useState<string>('');
  const [trucoAsker, setTrucoAsker] = useState<string>('');
  const [hideCard, setHideCard] = useState<boolean>(false);
  const value = useContext(GameContext);
  const scenarioCtx = useContext(ScenarioContext)
  let { tableImg, scenario } = scenarioCtx
  const gameState: IGameState = value.gameState;
  const playerState: IPlayer = value.playerState;

  const router = useRouter();

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
    if (data.team !== playerState.team) {
      data.accept ? setInfo('O outro time aceitou o truco!') : setInfo('O outro time recusou o truco!')
      setTimeout(() => { setInfo('') }, 4000);
    }
    else setInfo('')
  })

  socket.on('closeroom', (data: { status: boolean, message: string }) => {
    if (data.status) {
      setInfo(data.message)
      setTimeout(() => {
        router.replace('/')
      }, 10000);
    }
  })

  socket.on('kickplayer', (data: { playerId: string }) => {
    if (playerState.playerId === data.playerId) {
      socket.emit('unsubscribe', { roomId: gameState.tableId, playerId: playerState.playerId })
      setInfo('Você foi expulso da sala!')
      setTimeout(() => {
        router.replace('/')
      }, 7000);
    }
  })

  const handleTruco = () => {
    if (!gameState.waiting) {
      socket.emit("asktruco", { roomId: gameState.tableId, playerId: playerState.playerId });
    }
  };

  socket.on("acceptTruco", (data: { team: string, player: string, asker: string }) => {
    setInfo('')
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
    setHideCard(false);
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

  socket.on('update', (data: any) => {
    if (data.gameFinished) {
      setFinished(true)
    }
  })

  return (
    <Styled.GameTableStyles bcg={scenario} table={tableImg}>
      {showConfig && <ConfigModal toggleModal={() => setShowConfig(false)} />}
      {trucoModal !== '' && <TrucoModal setModal={() => setTrucoModal('')} type={trucoModal} asker={trucoAsker} />}
      {elevenModal && <ElevenHandModal showModal={() => setElevenModal(false)} partnerHand={partner?.hand} myHand={playerState.hand} />}
      {info !== '' && <InfoModal close={() => setInfo('')}><h3>{info}</h3></InfoModal>}
      {gameState.gameFinished && finished && <InfoModal close={() => { setFinished(false) }}>
        <h2>{gameState.winner}</h2>
        <h3>Placar: {gameState.score.team1} X {gameState.score.team2}</h3>
      </InfoModal>}
      <Styled.ScoreStyles colors={colors}>
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
      <OtherPlayer side='middle' player={partner} />
      <Styled.ConfigStyles colors={colors}>
        <section>
          <BsQuestionLg size={30} />

          <BsFillGearFill size={30} onClick={()=>{setShowConfig(true)}}/>

          <ImExit size={30} onClick={() => {
            socket.emit('exit', { roomId: gameState.tableId, playerId: playerState.playerId })
            router.push('/')
          }} />
        </section>
      </Styled.ConfigStyles>


      <OtherPlayer side='left' player={leftOpponent} />
      <Styled.PublicTable truco={trucoShake}>
        <Styled.LeftPlayed>
          {gameState.playedCards.map((played, index) => {
            if (played.playerId === leftOpponent?.playerId) {
              if (played.card.value === 'hidden') {
                return <HiddenCard key={index}></HiddenCard>;
              } else return <Card key={index} card={played.card}></Card>;
            }
          })}
        </Styled.LeftPlayed>
        <Styled.PartnerPlayed>
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
        </Styled.PartnerPlayed>
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
        <Styled.MyPlayed>
          {gameState.playedCards.map((played, index) => {
            if (played.playerId === playerState.playerId)
              if (played.card.value === 'hidden') {
                return <HiddenCard key={index}></HiddenCard>;
              } else return <Card key={index} card={played.card}></Card>;
          })}
        </Styled.MyPlayed>
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
      <OtherPlayer side='right' player={rightOpponent} />
      <Styled.Chat>

      </Styled.Chat>
      <Styled.PlayerHand>
        {playerState.hand.map((card, index) => {
          return <Card card={card} key={index} activable onClick={() => playCard(card)}></Card>;
        })}
      </Styled.PlayerHand>
      <Styled.Buttons>
        {gameState.gameStarted ? <>
          {gameState.turn === playerState.playerId && <>
            <Button onClick={() => { setHideCard(!hideCard) }} available size={[9,2.4]}>
              <GiCardPlay />
              {hideCard ? <p>REVELAR</p> : <p>ESCONDER</p>}
            </Button>
          </>}
          <Button
            size={[9,2.4]}
            onClick={handleTruco}
            available={playerState.playerId !== gameState.lastTruco && partner?.playerId !== gameState.lastTruco && gameState.points < 12}
          >{gameState.elevenHand && "TRUCO"}
            {!gameState.elevenHand && gameState.points === 1 && "TRUCO"}
            {!gameState.elevenHand && gameState.points === 3 && "SEIS"}
            {!gameState.elevenHand && gameState.points === 6 && "NOVE"}
            {!gameState.elevenHand && gameState.points === 9 && "DOZE"}
            {!gameState.elevenHand && gameState.points === 12 && "FIM DE JOGO"}
          </Button>
        </>
          :
          <div id='ready-toggler'>
            {playerState.playerId === gameState.createdBy &&
              <Button available onClick={startGame} size={[6,3]}>
                INICIAR
              </Button>}
            <Button onClick={toggleReady} available size={[6,3]}>
              {playerState.ready ? "CANCELAR" : "PRONTO"}
            </Button>
          </div>
        }
      </Styled.Buttons>
      <Styled.TableImage truco={trucoShake}>
        <img src={`/tables/${tableImg}`} alt="plastic bar table"></img>
      </Styled.TableImage>
    </Styled.GameTableStyles>
  );
};

export default GameTable;
