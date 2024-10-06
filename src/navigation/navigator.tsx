import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import HomeScreen from '../components/HomeScreen';
import UsersScreen from '../components/UsersScreen';

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
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigator = () => {

    return (
        <NavigationContainer theme={theme}>
            <Stack.Navigator
                initialRouteName="Home"
                screenOptions={{
                    headerShown: true,
                    headerTitle: "",
                    animation: "slide_from_right",
                }}
            >
                <Stack.Screen name="Home" component={HomeScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default AppNavigator;
