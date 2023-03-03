import styled from "styled-components";
import { IColorProps } from "utils/interfaces";

export const GameTableStyles = styled.div<{ bcg: string, table: string }>`
  transform-origin: bottom;
  transform-box: fill-box;
  background-image: url('/backgrounds/${({ bcg }) => bcg}');
  @media(max-width: 1225px){
    background-image: url('/tables/${({ table }) => table}');
    background-position: center;
  }
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-template-rows: repeat(5, 1fr);
  grid-column-gap: 0px;
  grid-row-gap: 0px;
  overflow: hidden;
  width: 100vw;
  height: 100vh;
  height: 100svh;
  @media (max-width: 720px) {
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: repeat(4, 1fr);
  }
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
  @media (max-width: 800px) {
    zoom: 0.8;
    padding:0 .5rem;
  }
  @media (max-width: 750px) {
    zoom: 0.7;
  }
`;

export const ConfigStyles = styled.section<{ colors: IColorProps }>`
  z-index: 80;
  width: 20rem;
  height: 12rem;
  display: flex;
  align-items: flex-start;
  justify-content: flex-end;
  gap: 2rem;
  color: white;
  grid-area: 1 / 5 / 2 / 6;
  margin: 1rem;
  @media (max-width: 1000px) {
    >section {flex-direction: column;}
    width: 9rem;
  }
  > section {
    display: flex;
    gap: 1rem;
    svg {
      background-color: ${({ colors }) => colors.black};
      box-shadow: 2px 2px 0px 0px rgba(0,0,0,0.7);
      border-radius: 50%;
      width: 3rem;
      height: 3rem;
      padding: 0.5rem;
      cursor: pointer;
      transition: all 0.2s ease-in-out;
      &:hover {
      transform: scale(1.05);
      box-shadow: 4px 4px 0px 0px rgba(0,0,0,0.7);
    }
    &:active {
      transform: scale(1.01);
      box-shadow: 1px 1px 0px 0px rgba(0,0,0,1);
    }
    }
  }
  @media (max-width: 720px) {
    grid-area: 1 / 3 / 2 / 4;
    width: fit-content;
    height: fit-content;
    >section {flex-direction: row;}
    position: absolute;
    right: 0;
    top: 0;
    zoom: 0.7;
  }
`;

export const ScoreStyles = styled.div<{ colors: IColorProps }>`
  color: white;
  z-index: 80;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 1rem;
  border-radius: 0.5rem;
  width: fit-content;
  flex-direction: column;
  grid-area: 1 / 1 / 2 / 2;
  background-color: rgba(17, 17, 17, 0.7);
  box-shadow: 4px 4px 0px 0px rgba(0,0,0,0.7);
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
    width: 18rem;
    height: 1.5rem;
    >h4{
      font-size: 1rem;
    }
  }
  @media (max-width: 1000px) {
    zoom: 0.7;
  }
  @media (max-width: 720px) {
    grid-area: 1 / 1 / 2 / 3;
    width: fit-content;
    height: fit-content;
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
  align-items: center;
  justify-content: center;
  z-index: 5;
  margin: .5rem;
  grid-area: 2 / 2 / 3 / 3; 
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
  @media (max-width: 1400px) {
    .vira{
      transform: rotate(-30deg);
    }
    margin-top: 3rem;
  }
  @media (max-width: 830px){
  .vira{
    transform: rotate(0deg);
  }
}
`;
export const TableImage = styled.div<{ truco: boolean }>`
  grid-area: 1 / 1 / 6 / 6;
  z-index: 0;
    @media(max-width: 1225px){
    display: none;
  }
  >img{
  width: 100%;
  height: 100%;
  object-fit: contain;
  
  border: none;
  outline: none;
  position: relative;
  bottom: 0;
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
`

export const PublicTable = styled.div<{ truco: boolean }>`
  z-index: 4;
  grid-area: 2 / 2 / 5 / 5;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(3, 1fr);
  grid-column-gap: 0px;
  grid-row-gap: 0px;
  @media screen and (max-height: 750px) and (min-width: 720px){
    transform: translate(0, -9rem);
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
  @media (max-height: 800px) {
    transform: translate(0, -3rem);
  }
  @media (max-width: 720px) {
    grid-area: 2 / 1 / 4 / 4;
    zoom: 0.8;
    transform: translate(0, -1rem);
  }
`;
export const Buttons = styled.div`
  grid-area: 5 / 5 / 6 / 6;
  z-index: 10;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  @media (max-width: 720px) {
    grid-area: 4 / 3 / 5 / 4;
    zoom: 0.7;
    align-items: flex-end;
    justify-content: flex-end;
  }
`
export const Chat = styled.div`
  grid-area: 4 / 1 / 6 / 2;
  @media (max-width: 720px) {
    display: none;
  }
`
export const LeftPlayed = styled.div`
display: flex;
z-index: 10;
align-items: center;
justify-content: flex-start;
grid-area: 2 / 1 / 3 / 2;
>div {
  transform: rotate(90deg);
}
height: 100%;
width: 100%;
@media (min-width: 1300px){
  >div{
    transform: rotate(${Math.floor(Math.random() * (120 - 55 + 1) + 55)}deg);
  }
  justify-content: flex-end;
}
@media (max-width: 830px){
  >div{
    transform: rotate(0deg);
  }
}
@media (max-width: 720px) {
  justify-content: flex-end;
}
`;
export const RightPlayed = styled.div`
display: flex;
z-index: 10;
align-items: center;
justify-content: flex-end;
grid-area: 2 / 3 / 3 / 4; 
>div {
  transform: rotate(-90deg);
}
@media (min-width: 1300px){
  >div {
    transform: rotate(-${Math.floor(Math.random() * (120 - 55 + 1) + 55)}deg);
  }
  justify-content: flex-start;
}
@media (max-width: 830px){
  >div{
    transform: rotate(0deg);
  }
}
@media (max-width: 720px) {
  justify-content: flex-start;
}
`;
export const PartnerPlayed = styled.div`
  display: flex;
  z-index: 10;
  align-items: flex-end;
  justify-content: center;
  grid-area: 1 / 2 / 2 / 3;
  > div {
    @media (min-width: 600px){
      transform: rotate(-${Math.floor(Math.random() * (30 - -30 + 1) + -30)}deg);
    }
  }
  min-height: 9.6rem;
`;
export const MyPlayed = styled.div`
  z-index: 10;
  grid-area: 3 / 2 / 4 / 3;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  > div {
    @media (min-width: 600px){
      transform: rotate(-${Math.floor(Math.random() * (30 - -30 + 1) + -30)}deg);
    }
  }
`

