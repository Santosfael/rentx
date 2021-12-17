import React, { useEffect, useState } from 'react';
import { RFValue } from 'react-native-responsive-fontsize';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useTheme } from 'styled-components';
import { Feather } from '@expo/vector-icons';
import { Alert } from 'react-native';
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
    const [loading, setLoading] = useState(false);
    const theme = useTheme();
    const route = useRoute();
    const { car, dates } = route.params as Params;

    const rentalTotal = Number(dates.length * car.rent.price);

    const { navigate, goBack } = useNavigation<any>();

    async function handleConfirmRental() {
        setLoading(true);
        const schedulesByCar = await api.get(`/schedules_bycars/${car.id}`);
        const unavailable_dates = [
            ...schedulesByCar.data.unavailable_dates,
            ...dates,
        ];

        await api.post(`/schedules_byuser`, {
            user_id: 1,
            car,
            startDate: format(getPlatformDate(parseISO(dates[0])), 'dd/MM/yyyy'),
            endDate: format(getPlatformDate(parseISO(dates[dates.length - 1])), 'dd/MM/yyyy'),
        })

        api.put(`/schedules_bycars/${car.id}`, {
            id: car.id,
            unavailable_dates
        })
            .then(() => navigate("SchedulingComplete"))
            .catch(() => {
                setLoading(false);
                Alert.alert('Não foi possível finalizar oseu agendamento.')
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
    }, [])

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
                        <Price>R$ {car.rent.price}</Price>
                    </Rent>
                </Details>

                <Accessories>
                    {
                        car.accessories.map((accessory) => (
                            <Accessory
                                key={accessory.type}
                                name={accessory.name}
                                icon={getAccessoryIcon(accessory.type)}
                            />
                        ))
                    }
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
                        <RentalPriceQuota>{`R$ ${car.rent.price} x${dates.length} diárias`}</RentalPriceQuota>
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