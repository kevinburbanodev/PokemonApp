import React, { useEffect, useState } from 'react';
import { FlatList, View, StyleSheet, Image, ActivityIndicator } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/navigator';
import { Text, Card } from 'react-native-paper';
import { GetPokemonsUseCase } from '../use-cases/GetPokemonsUseCase';
import { PokemonRepositoryImpl } from '../data/PokemonRepositoryImpl';
import { PokemonManager } from '../data/PokemonManager';
import { usePokemonViewModel } from '../presenters/PokemonViewModel';
import { Pokemon } from '../entities/Pokemon';
import Animated from 'react-native-reanimated';
import { getPokemonTypeColor } from '../utils/PokemonUtils';

type HomeScreenProps = NativeStackScreenProps<RootStackParamList, 'Home'>;

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
    const getPokemonsUseCase = new GetPokemonsUseCase(new PokemonRepositoryImpl(PokemonManager));
    const { pokemons, loadPokemons } = usePokemonViewModel(getPokemonsUseCase);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        loadPokemons(); // Cargar Pokémon al montar el componente
    }, []);

    const handleLoadMore = async () => {
        if (!loading) {
            setLoading(true);
            await loadPokemons();
            setLoading(false);
        }
    };

    const renderFooter = () => {
        if (!loading) return null;

        return (
            <View style={styles.footer}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    };

    return (
        <View style={styles.container}>
            <Text variant="displaySmall" style={styles.homeTitle}>Pokedex</Text>
            {
                pokemons.length == 0 ? (
                    <View style={styles.initialLoadingContainer}>
                        <ActivityIndicator size="large" color="#0000ff" />
                    </View>
                ) : (
                    <FlatList
                        data={pokemons}
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={({ item }) => pokemonItem({ item, navigation })}
                        numColumns={2}
                        columnWrapperStyle={styles.row}
                        onEndReached={handleLoadMore} // Función que se llama al llegar al final de la lista
                        onEndReachedThreshold={0.1} // Umbral para determinar cuándo se considera que se ha llegado al final
                        ListFooterComponent={renderFooter} // Componente que se muestra al final de la lista
                    />
                )
            }
        </View>
    );
};

const pokemonItem = ({ item, navigation }: { item: Pokemon; navigation: any }) => {
    const backgroundColor = getPokemonTypeColor(item.types[0]);

    return (
        <Card onPress={() => navigation.navigate('PokemonDetail', item)} style={[styles.pokemonCard, { backgroundColor }]}>
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
                    {
                        item.officialArtwork.frontDefault != null ? (
                            <Animated.Image
                                source={{ uri: item.officialArtwork.frontDefault }}
                                defaultSource={require('../assets/jar-loading.gif')}
                                style={styles.pokemonImage}
                                resizeMode='cover'
                                sharedTransitionTag={`${item.id}`}
                            />
                        ) : (
                            <Image
                                source={require('../assets/no-image.png')}
                                style={styles.pokemonImage}
                                resizeMode='cover'
                            />
                        )
                    }
                </View>
            </View>
        </Card>
    );
};

const styles = StyleSheet.create({
    homeTitle: {
        margin: 5,
        marginLeft: 10,
        fontWeight: 'bold'
    },
    initialLoadingContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
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
    },
    footer: {
        paddingVertical: 20,
        alignItems: 'center',
    }
});

export default HomeScreen;
