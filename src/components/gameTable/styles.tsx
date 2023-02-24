import styled from "styled-components";
import { IColorProps } from "utils/interfaces";

export const GameTableStyles = styled.div<{ truco: boolean }>`
  transform-origin: bottom;
  transform-box: fill-box;
  @media (max-width: 500px) {
    padding: 1rem 0;
  }
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
  width: 100vw;
  height: 100vh;
  height: 100svh;
  justify-content: space-around;
  align-items: center;
  gap: 1rem;
  padding: 2rem;
`;
export const Section = styled.section<{ alignItems?: string }>`
  display: flex;
  width: 100%;
  justify-content: space-between;
  padding: 0 1.2rem;
  align-items: center;
  ${({ alignItems }) => alignItems && `align-items: ${alignItems};`}
  #placeholder{
    width:13rem;

  }
  @media (max-width: 750px) {
    zoom: 0.7;
  }
`;

export const ConfigStyles = styled.section<{ colors: IColorProps }>`
  width: 20rem;
  height: 12rem;
  display: flex;
  align-items: flex-start;
  justify-content: flex-end;
  gap: 2rem;
  color: white;
  @media (max-width: 1000px) {
    >section {flex-direction: column;}
    width: 9rem;
  }
  > section {
    display: flex;
    gap: 1rem;
    svg {
      background-color: ${({ colors }) => colors.blue};
      box-shadow: 4px 4px 0px 0px rgba(0,0,0,1);
      border-radius: 50%;
      width: 3rem;
      height: 3rem;
      padding: 0.5rem;
      cursor: pointer;
      transition: all 0.2s ease-in-out;
      &:hover {
      transform: scale(1.05);
      box-shadow: 6px 6px 0px 0px rgba(0,0,0,1);
    }
    &:active {
      transform: scale(1.01);
      box-shadow: 3px 3px 0px 0px rgba(0,0,0,1);
    }
    }
  }
`;

export const ScoreStyles = styled.div`
  color: white;
  display: flex;
  flex-direction: column;
  #score {
    width: 18rem;
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
      > h2 {
        font-size: 1.5rem;
      }
    }
  }
  #turn{
    display: flex;
    align-items: center;
    justify-content: center;
    >h4{
      font-size: 1rem;
    }
  }
  @media (max-width: 1000px) {
    zoom: 0.7;
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
  z-index: 100;
  .monte {
    display: flex;
    margin-left: 2rem;
    div {
      margin-left: -6.23rem;
      z-index: 99;
    }
  }
  .vira {
    transform: rotate(-40deg);
    z-index:98;
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
min-width: 9.6rem;
`;
export const RightPlayed = styled.div`
transform: rotate(-${Math.floor(Math.random() * (120 - 55 + 1) + 55)}deg);
min-width: 9.6rem;
`;
export const TeamPlayed = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  > div {
    height: 9.6rem;
    transform: rotate(-${Math.floor(Math.random() * (30 - -30 + 1) + -30)}deg);
  }
  min-height: 9.6rem;
`;

export const PlayerHand = styled.div`
  display: flex;
  gap: 1rem;
  min-height: 9.6rem;
`;

export const OtherPlayerHand = styled.div<{ left?: boolean, right?: boolean }>`
  display: flex;
  align-items: flex-start;
  justify-content: flex-end;
  color: white;
  width: 9.2rem;
  height: fit-content;
  margin: 0 1.5rem;
  div {
    margin-top: 1.6rem;
    margin-left: -5rem;
  };
  h4{
    width: fit-content;
    height: fit-content;
    z-index: 14;
  };
  @media (max-width: 700px) {
    > div {display:none;}
    align-items: center;
    justify-content: center;
    height: 9.6rem;
    ${({ left }) => left && `
   align-items: flex-start;
  `}
  ${({ right }) => right && `
   align-items: flex-start;`
  }
  }
  ${({ left }) => left && `
   transform: rotate(90deg);
   margin: 0;
  `}
  ${({ right }) => right && `
   transform: rotate(-90deg);
   margin: 0;
  `}
`;

export const ModalStyles = styled.div<{ colors: IColorProps }>`
  position: absolute;
  z-index: 999;
  background-color: ${({ colors }) => colors.white};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 1.5rem;
  border-radius: 0.5rem;
  top:50%;
  left:50%;
  transform: translate(-50%, -50%);
  box-shadow: 3px 3px 0px 0px rgba(0,0,0,1);
  > h2 {
    font-size: 1.5rem;
  }
  > h3 {
    font-size: 1.2rem;
  }
  > h4 {
    font-size: 1rem;
  }
  h1, h2, h3, h4 {
    text-align: center;
  }
`;

export const ElevenModal = styled.div``;
