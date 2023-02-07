import React from "react";
import { IGameState, IPlayer } from "utils/interfaces";
import { Button, Card, HiddenCard } from "..";
import * as Styled from "./styles";
import { ImExit } from "react-icons/im";
import { GrConfigure } from "react-icons/gr";
import { BsQuestionLg } from "react-icons/bs";
import { GiCardPlay } from "react-icons/gi";

const ScoreBall: React.FC<{ fill: boolean }> = ({ fill }) => {
  return <Styled.ScoreBall fill={fill} />;
};

const GameTable: React.FC = () => {
  const [trucoShake, setTrucoShake] = React.useState<boolean>(false);
  const [truco, setTruco] = React.useState<number>(1);
  const [playerState, setPlayerState] = React.useState<IPlayer>({
    playerId: "123",
    name: "Player 1",
    hand: [
      { value: "7", suit: "paus" },
      { value: "J", suit: "ouros" },
      { value: "4", suit: "paus" },
    ],
    team: "team1",
  });
  const [gameState, setGameState] = React.useState<IGameState>({
    tableId: "0",
    team1: [
      {
        playerId: "123",
        name: "Player 1",
        hand: [
          { value: "A", suit: "copas" },
          { value: "K", suit: "ouros" },
          { value: "3", suit: "paus" },
        ],
      },
      {
        playerId: "456",
        name: "Player 2",
        hand: [
          { value: "4", suit: "espadas" },
          { value: "5", suit: "paus" },
        ],
      },
    ],
    team2: [
      {
        playerId: "789",
        name: "Player 1",
        hand: [
          { value: "7", suit: "ouros" },
          { value: "Q", suit: "espadas" },
        ],
      },
      {
        playerId: "101",
        name: "Player 2",
        hand: [
          { value: "K", suit: "ouros" },
          { value: "3", suit: "espadas" },
        ],
      },
    ],
    score: {
      team1: 7,
      team2: 4,
    },
    partialScore: {
      team1: 0,
      team2: 0,
    },
    vira: { value: "3", suit: "paus" },
    turn: "789",
    dealer: "123",
    points: 1,
    playedCards: [
      { card: { value: "A", suit: "ouros" }, playerId: "789" },
      { card: { value: "7", suit: "copas" }, playerId: "101" },
      { card: { value: "Q", suit: "copas" }, playerId: "456" },
    ],
    lastTruco: "team2",
  });
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
    }, 1000)
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
            <h2>NÓS: {gameState.score[playerState.team]}</h2>
            <h2>ELES: {gameState.score[getOpponent()]}</h2>
          </div>
          <div>
            <h1>RODADA</h1>
            <h3>
              <ScoreBall fill={gameState.partialScore[playerState.team] >= 1} />
              <ScoreBall fill={gameState.partialScore[playerState.team] >= 2} />
              <ScoreBall fill={gameState.partialScore[playerState.team] >= 3} />
            </h3>
            <h3>
              <ScoreBall fill={gameState.partialScore[getOpponent()] >= 1} />
              <ScoreBall fill={gameState.partialScore[getOpponent()] >= 2} />
              <ScoreBall fill={gameState.partialScore[getOpponent()] >= 3} />
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
                <Card card={gameState.vira}></Card>
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

            <GrConfigure size={30} />

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
        </Styled.OtherPlayerHand>
        <Styled.PublicTable>
          <Styled.LeftPlayed style={{
            transform: `rotate(${Math.floor(Math.random() * (120 - 55 + 1) + 55)}deg)`
          }}>
            {gameState.playedCards.map((played, index) => {
              if (played.playerId === gameState[getOpponent()][0].playerId)
                return <Card key={index} card={played.card}></Card>;
            })}
          </Styled.LeftPlayed>
          <Styled.TeamPlayed>
            <div style={{
              transform: `rotate(-${Math.floor(Math.random() * (30 - (-30) + 1) + (-30))}deg)`,
            }}>
              {gameState.playedCards.map((played, index) => {
                if (
                  played.playerId ===
                  gameState[playerState.team].filter(
                    (player) => player.playerId !== playerState.playerId
                  )[0].playerId
                )
                  return <Card key={index} card={played.card}></Card>;
              })}
            </div>
            <div style={{
              transform: `rotate(${Math.floor(Math.random() * (30 - (-30) + 1) + (-30))}deg)`,
            }}>
              {gameState.playedCards.map((played, index) => {
                if (played.playerId === playerState.playerId)
                  return <Card key={index} card={played.card}></Card>;
              })}
            </div>
          </Styled.TeamPlayed>
          <Styled.RightPlayed style={{
            transform: `rotate(-${Math.floor(Math.random() * (120 - 55 + 1) + 55)}deg)`
          }}>
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
        </Styled.OtherPlayerHand>
      </Styled.Section>
      <Styled.Section
        style={{
          alignItems: "flex-end",
        }}
      >
        <Button onClick={() => {}} available>
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
