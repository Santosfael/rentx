import React from 'react';
import { getAccessoryIcon } from '../../utils/getAccessoryIcon';
import { RectButtonProps } from 'react-native-gesture-handler';
import { useNetInfo } from '@react-native-community/netinfo';

import { Car as ModelCar } from '../../database/model/Car';

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


interface Props extends RectButtonProps {
    data: ModelCar;
}


export function Car({ data, ...rest }: Props) {
    const netInfo = useNetInfo();
    const MotorIcon = getAccessoryIcon(data.fuel_type);
    return (
        <Container {...rest}>
            <Details>
                <Brand>{data.brand}</Brand>
                <Name>{data.name}</Name>

                <About>
                    <Rent>
                        <Pediod>{data.period}</Pediod>
                        <Price>
                            R$ {
                                netInfo.isConnected === true
                                    ? data.price
                                    : '...'
                            }
                        </Price>
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