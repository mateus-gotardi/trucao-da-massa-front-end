import React, { useContext, useState } from "react";
import { IGameState, IPlayer, ITrucoCard } from "utils/interfaces";
import { Button, Card, HiddenCard } from "..";
import * as Styled from "./styles";
import { ImExit } from "react-icons/im";
import { BsQuestionLg, BsFillGearFill } from "react-icons/bs";
import { GiCardPlay } from "react-icons/gi";
import { GameContext } from "GameContext";
import socket from "@/common/connection/webSocket";


const ScoreBall: React.FC<{ fillColor: boolean }> = ({ fillColor }) => {
  return <Styled.ScoreBall fillColor={fillColor} />;
};

const GameTable: React.FC = () => {
  const [trucoShake, setTrucoShake] = useState<boolean>(false);
  const [truco, setTruco] = useState<number>(1);
  const value = useContext(GameContext);
  const gameState: IGameState = value.gameState;
  const playerState: IPlayer = value.playerState;

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

  const handleTruco = () => {
    switch (truco) {
      case 1:
        setTruco(3);
        break;
      case 3:
        setTruco(6);
        break;
      case 6:
        setTruco(9);
        break;
      case 9:
        setTruco(12);
        break;
      case 12:
        setTruco(1);
        break;
    }
    setTrucoShake(true);
    setTimeout(() => {
      setTrucoShake(false);
    }, 1000);
  };

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
            <h4>{gameState.turn === playerState.name? 'SUA VEZ': "VEZ DE " + gameState.turn}</h4>
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

            <ImExit size={30} />
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
            return <Card card={card} key={index} activable onClick={()=>playCard(card)}></Card>;
          })}
        </Styled.PlayerHand>
        {gameState.gameStarted ?
          <Button
            onClick={handleTruco}
            available={playerState.team !== gameState.lastTruco && gameState.points<12}
          >
            {gameState.points === 1 && "TRUCO"}
            {gameState.points === 3 && "SEIS"}
            {gameState.points === 6 && "NOVE"}
            {gameState.points === 9 && "DOZE"}
            {gameState.points === 12 && "FIM DE JOGO"}
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
