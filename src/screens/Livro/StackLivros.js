import { createStackNavigator } from "@react-navigation/stack";
import FormLivro from "./FormLivro";
import ListaLivros from "./ListaLivros";

const Stack = createStackNavigator();

export default function StackLivros() {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="ListaLivros"
    >
      <Stack.Screen name="ListaLivros" component={ListaLivros} />
      <Stack.Screen name="FormLivro" component={FormLivro} />
    </Stack.Navigator>
  );
}
