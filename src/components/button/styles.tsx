import styled from "styled-components";

export const ButtonStyles = styled.button<{ inactive: boolean }>`
  border: none;
  border-radius: 0.5rem;
  width: 12rem;
  height: 3.5rem;
  ${({ inactive }) => inactive && "opacity: 0.5;"}
  background: rgb(2,0,36);
  background: radial-gradient(
    circle,
    rgba(2, 0, 36, 1) 0%,
    rgba(19, 2, 94, 1) 0%,
    rgba(128, 108, 217, 1) 100%
  );
  font-size: 1.5rem;
  font-weight: 600;
  color: white;
  padding-top: 0.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  -webkit-box-shadow: 3px 3px 14px 0px rgba(0, 0, 0, 0.75);
  -moz-box-shadow: 3px 3px 14px 0px rgba(0, 0, 0, 0.75);
  box-shadow: 3px 3px 14px 0px rgba(0, 0, 0, 0.75);
  transition: all 0.2s ease-in-out;
  ${({ inactive }) =>
    !inactive &&
    `
  cursor: pointer;
  &:hover {
    background: rgb(2,0,36);
    background: radial-gradient(circle, rgba(2,0,36,1) 0%,
     rgba(19,2,94,1) 100%,
     rgba(128,108,217,1) 100%);
  }
  &:active {
    transform: scale(0.95);
    -webkit-box-shadow: -3px -1px 20px -7px rgba(0, 0, 0, 0.75);
    -moz-box-shadow: -3px -1px 20px -7px rgba(0, 0, 0, 0.75);
    box-shadow: -3px -1px 20px -7px rgba(0, 0, 0, 0.75);
  }
 `}

  > p {
    margin: 0;
    font-size: 1rem;
  }
`;
