import React, { useEffect, useState } from "react";
import {
  View,
  Button,
  TextInput,
  ScrollView,
  StyleSheet,
  Alert,
  ActivityIndicator,
} from "react-native";
import firebase from "../../database/firebase";

const UserDetailScreen = (props) => {
  const [user, setUser] = useState({
    id: "",
    name: "",
    email: "",
    phone: "",
  });

  const [loading, setLoading] = useState(true);

  const getUserById = async (id) => {
    const dbRef = firebase.db.collection("users").doc(id);
    const doc = await dbRef.get();
    const user = doc.data();
    setUser({
      ...user,
      id: doc.id,
    });
    setLoading(false);
  };

  useEffect(() => {
    getUserById(props.route.params.userId);
  }, []);

  const handleChange = (name, value) => {
    setUser({ ...user, [name]: value });
  };

  const updateUser = async () => {
    const dbRef = await firebase.db
      .collection("users")
      .doc(props.route.params.userId);
    await dbRef.set({
      name: user.name,
      email: user.email,
      phone: user.phone,
    });

    setUser({
      name: "",
      email: "",
      phone: "",
    });

    props.navigation.navigate("UserList");
  };

  const deleteUser = async () => {
    console.log(user);
    const dbRef = await firebase.db
      .collection("users")
      .doc(props.route.params.userId);
    await dbRef.delete();

    props.navigation.navigate("UserList");
  };

  const openConfirmationAlert = () => {
    Alert.alert("Remove the User", "Are your sure? ", [
      { text: "Yes", onPress: () => deleteUser() },
      { text: "No", onPress: () => console.log("no") },
    ]);
  };

  if (loading) {
    return (
      <View>
        <ActivityIndicator size='large' color='#9e9e9e' />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.inputGroup}>
        <TextInput
          value={user.name}
          placeholder='Name User'
          onChangeText={(value) => handleChange("name", value)}
        />
      </View>
      <View style={styles.inputGroup}>
        <TextInput
          value={user.email}
          placeholder='Email User'
          onChangeText={(value) => handleChange("email", value)}
        />
      </View>
      <View style={styles.inputGroup}>
        <TextInput
          value={user.phone}
          placeholder='Phone User'
          onChangeText={(value) => handleChange("phone", value)}
        />
      </View>
      <View style={styles.inputGroup}>
        <Button
          color='#19AC52'
          title='Update User'
          onPress={() => updateUser()}
        />
      </View>
      <View style={styles.inputGroup}>
        <Button
          color='#E37399'
          title='Delete User'
          onPress={() => openConfirmationAlert()}
        />
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

export default UserDetailScreen;
