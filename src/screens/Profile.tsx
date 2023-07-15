import { Button } from "@components/Button";
import { Input } from "@components/Input";
import { ScreenHeader } from "@components/ScreenHeader";
import { UserPhoto } from "@components/UserPhoto";
import { Center, Heading, ScrollView, Skeleton, Text, VStack, useToast } from "native-base";
import { useState } from 'react';
import { Alert, TouchableOpacity } from "react-native";
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';

export function Profile() {
    const PHOTO_SIZE = 33;
    const [photoIsLoading, setPhotoIsLoading] = useState(false);
    const [userPhoto, setUserPhoto] = useState('ttps://github.com/rodrigorgtic.png');
    const toast = useToast();

    async function handleUserPhotoSelect() {
        setPhotoIsLoading(true);
        try {
            const photoSelected = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [4, 4],
                quality: 1,
            });

            console.log(photoSelected);
            if (photoSelected.canceled) {
                return;
            }

            if (photoSelected.assets[0].uri) {
                const photoInfo = await FileSystem.getInfoAsync(photoSelected.assets[0].uri);
                if (photoInfo.size && (photoInfo.size / 1024 / 1024) > 5) {
                    return toast.show({
                        title: 'Essa imagem é muito grande. Escolha uma de até 5MB.',
                        placement: 'bottom',
                        bgColor: 'red.500'
                    })
                }
                setUserPhoto(photoSelected.assets[0].uri);
            }
        } catch (error) {
            console.log(error);
        } finally {
            setPhotoIsLoading(false);
        }
    }
    return (
        <VStack flex={1}>
            <ScreenHeader title="Perfil" />
            <ScrollView contentContainerStyle={{ paddingBottom: 36 }}>
                <Center mt={6} px={10}>
                    {photoIsLoading ? <Skeleton
                        w={PHOTO_SIZE}
                        h={PHOTO_SIZE}
                        rounded="full"
                        startColor="gray.500"
                        endColor="gray.400"
                    /> : <UserPhoto
                        source={{ uri: userPhoto }}
                        alt="Foto do Usuario"
                        size={PHOTO_SIZE}
                    />}
                    <TouchableOpacity onPress={handleUserPhotoSelect}>
                        <Text color="green.500" fontWeight="bold" fontSize="md" mt={2} mb={8}>
                            Alterar Photo
                        </Text>
                    </TouchableOpacity>

                    <Input
                        placeholder="Nome"
                        bg="gray.600"
                    />
                    <Input
                        placeholder="E-mail"
                        bg="gray.600"
                        isDisabled
                    />


                </Center>
                <Center px={10} mt={12} mb={9}>
                    <Heading color="gray.200" fontSize="md" mb={4} alignSelf="flex-start" mt={12} fontFamily="heading">Alterar Senha</Heading>
                    <Input
                        placeholder="Senha Antiga"
                        bg="gray.600"
                        secureTextEntry
                    />
                    <Input
                        placeholder="Nova Senha"
                        bg="gray.600"
                        secureTextEntry
                    />
                    <Input
                        placeholder="Cofirme a Nova Senha"
                        bg="gray.600"
                        secureTextEntry
                    />
                    <Button
                        title="Atualizar" mt={4} />
                </Center>
            </ScrollView>
        </VStack>
    )
}