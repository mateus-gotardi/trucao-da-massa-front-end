import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { Button, colors } from "..";
import { HomeStyle } from "./styles";

const HomePage: React.FC = () => {
    const router = useRouter();
    return (
        <HomeStyle colors={colors}>
            <h1>BEM VINDO AO BAR DO TRUCO</h1>
            <h2>Um jogo de truco online para jogar com os amigos</h2>
            <p>Esse site foi desenvolvido a fim de estudos, se encontrar algum bug por favor relate no <a href='https://github.com/mateus-gotardi/trucao-da-massa-front-end'>repositório do GitHub</a></p>
            <Button available={true} size={[12, 3.5]} onClick={()=>router.push('/lobby')}>Jogar</Button>
            <footer>
                <h4>Desenvolvido por <a href='https://mateusgotardi.vercel.app'>Mateus Gotardi</a></h4>
            </footer>

        </HomeStyle>
    );
}
export default HomePage;