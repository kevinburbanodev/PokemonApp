import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/navigator";
import { StyleSheet, View, ActivityIndicator, Image } from "react-native";
import { usePokemonViewModel } from "../presenters/PokemonViewModel";
import { PokemonRepositoryImpl } from "../data/PokemonRepositoryImpl";
import { PokemonManager } from "../data/PokemonManager";
import { useEffect, useState } from "react";
import { Pokemon } from "../entities/Pokemon";
import { Searchbar, Card, Text } from "react-native-paper";
import Animated from "react-native-reanimated";
import { getPokemonTypeColor } from "../utils/PokemonUtils";

type SearchScreenProps = NativeStackScreenProps<RootStackParamList, 'Search'>;

function useDebounce(value: string, delay: number) {
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);

        return () => {
            clearTimeout(handler);
        };
    }, [value, delay]);

    return debouncedValue;
}

const SearchScreen: React.FC<SearchScreenProps> = ({ navigation }) => {
    const { getPokemon } = usePokemonViewModel(new PokemonRepositoryImpl(PokemonManager));
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResult, setSearchResult] = useState<Pokemon | null>(null);
    const [searchLoading, setSearchLoading] = useState(false);
    const [showNoResults, setShowNoResults] = useState(false);

    // Utiliza el debounce en el searchQuery
    const debouncedSearchQuery = useDebounce(searchQuery, 500); // Espera 500ms

    useEffect(() => {
        const handleSearch = async () => {
            const trimmedQuery = debouncedSearchQuery.trim();

            if (trimmedQuery === '') {
                setSearchResult(null); // Limpia el resultado si la búsqueda está vacía
                setShowNoResults(false); // Oculta el mensaje cuando se limpia la barra de búsqueda
                return;
            }

            setSearchLoading(true);
            try {
                const searchedPokemon = await getPokemon(trimmedQuery);
                if (searchedPokemon) {
                    setSearchResult(searchedPokemon);
                    setShowNoResults(false);
                } else {
                    setShowNoResults(true);
                    setSearchResult(null);
                }
            } catch (error) {
                setSearchResult(null);
                setShowNoResults(true);
            } finally {
                setSearchLoading(false);
            }
        };

        handleSearch();
    }, [debouncedSearchQuery]);

    return (
        <View style={styles.container}>
            <Searchbar
                placeholder="Search Pokémon"
                value={searchQuery}
                onChangeText={(text) => {
                    setSearchQuery(text);
                    setShowNoResults(false); // Oculta el mensaje "No hay resultados" al cambiar la búsqueda
                }}
                style={styles.searchBar}
            />
            <View style={styles.resultContainer}>
                {searchLoading ? (
                    <ActivityIndicator size="large" color="#0000ff" />
                ) : searchResult ? (
                    <Card onPress={() => navigation.navigate('PokemonDetail', { pokemon: searchResult, sharedTransitionTag: `search-${searchResult.id}` })} style={[styles.pokemonCard, { backgroundColor: getPokemonTypeColor(searchResult.types[0]) }]}>
                        <View style={styles.rowCardContent}>
                            <View style={styles.cardDescriptionContent}>
                                <Text style={styles.pokemonText}>{searchResult.name}</Text>
                                <View>
                                    {searchResult.types.map((type, index) => (
                                        <View key={index} style={styles.typeBadge}>
                                            <Text style={styles.typeText}>{type}</Text>
                                        </View>
                                    ))}
                                </View>
                            </View>
                            <View style={styles.cardImageContent}>
                                {searchResult.officialArtwork.frontDefault != null ? (
                                    <Animated.Image
                                        source={{ uri: searchResult.officialArtwork.frontDefault }}
                                        defaultSource={require('../assets/jar-loading.gif')}
                                        style={styles.pokemonImage}
                                        resizeMode='cover'
                                        sharedTransitionTag={`search-${searchResult.id}`}
                                    />
                                ) : (
                                    <Image
                                        source={require('../assets/no-image.png')}
                                        style={styles.pokemonImage}
                                        resizeMode='cover'
                                    />
                                )}
                            </View>
                        </View>
                    </Card>
                ) : showNoResults ? (
                    <Text variant="titleLarge" style={styles.noResultsText}>No hay resultados</Text>
                ) : null}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginVertical: 10,
        marginHorizontal: 4,
    },
    searchBar: {
        marginTop: 10,
        marginBottom: 10,
        marginHorizontal: 10
    },
    resultContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingHorizontal: 10,
        marginTop: 10,
    },
    pokemonCard: {
        width: '80%',
        margin: 10,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    rowCardContent: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 8,
    },
    cardDescriptionContent: {
        alignItems: 'center',
    },
    cardImageContent: {
        justifyContent: 'flex-end',
    },
    pokemonText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'white',
        textTransform: 'capitalize',
    },
    typeBadge: {
        backgroundColor: '#ffffff80',
        borderRadius: 20,
        paddingVertical: 3,
        paddingHorizontal: 10,
        marginHorizontal: 5,
        marginTop: 5,
    },
    typeText: {
        fontSize: 12,
        color: 'white',
        fontWeight: 'bold',
        textTransform: 'capitalize',
    },
    pokemonImage: {
        width: 90,
        height: 90,
    },

    noResultsText: {
        color: 'black',
    }
});

export default SearchScreen;