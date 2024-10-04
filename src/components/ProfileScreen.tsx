import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { View } from "react-native";
import { RootStackParamList } from "../navigation/navigator"; // Asegúrate de que la ruta sea correcta
import { Button, Text } from "react-native-paper";

type ProfileScreenProps = NativeStackScreenProps<RootStackParamList, "Profile">;

const ProfileScreen: React.FC<ProfileScreenProps> = ({ navigation, route }) => {
    return (
        <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
            <Text style={{ color: "black", paddingBottom: 10 }}>This is {route.params.name}'s profile</Text>
            <Button
                mode="contained"
                onPress={() => navigation.goBack()}
            >
                Go back
            </Button>
        </View>
    );
};

export default ProfileScreen;
