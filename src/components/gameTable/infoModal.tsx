import React from "react";
import Button from "../button";
import { InfoModalStyles } from "./styles";

const InfoModal:React.FC<{children: React.ReactNode, close:()=>void}> = ({children, close})=>{
    return (
        <InfoModalStyles>
            {children}
            <Button available onClick={close}>Fechar</Button>
        </InfoModalStyles>
    )
}
export default InfoModal;