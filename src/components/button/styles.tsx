import styled from "styled-components";

export const ButtonStyles = styled.button`
  border: none;
  border-radius: 0.5rem;
  width: 12rem;
  height: 3.5rem;
  background: rgb(247, 255, 0);
  background: radial-gradient(
    circle,
    rgba(247, 255, 0, 1) 0%,
    rgba(29, 255, 0, 1) 100%
  );
  font-size: 1.5rem;
  font-weight: 600;
  color: black;
  padding-top: 0.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
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
    transform: scale(0.95);
    -webkit-box-shadow: -3px -1px 20px -7px rgba(0, 0, 0, 0.75);
    -moz-box-shadow: -3px -1px 20px -7px rgba(0, 0, 0, 0.75);
    box-shadow: -3px -1px 20px -7px rgba(0, 0, 0, 0.75);
  }
`;
