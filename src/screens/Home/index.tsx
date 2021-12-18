import React, { useEffect, useState } from 'react';
import { StyleSheet, BackHandler } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { RFValue } from 'react-native-responsive-fontsize';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from 'styled-components';
import { RectButton, PanGestureHandler } from 'react-native-gesture-handler';
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    useAnimatedGestureHandler,
    withSpring
} from 'react-native-reanimated';

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
import { Load } from '../../components/Load';

const ButtonAnimated = Animated.createAnimatedComponent(RectButton);

export function Home() {
    const [cars, setCars] = useState<CarDTO[]>([]);
    const [loading, setLoading] = useState(true);

    const positionY = useSharedValue(0);
    const positionX = useSharedValue(0);

    const myCarsButtonStyle = useAnimatedStyle(() => {
        return {
            transform: [
                {translateX: positionX.value},
                {translateY: positionY.value}
            ]
        }
    });

    const onGestureEvent = useAnimatedGestureHandler({
        onStart( _, ctx: any) {
            ctx.positionX = positionX.value;
            ctx.positionY = positionY.value;
        },
        onActive(event, ctx: any) {
            positionX.value = ctx.positionX + event.translationX;
            positionY.value = ctx.positionY + event.translationY;
        },
        onEnd() {
            positionX.value = withSpring(0);
            positionY.value = withSpring(0);
        }
    });

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

    useEffect(() => {
        BackHandler.addEventListener('hardwareBackPress', () => {
            return true;
        });
    },[])

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
                loading ? <Load /> :
                    <CarList
                        data={cars}
                        keyExtractor={item => item.id}
                        renderItem={({ item }) => <Car data={item} onPress={() => handleCarDetails(item)} />}
                    />
            }

            <PanGestureHandler onGestureEvent={onGestureEvent}>
                <Animated.View
                    style = {[
                        myCarsButtonStyle,
                        {
                            position: 'absolute',
                            bottom: 13,
                            right: 22
                        }
                    ]}
                >
                    <ButtonAnimated 
                        onPress={handleOpenMyCars}
                        style={[styles.button, { backgroundColor: theme.colors.main}]}
                    >
                        <Ionicons
                            name='ios-car-sport'
                            size={32}
                            color={theme.colors.shape}
                        />
                    </ButtonAnimated>
                </Animated.View>
            </PanGestureHandler>
        </Container>
    );
}

const styles = StyleSheet.create({
    button: {
        width: 60,
        height: 60,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
    }
})