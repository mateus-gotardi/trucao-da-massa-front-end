import React from "react";
import { colors } from "..";
import Button from "../button";
import { ModalStyles } from "./styles";

const InfoModal:React.FC<{children: React.ReactNode, close:()=>void}> = ({children, close})=>{
    return (
        <ModalStyles colors={colors}>
            {children}
            <Button available onClick={close}>Fechar</Button>
        </ModalStyles>
    )
}
export default InfoModal;