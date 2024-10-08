import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import HomeScreen from '../components/HomeScreen';
import { Pokemon } from '../entities/Pokemon';
import PokemonDetailScreen from '../components/PokemonDetailScreen';

const theme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        background: 'white',
    },
};

// Define los tipos de las rutas y parámetros
export type RootStackParamList = {
    Home: undefined;
    PokemonDetail: Pokemon
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigator = () => {

    return (
        <NavigationContainer theme={theme}>
            <Stack.Navigator
                initialRouteName="Home"
                screenOptions={{
                    headerShown: false,
                    headerTitle: "",
                    animation: "slide_from_right",
                }}
            >
                <Stack.Screen name="Home" component={HomeScreen} />
                <Stack.Screen name="PokemonDetail" component={PokemonDetailScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default AppNavigator;
