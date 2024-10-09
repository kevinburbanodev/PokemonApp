import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/navigator";
import { View, StyleSheet } from 'react-native';
import Animated from 'react-native-reanimated';
import { getPokemonTypeColor } from "../utils/PokemonUtils";
import { IconButton, Text } from "react-native-paper";
import { PokemonRepositoryImpl } from '../data/PokemonRepositoryImpl';
import { PokemonManager } from "../data/PokemonManager";
import { usePokemonViewModel } from "../presenters/PokemonViewModel";
import { useEffect } from "react";

type PokemonDetailScreenProps = NativeStackScreenProps<RootStackParamList, 'PokemonDetail'>;

const PokemonDetailScreen: React.FC<PokemonDetailScreenProps> = ({ navigation, route }) => {
    const pokemon = route.params;
    const backgroundColor = getPokemonTypeColor(pokemon.types[0]);

    const { weaknesses, evolutions, getWeaknesses, getEvolutions } = usePokemonViewModel(new PokemonRepositoryImpl(PokemonManager));

    useEffect(() => {
        getWeaknesses(pokemon.weaknessUrl);
        getEvolutions(pokemon.evolutionsUrl);
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
                        sharedTransitionTag={`${pokemon.id}`}
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
            <View style={styles.pokemonDataContainer}>

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
        flex: 2,
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
    }

});

export default PokemonDetailScreen;
