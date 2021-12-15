import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { RFValue } from 'react-native-responsive-fontsize';

import Logo from '../../assets/logo.svg';

import { Car } from '../../components/Car';

import {
    CarList,
    Container,
    Header,
    HeaderContent,
    TotalCars
} from './styles';

export function Home() {
    const carDataOne = {
        brand: 'Audi',
        name: 'RS 5 Coupé',
        rent: {
            period: 'Ao dia',
            price: 120,
        },
        thumbnail: 'https://freepngimg.com/thumb/audi/35227-5-audi-rs5-red.png',
    };

    return (
        <Container>
            <StatusBar
                style='light'
            />
            <Header>
                <HeaderContent>
                    <Logo
                        width={RFValue(108)}
                        height={RFValue(12)}
                    />
                    <TotalCars>
                        Total de 12 carros
                    </TotalCars>
                </HeaderContent>
            </Header>

            <CarList
                data={[1, 2, 3, 4, 5]}
                keyExtractor={item => String(item)}
                renderItem={({ item }) => <Car data={carDataOne} />}
            />
        </Container>
    );
}