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

export default function ListaAvaliacoes({ navigation, route }) {
  const [avaliacoes, setAvaliacoes] = useState([]);
  const [showModalExcluirAvaliacao, setShowModalExcluirAvaliacao] = useState(false);
  const [avaliacaoASerExcluida, setAvaliacaoASerExcluida] = useState(null);

  useEffect(() => {
    loadAvaliacoes();
  }, []);

  async function loadAvaliacoes() {
    const response = await AsyncStorage.getItem("avaliacoes");
    console.log(
      "🚀 ~ file: ListaAvaliacoesAsyncStorage.js:21 ~ loadAvaliacoes ~ response:",
      response
    );
    const avaliacoesStorage = response ? JSON.parse(response) : [];
    setAvaliacoes(avaliacoesStorage);
  }

  const showModal = () => setShowModalExcluirAvaliacao(true);
  const hideModal = () => setShowModalExcluirAvaliacao(false);

  async function adicionarAvaliacao(avaliacao) {
    let novaListaAvaliacoes = avaliacoes;
    novaListaAvaliacoes.push(avaliacao);
    await AsyncStorage.setItem("avaliacoes", JSON.stringify(novaListaAvaliacoes));
    setAvaliacoes(novaListaAvaliacoes);
  }

  async function editarAvaliacao(avaliacaoAntiga, novosDados) {
    console.log("AVALIACAO ANTIGA -> ", avaliacaoAntiga);
    console.log("DADOS NOVOS -> ", novosDados);

    const novaListaAvaliacoes = avaliacoes.map((avaliacao) => {
      if (avaliacao == avaliacaoAntiga) {
        return novosDados;
      } else {
        return avaliacao;
      }
    });

    await AsyncStorage.setItem("avaliacoes", JSON.stringify(novaListaAvaliacoes));
    setAvaliacoes(novaListaAvaliacoes);
  }

  async function excluirAvaliacao(avaliacao) {
    const novaListaAvaliacoes = avaliacoes.filter((p) => p !== avaliacao);
    await AsyncStorage.setItem("avaliacoes", JSON.stringify(novaListaAvaliacoes));
    setAvaliacoes(novaListaAvaliacoes);
    Toast.show({
      type: "success",
      text1: "Empréstimo excluído!",
    });
  }

  function handleExluirAvaliacao() {
    excluirAvaliacao(avaliacaoASerExcluida);
    setAvaliacaoASerExcluida(null);
    hideModal();
  }

  return (
    <View style={styles.container}>
      <Text variant="titleLarge" style={styles.title}>
        Avaliações
      </Text>

      <FlatList
        style={styles.list}
        data={avaliacoes}
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
                  source={require("../../../assets/logoavaliacao.png")}
                />

                <Text variant="titleMedium">Atendimento:</Text>
                <Text variant="bodyLarge">{item?.atendimento}</Text>
                <View>
                  <Text></Text>
                </View>
                <Text variant="titleMedium">Livros:</Text>
                <Text variant="bodyLarge">{item?.livros}</Text>
                <View>
                  <Text></Text>
                </View>
                <Text variant="titleMedium">Comentário:</Text>
                <Text variant="bodyLarge">{item?.comentario}</Text>
                <View>
                  <Text></Text>
                </View>
                <Text variant="titleMedium">Nome:</Text>
                <Text variant="bodyLarge">{item?.nome}</Text>
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
                    navigation.push("FormAvaliacao", {
                      acao: editarAvaliacao,
                      avaliacao: item,
                    })
                  }
                >
                  Editar
                </Button>
                <Button
                  style={{ backgroundColor: "red" }}
                  labelStyle={{ color: "white" }}
                  onPress={() => {
                    setAvaliacaoASerExcluida(item);
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
        onPress={() => navigation.push("FormAvaliacao", { acao: adicionarAvaliacao })}
      />

      <Portal>
        <Dialog visible={showModalExcluirAvaliacao} onDismiss={hideModal}>
          <Dialog.Title
            style={{ textAlign: "center", justifyContent: "center" }}
          >
            Atenção!
          </Dialog.Title>

          <Dialog.Content>
            <Text
              variant="bodyMedium"
            >
              Tem certeza que deseja excluir este avaliacao?
            </Text>
          </Dialog.Content>

          <Dialog.Actions>
            <Button onPress={hideModal}>VOLTAR</Button>
            <Button onPress={handleExluirAvaliacao}>SIM</Button>
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
