import React, { useEffect, useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useNetInfo } from '@react-native-community/netinfo';
import { useTheme } from 'styled-components';
import { StatusBar } from 'expo-status-bar';
import Animated, {
    Extrapolate,
    interpolate,
    useAnimatedScrollHandler,
    useAnimatedStyle,
    useSharedValue
} from 'react-native-reanimated';

import { ImageSlider } from '../../components/ImageSlider';
import { BackButton } from '../../components/BackButton';
import { Accessory } from '../../components/Accessory';
import { Button } from '../../components/Button';

import { getAccessoryIcon } from '../../utils/getAccessoryIcon';
import { Car as ModelCar } from '../../database/model/Car';
import { CarDTO } from '../../dtos/CarDTO';
import { api } from '../../services/api';

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
    Footer,
    OfflineInfo
} from './styles';


interface Params {
    car: ModelCar;
}

export function CarDetails() {
    const [carUpdated, setCarUpdated] = useState<CarDTO>({} as CarDTO);

    const netInfo = useNetInfo();
    const { navigate, goBack } = useNavigation<any>();
    const route = useRoute();
    const { car } = route.params as Params;
    const theme = useTheme();

    const scrollY = useSharedValue(0);
    const scrollHandler = useAnimatedScrollHandler(event => {
        scrollY.value = event.contentOffset.y;
    });

    const headerStyleAnimation = useAnimatedStyle(() => {
        return {
            height: interpolate(
                scrollY.value,
                [0, 200],
                [200, 70],
                Extrapolate.CLAMP
            ),
        }
    });

    const sliderCarsStyleAnimation = useAnimatedStyle(() => {
        return {
            opacity: interpolate(
                scrollY.value,
                [0, 150],
                [1, 0],
                Extrapolate.CLAMP
            )
        }
    });

    function handleConfirmRental() {
        navigate("Scheduling", { car });
    }

    function handleBack() {
        goBack();
    }

    useEffect(() => {
        async function fetchCarUpdated() {
            const response = await api.get(`/cars/${car.id}`);
            setCarUpdated(response.data);
        }

        if (netInfo.isConnected === true) {
            fetchCarUpdated();
        }
    }, [netInfo.isConnected]);

    return (
        <Container>
            <StatusBar style='dark' />
            <Animated.View
                style={[headerStyleAnimation, { backgroundColor: theme.colors.background_secondary }]}
            >
                <Header>
                    <BackButton onPress={handleBack} />

                </Header>
                <Animated.View
                    style={sliderCarsStyleAnimation}
                >
                    <CarImages>
                        <ImageSlider
                            imagesUrl={
                                !!carUpdated.photos ?
                                    carUpdated.photos : [{ id: car.thumbnail, photo: car.thumbnail }]
                            }
                        />
                    </CarImages>
                </Animated.View>
            </Animated.View>

            <Animated.ScrollView
                contentContainerStyle={{
                    paddingHorizontal: 24,
                    alignItems: 'center'
                }}
                showsHorizontalScrollIndicator={false}
                onScroll={scrollHandler}
                scrollEventThrottle={16}
            >
                <Details>
                    <Description>
                        <Brand>{car.brand}</Brand>
                        <Name>{car.name}</Name>
                    </Description>

                    <Rent>
                        <Period>{car.period}</Period>
                        <Price> R$ {
                            netInfo.isConnected === true
                                ? car.price
                                : '...'
                        }
                        </Price>
                    </Rent>
                </Details>
                {
                    carUpdated.accessories &&
                    <Accessories>
                        {
                            carUpdated.accessories.map(accessory => (
                                <Accessory
                                    key={accessory.type}
                                    name={accessory.name}
                                    icon={getAccessoryIcon(accessory.type)}
                                />
                            ))
                        }

                    </Accessories>
                }

                <About>
                    {car.about}
                </About>
            </Animated.ScrollView>

            <Footer>
                <Button
                    title='Escolher período de aluguel'
                    onPress={handleConfirmRental}
                    enabled={netInfo.isConnected === true}
                    style={{ opacity: netInfo.isConnected == true ? 1 : 0.5 }}
                />
                {
                    netInfo.isConnected === false &&
                    <OfflineInfo>
                        Conecte-se a Internet para ver mais detalhes e agendar o seu carro.
                    </OfflineInfo>
                }
            </Footer>
        </Container>
    );
}