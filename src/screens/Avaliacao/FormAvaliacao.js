import { Formik } from "formik";
import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { Button, Text, TextInput } from "react-native-paper";
import Toast from "react-native-toast-message";
import * as Yup from "yup";

export default function FormAvaliacao({ navigation, route }) {
    
  const { acao, avaliacao: avaliacaoAntiga } = route.params;

  const [atendimento, setAtendimento] = useState();
  const [livros, setLivros] = useState("");
  const [comentario, setComentario] = useState("");
  const [nome, setNome] = useState("");

  const validationSchema = Yup.object().shape({
    atendimento: Yup.string().required("Campo obrigatório!"),
    livros: Yup.string().required("Campo obrigatório!"),
    comentario: Yup.string().required("Campo obrigatório!"),
    nome: Yup.string().required("Campo obrigatório!"),
  });

  useEffect(() => {
    console.log("avaliacao -> ", avaliacaoAntiga);

    if (avaliacaoAntiga) {
      setAtendimento(avaliacaoAntiga.atendimento);
      setLivros(avaliacaoAntiga.livros);
      setComentario(avaliacaoAntiga.comentario);
      setNome(avaliacaoAntiga.nome);
    }
  }, []);

  function salvar(novaAvaliacao) {
    console.log("SALVAR DADOS NOVA AVALIAÇÃO -> ", novaAvaliacao);

    if (avaliacaoAntiga) {
      acao(avaliacaoAntiga, novaAvaliacao);
    } else {
      acao(novaAvaliacao);
    }

    Toast.show({
      type: "success",
      text1: "Avaliação salva!",
    });
    navigation.goBack();
  }

  return (
    <View style={styles.container}>

      <Text variant="titleLarge" style={styles.title}>

        {avaliacaoAntiga ? "Editar Avaliação" : "Adicionar Avaliação"}
      </Text>

      <Formik
        initialValues={{
          atendimento: "",
          livros: "",
          comentario: "",
          nome: "",
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
                label="Atendimento"
                placeholder="0 a 10"
                keyboardType="numeric"
                value={values.atendimento}
                onChangeText={handleChange("atendimento")}
                onBlur={handleBlur("atendimento")}
              />
              {touched.atendimento && errors.atendimento && (
                <Text style={{ color: "red", textAlign: "center" }}>
                  {errors.atendimento}
                </Text>
              )}

              <TextInput
                style={styles.input}
                mode="outlined"
                label="Livros"
                placeholder="0 a 10"
                keyboardType="numeric"
                value={values.livros}
                onChangeText={handleChange("livros")}
                onBlur={handleBlur("livros")}
                error={touched.livros && errors.livros ? true : false}
              />
              {touched.livros && errors.livros && (
                <Text style={{ color: "red", textAlign: "center" }}>
                  {errors.livros}
                </Text>
              )}
             
              <TextInput
                style={styles.input}
                mode="outlined"
                label="Comentário"
                value={values.comentario}
                onChangeText={handleChange("comentario")}
                onBlur={handleBlur("comentario")}
              />
              {touched.comentario && errors.comentario && (
                  <Text style={{ color: "red", textAlign: "center" }}>
                  {errors.comentario}
                </Text>
              )}

              <TextInput
                style={styles.input}
                mode="outlined"
                label="Nome"
                value={values.nome}
                onChangeText={handleChange("nome")}
                onBlur={handleBlur("nome")}
              />
              {touched.nome && errors.nome && (
                  <Text style={{ color: "red", textAlign: "center" }}>
                  {errors.nome}
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
