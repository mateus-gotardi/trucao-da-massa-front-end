import React from "react";
import { colors } from "..";
import { ButtonStyles } from "./styles";

interface ButtonProps {
  children: React.ReactNode;
  onClick: () => void;
  size?: number[];
  available?: boolean;
}
const Button: React.FC<ButtonProps> = ({ children, onClick, available, size = [12, 3.5] }) => {
  return (
    <ButtonStyles
      size={size}
      onClick={() => {
        available ? onClick() : console.log("not available");
      }}
      inactive={!available}
      colors={colors}
    >
      <span id="transition"></span>
      <span id="gradient"></span>
      <span id="label">{children}</span>
    </ButtonStyles>
  );
};
export default Button;
