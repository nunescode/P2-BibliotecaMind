import { createStackNavigator } from "@react-navigation/stack";
import FormUsuario from "./FormUsuario";
import ListaUsuarios from "./ListaUsuarios";

const Stack = createStackNavigator();

export default function StackUsuarios() {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="ListaUsuarios"
    >
      <Stack.Screen name="ListaUsuarios" component={ListaUsuarios} />
      <Stack.Screen name="FormUsuario" component={FormUsuario} />
    </Stack.Navigator>
  );
}
