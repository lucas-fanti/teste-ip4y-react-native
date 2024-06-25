export const fetchUsers = async () => {
  const response = await fetch('http://localhost:3000/usuarios');
  return response.json();
};

export const fetchUserById = async (id) => {
  const response = await fetch(`http://localhost:3000/usuarios/${id}`);
  return response.json();
};

export const createUser = async (userData) => {
  const response = await fetch('http://localhost:3000/usuarios', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  });
  return response.json();
};

export const updateUser = async (id, userData) => {
  const response = await fetch(`http://localhost:3000/usuarios/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  });
  return response.json();
};

export const deleteUser = async (id) => {
  await fetch(`http://localhost:3000/usuarios/${id}`, {
    method: 'DELETE',
  });
};

export const sendUsersToAPI = async (users) => {
  const response = await fetch('https://api-teste.ip4y.com.br/cadastro', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(users),
  });
  return response.json();
};
