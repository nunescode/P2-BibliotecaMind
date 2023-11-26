import { Formik } from "formik";
import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { Button, Text, TextInput } from "react-native-paper";
import Toast from "react-native-toast-message";
import * as Yup from "yup";

export default function FormLivro({ navigation, route }) {
  const { acao, livro: livroAntigo } = route.params;

  const [titulo, setTitulo] = useState();
  const [autor, setAutor] = useState("");
  const [genero, setGenero] = useState("");
  const [ano, setAno] = useState("");

  const validationSchema = Yup.object().shape({
    titulo: Yup.string().required("Campo obrigatório!"),
    autor: Yup.string()
      .required("Campo obrigatório!"),
    genero: Yup.string().required("Campo obrigatório!"),
    ano: Yup.string().required("Campo obrigatório!"),
  });

  useEffect(() => {
    console.log("livro -> ", livroAntigo);

    if (livroAntigo) {
      setTitulo(livroAntigo.titulo);
      setAutor(livroAntigo.autor);
      setGenero(livroAntigo.genero);
      setAno(livroAntigo.ano);
    }
  }, []);

  function salvar(novoLivro) {
    console.log("SALVAR DADOS NOVO LIVRO -> ", novoLivro);

    if (livroAntigo) {
      acao(livroAntigo, novoLivro);
    } else {
      acao(novoLivro);
    }

    Toast.show({
      type: "success",
      text1: "Livro salvo!",
    });
    navigation.goBack();
  }

  return (
    <View style={styles.container}>
      <Text variant="titleLarge" style={styles.title}>
        {livroAntigo ? "Editar Livro" : "Adicionar Livro"}
      </Text>

      <Formik
        initialValues={{
          titulo: "",
          autor: "",
          genero: "",
          ano: "",
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
                label="Autor"
                value={values.autor}
                onChangeText={handleChange("autor")}
                onBlur={handleBlur("autor")}
                error={touched.autor && errors.autor ? true : false}
              />
              {touched.autor && errors.autor && (
                <Text style={{ color: "red", textAlign: "center" }}>
                  {errors.autor}
                </Text>
              )}

              <TextInput
                style={styles.input}
                mode="outlined"
                label="Gênero"
                value={values.genero}
                onChangeText={handleChange("genero")}
                onBlur={handleBlur("genero")}
              />
              {touched.genero && errors.genero && (
                <Text style={{ color: "red", textAlign: "center" }}>
                  {errors.genero}
                </Text>
              )}

              <TextInput
                style={styles.input}
                mode="outlined"
                label="Ano"
                keyboardType="numeric"
                value={values.ano}
                onChangeText={handleChange("ano")}
                onBlur={handleBlur("ano")}
              />
              {touched.ano && errors.ano && (
                <Text style={{ color: "red", textAlign: "center" }}>
                  {errors.ano}
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
