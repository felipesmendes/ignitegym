import { VStack, Image, Text, Center, Heading, ScrollView, useToast } from "native-base";
import BackgroudImg from '@assets/background.png';
import { useState } from "react";
import LogoSvg from '@assets/logo.svg';
import { Input } from "@components/Input";
import { Button } from "@components/Button";
import { useNavigation } from '@react-navigation/native';
import { useForm, Controller } from 'react-hook-form'
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { api } from '@services/api';
import { Alert } from "react-native";
import { AppError } from "@utils/AppError";
type FormDataProps = {
    name: string;
    email: string;
    password: string;
    passwordConfirm: string;
}

const signUpSchema = yup.object({
    name: yup.string().required('Informe o nome'),
    email: yup.string().required('Informe o e-mail').email('E-mail inválido'),
    password: yup.string().required('Informe a senha').min(6, 'A senha deve ter pelo menos 6 digitos'),
    passwordConfirm: yup.string().required('Confirme a senha').oneOf([yup.ref('password'), null], 'As senha não são iguais')

});
export function SignUp() {
    const toast = useToast()
    const { control, handleSubmit, formState: { errors } } = useForm<FormDataProps>({
        resolver: yupResolver(signUpSchema),
    });
    const navigation = useNavigation();
    function handleGoBack() {
        navigation.goBack();
    }
    async function handleSignUp({ name, email, password, passwordConfirm }: FormDataProps) {
        try {
            const response = await api.post('/users', { name, email, password });
            console.log(response.data);
        } catch (error) {
            const isAppError = error instanceof AppError
            const title = isAppError ? error.message : 'Não foi possível criar a conta.Tente novamente mais tarde.';
            toast.show({
                title, placement: 'top', bgColor: 'red.500'
            })
        }
        console.log({ name, email, password, passwordConfirm });
    }
    return (
        <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
            <VStack flex={1} px={10} pb={16}>
                <Image source={BackgroudImg}
                    defaultSource={BackgroudImg}
                    alt="Pessoas Treinando"
                    resizeMode="contain"
                    position="absolute" />
                <Center my={24}>
                    <LogoSvg />
                    <Text color="gray.100" fontSize="sm">Treine sua mente e o seu corpo</Text>
                </Center>
                <Center>
                    <Heading color="gray.100" fontSize="xl" mb={6} fontFamily="heading">Crie sua conta</Heading>
                    <Controller
                        control={control}
                        name="name"
                        render={({ field: { onChange, value } }) => (
                            <Input
                                placeholder="Nome"
                                onChangeText={onChange}
                                value={value}
                                errorMessage={errors.name?.message}
                            />
                        )
                        } />
                    <Controller
                        control={control}
                        name="email"
                        render={({ field: { onChange, value } }) => (
                            <Input
                                placeholder="E-mail"
                                keyboardType="email-address"
                                autoCapitalize="none"
                                onChangeText={onChange}
                                value={value}
                                errorMessage={errors.email?.message}
                            />
                        )
                        } />

                    <Controller
                        control={control}
                        name="password"
                        render={({ field: { onChange, value } }) => (
                            <Input
                                placeholder="Senha"
                                secureTextEntry
                                onChangeText={onChange}
                                value={value}
                                errorMessage={errors.password?.message}

                            />
                        )
                        } />
                    <Controller
                        control={control}
                        name="passwordConfirm"
                        render={({ field: { onChange, value } }) => (
                            <Input
                                placeholder="Confirme a Senha"
                                secureTextEntry
                                onChangeText={onChange}
                                value={value}
                                onSubmitEditing={handleSubmit(handleSignUp)}
                                returnKeyType="send"
                                errorMessage={errors.passwordConfirm?.message}

                            />
                        )
                        } />

                    <Button title="Criar e Acesssar" onPress={handleSubmit(handleSignUp)} />

                </Center>


                <Button mt={12}
                    title="Voltar para o login"
                    variant="outline"
                    onPress={handleGoBack}
                />
            </VStack>
        </ScrollView>
    )
}