import { ExcerciseCard } from "@components/ExerciseCard";
import { Group } from "@components/Group";
import { HomeHeader } from "@components/HomerHeader";
import { useNavigation } from "@react-navigation/native";
import { AppNavigatorRoutesProps } from "@routes/app.routes";
import { Center, HStack, Text, VStack, FlatList, Heading } from "native-base";
import { useState } from "react";

export function Home() {
    const [groups, setGroups] = useState(['Costas', 'Ombro', 'Teste']);
    const [groupSelected, setGroupSelected] = useState('Costas');
    const [exercises, setExercises] = useState(['Remada Curvada', 'Puxada Frontal', 'Remada Unilateral']);
    const navigation = useNavigation<AppNavigatorRoutesProps>();
    function hangleOpenExcerciseDetails() {
        navigation.navigate('exercise')
    }
    return (
        <VStack flex={1}>
            <HomeHeader />
            <FlatList
                data={groups}
                keyExtractor={item => item}
                renderItem={({ item }) => (
                    <Group
                        name={item}
                        isActive={groupSelected.toLocaleUpperCase() === item.toLocaleUpperCase()}
                        onPress={() => setGroupSelected(item)}
                    />
                )}
                horizontal
                showsHorizontalScrollIndicator={false}
                _contentContainerStyle={{
                    px: 8
                }}
                my={10}
                maxH={10}
                minH={10}
            />
            <VStack flex={1} px={8}>

                <HStack justifyContent="space-between">
                    <Heading color="gray.200" fontSize="md" fontFamily="heading">Exercicios</Heading>
                    <Text color="gray.200" fontSize="sm">4</Text>
                </HStack>
                <FlatList
                    data={exercises}
                    keyExtractor={item => item}
                    renderItem={({ item }) => (
                        <ExcerciseCard
                            onPress={hangleOpenExcerciseDetails}
                        />
                    )}
                    showsVerticalScrollIndicator={false}
                    _contentContainerStyle={{
                        paddingBottom: 20
                    }}
                />
            </VStack>

        </VStack>
    )
}