import React, { useState } from "react";
import { View, Button, TextInput, ScrollView, StyleSheet } from "react-native";
import firebase from "../../database/firebase";

const CreateUserScreen = (props) => {
  const [state, setState] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const handleChange = (name, value) => {
    setState({ ...state, [name]: value });
  };

  const saveNewUser = async () => {
    await firebase.db.collection("users").add({ ...state });

    props.navigation.navigate("UserList");
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.inputGroup}>
        <TextInput
          placeholder='Name User'
          onChangeText={(value) => handleChange("name", value)}
        />
      </View>
      <View style={styles.inputGroup}>
        <TextInput
          placeholder='Email User'
          onChangeText={(value) => handleChange("email", value)}
        />
      </View>
      <View style={styles.inputGroup}>
        <TextInput
          placeholder='Phone User'
          onChangeText={(value) => handleChange("phone", value)}
        />
      </View>
      <View style={styles.inputGroup}>
        <Button title='Save User' onPress={saveNewUser} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  inputGroup: {
    flex: 1,
    padding: 0,
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#cccccc",
  },
  container: {
    flex: 1,
    padding: 35,
  },
});

export default CreateUserScreen;
