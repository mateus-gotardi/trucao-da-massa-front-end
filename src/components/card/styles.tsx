import styled from 'styled-components';
import { ColorsProps } from 'utils/interfaces';

export const CardStyles = styled.div<ColorsProps>`
    width: 10rem;
    height: 15rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    h1{
        font-size: 8rem;
    }
`