export const PlayerHand = styled.div`
grid-area: 5 / 2 / 6 / 5;
display: flex;
align-items: center;
justify-content: center;
flex-direction: column;
gap: .5rem;
z-index: 40;
>section{
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  min-height: 9.6rem;
  @media (max-width: 500px){
    zoom: 0.8;
    gap: .2rem;
  }
}
  @media (max-width: 720px){
    grid-area: 4 / 2 / 5 / 3;
  }
`;

export const OtherPlayerHand = styled.div<{ side?: string, colors: IColorProps }>`
  ${({ side }) => side === 'middle' && `grid-area: 1 / 3 / 2 / 4;
    justify-content: center;
  `}
  ${({ side }) => side === 'left' && `grid-area: 3 / 1 / 4 / 2;
    justify-content: flex-end;
  `}
  ${({ side }) => side === 'right' && `grid-area: 3 / 5 / 4 / 6;
    justify-content: flex-start;
  `}
  display: flex;
  align-items: center;
  z-index: 7;
  > div > h4{
    margin-bottom: .15rem;
    padding: .5rem 1rem 0 1rem;
    border-radius: 1rem;
    font-size: 1.2rem;
    background-color: rgba(17, 17, 17, 0.7);
  }
  > div { 
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 14.4rem;
    color: ${({ colors }) => colors.white};
    #cards {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 14.4rem;
      padding-left: 4rem;
      > div{
        margin-left: -4rem;
      }
      :first-child{
        margin-left: 0;
      }
    }  
    ${({ side }) => side === 'left' && `
      transform: rotate(90deg);
      margin: 0;
    `}
    ${({ side }) => side === 'right' && `
      transform: rotate(-90deg);
      margin: 0;
    `}
  }
  @media (max-height: 750px){
      ${({ side }) => side === 'middle' && `
        >div #cards{display: none;}
        align-items: flex-start;
      `}
  }
  @media (max-width: 720px) {
    zoom: 0.7;
      >div {
        width: fit-content;
        height: fit-content;
      }
      >div #cards {
        display: none;
      }
      ${({ side }) => side === 'left' && `
        position: absolute;
        grid-area: 3 / 1 / 4 / 2;
        left: 0;
        top: 50%;
      `}
      ${({ side }) => side === 'right' && `
        position: absolute;
        grid-area: 3 / 3 / 4 / 4;
        right: 0;
        top: 50%;
      `}
      ${({ side }) => side === 'middle' && `
        grid-area: 2 / 1 / 3 / 4;
        align-items: flex-start;
        transform: translate(0, -4rem);
      `}
  }
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

export const ElevenModal = styled.div<{ colors: IColorProps }>`
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
`;

export const ConfigModalStyles = styled.div<{ colors: IColorProps }>`
  position: absolute;
  z-index: 999;
  background-color: ${({ colors }) => colors.white};
  padding: 1.5rem;
  border-radius: 0.5rem;
  box-shadow: 3px 3px 0px 0px rgba(0,0,0,1);
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  gap:1rem;
  top:50%;
  left:50%;
  transform: translate(-50%, -50%);
  width: 18rem;
  color: ${({ colors }) => colors.blue};
  .selector{
    > select {
      border: none;
      color: ${({ colors }) => colors.blue};
      width: 15rem;
    }
  }
  #title {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 1rem;
    > button {
      color: ${({ colors }) => colors.blue};
      border: none;
      background-color: transparent;
      font-size: 1.5rem;
      cursor: pointer;
      border-radius: 50%;
      padding: .5rem ;
      font-family: 'comic sans ms';
      :hover {
        background-color: ${({ colors }) => colors.blue};
        color: ${({ colors }) => colors.white};
        text-shadow: 1px 1px 0px rgba(0,0,0,1);
      }
    }
  }
`

export const TimerStyles = styled.div<{ colors: IColorProps }>`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 10rem;
  height: .5rem;
  background-color: ${({ colors }) => colors.white};
  border: 2px solid ${({ colors }) => colors.white};
  border-radius: .5rem;
  >div {
    width: 0rem;
    height: .4rem;
    border-radius: .5rem;
    background-color: ${({ colors }) => colors.black};
    animation: grow 25s linear;
  }
  @keyframes grow {
    0% {
      width: 0rem;
    }
    100% {
      width: 10rem;
    }
  }
`