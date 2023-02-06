import React from "react";
import { ButtonStyles } from "./styles";

interface ButtonProps {
  children: React.ReactNode;
  onClick: () => void;
}

const Button: React.FC<ButtonProps> = ({ children, onClick }) => {
  return <ButtonStyles onClick={onClick}>{children}</ButtonStyles>;
};
export default Button;
