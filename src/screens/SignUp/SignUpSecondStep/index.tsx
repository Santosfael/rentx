import React, { useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Alert, Keyboard, KeyboardAvoidingView, TouchableWithoutFeedback } from 'react-native';
import { useTheme } from 'styled-components';

import { PasswordInput } from '../../../components/PasswordInput';
import { BackButton } from '../../../components/BackButton';
import { Bullet } from '../../../components/Bullet';
import { Button } from '../../../components/Button';
import { api } from '../../../services/api';

import {
    Container,
    Header,
    Steps,
    Title,
    SubTitle,
    Form,
    FormTitle,
} from './styles';

interface Params {
    user: {
        name: string;
        email: string;
        driverLicense: string;
    };
}

export function SignUpSecondStep(){
    const [ password, setPassword ] = useState('');
    const [ passwordConfirm, setPasswordConfirm ] = useState('');

    const { navigate, goBack } = useNavigation<any>();
    const route = useRoute();
    const theme = useTheme();

    const { user } = route.params as Params;

    function handleBack() {
        goBack();
    }
    async function handleRegister() {
        if(!password || !passwordConfirm) {
            Alert.alert('Campo de senha ou confirmação inválidos!');
        }

        if(password != passwordConfirm) {
            Alert.alert('As senhas não conferem');
        }

        await api.post('/users', {
            name: user.name,
            email: user.email,
            driver_license: user.driverLicense,
            password
        })
        .then(() =>{
            navigate('Confirmation', {
                nextScreenRoute: 'SignIn',
                title: 'Conta Criada!',
                message: `Agora é só fazer login\ne aproveitar`
            });
        })
        .catch((error) => {
            console.log(error)
            Alert.alert('Opa', 'Não foi possível cadastrar');
        });

    }

    return (
        <KeyboardAvoidingView behavior='position' enabled>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <Container>
                    <Header>
                        <BackButton onPress={handleBack} />

                        <Steps>
                            <Bullet active />
                            <Bullet />
                        </Steps>
                    </Header>

                    <Title>
                        Crie sua{'\n'}conta
                    </Title>

                    <SubTitle>
                        Faça seu cadastro de{'\n'}
                        forma rápida e fácil
                    </SubTitle>

                    <Form>
                        <FormTitle>
                            2. Senha
                        </FormTitle>

                        <PasswordInput 
                            iconName='lock'
                            placeholder='Senha'
                            onChangeText={setPassword}
                            value={password}
                        />

                        <PasswordInput 
                            iconName='lock'
                            placeholder='Repetir Senha'
                            onChangeText={setPasswordConfirm}
                            value={passwordConfirm}
                        />
                    </Form>

                    <Button 
                        title='Cadastrar'
                        color={theme.colors.success}
                        onPress={handleRegister}
                        style={{ opacity: (!!password && !!passwordConfirm) ? 1 : 0.5 }}
                        enabled={(!!password && !!passwordConfirm) ? true : false}
                    />
                </Container>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
}