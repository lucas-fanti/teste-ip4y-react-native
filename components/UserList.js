import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Button, StyleSheet, Alert } from 'react-native';
import { fetchUsers, deleteUser, sendUsersToAPI } from '../api';

const UserList = ({ navigation }) => {
  const [users, setUsers] = useState([]);

  const loadUsers = () => {
    fetchUsers().then(setUsers).catch(console.error);
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const handleDelete = (id) => {
    deleteUser(id).then(() => {
      Alert.alert('Sucesso', 'Usuário deletado com sucesso');
      loadUsers();
    }).catch(console.error);
  };

  const handleSendToAPI = () => {
    sendUsersToAPI(users).then(() => {
      Alert.alert('Sucesso', 'Dados enviados para a API com sucesso');
    }).catch(console.error);
  };

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Text>{item.cpf} - {item.nome} {item.sobrenome}</Text>
      <Button title="Editar" onPress={() => navigation.navigate('Edit', { id: item.id })} />
      <Button title="Excluir" onPress={() => handleDelete(item.id)} />
    </View>
  );

  return (
    <View>
      <Button title="Enviar Dados para API" onPress={handleSendToAPI} />
      <FlatList
        data={users}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default UserList;
