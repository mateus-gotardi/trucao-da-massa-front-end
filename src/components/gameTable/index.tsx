import React from "react";
import { IGameState, IPlayer } from "utils/interfaces";
import { Button, Card, HiddenCard } from "..";
import * as Styled from "./styles";
import { ImExit } from "react-icons/im";
import { GrConfigure, GrCircleQuestion } from "react-icons/gr";

const GameTable: React.FC = () => {
  const [truco, setTruco] = React.useState<number>(1);
  const [playerState, setPlayerState] = React.useState<IPlayer>({
    playerId: "123",
    name: "Player 1",
    hand: [
      { value: "A", suit: "copas" },
      { value: "K", suit: "ouros" },
      { value: "3", suit: "paus" },
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
          { value: "A", suit: "ouros" },
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
          { value: "2", suit: "copas" },
          { value: "7", suit: "ouros" },
          { value: "Q", suit: "espadas" },
        ],
      },
      {
        playerId: "101",
        name: "Player 2",
        hand: [
          { value: "6", suit: "copas" },
          { value: "K", suit: "ouros" },
          { value: "3", suit: "espadas" },
        ],
      },
    ],
    score: {
      team1: 7,
      team2: 4,
    },
    vira: { value: "2", suit: "paus" },
    turn: "789",
    dealer: "123",
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
        console.log(truco);
        break;
      case 3:
        setTruco(6);
        console.log(truco);
        break;
      case 6:
        setTruco(9);
        console.log(truco);
        break;
      case 9:
        setTruco(12);
        console.log(truco);
        break;
      case 12:
        setTruco(1);
        console.log(truco);
        break;
    }
  };

  const partner = getPartner();
  return (
    <Styled.GameTableStyles>
      <Styled.Section
        style={{
          alignItems: "flex-start",
        }}
      >
        <Styled.ScoreStyles>
          <h1>NÓS: {gameState.score[playerState.team]}</h1>
          <h1>ELES: {gameState.score[getOpponent()]}</h1>
        </Styled.ScoreStyles>
        <Styled.OtherPlayerHand>
          {partner?.hand.map((card, index) => {
            return <HiddenCard key={index}></HiddenCard>;
          })}
        </Styled.OtherPlayerHand>
        <Styled.ConfigStyles>
          <GrCircleQuestion size={30} />

          <GrConfigure size={30} />

          <ImExit size={30} />
        </Styled.ConfigStyles>
      </Styled.Section>

      <Styled.Section>
        <Styled.OtherPlayerHand
          style={{
            transform: "rotate(90deg)",
            marginBottom: "-7rem",
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
          <div className="vira">
            <Card card={gameState.vira}></Card>
          </div>
          <div className="monte">
            <HiddenCard></HiddenCard>
            <HiddenCard></HiddenCard>
            <HiddenCard></HiddenCard>
            <HiddenCard></HiddenCard>
          </div>
        </Styled.PublicTable>
        <Styled.OtherPlayerHand
          style={{
            transform: "rotate(-90deg)",
            marginTop: "-7rem",
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
        <Button onClick={() => {}}>CORRER</Button>
        <Styled.PlayerHand>
          {playerState.hand.map((card, index) => {
            return <Card card={card} key={index}></Card>;
          })}
        </Styled.PlayerHand>
        <Button onClick={handleTruco}>
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
