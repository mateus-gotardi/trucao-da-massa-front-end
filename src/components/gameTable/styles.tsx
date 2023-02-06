import styled from "styled-components";

export const GameTableStyles = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100vh;
  justify-content: space-around;
  align-items: center;
  gap: 5rem;
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
  justify-content: space-around;
`;

export const ConfigStyles = styled.section`
  width: 9rem;
  height: 3rem;
  display: flex;
  align-items: center;
  justify-content: space-around;
  gap: 0.5rem;
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
`;

export const ScoreStyles = styled.div`
  width: 9rem;
  height: 7rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  padding: 1rem;
  border-radius: 0.5rem;
  font-weight: 600;
  background: rgb(247, 255, 0);
  background: radial-gradient(
    circle,
    rgba(247, 255, 0, 1) 0%,
    rgba(29, 255, 0, 1) 100%
  );
  -webkit-box-shadow: 3px 3px 14px 0px rgba(0, 0, 0, 0.75);
  -moz-box-shadow: 3px 3px 14px 0px rgba(0, 0, 0, 0.75);
  box-shadow: 3px 3px 14px 0px rgba(0, 0, 0, 0.75);
`;

export const PublicTable = styled.div`
  display: flex;
  .monte {
    display: flex;
    margin-left: 2rem;
    div {
      margin-left: -9.7rem;
    }
  }
  .vira {
    transform: rotate(-40deg);
  }
`;

export const PlayerHand = styled.div`
  display: flex;
  gap: 1rem;
`;

export const OtherPlayerHand = styled.div`
  display: flex;
  margin-left: 7rem;
  div {
    margin-left: -7rem;
  }
`;
