import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { RFValue } from 'react-native-responsive-fontsize';
import { useNavigation } from '@react-navigation/native';

import { Car } from '../../components/Car';
import { CarDTO } from '../../dtos/CarDTO';

import Logo from '../../assets/logo.svg';


import {
    CarList,
    Container,
    Header,
    HeaderContent,
    TotalCars
} from './styles';
import { api } from '../../services/api';
import { Load } from '../../components/Load';

export function Home() {
    const [cars, setCars] = useState<CarDTO[]>([]);
    const [loading, setLoading] = useState(true);
    const { navigate } = useNavigation<any>();

    const carDataOne = {
        brand: 'Audi',
        name: 'RS 5 Coupé',
        rent: {
            period: 'Ao dia',
            price: 120,
        },
        thumbnail: 'https://freepngimg.com/thumb/audi/35227-5-audi-rs5-red.png',
    };

    function handleCarDetails() {
        navigate("CarDetails");
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
                        renderItem={({ item }) => <Car data={item} onPress={handleCarDetails} />}
                    />
            }

        </Container>
    );
}