import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { Alert, Keyboard, KeyboardAvoidingView, TouchableWithoutFeedback } from 'react-native';
import * as Yup from 'yup';

import { BackButton } from '../../../components/BackButton';
import { Bullet } from '../../../components/Bullet';
import { Button } from '../../../components/Button';
import { Input } from '../../../components/Input';

import {
    Container,
    Header,
    Steps,
    Title,
    SubTitle,
    Form,
    FormTitle,
} from './styles';

export function SignUpFirstStep(){
    const { navigate, goBack } = useNavigation<any>();
    const [ name, setName ] = useState('');
    const [ email, setEmail ] = useState('');
    const [ driverLicense, setDriverLicense ] = useState('');

    function handleBack() {
        goBack();
    }

    async function handleNextStep() {
        try {
            const schema = Yup.object().shape({
                name: Yup.string()
                .required('Nome é obrigatório'),
                email: Yup.string()
                .email('E-mail inválido')
                .required('E-mail é obrigatório'),
                driverLicense: Yup.string()
                .required('CNH é obrigatória')
                .min(11, 'CNH tem contem 11 números')
                .max(11, 'CNH tem contem 11 números')
            });

            const data = {name, email, driverLicense}
            await schema.validate(data);

            navigate('SignUpSecondStep', { user: data})
        } catch (error) {
            if(error instanceof Yup.ValidationError) {
                Alert.alert('Opa', error.message);
            }
        }
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
                            1. Dados
                        </FormTitle>
                        <Input 
                            iconName='user'
                            placeholder='Nome'
                            onChangeText={setName}
                            value={name}
                        />

                        <Input 
                            iconName='mail'
                            placeholder='E-mail'
                            keyboardType='email-address'
                            autoCapitalize='none'
                            onChangeText={setEmail}
                            value={email}
                        />

                        <Input 
                            iconName='credit-card'
                            placeholder='CNH'
                            keyboardType='numeric'
                            onChangeText={setDriverLicense}
                            value={driverLicense}
                        />
                    </Form>

                    <Button 
                        title='Próximo'
                        onPress={handleNextStep}
                        style={{ opacity: (!!name && !!email && !!driverLicense) ? 1 : 0.5 }}
                        enabled={(!!name && !!email && !!driverLicense) ? true : false}
                    />
                </Container>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
}