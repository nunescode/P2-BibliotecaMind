import { Formik } from "formik";
import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { TextInputMask } from "react-native-masked-text";
import { Button, Text, TextInput } from "react-native-paper";
import Toast from "react-native-toast-message";
import * as Yup from "yup";

export default function FormEmprestimo({ navigation, route }) {
  const { acao, emprestimo: emprestimoAntigo } = route.params;

  const [usuario, setUsuario] = useState();
  const [livro, setLivro] = useState("");
  const [data, setData] = useState("");
  const [observacoes, setObservacoes] = useState("");

  const validationSchema = Yup.object().shape({
    usuario: Yup.string().required("Campo obrigatório!"),
    livro: Yup.string().required("Campo obrigatório!"),
    data: Yup.string().required("Campo obrigatório!"),
  });

  useEffect(() => {
    console.log("emprestimo -> ", emprestimoAntigo);

    if (emprestimoAntigo) {
      setUsuario(emprestimoAntigo.usuario);
      setLivro(emprestimoAntigo.livro);
      setData(emprestimoAntigo.data);
      setObservacoes(emprestimoAntigo.observacoes);
    }
  }, []);

  function salvar(novoEmprestimo) {
    console.log("SALVAR DADOS NOVO EMPRESTIMO -> ", novoEmprestimo);

    if (emprestimoAntigo) {
      acao(emprestimoAntigo, novoEmprestimo);
    } else {
      acao(novoEmprestimo);
    }

    Toast.show({
      type: "success",
      text1: "Empréstimo salvo!",
    });
    navigation.goBack();
  }

  return (
    <View style={styles.container}>
      <Text variant="titleLarge" style={styles.title}>
        {emprestimoAntigo ? "Editar Empréstimo" : "Adicionar Empréstimo"}
      </Text>

      <Formik
        initialValues={{
          usuario: "",
          livro: "",
          data: "",
          observacoes: "",
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
                label="Usuário"
                value={values.usuario}
                onChangeText={handleChange("usuario")}
                onBlur={handleBlur("usuario")}
              />
              {touched.usuario && errors.usuario && (
                <Text style={{ color: "red", textAlign: "center" }}>
                  {errors.usuario}
                </Text>
              )}

              <TextInput
                style={styles.input}
                mode="outlined"
                label="Livro"
                value={values.livro}
                onChangeText={handleChange("livro")}
                onBlur={handleBlur("livro")}
                error={touched.livro && errors.livro ? true : false}
              />
              {touched.livro && errors.livro && (
                <Text style={{ color: "red", textAlign: "center" }}>
                  {errors.livro}
                </Text>
              )}
             
              <TextInput
                style={styles.input}
                mode="outlined"
                label="Data de Devolução"
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
                label="Observações"
                value={values.observacoes}
                onChangeText={handleChange("observacoes")}
                onBlur={handleBlur("observacoes")}
              />

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
