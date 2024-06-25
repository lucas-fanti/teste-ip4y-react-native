import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';
import { validateCPF, validateEmail, validateDate } from '../utils/validators';

const UserForm = ({ onSubmit, initialValues, resetForm }) => {
  const [cpf, setCpf] = useState(initialValues.cpf || '');
  const [nome, setNome] = useState(initialValues.nome || '');
  const [sobrenome, setSobrenome] = useState(initialValues.sobrenome || '');
  const [dataNascimento, setDataNascimento] = useState(initialValues.dataNascimento || '');
  const [email, setEmail] = useState(initialValues.email || '');
  const [genero, setGenero] = useState(initialValues.genero || 'masculino');
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleDateChange = (event, selectedDate) => {
    setShowDatePicker(false);
    if (selectedDate) {
      const formattedDate = selectedDate.toISOString().split('T')[0];
      setDataNascimento(formattedDate);
    }
  };

  const handleSubmit = () => {
    if (!cpf || !nome || !sobrenome || !dataNascimento || !email || !genero) {
      Alert.alert('Erro', 'Todos os campos são obrigatórios');
      return;
    }
    if (!validateCPF(cpf)) {
      Alert.alert('Erro', 'CPF inválido');
      return;
    }
    if (!validateEmail(email)) {
      Alert.alert('Erro', 'E-mail inválido');
      return;
    }
    if (!validateDate(dataNascimento)) {
      Alert.alert('Erro', 'Data de nascimento inválida');
      return;
    }
    if (nome.length > 50) {
      Alert.alert('Erro', 'Nome deve ter no máximo 50 caracteres');
      return;
    }
    if (sobrenome.length > 50) {
      Alert.alert('Erro', 'Sobrenome deve ter no máximo 50 caracteres');
      return;
    }
    onSubmit({ cpf, nome, sobrenome, dataNascimento, email, genero });
  };

  const handleReset = () => {
    setCpf('');
    setNome('');
    setSobrenome('');
    setDataNascimento('');
    setEmail('');
    setGenero('masculino');
    resetForm();
  };

  return (
    <View style={styles.container}>
      <Text>CPF:</Text>
      <TextInput style={styles.input} value={cpf} onChangeText={setCpf} keyboardType="numeric" />
      <Text>Nome:</Text>
      <TextInput style={styles.input} value={nome} onChangeText={setNome} />
      <Text>Sobrenome:</Text>
      <TextInput style={styles.input} value={sobrenome} onChangeText={setSobrenome} />
      <Text>Data de Nascimento:</Text>
      <TextInput
        style={styles.input}
        value={dataNascimento}
        onFocus={() => setShowDatePicker(true)}
      />
      {showDatePicker && (
        <DateTimePicker
          value={dataNascimento ? new Date(dataNascimento) : new Date()}
          mode="date"
          display="default"
          onChange={handleDateChange}
        />
      )}
      <Text>Email:</Text>
      <TextInput style={styles.input} value={email} onChangeText={setEmail} keyboardType="email-address" />
      <Text>Gênero:</Text>
      <Picker selectedValue={genero} onValueChange={(itemValue) => setGenero(itemValue)} style={styles.picker}>
        <Picker.Item label="Masculino" value="masculino" />
        <Picker.Item label="Feminino" value="feminino" />
      </Picker>
      <Button title="Inserir" onPress={handleSubmit} />
      <Button title="Recomeçar" onPress={handleReset} />
    </View>
  );
};

UserForm.defaultProps = {
  initialValues: {
    cpf: '',
    nome: '',
    sobrenome: '',
    dataNascimento: '',
    email: '',
    genero: 'masculino',
  },
  resetForm: () => {},
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
  },
  picker: {
    height: 50,
    width: '100%',
  },
});

export default UserForm;
