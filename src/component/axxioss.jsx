import axios from 'axios';

const baseUrl = 'http://localhost:3001/api/persons';

// Obtener contactos del servidor
const getContacts = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

// Añadir un nuevo contacto al servidor
const addContact = async (newContact) => {
  const response = await axios.post(baseUrl, newContact);
  return response.data;
};

// Actualizar un contacto existente en el servidor
const updateContact = async (id, updatedContact) => {
  const response = await axios.put(`${baseUrl}/${id}`, updatedContact);
  return response.data;
};

// Eliminar un contacto del servidor
const deleteContact = async (id) => {
  const response = await axios.delete(`${baseUrl}/${id}`);
  return response.data;
};

export { getContacts, addContact, updateContact, deleteContact };