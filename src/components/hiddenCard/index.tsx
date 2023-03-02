import React, { useContext } from "react";
import { HiddenStyle } from "./styles";
import { colors } from "..";
import {ScenarioContext} from "ScenarioContext";

const HiddenCard: React.FC = () => {
  const value = useContext(ScenarioContext)
  const { cardsImage } = value;
  
  return (
    <HiddenStyle colors={colors}>
      <img src={`/backofcard/${cardsImage}`} alt="carta virada" />
    </HiddenStyle>
  );
};

export default HiddenCard;
