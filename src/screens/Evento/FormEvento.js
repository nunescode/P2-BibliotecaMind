import { Formik } from "formik";
import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { TextInputMask } from "react-native-masked-text";
import { Button, Text, TextInput } from "react-native-paper";
import Toast from "react-native-toast-message";
import * as Yup from "yup";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function FormEvento({ navigation, route }) {
  const { acao, evento: eventoAntigo } = route.params;

  const [titulo, setTitulo] = useState();
  const [descricao, setDescricao] = useState("");
  const [data, setData] = useState("");
  const [local, setLocal] = useState("");
  const [horario, setHorario] = useState("");
  const [selectedLocation, setSelectedLocation] = useState({
    latitude: -15.782222,
    longitude: -47.920556,
  });

  const [mapRef, setMapRef] = useState(null);

  const validationSchema = Yup.object().shape({
    titulo: Yup.string().required("Campo obrigatório!"),
    descricao: Yup.string().required("Campo obrigatório!"),
    data: Yup.string().required("Campo obrigatório!"),
    local: Yup.string(),
    horario: Yup.string().required("Campo obrigatório!"),
  });

  useEffect(() => {
    console.log("evento -> ", eventoAntigo);

    if (eventoAntigo) {
      setTitulo(eventoAntigo.titulo);
      setDescricao(eventoAntigo.descricao);
      setData(eventoAntigo.data);
      setLocal(eventoAntigo.local);
      setHorario(eventoAntigo.horario);
    } else {
      setSelectedLocation({
        latitude: -15.782222,
        longitude: -47.920556,
      });
    }
  }, []);

  async function salvar(novoEvento) {
    console.log("SALVAR DADOS NOVO EVENTO -> ", novoEvento);
  
    if (eventoAntigo) {
      acao(eventoAntigo, {
        ...novoEvento,
        local: novoEvento.local, 
      });
    } else {
      acao({
        ...novoEvento,
        local: novoEvento.local,
      });
    }
  
    // Salvar o endereço no AsyncStorage
    try {
      await AsyncStorage.setItem("enderecoSalvo", novoEvento.local); 
      Toast.show({
        type: "success",
        text1: "Evento salvo!",
      });
      navigation.goBack();
    } catch (error) {
      console.error("Erro ao salvar o endereço:", error);
    }
  }

  async function getAddressFromCoords(latitude, longitude) {
    try {
      const nominatimEndpoint = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=18&addressdetails=1`;
  
      const response = await axios.get(nominatimEndpoint);
  
      if (response.data && response.data.display_name) {
        const address = response.data.display_name;
        console.log("Endereço:", address);
        setLocal(address); 
      } else {
        console.log("Nenhum endereço encontrado para estas coordenadas.");
      }
    } catch (error) {
      console.error("Erro ao obter o endereço:", error);
    }
  }

  return (
    <View style={styles.container}>
      <Text variant="titleLarge" style={styles.title}>
        {eventoAntigo ? "Editar Evento" : "Adicionar Evento"}
      </Text>

      <Formik
        initialValues={{
          titulo: "",
          descricao: "",
          data: "",
          local: "",
          horario: "",
        }}
        validationSchema={validationSchema}
        onSubmit={(values) => salvar(values)}
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          touched,
          errors,
          values,
        }) => (
          <>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                mode="outlined"
                label="Título"
                value={values.titulo}
                onChangeText={handleChange("titulo")}
                onBlur={handleBlur("titulo")}
              />
              {touched.titulo && errors.titulo && (
                <Text style={{ color: "red", textAlign: "center" }}>
                  {errors.titulo}
                </Text>
              )}

              <TextInput
                style={styles.input}
                mode="outlined"
                label="Descrição"
                value={values.descricao}
                onChangeText={handleChange("descricao")}
                onBlur={handleBlur("descricao")}
                error={touched.descricao && errors.descricao ? true : false}
              />
              {touched.descricao && errors.descricao && (
                <Text style={{ color: "red", textAlign: "center" }}>
                  {errors.descricao}
                </Text>
              )}

              <TextInput
                style={styles.input}
                mode="outlined"
                label="Data do Evento"
                keyboardType="numeric"
                value={values.data}
                onChangeText={handleChange("data")}
                onBlur={handleBlur("data")}
                render={(props) => (
                  <TextInputMask
                    {...props}
                    type={"custom"}
                    options={{
                      mask: "99/99/9999",
                    }}
                  />
                )}
              />
              {touched.data && errors.data && (
                <Text style={{ color: "red", textAlign: "center" }}>
                  {errors.data}
                </Text>
              )}

              <View>
                <MapView
                  style={{ width: "100%", height: 200 }}
                  initialRegion={{
                    latitude: selectedLocation.latitude,
                    longitude: selectedLocation.longitude,
                    latitudeDelta: 0.01,
                    longitudeDelta: 0.01,
                  }}
                  onPress={(e) => {
                    setSelectedLocation({
                      latitude: e.nativeEvent.coordinate.latitude,
                      longitude: e.nativeEvent.coordinate.longitude,
                    });
                    getAddressFromCoords(
                      e.nativeEvent.coordinate.latitude,
                      e.nativeEvent.coordinate.longitude
                    ); 
                  }}
                  ref={setMapRef}
                >
                  <Marker
                    coordinate={{
                      latitude: selectedLocation.latitude,
                      longitude: selectedLocation.longitude,
                    }}
                  />
                </MapView>

                <Button
                  style={styles.buttonLoc}
                  mode="contained"
                  title="Salvar Localização"
                  onPress={() => {
                    getAddressFromCoords(
                      selectedLocation.latitude,
                      selectedLocation.longitude
                    );
                  }}
                />
              </View>

              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.input}
                  mode="outlined"
                  label="Local"
                  value={local} 
                  onChangeText={handleChange("local")}
                />
              </View>

              <TextInput
                style={styles.input}
                mode="outlined"
                label="Horário"
                placeholder="00:00"
                keyboardType="numeric"
                value={values.horario}
                onChangeText={handleChange("horario")}
                onBlur={handleBlur("horario")}
                render={(props) => (
                  <TextInputMask
                    {...props}
                    type={"custom"}
                    options={{
                      mask: "99:99",
                    }}
                  />
                )}
              />
              {touched.horario && errors.horario && (
                <Text style={{ color: "red", textAlign: "center" }}>
                  {errors.horario}
                </Text>
              )}

              <View>
                <Text></Text>
              </View>
            </View>

            <View style={styles.buttonContainer}>
              <Button
                style={styles.button}
                mode="contained-tonal"
                onPress={() => navigation.goBack()}
              >
                Voltar
              </Button>

              <Button
                style={styles.button}
                mode="contained"
                onPress={handleSubmit}
              >
                Salvar
              </Button>
            </View>
          </>
        )}
      </Formik>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#F5E6CA",
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    fontWeight: "bold",
  },
  inputContainer: {
    width: "100%",
    marginBottom: 20,
  },
  input: {
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
  },
  button: {
    width: "40%",
    alignSelf: "center",
  },
  buttonLoc: {
    width: "40%",
    alignSelf: "center",
    backgroundColor: "#008000",
  },
});