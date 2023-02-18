import { CardStyles, CardValue, CardSuit, MiddleCard } from "./styles";
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
  side?: boolean;
  activable?: boolean;
  onClick?: () => void;
}
const isNumber = (value: string) => {
  return !isNaN(Number(value));
};

const SuitPicker: React.FC<ICardProps> = ({ card, suitColor, side }) => {
  return (
    <>
      {card.suit === "paus" && (
        <BsFillSuitClubFill color={suitColor} size={side ? 16 : 14} />
      )}
      {card.suit === "ouros" && (
        <BsFillSuitDiamondFill color={suitColor} size={side ? 16 : 14} />
      )}
      {card.suit === "copas" && (
        <BsFillSuitHeartFill color={suitColor} size={side ? 16 : 14} />
      )}
      {card.suit === "espadas" && (
        <BsFillSuitSpadeFill color={suitColor} size={side ? 16 : 14} />
      )}
    </>
  );
};

const MiddleOfCard: React.FC<ICardProps> = ({ card, suitColor }) => {
  let suits = [];
  if (isNumber(card.value)) {
    for (let i = 0; i < Number(card.value); i++) {
      suits.push(i);
    }
    return (
      <MiddleCard cardValue={Number(card.value)}>
        {suits.map((i, index) => {
          return <SuitPicker suitColor={suitColor} card={card} key={index} />;
        })}
      </MiddleCard>
    );
  } else
    return (
      <MiddleCard>
        {card.suit === "paus" || card.suit === "espadas" ? (
          <img
            src={`/figures/black-${card.value}.svg`}
            alt={`carta ${card.value} de ${card.suit}`}
          ></img>
        ) : (
          <img
            src={`/figures/red-${card.value}.svg`}
            alt={`carta ${card.value} de ${card.suit}`}
          ></img>
        )}
      </MiddleCard>
    );
};

const Card: React.FC<ICardProps> = ({ card, activable, onClick }) => {
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
  return (
    <CardStyles colors={colors} activable={activable} onClick={onClick}>
      <CardSuit position="start">
        <div className="side">
          <CardValue color={suitColor}>
            <h2>{card.value}</h2>
          </CardValue>
          <SuitPicker
            suitColor={suitColor}
            card={{
              value: card.value,
              suit: card.suit,
            }}
            side
          />
        </div>
      </CardSuit>
      <CardValue color={suitColor}>
        <MiddleOfCard card={card} suitColor={suitColor} />
      </CardValue>

      <CardSuit position="end">
        <div className="side">
          <SuitPicker
            suitColor={suitColor}
            card={{
              value: card.value,
              suit: card.suit,
            }}
            side
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
        </div>
      </CardSuit>
    </CardStyles>
  );
};

export default Card;
