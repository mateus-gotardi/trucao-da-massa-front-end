import React, { useContext, useState } from "react";
import { IGameState, IPlayer } from "utils/interfaces";
import { Button, Card, HiddenCard } from "..";
import * as Styled from "./styles";
import { ImExit } from "react-icons/im";
import { BsQuestionLg, BsFillGearFill } from "react-icons/bs";
import { GiCardPlay } from "react-icons/gi";
import { GameContext } from "GameContext";

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

  const partner = getPartner();
  return (
    <Styled.GameTableStyles truco={trucoShake}>
      <Styled.Section
        style={{
          alignItems: "flex-start",
        }}
      >
        <Styled.ScoreStyles>
          <div>
            <h1>PONTOS</h1>
            <h2>
              NÓS: {playerState.team && gameState.score[playerState.team]}
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
            <h4>{truco}</h4>
          </div>
        </Styled.ScoreStyles>
        <Styled.OtherPlayerHand>
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
        <Styled.OtherPlayerHand
          style={{
            transform: `rotate(90deg)`,
            marginBottom: "-5rem",
            marginLeft: "0",
          }}
        >
          {
            gameState.gameStarted && <>
              {playerState.team === "team1" ? (
                <>
                  {gameState.team2[0].hand.map((card, index) => {
                    return <HiddenCard key={index}></HiddenCard>;
                  })}
                </>
              ) : (
                <>
                  {gameState.team1[0].hand.map((card, index) => {
                    return <HiddenCard key={index}></HiddenCard>;
                  })}
                </>
              )}
            </>
          }

        </Styled.OtherPlayerHand>
        <Styled.PublicTable>
          <Styled.LeftPlayed
            style={{
              transform: `rotate(${Math.floor(
                Math.random() * (120 - 55 + 1) + 55
              )}deg)`,
            }}
          >
            {gameState.playedCards.map((played, index) => {
              if (played.playerId === gameState[getOpponent()][0].playerId)
                return <Card key={index} card={played.card}></Card>;
            })}
          </Styled.LeftPlayed>
          <Styled.TeamPlayed>
            <div
              style={{
                transform: `rotate(-${Math.floor(
                  Math.random() * (30 - -30 + 1) + -30
                )}deg)`,
              }}
            >
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
            <div
              style={{
                transform: `rotate(${Math.floor(
                  Math.random() * (30 - -30 + 1) + -30
                )}deg)`,
              }}
            >
              {gameState.playedCards.map((played, index) => {
                if (played.playerId === playerState.playerId)
                  return <Card key={index} card={played.card}></Card>;
              })}
            </div>
          </Styled.TeamPlayed>
          <Styled.RightPlayed
            style={{
              transform: `rotate(-${Math.floor(
                Math.random() * (120 - 55 + 1) + 55
              )}deg)`,
            }}
          >
            {gameState.playedCards.map((played, index) => {
              if (played.playerId === gameState[getOpponent()][1].playerId)
                return <Card key={index} card={played.card}></Card>;
            })}
          </Styled.RightPlayed>
        </Styled.PublicTable>
        <Styled.OtherPlayerHand
          style={{
            transform: "rotate(-90deg)",
            marginTop: "-5rem",
            marginLeft: "0",
          }}
        >
          {gameState.gameStarted && <>
            {playerState.team === "team1" ? (
              <>
                {gameState.team2[1].hand.map((card, index) => {
                  return <HiddenCard key={index}></HiddenCard>;
                })}
              </>
            ) : (
              <>
                {gameState.team1[1].hand.map((card, index) => {
                  return <HiddenCard key={index}></HiddenCard>;
                })}
              </>
            )}
          </>}

        </Styled.OtherPlayerHand>
      </Styled.Section>
      <Styled.Section
        style={{
          alignItems: "flex-end",
        }}
      >
        <Button onClick={() => { }} available>
          <GiCardPlay />
          <p>VIRAR</p>
        </Button>
        <Styled.PlayerHand>
          {playerState.hand.map((card, index) => {
            return <Card card={card} key={index} activable></Card>;
          })}
        </Styled.PlayerHand>
        <Button
          onClick={handleTruco}
          available={playerState.team !== gameState.lastTruco}
        >
          {truco === 1 && "TRUCO"}
          {truco === 3 && "SEIS"}
          {truco === 6 && "NOVE"}
          {truco === 9 && "DOZE"}
          {truco === 12 && "TRUCO"}
        </Button>
      </Styled.Section>
    </Styled.GameTableStyles>
  );
};

export default GameTable;
