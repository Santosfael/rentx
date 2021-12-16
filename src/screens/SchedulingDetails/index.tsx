import React from 'react';
import { RFValue } from 'react-native-responsive-fontsize';
import { useTheme } from 'styled-components';
import { Feather } from '@expo/vector-icons';

import { ImageSlider } from '../../components/ImageSlider';
import { BackButton } from '../../components/BackButton';
import { Accessory } from '../../components/Accessory';

import AccelerationSvg from '../../assets/acceleration.svg';
import GasolineSvg from '../../assets/gasoline.svg';
import ExchangeSvg from '../../assets/exchange.svg';
import PeopleSvg from '../../assets/people.svg';
import SpeedSvg from '../../assets/speed.svg';
import ForceSvg from '../../assets/force.svg';

import {
    Container,
    Header,
    CarImages,
    Content,
    Details,
    Description,
    Brand,
    Name,
    Rent,
    Period,
    Price,
    Accessories,
    RentalPeriod,
    CalendarIcon,
    DateInfo,
    DateTitle,
    DateValue,
    RentalPrice,
    RentalPriceLabel,
    RentalPriceDetails,
    RentalPriceQuota,
    RentalPriceTotal,
    Footer
} from './styles';
import { Button } from '../../components/Button';


export function SchedulingDetails() {
    const theme = useTheme();

    return (
        <Container>
            <Header>
                <BackButton onPress={() => { }} />

            </Header>
            <CarImages>
                <ImageSlider imagesUrl={['https://freepngimg.com/thumb/audi/35227-5-audi-rs5-red.png']} />
            </CarImages>

            <Content>
                <Details>
                    <Description>
                        <Brand>AUDI</Brand>
                        <Name>RS 8 coupé</Name>
                    </Description>

                    <Rent>
                        <Period>Ao dia</Period>
                        <Price>R$ 120</Price>
                    </Rent>
                </Details>

                <Accessories>
                    <Accessory name='380Km/h' icon={SpeedSvg} />
                    <Accessory name='3.2s' icon={AccelerationSvg} />
                    <Accessory name='800 HP' icon={ForceSvg} />
                    <Accessory name='Gasoline' icon={GasolineSvg} />
                    <Accessory name='Auto' icon={ExchangeSvg} />
                    <Accessory name='2 pessoas' icon={PeopleSvg} />
                </Accessories>
                
                <RentalPeriod>
                    <CalendarIcon>
                        <Feather 
                            name='calendar'
                            size={RFValue(24)}
                            color={theme.colors.shape} 
                        />
                    </CalendarIcon>

                    <DateInfo>
                        <DateTitle>DE</DateTitle>
                        <DateValue>18/06/2021</DateValue>
                    </DateInfo>

                    <Feather 
                        name='chevron-right'
                        size={RFValue(24)}
                        color={theme.colors.shape} 
                    />

                    <DateInfo>
                        <DateTitle>ATÉ</DateTitle>
                        <DateValue>18/06/2021</DateValue>
                    </DateInfo>
                </RentalPeriod>

                <RentalPrice>
                    <RentalPriceLabel>TOTAL</RentalPriceLabel>
                    <RentalPriceDetails>
                        <RentalPriceQuota>R$ 120 x3 diárias</RentalPriceQuota>
                        <RentalPriceTotal>R$ 360</RentalPriceTotal>
                    </RentalPriceDetails>
                </RentalPrice>
            </Content>

            <Footer>
                <Button title='Confirmar' />
            </Footer>
        </Container>
    );
}