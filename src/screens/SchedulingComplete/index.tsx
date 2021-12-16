import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { useWindowDimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import LogoSvg from '../../assets/logo_background_gray.svg';
import DoneSvg from '../../assets/done.svg';

import {
    Container,
    Content,
    Title,
    Message,
    Footer,
} from './styles';
import { ConfirmButtom } from '../../components/ConfirmButtom';

export function SchedulingComplete() {
    const { width } = useWindowDimensions();
    const { navigate } = useNavigation<any>();

    function handleConfirm() {
        navigate("Home");
    }
    return (
        <Container>
            <StatusBar
                style='light'
            />
            <LogoSvg width={width} />

            <Content>
                <DoneSvg width={80} height={80} />
                <Title>Carro alugado!</Title>

                <Message>
                    Agora você só precisa ir{'\n'}
                    até a concessionária da RENTX{'\n'}
                    pegar o seu automóvel
                </Message>
            </Content>

            <Footer>
                <ConfirmButtom
                    title='OK'
                    onPress={handleConfirm}
                />
            </Footer>
        </Container>
    );
}