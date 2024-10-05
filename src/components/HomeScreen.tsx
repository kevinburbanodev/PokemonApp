import React, { useEffect } from 'react';
import {
    View
} from 'react-native';

import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/navigator';
import { Button } from 'react-native-paper';
import { GetPokemonsUseCase } from '../use-cases/GetPokemonsUseCase';
import { PokemonRepositoryImpl } from '../data/PokemonRepositoryImpl';
import { PokemonManager } from '../data/PokemonManager';
import { usePokemonViewModel } from '../presenters/PokemonViewModel';

type HomeScreenProps = NativeStackScreenProps<RootStackParamList, 'Home'>;

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
    const getPokemonsUseCase = new GetPokemonsUseCase(new PokemonRepositoryImpl(PokemonManager));
    const { pokemons, loadPokemons } = usePokemonViewModel(getPokemonsUseCase);
    // Cargar pokemons al montar el componente
    useEffect(() => {
        loadPokemons();
    }, []);
    console.log("Estos son los pokemons obtenidos", pokemons);
    return (
        <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
            <Button mode="contained" onPress={() => navigation.navigate("Users")}>
                Go to Users
            </Button>
        </View>
    );
};

export default HomeScreen;
