import React from 'react';

import { ImageSlider } from '../../components/ImageSlider';
import { BackButton } from '../../components/BackButton';
import { Accessory } from '../../components/Accessory';

import SpeedSvg from '../../assets/speed.svg';
import AccelerationSvg from '../../assets/acceleration.svg';
import ForceSvg from '../../assets/force.svg';
import GasolineSvg from '../../assets/gasoline.svg';
import ExchangeSvg from '../../assets/exchange.svg';
import PeopleSvg from '../../assets/people.svg';

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
    About,
    Accessories,
    Footer
} from './styles';
import { Button } from '../../components/Button';


export function CarDetails() {
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

                <About>
                    Este é um automóvel desportivo. Surgiu do lendário touro de lide
                    indultado na praça real Maestranza e Sevilla. É um belíssimo carro
                    para quem gosta de acelerar
                </About>
            </Content>

            <Footer>
                <Button title='Confirmar' />
            </Footer>
        </Container>
    );
}