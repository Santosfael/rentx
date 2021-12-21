import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
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
    TotalCars,
} from './styles';
import { api } from '../../services/api';
import { LoadAnimation } from '../../components/LoadAnimation';

export function Home() {
    const [cars, setCars] = useState<CarDTO[]>([]);
    const [loading, setLoading] = useState(true);

    const { navigate } = useNavigation<any>();

    function handleCarDetails(car: CarDTO) {
        navigate("CarDetails", { car });
    }

    useEffect(() => {
        let isMounted = true;
        async function fetchCars() {
            try {
                const response = await api.get('/cars');
                if(isMounted) {
                    setCars(response.data);
                }
            } catch (error) {
                console.log(error);
            } finally {
                if(isMounted) {
                    setLoading(false);
                }
            }
        }

        fetchCars();
        return () => {
            isMounted = false;
        }
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
                    {
                        !loading &&
                        <TotalCars>
                            Total de {cars.length} carros
                        </TotalCars>
                    }
                </HeaderContent>
            </Header>

            {
                loading ? <LoadAnimation /> :
                    <CarList
                        data={cars}
                        keyExtractor={item => item.id}
                        renderItem={({ item }) => <Car data={item} onPress={() => handleCarDetails(item)} />}
                    />
            }
        </Container>
    );
}