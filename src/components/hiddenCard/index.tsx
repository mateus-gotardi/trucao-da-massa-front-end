import React from "react";
import { HiddenStyle } from "./styles";

const HiddenCard: React.FC = () => {
  const [back, setBack] = React.useState<string>("/figures/hidden.svg");

  return (
    <HiddenStyle>
      <img src={back} alt="carta virada" />
    </HiddenStyle>
  );
};

export default HiddenCard;
