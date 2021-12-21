import React, { useEffect, useState } from 'react';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { useTheme } from 'styled-components';
import { StatusBar } from 'expo-status-bar';
import { FlatList } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

import { LoadAnimation } from '../../components/LoadAnimation';
import { Car as ModelCar } from '../../database/model/Car';
import { BackButton } from '../../components/BackButton';
import { Car } from '../../components/Car';
import { api } from '../../services/api';

import {
    Container,
    Header,
    Title,
    SubTitle,
    Content,
    Appointments,
    AppointmentsTitle,
    AppointmentsQuantity,
    CarWrapper,
    CarFooter,
    CarFooterTitle,
    CarFooterPeriod,
    CarFooterDate,
} from './styles';
import { format, parseISO } from 'date-fns';

interface DataProps {
    id: string;
    car: ModelCar;
    start_date: string;
    end_date: string;
}

export function MyCars() {
    const [cars, setCars] = useState<DataProps[]>([]);
    const [loading, setLoading] = useState(true);
    const screenIsFocus = useIsFocused();

    const { navigate, goBack } = useNavigation<any>();
    const theme = useTheme();

    function handleBack() {
        goBack();
    }

    useEffect(() => {
        async function fetchCars() {
            try {
                const response = await api.get('rentals');
                const dataFormated = response.data.map((data: DataProps) => {
                    return {
                        id: data.id,
                        car: data.car,
                        start_date: format(parseISO(data.start_date), 'dd/MM/yyyy'),
                        end_date: format(parseISO(data.end_date), 'dd/MM/yyyy'),
                    }
                });
                setCars(dataFormated);
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        }

        fetchCars();
    }, [screenIsFocus]);

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
                    Seus agendamentos,{'\n'}
                    estão aqui.
                </Title>

                <SubTitle>conforto, segurança e praticidade.</SubTitle>
            </Header>

            {
                loading ? <LoadAnimation /> :
                    <Content>
                        <Appointments>
                            <AppointmentsTitle>Agendamentos feitos</AppointmentsTitle>
                            <AppointmentsQuantity>{cars.length}</AppointmentsQuantity>
                        </Appointments>

                        <FlatList
                            data={cars}
                            keyExtractor={item => item.id}
                            showsVerticalScrollIndicator={false}
                            renderItem={({ item }) => (
                                <CarWrapper>
                                    <Car data={item.car} />
                                    <CarFooter>
                                        <CarFooterTitle>Período</CarFooterTitle>
                                        <CarFooterPeriod>
                                            <CarFooterDate>{item.start_date}</CarFooterDate>

                                            <AntDesign
                                                name="arrowright"
                                                size={20}
                                                color={theme.colors.title}
                                                style={{ marginHorizontal: 10 }}
                                            />

                                            <CarFooterDate>{item.end_date}</CarFooterDate>
                                        </CarFooterPeriod>
                                    </CarFooter>
                                </CarWrapper>
                            )}

                        />
                    </Content>
            }
        </Container>
    );
}