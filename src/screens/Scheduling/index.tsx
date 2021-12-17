import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useTheme } from 'styled-components';
import { format } from 'date-fns';

import { BackButton } from '../../components/BackButton';
import {
    Calendar,
    DayProps,
    generateInterval,
    MarkedDateProps
} from '../../components/Calendar';
import { Button } from '../../components/Button';
import { getPlatformDate } from '../../utils/getPlatformDate';
import { CarDTO } from '../../dtos/CarDTO';

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

interface RentalPeriod {
    start: number;
    startFormatter: string;
    end: number;
    endFormatter: string;
}

interface Params {
    car: CarDTO;
}

export function Scheduling() {
    const [lastSelectedDate, setLastSelectedDate] = useState<DayProps>({} as DayProps);
    const [markedDates, setMarkedDates] = useState<MarkedDateProps>({} as MarkedDateProps);
    const [rentalPeriod, setRentalPeriod] = useState<RentalPeriod>({} as RentalPeriod);
    const route = useRoute();
    const { car } = route.params as Params;

    const theme = useTheme();
    const { navigate, goBack } = useNavigation<any>();

    function handleConfirmRental() {
        navigate("SchedulingDetails", {
            car,
            dates: Object.keys(markedDates)
        });
    }

    function handleBack() {
        goBack();
    }

    function handleChangeDate(date: DayProps) {
        let start = !lastSelectedDate.timestamp ? date : lastSelectedDate;
        let end = date;

        if (start.timestamp > end.timestamp) {
            start = end;
            end = start;
        }

        setLastSelectedDate(end);
        const interval = generateInterval(start, end);
        setMarkedDates(interval);

        const firstDate = Object.keys(interval)[0];
        const endDate = Object.keys(interval)[Object.keys(interval).length - 1];
        setRentalPeriod({
            start: start.timestamp,
            startFormatter: format(getPlatformDate(new Date(firstDate)), 'dd/MM/yyyy'),
            end: end.timestamp,
            endFormatter: format(getPlatformDate(new Date(endDate)), 'dd/MM/yyyy')
        })
    }

    return (
        <Container>
            <StatusBar
                style='light'
            />
            <Header>
                <BackButton onPress={handleBack}
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
                        <DateValue selected={!!rentalPeriod.startFormatter}>
                            {rentalPeriod.startFormatter}
                        </DateValue>
                    </DateInfo>

                    <ArrowSvg />

                    <DateInfo>
                        <DateTitle>ATÉ</DateTitle>
                        <DateValue selected={!!rentalPeriod.endFormatter}>
                            {rentalPeriod.endFormatter}
                        </DateValue>
                    </DateInfo>
                </RentalPeriod>
            </Header>

            <Content>
                <Calendar
                    markedDates={markedDates}
                    onDayPress={handleChangeDate}
                />
            </Content>

            <Footer>
                <Button
                    title="Confirmar"
                    onPress={handleConfirmRental}
                    style={{ opacity: (!!rentalPeriod.start && !!rentalPeriod.end) ? 1 : 0.5 }}
                    enabled={(!!rentalPeriod.start && !!rentalPeriod.end) ? true : false}
                />
            </Footer>
        </Container>
    );
}