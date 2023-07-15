import { HistoryCard } from "@components/HistoryCard";
import { ScreenHeader } from "@components/ScreenHeader";
import { Center, Heading, SectionList, Text, VStack } from "native-base";
import { useState } from 'react';

export function History() {
    const [exercises, setExercises] = useState([{
        title: "26.06.23",
        data: ['Puxada Frontal', 'Remada Unilateral']
    },
    {
        title: "25.06.23",
        data: ['Puxada Frontal']
    }])
    return (
        <VStack flex={1}>
            <ScreenHeader title="Histórico de Exercícios" />
            <SectionList
                sections={exercises}
                keyExtractor={item => item}
                renderItem={({ item }) => (
                    <HistoryCard />
                )}
                renderSectionHeader={({ section }) => (
                    <Heading color="gray.200" fontSize="md" mt={10} mb={3} fontFamily="heading" >{section.title}</Heading>
                )}
                px={8}
                ListEmptyComponent={() => (
                    <Text color="gray.100" textAlign="center">
                        Não há exercicios registrados ainda.{'\n'}
                        Vamos fazer excercícios hoje?
                    </Text>
                )}
                contentContainerStyle={exercises.length === 0 && { flex:1,justifyContent:"center"}}
                showsVerticalScrollIndicator={false}
            />


        </VStack>
    )
}