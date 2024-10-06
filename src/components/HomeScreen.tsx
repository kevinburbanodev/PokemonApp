import React, { useEffect } from 'react';
import { FlatList, View, StyleSheet, Image, TouchableWithoutFeedback } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/navigator';
import { Text, Card } from 'react-native-paper';
import { GetPokemonsUseCase } from '../use-cases/GetPokemonsUseCase';
import { PokemonRepositoryImpl } from '../data/PokemonRepositoryImpl';
import { PokemonManager } from '../data/PokemonManager';
import { usePokemonViewModel } from '../presenters/PokemonViewModel';
import { Pokemon } from '../entities/Pokemon';

type HomeScreenProps = NativeStackScreenProps<RootStackParamList, 'Home'>;

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
    const getPokemonsUseCase = new GetPokemonsUseCase(new PokemonRepositoryImpl(PokemonManager));
    const { pokemons, loadPokemons } = usePokemonViewModel(getPokemonsUseCase);

    // Cargar pokemons al montar el componente
    useEffect(() => {
        loadPokemons();
    }, []);

    return (
        <View style={styles.container}>
            <Text variant="displaySmall" style={styles.homeTitle}>Pokedex</Text>
            <FlatList
                data={pokemons}
                keyExtractor={(item) => item.id.toString()}
                renderItem={pokemonItem}
                numColumns={2}
                columnWrapperStyle={styles.row}
            />
        </View>
    );
};

const pokemonItem = ({ item }: { item: Pokemon }) => {
    const backgroundColor = getPokemonTypeColor(item.types[0]);

    return (
        <TouchableWithoutFeedback onPress={() => console.log(item.name)}>
            <Card style={[styles.pokemonCard, { backgroundColor }]}>
                <View style={styles.rowCardContent}>
                    <View style={styles.cardDescriptionContent}>
                        <Text style={styles.pokemonText}>{item.name}</Text>
                        <View>
                            {item.types.map((type, index) => (
                                <View key={index} style={styles.typeBadge}>
                                    <Text style={styles.typeText}>{type}</Text>
                                </View>
                            ))}
                        </View>
                    </View>
                    <View style={styles.cardImageContent}>
                        <Image
                            source={{ uri: item.officialArtwork.frontDefault }}
                            style={styles.pokemonImage}
                            resizeMode='cover'
                        />
                    </View>
                </View>
            </Card>
        </TouchableWithoutFeedback>
    );
};

// Función que retorna el color según el primer tipo del Pokémon
const getPokemonTypeColor = (type: string): string => {
    return typeColors[type] || '#A8A8A8'; // Color gris si no se encuentra el tipo
};

// Mapeo de colores de tipos
const typeColors: { [key: string]: string } = {
    grass: '#78C850',
    poison: '#A040A0',
    fire: '#F08030',
    water: '#6890F0',
    bug: '#A8B820',
    normal: '#A8A878',
    electric: '#F8D030',
    ground: '#E0C068',
    fairy: '#EE99AC',
    fighting: '#C03028',
    psychic: '#F85888',
    rock: '#B8A038',
    ghost: '#705898',
    ice: '#98D8D8',
    dragon: '#7038F8',
    dark: '#705848',
    steel: '#B8B8D0',
    flying: '#A890F0',
    // Agrega más tipos según sea necesario
};

const styles = StyleSheet.create({
    homeTitle: {
        margin: 5,
        marginLeft: 10,
        fontWeight: 'bold'
    },
    container: {
        flex: 1,
        marginVertical: 10,
        marginHorizontal: 4
    },
    row: {
        flex: 1,
        justifyContent: 'space-around',
    },
    pokemonCard: {
        flex: 1,
        margin: 10,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    rowCardContent: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 8,
    },
    cardDescriptionContent: {
        alignItems: 'center',
    },

    cardImageContent: {
        justifyContent: 'flex-end'
    },

    pokemonText: {
        fontSize: 13,
        fontWeight: 'bold',
        color: 'white',
        textTransform: 'capitalize'
    },

    typeBadge: {
        backgroundColor: '#ffffff80',
        borderRadius: 20,
        paddingVertical: 3,
        paddingHorizontal: 10,
        marginHorizontal: 5,
        marginTop: 5
    },
    typeText: {
        fontSize: 12,
        color: 'white',
        fontWeight: 'bold',
        textTransform: 'capitalize'
    },

    pokemonImage: {
        width: 90,
        height: 90,
    }
});

export default HomeScreen;
