import { createDrawerNavigator } from "@react-navigation/drawer";
import React from "react";
import Home from "../screens/Home";
import StackUsuarios from "../screens/Usuario/StackUsuarios";
import StackLivros from "../screens/Livro/StackLivros";
import StackEventos from "../screens/Evento/StackEventos";
import StackEmprestimos from "../screens/Emprestimo/StackEmprestimos";
import StackAvaliacoes from "../screens/Avaliacao/StackAvaliacoes";

const Drawer = createDrawerNavigator();

export default function DrawerRoutes() {
  return (
    <Drawer.Navigator initialRouteName="Usuario">
      <Drawer.Screen name="Início" component={Home} />
      <Drawer.Screen name="Usuários" component={StackUsuarios} />
      <Drawer.Screen name="Livros" component={StackLivros} />
      <Drawer.Screen name="Eventos" component={StackEventos} />
      <Drawer.Screen name="Empréstimos" component={StackEmprestimos} />
      <Drawer.Screen name="Avaliações" component={StackAvaliacoes} />
    </Drawer.Navigator>
  );
}
