import { createContext, Dispatch, SetStateAction, useState } from "react";

interface ScenarioContextProps {
    scenario: string;
    setScenario: Dispatch<SetStateAction<string>>;
    tableImg: string;
    setTableImg: Dispatch<SetStateAction<string>>;
    suitsImg: string;
    setSuitsImg: Dispatch<SetStateAction<string>>;
    cardsImage: string;
    setCardsImage: Dispatch<SetStateAction<string>>;
  }

export const ScenarioContext = createContext<ScenarioContextProps>({
    scenario: '',
    setScenario: () => {},
    tableImg: '',
    setTableImg: () => {},
    suitsImg: '',
    setSuitsImg: () => {},
    cardsImage: '',
    setCardsImage: () => {}
  })

const ScenarioProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
    const [scenario, setScenario] = useState<string>('calcada2.jpg');
    const [tableImg, setTableImg] = useState<string>('antartica.png');
    const [suitsImg, setSuitsImg] = useState<string>('');
    const [cardsImage, setCardsImage] = useState<string>('blue.svg');

    return (
        <ScenarioContext.Provider value={{
            scenario,
            setScenario,
            tableImg,
            setTableImg,
            suitsImg,
            setSuitsImg,
            cardsImage,
            setCardsImage
        }}>
            {children}
        </ScenarioContext.Provider>
    )
}

export default ScenarioProvider;
