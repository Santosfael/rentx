import { useNavigation } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { Alert, Keyboard, KeyboardAvoidingView } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { useTheme } from 'styled-components';
import * as Yup from 'yup';

import { Button } from '../../components/Button';
import { Input } from '../../components/Input';
import { PasswordInput } from '../../components/PasswordInput';
import { useAuth } from '../../hooks/auth';

import {
    Container,
    Header,
    SubTitle,
    Title,
    Form,
    Footer,
} from './styles';

export function SignIn() {
    const theme = useTheme();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { navigate } = useNavigation<any>();
    const { signIn } = useAuth();

    async function handleSignIn() {
        try {
            const schema = Yup.object().shape({
                email: Yup.string()
                    .required("E-mail obrigatório")
                    .email('Digite um e-mail válido'),

                password: Yup.string()
                    .required('A senha é obrigatória')
                    .min(6, 'A senha tem no mínimo de 6 caracteres')
            });

            await schema.validate({ email, password });

            signIn({ email, password });
        } catch (error) {
            if (error instanceof Yup.ValidationError) {
                Alert.alert('Opa', error.message);
            } else {
                Alert.alert('Erro na autenticação', 'Ocorreu um erro ao fazer login, verifique as credenciais');
            }
        }

    }

    function handleNewAccount() {
        navigate("SignUpFirstStep")
    }

    return (
        <KeyboardAvoidingView
            behavior='position'
            enabled
        >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <Container>
                    <StatusBar style='dark' />
                    <Header>
                        <Title>Estamos{'\n'}quase lá.</Title>
                        <SubTitle>Faça o seu login para começar{'\n'}uma experiência incrível.</SubTitle>
                    </Header>

                    <Form>
                        <Input
                            iconName='mail'
                            placeholder='E-mail'
                            keyboardType='email-address'
                            autoCorrect={false}
                            autoCapitalize='none'
                            onChangeText={setEmail}
                            value={email}
                        />

                        <PasswordInput
                            iconName='lock'
                            placeholder='Senha'
                            autoCorrect={false}
                            onChangeText={setPassword}
                            value={password}
                        />
                    </Form>

                    <Footer>
                        <Button
                            title='Login'
                            onPress={handleSignIn}
                            style={{ opacity: (!!email && !!password) ? 1 : 0.5 }}
                            enabled={(!!email && !!password) ? true : false}
                        />

                        <Button
                            title='Criar conta gratuita'
                            color={theme.colors.background_secondary}
                            onPress={handleNewAccount}
                            ligth
                        />
                    </Footer>
                </Container>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
}