import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/navigator";
import { View, StyleSheet, Dimensions } from 'react-native';
import Animated from 'react-native-reanimated';
import { getPokemonTypeColor } from "../utils/PokemonUtils";
import { ActivityIndicator, Avatar, IconButton, Text } from "react-native-paper";
import { PokemonRepositoryImpl } from '../data/PokemonRepositoryImpl';
import { PokemonManager } from "../data/PokemonManager";
import { usePokemonViewModel } from "../presenters/PokemonViewModel";
import { useEffect, useState } from "react";

type PokemonDetailScreenProps = NativeStackScreenProps<RootStackParamList, 'PokemonDetail'>;

const PokemonDetailScreen: React.FC<PokemonDetailScreenProps> = ({ navigation, route }) => {
    const pokemon = route.params.pokemon;
    const sharedTransitionTag = route.params.sharedTransitionTag;
    const backgroundColor = getPokemonTypeColor(pokemon.types[0]);
    const [loading, setLoading] = useState(true);
    const { weaknesses, evolutions, getWeaknesses, getEvolutions } = usePokemonViewModel(new PokemonRepositoryImpl(PokemonManager));

    useEffect(() => {
        const fetchData = async () => {
            try {
                await getWeaknesses(pokemon.weaknessUrl);
                await getEvolutions(pokemon.evolutionsUrl);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    return (
        <View style={styles.container}>
            <View style={[styles.pokemonImageContainer, { backgroundColor }]}>
                <View style={styles.backButtonContainer}>
                    <IconButton
                        icon="chevron-left"
                        size={30}
                        onPress={() => navigation.goBack()}
                        iconColor="#fff"
                        mode="contained"
                        containerColor="#383838"
                    />
                </View>
                <View style={styles.imageContainer}>
                    <Animated.Image
                        source={{ uri: pokemon.officialArtwork.frontDefault }}
                        defaultSource={require('../assets/jar-loading.gif')}
                        style={styles.pokemonImage}
                        resizeMode='cover'
                        sharedTransitionTag={sharedTransitionTag ?? `${pokemon.id}`}
                    />
                </View>
            </View>
            <View style={styles.pokemonDataContainer}>
                <View style={styles.pokemonTitleContainer}>
                    <Text style={styles.pokemonNameText}>
                        {pokemon.name}
                    </Text>
                    <View style={{ flexDirection: 'row' }}>
                        {pokemon.types.map((type, index) => (
                            <View key={index} style={[styles.typeBadge, { backgroundColor: getPokemonTypeColor(type) }]}>
                                <Text style={styles.typeText}>{type}</Text>
                            </View>
                        ))}
                    </View>
                </View>
                <View style={styles.pokemonDescriptionContainer}>
                    <Text style={styles.pokemonDescriptionText}>
                        {pokemon.description.replace(/\n/g, ' ')}
                    </Text>
                </View>
            </View>
            <View style={styles.pokemonExtraDataContainer}>
                {
                    loading ? (
                        <View style={styles.loadingContainer}>
                            <ActivityIndicator size="large" color="#0000ff" />
                        </View>
                    ) : (
                        <View style={styles.pokemonExtraData}>
                            <View style={styles.weaknessesContainer}>
                                <View style={styles.weaknessesTitleContainer}>
                                    <Text style={styles.weaknessesTitle}>
                                        Weaknesses
                                    </Text>
                                </View>
                                <View style={styles.weaknessesTypesContainer}>
                                    {weaknesses.map((weakness, index) => (
                                        <View key={index} style={[styles.typeBadge, { backgroundColor: getPokemonTypeColor(weakness) }]}>
                                            <Text style={styles.typeText}>{weakness}</Text>
                                        </View>
                                    ))}
                                </View>
                            </View>
                            <View style={styles.evolutionsContainer}>
                                <View>
                                    <Text style={styles.evolutionsTitle}>
                                        Evolutions
                                    </Text>
                                </View>
                                <View style={styles.evolutionsAvatarsContainer}>
                                    {evolutions.map((evolution, index) => (
                                        <View key={index} style={styles.evolutionSequence}>
                                            <View style={styles.avatarWrapper}>
                                                <Avatar.Image
                                                    size={80}
                                                    source={{ uri: `${evolution.officialArtwork.frontDefault}` }}
                                                    style={styles.evolutionAvatar}
                                                />
                                            </View>
                                            {/* Renderizar la flecha solo si no es el último elemento */}
                                            {index < evolutions.length - 1 && (
                                                <Text style={styles.arrowText}>➔</Text>
                                            )}
                                        </View>
                                    ))}
                                </View>
                            </View>
                        </View>
                    )
                }
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    pokemonImageContainer: {
        flex: 2,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
        padding: 20,
    },
    backButtonContainer: {
        flex: 1,
        marginLeft: 5,
    },
    imageContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    pokemonImage: {
        width: 260,
        height: 260,
    },
    pokemonDataContainer: {
        flex: 1,
    },
    pokemonTitleContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingTop: 20,
        paddingBottom: 10,
        paddingHorizontal: 10
    },
    pokemonNameText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'black',
        textTransform: 'capitalize'
    },
    typeBadge: {
        borderRadius: 20,
        paddingVertical: 3,
        paddingHorizontal: 10,
        marginHorizontal: 5,
        marginTop: 5,
    },
    typeText: {
        fontSize: 15,
        fontWeight: 'bold',
        textTransform: 'capitalize',
        color: '#fff',
    },
    pokemonDescriptionContainer: {
        marginHorizontal: 10
    },

    pokemonDescriptionText: {
        textAlign: 'justify',
        fontSize: 20,
    },

    pokemonExtraDataContainer: {
        flex: 2
    },

    pokemonExtraData: {
        margin: 10
    },

    loadingContainer: {
        alignItems: 'center'
    },

    weaknessesContainer: {
        marginVertical: 5
    },

    weaknessesTitleContainer: {
        marginBottom: 5
    },

    weaknessesTitle: {
        fontSize: 18,
        color: 'black',
        textTransform: 'capitalize'
    },

    weaknessesTypesContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
    },

    evolutionsContainer: {
        marginVertical: 20
    },

    evolutionsTitle: {
        fontSize: 18,
        color: 'black',
        textTransform: 'capitalize'
    },

    evolutionsAvatarsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        marginVertical: 15,
    },

    avatarWrapper: {
        width: 100,
        height: 100,
        backgroundColor: 'white',
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'gray',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },

    evolutionAvatar: {
        backgroundColor: 'transparent'
    },

    evolutionSequence: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',

    },
    arrowText: {
        fontSize: 24,
        color: 'black',
        marginHorizontal: 5,
    },
});

export default PokemonDetailScreen;
