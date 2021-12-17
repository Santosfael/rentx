import React from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';

import { ImageSlider } from '../../components/ImageSlider';
import { BackButton } from '../../components/BackButton';
import { Accessory } from '../../components/Accessory';
import { Button } from '../../components/Button';

import { getAccessoryIcon } from '../../utils/getAccessoryIcon';
import { CarDTO } from '../../dtos/CarDTO';

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

interface Params {
    car: CarDTO;
}

export function CarDetails() {
    const { navigate, goBack } = useNavigation<any>();
    const route = useRoute();
    const { car } = route.params as Params;

    function handleConfirmRental() {
        navigate("Scheduling", {car});
    }

    function handleBack() {
        goBack();
    }
    return (
        <Container>
            <Header>
                <BackButton onPress={handleBack} />

            </Header>
            <CarImages>
                <ImageSlider imagesUrl={car.photos} />
            </CarImages>

            <Content>
                <Details>
                    <Description>
                        <Brand>{car.brand}</Brand>
                        <Name>{car.name}</Name>
                    </Description>

                    <Rent>
                        <Period>{car.rent.period}</Period>
                        <Price> {`R$ ${car.rent.price}`} </Price>
                    </Rent>
                </Details>

                <Accessories>
                    {
                        car.accessories.map(accessory => (
                            <Accessory
                                key={accessory.type}
                                name={accessory.name}
                                icon={getAccessoryIcon(accessory.type)}
                            />
                        ))
                    }

                </Accessories>

                <About>
                    Este é um automóvel desportivo. Surgiu do lendário touro de lide
                    indultado na praça real Maestranza e Sevilla. É um belíssimo carro
                    para quem gosta de acelerar
                </About>
            </Content>

            <Footer>
                <Button title='Escolher período de aluguel' onPress={handleConfirmRental} />
            </Footer>
        </Container>
    );
}