import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

//Navigation
import UserList from "./src/screen/userList";
import UserDetailScreen from "./src/screen/userDetailScreen";
import CreateUserScreen from "./src/screen/createUserScreen";

const Stack = createStackNavigator();

const MyStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name='UserList' component={UserList} />
      <Stack.Screen name='CreateUserScreen' component={CreateUserScreen} />
      <Stack.Screen name='UserDetailScreen' component={UserDetailScreen} />
    </Stack.Navigator>
  );
};

export default function App() {
  return (
    <NavigationContainer>
      <MyStack />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
