import React, { useEffect, useState } from "react";
import { View, ScrollView, Button, ActivityIndicator } from "react-native";
import { ListItem, Avatar } from "react-native-elements";
import firebase from "../../database/firebase";

const UserList = (props) => {
  const [users, setUsers] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    firebase.db.collection("users").onSnapshot((querySnapshot) => {
      const user = [];
      querySnapshot.docs.forEach((doc) => {
        const { name, email, phone } = doc.data();
        user.push({
          id: doc.id,
          name,
          email,
          phone,
        });
      });

      setUsers(user);
    });
    setLoading(false);
  }, [users]);

  if (loading) {
    return (
      <View>
        <ActivityIndicator size='large' color='#9e9e9e' />
      </View>
    );
  }

  return (
    <ScrollView>
      <Button
        title='Create User'
        onPress={() => props.navigation.navigate("CreateUserScreen")}
      />

      {users.map((user) => {
        return (
          <ListItem
            key={user.id}
            bottomDivider
            onPress={() =>
              props.navigation.navigate("UserDetailScreen", {
                userId: user.id,
              })
            }
          >
            <ListItem.Chevron />
            <Avatar
              rounded
              source={{
                uri:
                  "https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg",
              }}
            />
            <ListItem.Content>
              <ListItem.Title>{user.name}</ListItem.Title>
              <ListItem.Subtitle>{user.email}</ListItem.Subtitle>
            </ListItem.Content>
          </ListItem>
        );
      })}
    </ScrollView>
  );
};

export default UserList;
