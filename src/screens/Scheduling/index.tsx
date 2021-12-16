import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { useTheme } from 'styled-components';

import { BackButton } from '../../components/BackButton';
import { Calendar } from '../../components/Calendar';
import { Button } from '../../components/Button';

import ArrowSvg from '../../assets/arrow.svg';

import {
 Container,
 Header,
 Title,
 RentalPeriod,
 DateInfo,
 DateTitle,
 DateValue,
 Content,
 Footer,
} from './styles';

export function Scheduling(){
    const theme = useTheme();

 return (
    <Container>
        <StatusBar
            style='light'
        />
        <Header>
            <BackButton onPress={() => { }}
                color={theme.colors.shape}
                style={{
                    width: 24,
                    height: 24,
                }}
            />
            <Title>
                Escolha uma{'\n'}
                data de início e{'\n'}
                fim do aluguel
            </Title>

            <RentalPeriod>
                <DateInfo>
                    <DateTitle>DE</DateTitle>
                    <DateValue selected={false}>18/06/2021</DateValue>
                </DateInfo>

                <ArrowSvg />

                <DateInfo>
                    <DateTitle>ATÉ</DateTitle>
                    <DateValue selected={false}>18/06/2021</DateValue>
                </DateInfo>
            </RentalPeriod>
        </Header>

        <Content>
                <Calendar />
        </Content>

        <Footer>
            <Button title="Confirmar" />
        </Footer>
    </Container>
 );
}