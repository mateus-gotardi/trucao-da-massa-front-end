import React from "react";
import { ButtonStyles } from "./styles";

interface ButtonProps {
  children: React.ReactNode;
  onClick: () => void;
  available?: boolean;
}
const Button: React.FC<ButtonProps> = ({ children, onClick, available }) => {
  return (
    <ButtonStyles
      onClick={() => {
        available ? onClick() : console.log("not available");
      }}
      inactive={!available}
    >
      {children}
    </ButtonStyles>
  );
};
export default Button;
