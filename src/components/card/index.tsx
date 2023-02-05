import { CardStyles, CardValue, CardSuit } from "./styles";
import { ITrucoCard } from "utils/interfaces";
import {
  BsFillSuitClubFill,
  BsFillSuitDiamondFill,
  BsFillSuitHeartFill,
  BsFillSuitSpadeFill,
} from "react-icons/bs";
import { colors } from "..";

interface ICardProps {
  card: ITrucoCard;
  suitColor?: string;
}
const isNumber = (value: string) => {
  return !isNaN(Number(value));
};

const SuitPicker: React.FC<ICardProps> = ({ card, suitColor }) => {
  return (
    <>
      {card.suit === "paus" && (
        <BsFillSuitClubFill color={suitColor} size={28} />
      )}
      {card.suit === "ouros" && (
        <BsFillSuitDiamondFill color={suitColor} size={28} />
      )}
      {card.suit === "copas" && (
        <BsFillSuitHeartFill color={suitColor} size={28} />
      )}
      {card.suit === "espadas" && (
        <BsFillSuitSpadeFill color={suitColor} size={28} />
      )}
    </>
  );
};

const MiddleOfCard: React.FC<ICardProps> = ({ card, suitColor }) => {
  if (isNumber(card.value)) {
    for (let i = 0; i < Number(card.value); i++) {
      return <SuitPicker card={card} suitColor={suitColor} />;
    }
  } else return;
  <></>;
};

const Card: React.FC<ICardProps> = ({ card }) => {
  const colorPicker = () => {
    switch (card.suit) {
      case "paus":
        return colors.black;
      case "espadas":
        return colors.black;
      case "copas":
        return colors.red;
      case "ouros":
        return colors.red;
    }
  };
  const suitColor = colorPicker();

  console.log(card.value, "IsNumber?", isNumber(card.value));
  return (
    <CardStyles>
      <CardSuit position="start">
        <CardValue color={suitColor}>
          <h2>{card.value}</h2>
        </CardValue>
        <SuitPicker
          suitColor={suitColor}
          card={{
            value: card.value,
            suit: card.suit,
          }}
        />
      </CardSuit>
      <CardValue color={suitColor}>
        <h1>{card.value}</h1>
      </CardValue>

      <CardSuit position="end">
        <SuitPicker
          suitColor={suitColor}
          card={{
            value: card.value,
            suit: card.suit,
          }}
        />
        <CardValue color={suitColor}>
          <h2
            style={{
              transform: "rotate(180deg)",
            }}
          >
            {card.value}
          </h2>
        </CardValue>
      </CardSuit>
    </CardStyles>
  );
};

export default Card;
