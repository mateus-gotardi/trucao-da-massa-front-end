import React from "react";
import { Button, colors } from "..";
import { HelpStyles } from "./styles";
import {
    BsFillSuitClubFill,
    BsFillSuitDiamondFill,
    BsFillSuitHeartFill,
    BsFillSuitSpadeFill,
} from "react-icons/bs";

const Help: React.FC<{ close: () => void }> = ({close}) => {
    return (
        <HelpStyles colors={colors}>
            <h1>Ajuda</h1>
            <h3>Ordem das cartas</h3>
            <p><span>-</span><span>+</span></p>
            <p><span>4</span><span>5</span><span>6</span><span>7</span><span>Q</span><span>J</span><span>K</span><span>A</span><span>2</span><span>3</span></p>
            <h2>Manilha</h2>
            <h3>A manilha é a proxima carta depois da vira</h3>
            <h4>(A ordem dos naipes só é valida para manilhas)</h4>
            <p><span>-</span><span>+</span></p>
            <p><BsFillSuitDiamondFill fill={'red'}/><BsFillSuitSpadeFill fill={'black'}/><BsFillSuitHeartFill fill={'red'}/><BsFillSuitClubFill fill={'black'}/></p>
            <div>
                <Button available size={[7, 3]} onClick={close}>Fechar</Button>
            </div>
        </HelpStyles>
    )
}

export default Help