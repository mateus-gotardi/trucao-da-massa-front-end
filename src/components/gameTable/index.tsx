import React, { useContext, useEffect, useState } from "react";
import { IGameState, IPlayer, ITrucoCard } from "utils/interfaces";
import { Button, Card, HiddenCard } from "..";
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
  const value = useContext(GameContext);
  const gameState: IGameState = value.gameState;
  const playerState: IPlayer = value.playerState;

  const router = useRouter();

  useEffect(() => {
    if (playerState.playerId === '') {
      router.replace('/')
    }
  },[])

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
  })

  const handleTruco = () => {
    socket.emit("asktruco", { roomId: gameState.tableId, playerId: playerState.playerId });
  };

  socket.on("acceptTruco", (data: { team: string, player: string, asker: string }) => {
    console.log(data)
    setTrucoShake(true);
    setTimeout(() => {
      setTrucoShake(false);
    }, 1000);
    setTrucoAsker(data.asker);
    if (data.team === playerState.team && data.player === playerState.playerId) {
      setTrucoModal("accept");
    } else if (data.team === playerState.team) {
      setTrucoModal("help");
    } else {
      setTrucoModal("ask");
    }
  })

  const toggleReady = () => {
    socket.emit("setready", { roomId: gameState.tableId, playerId: playerState.playerId });
  }

  const startGame = () => {
    socket.emit("startgame", { roomId: gameState.tableId, playerId: playerState.playerId });
  }

  const playCard = (card: ITrucoCard) => {
    socket.emit("playcard", { roomId: gameState.tableId, playerId: playerState.playerId, card });
  }

  const partner = getPartner();

  return (
    <Styled.GameTableStyles truco={trucoShake}>
      {trucoModal === 'accept' || trucoModal === 'help' && <TrucoModal setModal={() => setTrucoModal('')} type={trucoModal} asker={trucoAsker} />}
      {elevenModal && <ElevenHandModal showModal={() => setElevenModal(false)} partnerHand={partner?.hand} myHand={playerState.hand} />}
      {info !== '' && <InfoModal close={() => setInfo('')}>{info}</InfoModal>}
      {gameState.gameFinished && finished && <InfoModal close={() => { setFinished(false) }}>
        <h2>{gameState.winner}</h2>
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
            {gameState.gameStarted &&
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
        <Styled.ConfigStyles>
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

            <ImExit size={30} onClick={()=>{socket.emit('exit', {roomId: gameState.tableId, playerId: playerState.playerId})
            router.push('/')
          }}/>
          </section>
        </Styled.ConfigStyles>
      </Styled.Section>

      <Styled.Section>
        <Styled.OtherPlayerHand left>

          {playerState.team === "team1" ? (
            <>
              {gameState.team1[0]?.playerId === playerState.playerId && <>
                <h4>{gameState.team2[1]?.name}</h4>
                {gameState.team2[1]?.hand.map((card, index) => {
                  return <HiddenCard key={index}></HiddenCard>;
                })}
              </>}
              {gameState.team1[1]?.playerId === playerState.playerId && <>
                <h4>{gameState.team2[0]?.name}</h4>
                {gameState.team2[0]?.hand.map((card, index) => {
                  return <HiddenCard key={index}></HiddenCard>;
                })}
              </>}
            </>
          ) : (
            <>
              {gameState.team2[0]?.playerId === playerState.playerId && <>
                <h4>{gameState.team1[0]?.name}</h4>
                {gameState.team1[0]?.hand.map((card, index) => {
                  return <HiddenCard key={index}></HiddenCard>;
                })}
              </>}
              {gameState.team2[1]?.playerId === playerState.playerId && <>
                <h4>{gameState.team1[1]?.name}</h4>
                {gameState.team1[1]?.hand.map((card, index) => {
                  return <HiddenCard key={index}></HiddenCard>;
                })}
              </>}
            </>
          )}

        </Styled.OtherPlayerHand>
        <Styled.PublicTable>
          <Styled.LeftPlayed>
            {gameState.playedCards.map((played, index) => {
              if (played.playerId === gameState[getOpponent()][0].playerId)
                return <Card key={index} card={played.card}></Card>;
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
                )
                  return <Card key={index} card={played.card}></Card>;
              })}
            </div>
            <div>
              {gameState.playedCards.map((played, index) => {
                if (played.playerId === playerState.playerId)
                  return <Card key={index} card={played.card}></Card>;
              })}
            </div>
          </Styled.TeamPlayed>
          <Styled.RightPlayed>
            {gameState.playedCards.map((played, index) => {
              if (played.playerId === gameState[getOpponent()][1].playerId)
                return <Card key={index} card={played.card}></Card>;
            })}
          </Styled.RightPlayed>
        </Styled.PublicTable>
        <Styled.OtherPlayerHand right>


          {playerState.team === "team1" ? (
            <>{gameState.team1[0]?.playerId === playerState.playerId && <>
              <h4>{gameState.team2[0]?.name}</h4>
              {gameState.team2[0]?.hand.map((card, index) => {
                return <HiddenCard key={index}></HiddenCard>;
              })}
            </>}
              {gameState.team1[1]?.playerId === playerState.playerId && <>
                <h4>{gameState.team2[1]?.name}</h4>
                {gameState.team2[1]?.hand.map((card, index) => {
                  return <HiddenCard key={index}></HiddenCard>;
                })}
              </>}
            </>
          ) : (
            <>{gameState.team2[0]?.playerId === playerState.playerId && <>
              <h4>{gameState.team1[1]?.name}</h4>
              {gameState.team1[1]?.hand.map((card, index) => {
                return <HiddenCard key={index}></HiddenCard>;
              })}
            </>}
              {gameState.team2[1]?.playerId === playerState.playerId && <>
                <h4>{gameState.team1[0]?.name}</h4>
                {gameState.team1[0]?.hand.map((card, index) => {
                  return <HiddenCard key={index}></HiddenCard>;
                })}
              </>}
            </>
          )}


        </Styled.OtherPlayerHand>
      </Styled.Section>
      <Styled.Section alignItems="flex-end" >
        <Button onClick={() => { }} available>
          <GiCardPlay />
          <p>VIRAR</p>
        </Button>
        <Styled.PlayerHand>
          {playerState.hand.map((card, index) => {
            return <Card card={card} key={index} activable onClick={() => playCard(card)}></Card>;
          })}
        </Styled.PlayerHand>
        {gameState.gameStarted ?
          <Button
            onClick={handleTruco}
            available={playerState.team !== gameState.lastTruco && gameState.points < 12}
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
