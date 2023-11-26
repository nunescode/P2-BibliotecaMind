import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import {
  Avatar,
  Button,
  Card,
  Dialog,
  FAB,
  Portal,
  Text,
} from "react-native-paper";
import Toast from "react-native-toast-message";

export default function ListaLivros({ navigation, route }) {
  const [livros, setLivros] = useState([]);
  const [showModalExcluirLivro, setShowModalExcluirLivro] = useState(false);
  const [livroASerExcluido, setLivroASerExcluido] = useState(null);

  useEffect(() => {
    loadLivros();
  }, []);

  async function loadLivros() {
    const response = await AsyncStorage.getItem("livros");
    console.log(
      "🚀 ~ file: ListaLivrosAsyncStorage.js:21 ~ loadLivros ~ response:",
      response
    );
    const livrosStorage = response ? JSON.parse(response) : [];
    setLivros(livrosStorage);
  }

  const showModal = () => setShowModalExcluirLivro(true);

  const hideModal = () => setShowModalExcluirLivro(false);

  async function adicionarLivro(livro) {
    let novaListaLivros = livros;
    novaListaLivros.push(livro);
    await AsyncStorage.setItem("livros", JSON.stringify(novaListaLivros));
    setLivros(novaListaLivros);
  }

  async function editarLivro(livroAntigo, novosDados) {
    console.log("LIVRO ANTIGO -> ", livroAntigo);
    console.log("DADOS NOVOS -> ", novosDados);

    const novaListaLivros = livros.map((livro) => {
      if (livro == livroAntigo) {
        return novosDados;
      } else {
        return livro;
      }
    });

    await AsyncStorage.setItem("livros", JSON.stringify(novaListaLivros));
    setLivros(novaListaLivros);
  }

  async function excluirLivro(livro) {
    const novaListaLivros = livros.filter((p) => p !== livro);
    await AsyncStorage.setItem("livros", JSON.stringify(novaListaLivros));
    setLivros(novaListaLivros);
    Toast.show({
      type: "success",
      text1: "Livro excluído!",
    });
  }

  function handleExluirLivro() {
    excluirLivro(livroASerExcluido);
    setLivroASerExcluido(null);
    hideModal();
  }

  return (
    <View style={styles.container}>
      <Text variant="titleLarge" style={styles.title}>
        Livros
      </Text>

      <FlatList
        style={styles.list}
        data={livros}
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
                  source={require("../../../assets/logolivro.png")}
                />

                <Text variant="titleMedium">Título:</Text>
                <Text variant="bodyLarge">{item?.titulo}</Text>
                <View>
                  <Text></Text>
                </View>
                <Text variant="titleMedium">Autor:</Text>
                <Text variant="bodyLarge">{item?.autor}</Text>
                <View>
                  <Text></Text>
                </View>
                <Text variant="titleMedium">Gênero:</Text>
                <Text variant="bodyLarge">{item?.genero}</Text>
                <View>
                  <Text></Text>
                </View>
                <Text variant="titleMedium">Ano:</Text>
                <Text variant="bodyLarge">{item?.ano}</Text>
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
                    navigation.push("FormLivro", {
                      acao: editarLivro,
                      livro: item,
                    })
                  }
                >
                  Editar
                </Button>
                <Button
                  style={{ backgroundColor: "red" }}
                  labelStyle={{ color: "white" }}
                  onPress={() => {
                    setLivroASerExcluido(item);
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
        onPress={() => navigation.push("FormLivro", { acao: adicionarLivro })}
      />

      <Portal>
        <Dialog visible={showModalExcluirLivro} onDismiss={hideModal}>
          <Dialog.Title
            style={{ textAlign: "center", justifyContent: "center" }}
          >
            Atenção!
          </Dialog.Title>

          <Dialog.Content>
            <Text
              variant="bodyMedium"
            >
              Tem certeza que deseja excluir este livro?
            </Text>
          </Dialog.Content>

          <Dialog.Actions>
            <Button onPress={hideModal}>VOLTAR</Button>
            <Button onPress={handleExluirLivro}>SIM</Button>
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
