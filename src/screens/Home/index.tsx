import React from 'react';
import { StatusBar } from 'expo-status-bar';

import Logo from '../../assets/logo.svg';

import {
 Container,
 Header,
 HeaderContent,
 TotalCars
} from './styles';
import { RFValue } from 'react-native-responsive-fontsize';

export function Home(){
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
    </Container>
 );
}