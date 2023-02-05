import { CardStyles } from "./styles";
import { TrucoCard } from "utils/interfaces";
import { BsFillSuitClubFill, BsFillSuitDiamondFill, BsFillSuitHeartFill, BsFillSuitSpadeFill } from 'react-icons/bs'
import { colors } from "..";

const Card = (props: any) => {

    const { card } = props;

    const SuitPicker = () => {
        return (
            <>
                {card.suit === "paus" && <BsFillSuitClubFill className="suit black" />}
                {card.suit === "ouros" && <BsFillSuitDiamondFill className="suit red" />}
                {card.suit === "copas" && <BsFillSuitHeartFill className="suit red" />}
                {card.suit === "espada" && <BsFillSuitSpadeFill className="suit black" />}
            </>
        )
    }

    return (
        <CardStyles colors={colors}>
            <div className="top-suit">
                <SuitPicker />
            </div>
            <h1 className="value">{card.value}</h1>
            <div className="bottom-suit">
                <SuitPicker />
            </div>
        </CardStyles>
    )
}

export default Card;