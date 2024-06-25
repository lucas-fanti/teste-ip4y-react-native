import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import UserForm from '../components/UserForm';
import { fetchUserById, updateUser, createUser } from '../api';

const EditScreen = ({ route, navigation }) => {
  const { id } = route.params || {};
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (id) {
      fetchUserById(id).then(setUser).catch(console.error);
    }
  }, [id]);

  const handleSubmit = (userData) => {
    if (id) {
      updateUser(id, userData)
        .then(() => navigation.navigate('List'))
        .catch(console.error);
    } else {
      createUser(userData)
        .then(() => navigation.navigate('List'))
        .catch(console.error);
    }
  };

  const handleReset = () => {
    setUser(null);
  };

  return (
    <View style={styles.container}>
      <UserForm initialValues={user || {}} onSubmit={handleSubmit} resetForm={handleReset} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
});

export default EditScreen;
