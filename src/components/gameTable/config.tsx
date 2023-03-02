import React, { useContext } from "react";
import { ScenarioContext } from "ScenarioContext";
import { colors } from "..";
import { ConfigModalStyles } from "./styles";

const ConfigModal: React.FC<{ toggleModal: () => void }> = ({ toggleModal }) => {
    const value = useContext(ScenarioContext)
    const { scenario, setScenario, tableImg, setTableImg, suitsImg, setSuitsImg, cardsImage, setCardsImage } = value;
    return (
        <ConfigModalStyles colors={colors}>
            <div id='title'><h3>CONFIGURAÇÕES</h3><button onClick={toggleModal}>X</button></div>
            <div className="selector">
                <h4>Cenário</h4>
                <select value={scenario} onChange={(e) => setScenario(e.target.value)}>
                    <option value="calcada2.jpg">Calçada SP</option>
                    <option value="square.png">Quadradinhos</option>
                    <option value="xadrez.jpg">Xadrez</option>
                </select>
            </div>
            <div className="selector">
                <h4>Mesa</h4>
                <select value={tableImg} onChange={(e) => setTableImg(e.target.value)}>
                    <option value="antartica.png">Antártica</option>
                    <option value="brahma.png">Brahma</option>
                    <option value="glacial.png">Glacial</option>
                    <option value="itaipava.png">Itaipava</option>
                    <option value="skol.png">Skol</option>
                </select>
            </div>
            <div className="selector">
                <h4>Verso das Cartas</h4>
                <select value={cardsImage} onChange={(e) => setCardsImage(e.target.value)}>
                    <option value="blue.svg">Azul</option>
                    <option value="blue2.svg">Azul 2</option>
                    <option value="red.svg">Vermelho</option>
                    <option value="red2.svg">Vermelho 2</option>
                    <option value="castle.svg">Castelo</option>
                    <option value="frog.svg">Sapo</option>
                </select>
            </div>
        </ConfigModalStyles>
    )
}

export default ConfigModal;