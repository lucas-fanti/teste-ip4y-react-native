import React from 'react';
import { View, StyleSheet } from 'react-native';
import UserList from '../components/UserList';

const ListScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <UserList navigation={navigation} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
});

export default ListScreen;
