import styled from "styled-components";

export const GameTableStyles = styled.div<{ truco: boolean }>`
  transform-origin: bottom;
  transform-box: fill-box;
  @keyframes shake {
    from {
      transform: scale(1);
    }
    to {
      transform: scale(1.2);
    }
  }
  ${({ truco }) =>
    truco &&
    `  
    animation: shake 0.07s ease-in-out infinite alternate;  `}
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100vh;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  padding: 2rem;
`;
export const Section = styled.section<{ alignItems?: string }>`
  display: flex;
  width: 100%;
  justify-content: space-between;
  padding: 0 5rem;
  ${({ alignItems }) => alignItems && `align-items: ${alignItems};`}
`;

export const ConfigStyles = styled.section`
  width: 20rem;
  height: 12rem;
  display: flex;
  align-items: flex-start;
  justify-content: flex-end;
  gap: 2rem;
  color: white;
  > section {
    display: flex;
    gap: 1rem;
    svg {
      background: rgb(2, 0, 36);
      background: radial-gradient(
        circle,
        rgba(2, 0, 36, 1) 0%,
        rgba(19, 2, 94, 1) 0%,
        rgba(128, 108, 217, 1) 100%
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
        background: rgb(2, 0, 36);
        background: radial-gradient(
          circle,
          rgba(2, 0, 36, 1) 0%,
          rgba(19, 2, 94, 1) 59%,
          rgba(128, 108, 217, 1) 100%
        );
      }
      &:active {
        -webkit-box-shadow: -3px -1px 20px -7px rgba(0, 0, 0, 0.75);
        -moz-box-shadow: -3px -1px 20px -7px rgba(0, 0, 0, 0.75);
        box-shadow: -3px -1px 20px -7px rgba(0, 0, 0, 0.75);
        background: rgb(2, 0, 36);
        background: radial-gradient(
          circle,
          rgba(2, 0, 36, 1) 0%,
          rgba(128, 108, 217, 1) 34%,
          rgba(19, 2, 94, 1) 86%
        );
      }
    }
  }
`;

export const ScoreStyles = styled.div`
  color: white;
  #score {
    width: 20rem;
    height: 8rem;
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    justify-content: space-around;
    padding: 1rem;
    border-radius: 0.5rem;
    font-weight: 600;
    
    > div {
      display: flex;
      flex-direction: column;
      align-items: center;
      > h1 {
        font-size: 1rem;
      }
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
  }
  #turn{
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

export const ScoreBall = styled.span<{ fillColor: boolean }>`
  width: 1.2rem;
  height: 1.4rem;
  border: 3px solid white;
  padding: 0 0.5rem;
  border-radius: 50%;
  background-color: ${({ fillColor }) => (fillColor ? "white" : "transparent")};
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
export const LeftPlayed = styled.div`
transform: rotate(${Math.floor(Math.random() * (120 - 55 + 1) + 55)}deg);
`;
export const RightPlayed = styled.div`
transform: rotate(-${Math.floor(Math.random() * (120 - 55 + 1) + 55)}deg)
`;
export const TeamPlayed = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  > div {
    height: 9.6rem;
    transform: rotate(-${Math.floor(Math.random() * (30 - -30 + 1) + -30)}deg);
  }
`;

export const PlayerHand = styled.div`
  display: flex;
  gap: 1rem;
`;

export const OtherPlayerHand = styled.div<{ left?: boolean, right?: boolean }>`
  display: flex;
  margin-left: 5rem;
  color: white;
  div {
    margin-left: -5rem;
  }
  ${({ left }) => left && `
   transform: rotate(90deg);
   margin-bottom: -5rem;
   margin-left: 0;
  `}
  ${({ right }) => right && `
   transform: rotate(-90deg);
   marginTop: -5rem;
   marginLeft: 0;
  `}
`;
