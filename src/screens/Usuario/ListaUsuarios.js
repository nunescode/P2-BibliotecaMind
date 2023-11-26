import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import {
  Avatar,
  Button,
  Card,
  Dialog,
  FAB,
  MD3Colors,
  Portal,
  Text,
} from "react-native-paper";
import Toast from "react-native-toast-message";

export default function ListaUsuarios({ navigation, route }) {
  const [usuarios, setUsuarios] = useState([]);
  const [showModalExcluirUsuario, setShowModalExcluirUsuario] = useState(false);
  const [usuarioASerExcluido, setUsuarioASerExcluido] = useState(null);

  useEffect(() => {
    loadUsuarios();
  }, []);

  async function loadUsuarios() {
    const response = await AsyncStorage.getItem("usuarios");
    console.log(
      "🚀 ~ file: ListaUsuariosAsyncStorage.js:21 ~ loadUsuarios ~ response:",
      response
    );
    const usuariosStorage = response ? JSON.parse(response) : [];
    setUsuarios(usuariosStorage);
  }

  const showModal = () => setShowModalExcluirUsuario(true);

  const hideModal = () => setShowModalExcluirUsuario(false);

  async function adicionarUsuario(usuario) {
    let novaListaUsuarios = usuarios;
    novaListaUsuarios.push(usuario);
    await AsyncStorage.setItem("usuarios", JSON.stringify(novaListaUsuarios));
    setUsuarios(novaListaUsuarios);
  }

  async function editarUsuario(usuarioAntigo, novosDados) {
    console.log("USUARIO ANTIGO -> ", usuarioAntigo);
    console.log("DADOS NOVOS -> ", novosDados);

    const novaListaUsuarios = usuarios.map((usuario) => {
      if (usuario == usuarioAntigo) {
        return novosDados;
      } else {
        return usuario;
      }
    });

    await AsyncStorage.setItem("usuarios", JSON.stringify(novaListaUsuarios));
    setUsuarios(novaListaUsuarios);
  }

  async function excluirUsuario(usuario) {
    const novaListaUsuarios = usuarios.filter((p) => p !== usuario);
    await AsyncStorage.setItem("usuarios", JSON.stringify(novaListaUsuarios));
    setUsuarios(novaListaUsuarios);
    Toast.show({
      type: "success",
      text1: "Usuario excluido com sucesso!",
    });
  }

  function handleExluirUsuario() {
    excluirUsuario(usuarioASerExcluido);
    setUsuarioASerExcluido(null);
    hideModal();
  }

  return (
    <View style={styles.container}>
      <Text variant="titleLarge" style={styles.title}>
        Usuários
      </Text>

      <FlatList
        style={styles.list}
        data={usuarios}
        renderItem={({ item }) => (
          <Card mode="outlined" style={styles.card}>
            <Card.Content style={styles.cardContent}>
              <View
                style={{
                  flex: 1,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Avatar.Image
                  size={48}
                  source={require("../../../assets/logouser.png")}
                />
                <Text variant="titleMedium">{item?.nome}</Text>
                <View>
                  <Text></Text>
                </View>
                <Text variant="titleMedium">CPF:</Text>
                <Text variant="bodyLarge">{item?.cpf}</Text>
                <View>
                  <Text></Text>
                </View>
                <Text variant="titleMedium">Telefone:</Text>
                <Text variant="bodyLarge">{item?.telefone}</Text>
                <View>
                  <Text></Text>
                </View>
                <Text variant="titleMedium">CEP:</Text>
                <Text variant="bodyLarge">{item?.cep}</Text>
                <View>
                  <Text></Text>
                </View>
                <Text variant="titleMedium">Empréstimo:</Text>
                <Text variant="bodyLarge">{item?.emprestimo}</Text>
                <View>
                  <Text></Text>
                </View>
                <Text variant="titleMedium">Data de Nascimento:</Text>
                <Text variant="bodyLarge">{item?.data}</Text>
                <View>
                  <Text></Text>
                </View>
              </View>
            </Card.Content>
            <View style={{ alignItems: "center" }}>
              <Card.Actions>
                <Button
                  style={{ backgroundColor: "gray" }}
                  labelStyle={{ color: "white" }}
                  onPress={() =>
                    navigation.push("FormUsuario", {
                      acao: editarUsuario,
                      usuario: item,
                    })
                  }
                >
                  Editar
                </Button>
                <Button
                  style={{ backgroundColor: "red" }}
                  labelStyle={{ color: "white" }}
                  onPress={() => {
                    setUsuarioASerExcluido(item);
                    showModal();
                  }}
                >
                  Excluir
                </Button>
              </Card.Actions>
            </View>
          </Card>
        )}
      />

      <FAB
        icon="plus"
        style={styles.fab}
        onPress={() =>
          navigation.push("FormUsuario", { acao: adicionarUsuario })
        }
      />

      <Portal>
        <Dialog visible={showModalExcluirUsuario} onDismiss={hideModal}>
          <Dialog.Title
            style={{ textAlign: "center", justifyContent: "center" }}
          >
            Atenção!
          </Dialog.Title>

          <Dialog.Content>
            <Text
              variant="bodyMedium"
              style={{ textAlign: "center", justifyContent: "center" }}
            >
              Tem certeza que deseja excluir este usuário?
            </Text>
          </Dialog.Content>

          <Dialog.Actions>
            <Button onPress={hideModal}>VOLTAR</Button>
            <Button onPress={handleExluirUsuario}>SIM</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5E6CA",
  },
  title: {
    fontWeight: "bold",
    margin: 10,
  },
  fab: {
    position: "absolute",
    margin: 16,
    right: 0,
    bottom: 0,
  },
  list: {
    width: "90%",
  },
  card: {
    marginTop: 15,
  },
  cardContent: {
    flexDirection: "row",
    backgroundColor: "rgba(102, 51, 0, 0.3)",
    borderWidth: 2,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    paddingBottom: 15,
    alignContent: "center",
    justifyContent: "center",
  },
});
