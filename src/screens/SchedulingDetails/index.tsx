import React, { useEffect, useState } from 'react';
import { Alert } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useNetInfo } from '@react-native-community/netinfo';
import { RFValue } from 'react-native-responsive-fontsize';
import { useTheme } from 'styled-components';
import { Feather } from '@expo/vector-icons';
import { format, parseISO } from 'date-fns';

import { ImageSlider } from '../../components/ImageSlider';
import { BackButton } from '../../components/BackButton';
import { Accessory } from '../../components/Accessory';

import { getAccessoryIcon } from '../../utils/getAccessoryIcon';
import { CarDTO } from '../../dtos/CarDTO';

import { getPlatformDate } from '../../utils/getPlatformDate';
import { Button } from '../../components/Button';
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

interface Params {
    car: CarDTO;
    dates: string[];
}

interface RentalPeriod {
    startFormatter: string;
    endFormatter: string;
}

export function SchedulingDetails() {
    const [rentalPeriod, setRentalPeriod] = useState<RentalPeriod>({} as RentalPeriod);
    const [carUpdated, setCarUpdated] = useState<CarDTO>({} as CarDTO);

    const netInfo = useNetInfo();
    const [loading, setLoading] = useState(false);
    const theme = useTheme();
    const route = useRoute();
    const { car, dates } = route.params as Params;

    const rentalTotal = Number(dates.length * car.price);

    const { navigate, goBack } = useNavigation<any>();

    async function handleConfirmRental() {
        setLoading(true);


        await api.post(`/rentals`, {
            user_id: 1,
            car_id: car.id,
            start_date: new Date(dates[0]),
            end_date: new Date(dates[dates.length - 1]),
            total: rentalTotal
        }).then(() => navigate("Confirmation", {
            nextScreenRoute: 'Home',
            title: 'Carro Alugado!',
            message: `Agora vc só precisa ir\naté a concessionária da RENTX\npegar o seu automóvel.`
        }))
        .catch(() => {
            setLoading(false);
            Alert.alert('Não foi possível finalizar o seu agendamento.')
        });
    }

    function handleBack() {
        goBack();
    }

    useEffect(() => {
        setRentalPeriod({
            startFormatter: format(getPlatformDate(parseISO(dates[0])), 'dd/MM/yyyy'),
            endFormatter: format(getPlatformDate(parseISO(dates[dates.length - 1])), 'dd/MM/yyyy'),
        })
    }, []);

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
            <Header>
                <BackButton onPress={handleBack} />

            </Header>
            <CarImages>
                <ImageSlider
                    imagesUrl={
                        !!carUpdated.photos ?
                            carUpdated.photos : [{ id: car.thumbnail, photo: car.thumbnail }]
                    }
                />
            </CarImages>

            <Content>
                <Details>
                    <Description>
                        <Brand>{car.brand}</Brand>
                        <Name>{car.name}</Name>
                    </Description>

                    <Rent>
                        <Period>{car.period}</Period>
                        <Price>R$ {car.price}</Price>
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
                        <DateValue>{rentalPeriod.startFormatter}</DateValue>
                    </DateInfo>

                    <Feather
                        name='chevron-right'
                        size={RFValue(24)}
                        color={theme.colors.shape}
                    />

                    <DateInfo>
                        <DateTitle>ATÉ</DateTitle>
                        <DateValue>{rentalPeriod.endFormatter}</DateValue>
                    </DateInfo>
                </RentalPeriod>

                <RentalPrice>
                    <RentalPriceLabel>TOTAL</RentalPriceLabel>
                    <RentalPriceDetails>
                        <RentalPriceQuota>{`R$ ${car.price} x${dates.length} diárias`}</RentalPriceQuota>
                        <RentalPriceTotal>R$ {rentalTotal}</RentalPriceTotal>
                    </RentalPriceDetails>
                </RentalPrice>
            </Content>

            <Footer>
                <Button
                    title='Alugar agora'
                    color={theme.colors.success} onPress={handleConfirmRental}
                    style={{ opacity: loading ? .5 : 1 }}
                    enabled={!loading}
                    loading={loading}
                />
            </Footer>
        </Container>
    );
}