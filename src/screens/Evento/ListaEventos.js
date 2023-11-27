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

export default function ListaEventos({ navigation, route }) {
  const [eventos, setEventos] = useState([]);
  const [showModalExcluirEvento, setShowModalExcluirEvento] = useState(false);
  const [eventoASerExcluido, setEventoASerExcluido] = useState(null);

  useEffect(() => {
    loadEventos();
  }, []);
  
  async function loadEventos() {
    const response = await AsyncStorage.getItem("eventos");
    console.log(
      "🚀 ~ file: ListaEventosAsyncStorage.js:21 ~ loadEventos ~ response:",
      response
    );
    const eventosStorage = response ? JSON.parse(response) : [];
    
    setEventos(eventosStorage);
  }

  const showModal = () => setShowModalExcluirEvento(true);

  const hideModal = () => setShowModalExcluirEvento(false);

  async function adicionarEvento(evento) {
    let novaListaEventos = eventos;
    novaListaEventos.push(evento);
    await AsyncStorage.setItem("eventos", JSON.stringify(novaListaEventos));
    setEventos(novaListaEventos);
  }

  async function editarEvento(eventoAntigo, novosDados) {
    console.log("EVENTO ANTIGO -> ", eventoAntigo);
    console.log("DADOS NOVOS -> ", novosDados);

    const novaListaEventos = eventos.map((evento) => {
      if (evento == eventoAntigo) {
        return novosDados;
      } else {
        return evento;
      }
    });

    await AsyncStorage.setItem("eventos", JSON.stringify(novaListaEventos));
    setEventos(novaListaEventos);
  }

  async function excluirEvento(evento) {
    const novaListaEventos = eventos.filter((p) => p !== evento);
    await AsyncStorage.setItem("eventos", JSON.stringify(novaListaEventos));
    setEventos(novaListaEventos);
    Toast.show({
      type: "success",
      text1: "Evento excluído!",
    });
  }

  function handleExluirEvento() {
    excluirEvento(eventoASerExcluido);
    setEventoASerExcluido(null);
    hideModal();
  }

  return (
    <View style={styles.container}>
      <Text variant="titleLarge" style={styles.title}>
        Eventos
      </Text>

      <FlatList
        style={styles.list}
        data={eventos}
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
                  source={require("../../../assets/logoevento.png")}
                />

                <Text variant="titleMedium">Título:</Text>
                <Text variant="bodyLarge">{item?.titulo}</Text>
                <View>
                  <Text></Text>
                </View>
                <Text variant="titleMedium">Descrição:</Text>
                <Text variant="bodyLarge">{item?.descricao}</Text>
                <View>
                  <Text></Text>
                </View>
                <Text variant="titleMedium">Data:</Text>
                <Text variant="bodyLarge">{item?.data}</Text>
                <View>
                  <Text></Text>
                </View>
                <Text variant="titleMedium">Local:</Text>
                <Text variant="bodyLarge">{item?.local}</Text>
                <View>
                  <Text></Text>
                </View>
                <Text variant="titleMedium">Horário:</Text>
                <Text variant="bodyLarge">{item?.horario}</Text>
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
                    navigation.push("FormEvento", {
                      acao: editarEvento,
                      evento: item,
                    })
                  }
                >
                  Editar
                </Button>
                <Button
                  style={{ backgroundColor: "red" }}
                  labelStyle={{ color: "white" }}
                  onPress={() => {
                    setEventoASerExcluido(item);
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
        onPress={() => navigation.push("FormEvento", { acao: adicionarEvento })}
      />

      <Portal>
        <Dialog visible={showModalExcluirEvento} onDismiss={hideModal}>
          <Dialog.Title
            style={{ textAlign: "center", justifyContent: "center" }}
          >
            Atenção!
          </Dialog.Title>

          <Dialog.Content>
            <Text
              variant="bodyMedium"
            >
              Tem certeza que deseja excluir este evento?
            </Text>
          </Dialog.Content>

          <Dialog.Actions>
            <Button onPress={hideModal}>VOLTAR</Button>
            <Button onPress={handleExluirEvento}>SIM</Button>
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
