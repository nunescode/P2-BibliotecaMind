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

export default function ListaEmprestimos({ navigation, route }) {
  const [emprestimos, setEmprestimos] = useState([]);
  const [showModalExcluirEmprestimo, setShowModalExcluirEmprestimo] = useState(false);
  const [emprestimoASerExcluido, setEmprestimoASerExcluido] = useState(null);

  useEffect(() => {
    loadEmprestimos();
  }, []);

  async function loadEmprestimos() {
    const response = await AsyncStorage.getItem("emprestimos");
    console.log(
      "🚀 ~ file: ListaEmprestimosAsyncStorage.js:21 ~ loadEmprestimos ~ response:",
      response
    );
    const emprestimosStorage = response ? JSON.parse(response) : [];
    setEmprestimos(emprestimosStorage);
  }

  const showModal = () => setShowModalExcluirEmprestimo(true);

  const hideModal = () => setShowModalExcluirEmprestimo(false);

  async function adicionarEmprestimo(emprestimo) {
    let novaListaEmprestimos = emprestimos;
    novaListaEmprestimos.push(emprestimo);
    await AsyncStorage.setItem("emprestimos", JSON.stringify(novaListaEmprestimos));
    setEmprestimos(novaListaEmprestimos);
  }

  async function editarEmprestimo(emprestimoAntigo, novosDados) {
    console.log("EMPRESTIMO ANTIGO -> ", emprestimoAntigo);
    console.log("DADOS NOVOS -> ", novosDados);

    const novaListaEmprestimos = emprestimos.map((emprestimo) => {
      if (emprestimo == emprestimoAntigo) {
        return novosDados;
      } else {
        return emprestimo;
      }
    });

    await AsyncStorage.setItem("emprestimos", JSON.stringify(novaListaEmprestimos));
    setEmprestimos(novaListaEmprestimos);
  }

  async function excluirEmprestimo(emprestimo) {
    const novaListaEmprestimos = emprestimos.filter((p) => p !== emprestimo);
    await AsyncStorage.setItem("emprestimos", JSON.stringify(novaListaEmprestimos));
    setEmprestimos(novaListaEmprestimos);
    Toast.show({
      type: "success",
      text1: "Empréstimo excluído!",
    });
  }

  function handleExluirEmprestimo() {
    excluirEmprestimo(emprestimoASerExcluido);
    setEmprestimoASerExcluido(null);
    hideModal();
  }

  return (
    <View style={styles.container}>
      <Text variant="titleLarge" style={styles.title}>
        Empréstimos
      </Text>

      <FlatList
        style={styles.list}
        data={emprestimos}
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
                  source={require("../../../assets/logoemprestimo.png")}
                />

                <Text variant="titleMedium">Usuário:</Text>
                <Text variant="bodyLarge">{item?.usuario}</Text>
                <View>
                  <Text></Text>
                </View>
                <Text variant="titleMedium">Livro:</Text>
                <Text variant="bodyLarge">{item?.livro}</Text>
                <View>
                  <Text></Text>
                </View>
                <Text variant="titleMedium">Data de Devolução:</Text>
                <Text variant="bodyLarge">{item?.data}</Text>
                <View>
                  <Text></Text>
                </View>
                <Text variant="titleMedium">Observações:</Text>
                <Text variant="bodyLarge">{item?.observacoes}</Text>
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
                    navigation.push("FormEmprestimo", {
                      acao: editarEmprestimo,
                      emprestimo: item,
                    })
                  }
                >
                  Editar
                </Button>
                <Button
                  style={{ backgroundColor: "red" }}
                  labelStyle={{ color: "white" }}
                  onPress={() => {
                    setEmprestimoASerExcluido(item);
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
        onPress={() => navigation.push("FormEmprestimo", { acao: adicionarEmprestimo })}
      />

      <Portal>
        <Dialog visible={showModalExcluirEmprestimo} onDismiss={hideModal}>
          <Dialog.Title
            style={{ textAlign: "center", justifyContent: "center" }}
          >
            Atenção!
          </Dialog.Title>

          <Dialog.Content>
            <Text
              variant="bodyMedium"
            >
              Tem certeza que deseja excluir este emprestimo?
            </Text>
          </Dialog.Content>

          <Dialog.Actions>
            <Button onPress={hideModal}>VOLTAR</Button>
            <Button onPress={handleExluirEmprestimo}>SIM</Button>
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
