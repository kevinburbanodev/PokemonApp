import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/navigator";
import { FlatList, View } from "react-native";
import { useEffect } from "react";
import { GetUsersUseCase } from "../use-cases/GetUsersUseCase";
import { UserRepositoryImpl } from "../data/UserRepositoryImpl";
import { useUserViewModel } from "../presenters/UserViewModel";
import { UserManager } from "../data/UserManager";
import { User } from "../entities/User";
import { Button, Text } from "react-native-paper";

type UsersScreenProps = NativeStackScreenProps<RootStackParamList, "Users">;
const UsersScreen: React.FC<UsersScreenProps> = ({ navigation }) => {
    // Inicializar los casos de uso con la implementación del repositorio
    const getUsersUseCase = new GetUsersUseCase(new UserRepositoryImpl(UserManager));

    // Usando el view model
    const { users, loadUsers } = useUserViewModel(getUsersUseCase);

    // Cargar usuarios al montar el componente
    useEffect(() => {
        loadUsers();
    }, []);

    // Renderizamos la lista de usuarios
    const renderItem = ({ item }: { item: User }) => (
        <View style={{ padding: 10 }}>
            <Text style={{ color: "black" }}>{item.name}</Text>
            <Text style={{ color: "black" }}>{item.email}</Text>
        </View>
    );
    return (
        <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }} >
            {/* Renderizar la lista de usuarios */}
            < FlatList
                data={users}
                keyExtractor={(item) => item.id.toString()}
                renderItem={renderItem}
                style={{ flex: 1 }} />

            < View style={{ flex: 1 }}>
                <Button mode="contained" onPress={() => navigation.navigate("Profile", { name: "John Doe" })} >
                    Go to Profile
                </Button>
            </View >
        </View >
    );

}


export default UsersScreen