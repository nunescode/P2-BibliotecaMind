import { createStackNavigator } from "@react-navigation/stack";
import FormEvento from "./FormEvento";
import ListaEventos from "./ListaEventos";

const Stack = createStackNavigator();

export default function StackEventos() {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="ListaEventos"
    >
      <Stack.Screen name="ListaEventos" component={ListaEventos} />
      <Stack.Screen name="FormEvento" component={FormEvento} />
    </Stack.Navigator>
  );
}
