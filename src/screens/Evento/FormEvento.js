import { Formik } from "formik";
import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { Button, Text, TextInput } from "react-native-paper";
import Toast from "react-native-toast-message";
import { TextInputMask } from "react-native-masked-text";
import * as Yup from "yup";

export default function FormEvento({ navigation, route }) {
  const { acao, evento: eventoAntigo } = route.params;

  const [titulo, setTitulo] = useState();
  const [descricao, setDescricao] = useState("");
  const [data, setData] = useState("");
  const [horario, setHorario] = useState("");

  const validationSchema = Yup.object().shape({
    titulo: Yup.string().required("Campo obrigatório!"),
    descricao: Yup.string()
      .required("Campo obrigatório!"),
    data: Yup.string().required("Campo obrigatório!"),
    horario: Yup.string().required("Campo obrigatório!"),
  });

  useEffect(() => {
    console.log("evento -> ", eventoAntigo);

    if (eventoAntigo) {
      setTitulo(eventoAntigo.titulo);
      setDescricao(eventoAntigo.descricao);
      setData(eventoAntigo.data);
      setHorario(eventoAntigo.horario);
    }
  }, []);

  function salvar(novoEvento) {
    console.log("SALVAR DADOS NOVO EVENTO -> ", novoEvento);

    if (eventoAntigo) {
      acao(eventoAntigo, novoEvento);
    } else {
      acao(novoEvento);
    }

    Toast.show({
      type: "success",
      text1: "Evento salvo!",
    });
    navigation.goBack();
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
                label="Data"
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

              <TextInput
                style={styles.input}
                mode="outlined"
                label="Horário"
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
                style={[styles.button, { backgroundColor: '#808080' }]}
                mode="contained"
                onPress={() => navigation.goBack()}
              >
                Voltar
              </Button>

              <Button
                style={[styles.button, { backgroundColor: '#008000' }]}
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
});
