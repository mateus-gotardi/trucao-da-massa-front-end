import styled from "styled-components";

export const GameTableStyles = styled.div<{ truco: boolean }>`
  transform-origin: bottom;
  transform-box: fill-box;
  @keyframes truco {
    from {
      transform: scale(1);
    }
    to {
      transform: scale(1.2);
    }
  }
  ${({ truco }) =>
    truco && `  animation: truco 0.07s ease-in-out infinite alternate;  `}
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100vh;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  overflow: hidden;
  background: rgb(0, 140, 13);
  background: radial-gradient(
    circle,
    rgba(0, 140, 13, 1) 0%,
    rgba(3, 74, 0, 1) 100%
  );
  padding: 2rem;
`;
export const Section = styled.section`
  display: flex;
  width: 100%;
  justify-content: space-between;
  padding: 0 5rem;
`;

export const ConfigStyles = styled.section`
  width: 29rem;
  height: 12rem;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 4rem;
  > section {
    display: flex;
    gap: 1rem;
    svg {
      background: rgb(247, 255, 0);
      background: radial-gradient(
        circle,
        rgba(247, 255, 0, 1) 0%,
        rgba(29, 255, 0, 1) 100%
      );
      border-radius: 50%;
      width: 3rem;
      height: 3rem;
      padding: 0.5rem;
      -webkit-box-shadow: 3px 3px 14px 0px rgba(0, 0, 0, 0.75);
      -moz-box-shadow: 3px 3px 14px 0px rgba(0, 0, 0, 0.75);
      box-shadow: 3px 3px 14px 0px rgba(0, 0, 0, 0.75);
      cursor: pointer;
      transition: all 0.2s ease-in-out;
      &:hover {
        background: rgb(247, 255, 0);
        background: radial-gradient(
          circle,
          rgba(247, 255, 0, 1) 27%,
          rgba(29, 255, 0, 1) 80%
        );
      }
      &:active {
        -webkit-box-shadow: -3px -1px 20px -7px rgba(0, 0, 0, 0.75);
        -moz-box-shadow: -3px -1px 20px -7px rgba(0, 0, 0, 0.75);
        box-shadow: -3px -1px 20px -7px rgba(0, 0, 0, 0.75);
        background: rgb(29, 255, 0);
        background: radial-gradient(
          circle,
          rgba(29, 255, 0, 1) 0%,
          rgba(247, 255, 0, 1) 100%
        );
      }
    }
  }
`;

export const ScoreStyles = styled.div`
  width: 29rem;
  height: 8rem;
  display: flex;
  align-items: flex-start;
  justify-content: space-around;
  padding: 1rem;
  border-radius: 0.5rem;
  font-weight: 600;
  color: white;
  > div {
    display: flex;
    flex-direction: column;
    align-items: center;
    > h3 {
      margin: 0;
      padding: 0;
      height: 2.3rem;
      display: flex;
      justify-content: space-around;
      align-items: center;
      gap: 0.5rem;
    }
    > h4 {
      font-size: 3.5rem;
    }
  }
`;

export const ScoreBall = styled.span<{ fill: boolean }>`
  width: 1.2rem;
  height: 1.4rem;
  border: 3px solid white;
  padding: 0 0.5rem;
  border-radius: 50%;
  background-color: ${({ fill }) => (fill ? "white" : "none")};
`;

export const Deck = styled.div`
  display: flex;
  .monte {
    display: flex;
    margin-left: 2rem;
    div {
      margin-left: -6.23rem;
    }
  }
  .vira {
    transform: rotate(-40deg);
  }
`;

export const PublicTable = styled.div`
  display: flex;
  padding: 1rem;
  justify-content: space-between;
  align-items: space-between;
  width: 45rem;
`;
export const LeftPlayed = styled.div``;
export const RightPlayed = styled.div``;
export const TeamPlayed = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  > div {
    height: 9.6rem;
  }
`;

export const PlayerHand = styled.div`
  display: flex;
  gap: 1rem;
`;

export const OtherPlayerHand = styled.div`
  display: flex;
  margin-left: 5rem;
  div {
    margin-left: -5rem;
  }
`;
