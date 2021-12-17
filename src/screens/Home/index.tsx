import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { RFValue } from 'react-native-responsive-fontsize';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from 'styled-components';

import { Car } from '../../components/Car';
import { CarDTO } from '../../dtos/CarDTO';

import Logo from '../../assets/logo.svg';

import {
    CarList,
    Container,
    Header,
    HeaderContent,
    TotalCars,
    MyCarButton
} from './styles';
import { api } from '../../services/api';
import { Load } from '../../components/Load';

export function Home() {
    const [cars, setCars] = useState<CarDTO[]>([]);
    const [loading, setLoading] = useState(true);
    const { navigate } = useNavigation<any>();
    const theme = useTheme();

    function handleCarDetails(car: CarDTO) {
        navigate("CarDetails", { car });
    }

    function handleOpenMyCars() {
        navigate("MyCars");
    }

    useEffect(() => {
        async function fetchCars() {
            try {
                const response = await api.get('/cars');
                setCars(response.data);
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        }

        fetchCars();
    }, []);

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

            {
                loading ? <Load /> :
                    <CarList
                        data={cars}
                        keyExtractor={item => item.id}
                        renderItem={({ item }) => <Car data={item} onPress={() => handleCarDetails(item)} />}
                    />
            }

            <MyCarButton>
                <Ionicons
                    name='ios-car-sport'
                    size={32}
                    color={theme.colors.shape}
                    onPress={handleOpenMyCars}
                />
            </MyCarButton>

        </Container>
    );
}