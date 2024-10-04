import React from 'react';
import {
    View
} from 'react-native';

import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/navigator';
import { Button } from 'react-native-paper';

type HomeScreenProps = NativeStackScreenProps<RootStackParamList, 'Home'>;

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
    return (
        <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
            <Button mode="contained" onPress={() => navigation.navigate("Users")}>
                Go to Users
            </Button>
        </View>
    );
};

export default HomeScreen;
