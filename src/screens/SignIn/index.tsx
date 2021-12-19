import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { Keyboard, KeyboardAvoidingView } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { useTheme } from 'styled-components';
import { Button } from '../../components/Button';
import { Input } from '../../components/Input';
import { PasswordInput } from '../../components/PasswordInput';

import {
 Container, 
 Header,
 SubTitle,
 Title,
 Form,
 Footer,
} from './styles';

export function SignIn(){
    const theme = useTheme();
    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');
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
                        onPress={() => {}}
                        style={{ opacity: true ? .5 : 1 }}
                        enabled={false}
                        loading={false}
                    />

                    <Button 
                        title='Criar conta gratuita'
                        color={theme.colors.background_secondary}
                        ligth
                        onPress={() => {}}
                        style={{ opacity: true ? .5 : 1 }}
                        enabled={false}
                        loading={false}
                    />
                </Footer>
            </Container>
        </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
 );
}