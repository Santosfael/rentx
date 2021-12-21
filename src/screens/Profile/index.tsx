import React, { useState } from 'react';
import { Alert, Keyboard, KeyboardAvoidingView, TouchableWithoutFeedback } from 'react-native';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { useNavigation } from '@react-navigation/native';
import { BackButton } from '../../components/BackButton';
import * as ImagePicker from 'expo-image-picker';
import { useTheme } from 'styled-components';
import { Feather } from '@expo/vector-icons';
import * as Yup from 'yup';

import { PasswordInput } from '../../components/PasswordInput';
import { Button } from '../../components/Button';
import { Input } from '../../components/Input';
import { useAuth } from '../../hooks/auth';

import {
    Container,
    Header,
    HeaderTop,
    HeaderTitle,
    LogoutButton,
    PhotoContainer,
    Photo,
    PhotoButton,
    Content,
    Options,
    Option,
    OptionTitle,
    Section
} from './styles';
import { useNetInfo } from '@react-native-community/netinfo';

interface ImageProps {
    cancelled: boolean;
    height: number;
    type: string;
    uri: string;
    width: number;
}

export function Profile() {
    const { user, signOut, updatedUser } = useAuth();
    const [option, setOption] = useState<'dataEdit' | 'passwordEdit'>('dataEdit');
    const netInfo = useNetInfo();

    const [avatar, setAvatar] = useState(user.avatar);
    const [name, setName] = useState(user.name);
    const [driverLicense, setDriverLicense] = useState(user.driver_license);

    const theme = useTheme();
    const { goBack } = useNavigation();

    function handleGoBack() {
        goBack();
    }

    async function handleSignOut() {
        Alert.alert(
            'Tem certeza?',
            'Se você sair, irá precisar de internet para conectar-se novamente.',
            [
                {
                    text: 'Cancelar',
                    onPress: () => { },
                    style: 'cancel'
                },
                {
                    text: 'Sim',
                    onPress: () => signOut()
                }
            ]
        )
    }

    function handleOptionChange(optionSelected: 'dataEdit' | 'passwordEdit') {
        if (netInfo.isConnected === false && optionSelected === 'passwordEdit') {
            Alert.alert('Você está offline', 'Para mudar a senha, conecte-se a Internet');
        }
        setOption(optionSelected);
    }

    async function handleAvatarSelect() {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 4],
            quality: 1,
        }) as ImageProps;

        if (!result.cancelled) {
            setAvatar(result.uri);
        }
    }

    async function handleProfileUpdate() {
        try {
            const schema = Yup.object().shape({
                driverLicense: Yup.string()
                    .required('CNH é obrigatoria')
                    .min(11, 'A CNH tem no mínimo 11 caracteres')
                    .max(11, 'A CNH tem no máximo 11 caracteres'),
                name: Yup.string()
                    .required('Nome é obrigatório')
            });

            const data = { name, driverLicense };
            await schema.validate(data);

            await updatedUser({
                id: user.id,
                user_id: user.user_id,
                email: user.email,
                name,
                driver_license: driverLicense,
                avatar,
                token: user.token
            });

            Alert.alert('Perfil atualizado!');
        } catch (error) {

            if (error instanceof Yup.ValidationError)
                Alert.alert('Opá', error.message);
            else {
                Alert.alert('Não foi possível atualizar o perfil');
            }
        }
    }

    return (
        <KeyboardAvoidingView behavior='position' enabled>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <Container>
                    <Header>
                        <HeaderTop>
                            <BackButton
                                color={theme.colors.shape}
                                onPress={handleGoBack}
                            />
                            <HeaderTitle>Editar Perfil</HeaderTitle>
                            <LogoutButton onPress={handleSignOut}>
                                <Feather name='power' size={24} color={theme.colors.shape} />
                            </LogoutButton>
                        </HeaderTop>
                        <PhotoContainer>
                            {!!avatar && <Photo source={{ uri: avatar }} />}
                            <PhotoButton onPress={handleAvatarSelect}>
                                <Feather
                                    name='camera'
                                    size={24}
                                    color={theme.colors.shape}
                                />
                            </PhotoButton>
                        </PhotoContainer>
                    </Header>

                    <Content style={{ marginBottom: useBottomTabBarHeight() }}>
                        <Options>
                            <Option
                                active={option === 'dataEdit'}
                                onPress={() => handleOptionChange('dataEdit')}
                            >
                                <OptionTitle active={option === 'dataEdit'}>
                                    Dados
                                </OptionTitle>
                            </Option>

                            <Option
                                active={option === 'passwordEdit'}
                                onPress={() => handleOptionChange('passwordEdit')}
                            >
                                <OptionTitle active={option === 'passwordEdit'}>
                                    Trocar senha
                                </OptionTitle>
                            </Option>
                        </Options>
                        {
                            option === 'dataEdit'
                                ?
                                <Section>
                                    <Input
                                        iconName='user'
                                        placeholder='Nome'
                                        autoCorrect={false}
                                        defaultValue={user.name}
                                        onChangeText={setName}
                                    />

                                    <Input
                                        iconName='mail'
                                        editable={false}
                                        defaultValue={user.email}
                                    />

                                    <Input
                                        iconName='credit-card'
                                        placeholder='CNH'
                                        keyboardType='numeric'
                                        defaultValue={user.driver_license}
                                        onChangeText={setDriverLicense}
                                    />
                                </Section>
                                :
                                <Section>
                                    <PasswordInput
                                        iconName='lock'
                                        placeholder='Senha atual'
                                    />

                                    <PasswordInput
                                        iconName='lock'
                                        placeholder='Nova senha'
                                    />

                                    <PasswordInput
                                        iconName='lock'
                                        placeholder='Repetir senha'
                                    />
                                </Section>
                        }
                        <Button
                            title='Salvar alterações'
                            onPress={handleProfileUpdate}
                        />
                    </Content>
                </Container>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
}