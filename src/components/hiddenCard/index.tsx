import React from "react";
import { HiddenStyle } from "./styles";
import { colors } from "..";

const HiddenCard: React.FC = () => {
  const [back, setBack] = React.useState<string>("/figures/hidden.svg");

  return (
    <HiddenStyle colors={colors}>
      <img src={back} alt="carta virada" />
    </HiddenStyle>
  );
};

export default HiddenCard;
