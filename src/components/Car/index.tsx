import React from 'react';
import { RectButtonProps } from 'react-native-gesture-handler';
import { CarDTO } from '../../dtos/CarDTO';

import {
    Container,
    Details,
    Brand,
    Name,
    About,
    Rent,
    Pediod,
    Price,
    Type,
    CardImage
} from './styles';

import GasolineSvg from '../../assets/gasoline.svg';
import { getAccessoryIcon } from '../../utils/getAccessoryIcon';

interface Props extends RectButtonProps {
    data: CarDTO;
}


export function Car({ data, ...rest }: Props) {
    const MotorIcon = getAccessoryIcon(data.fuel_type);
    return (
        <Container {...rest}>
            <Details>
                <Brand>{data.brand}</Brand>
                <Name>{data.name}</Name>

                <About>
                    <Rent>
                        <Pediod>{data.rent.period}</Pediod>
                        <Price>{`R$ ${data.rent.price}`}</Price>
                    </Rent>

                    <Type>
                        <MotorIcon />
                    </Type>
                </About>
            </Details>

            <CardImage source={{ uri: data.thumbnail }} resizeMode='contain' />
        </Container>
    );
}