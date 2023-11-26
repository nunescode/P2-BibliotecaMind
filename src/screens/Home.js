import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import { Avatar } from "react-native-paper";

const Home = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Biblioteca Mind</Text>
      </View>
      <View>
        <Text></Text>
      </View>
      <View>
        <Text></Text>
      </View>
      <View style={{ justifyContent: "center", alignItems: "center" }}>
        <Avatar.Image
          source={require("../../assets/logolivro.png")}
          style={styles.logo}
          size={150}
        />
      </View>
      <View style={styles.buttonsContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("Usuários")}
        >
          <Text style={styles.buttonText}> Usuários</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("Livros")}
        >
          <Text style={styles.buttonText}> Livros</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("Eventos")}
        >
          <Text style={styles.buttonText}> Eventos</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("Empréstimos")}
        >
          <Text style={styles.buttonText}> Empréstimos</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("Avaliações")}
        >
          <Text style={styles.buttonText}> Avaliações</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5E6CA",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center", 
    padding: 20,
    backgroundColor: "#7D5238",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#ffffff",
    textAlign: "center", 
  },
 
  buttonsContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  button: {
    backgroundColor: "#7D5238",
    padding: 15,
    borderRadius: 8,
    marginBottom: 20,
    width: "80%",
    alignItems: "center",
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default Home;
