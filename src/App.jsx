import { useState, useEffect } from 'react';
import { getContacts, addContact, updateContact, deleteContact } from './component/axxioss'; // Corregido el nombre del archivo de importación
import FilterComponent from './component/filter'; // Corregido el nombre del archivo de importación
import PersonForm from './component/personform'; // Corregido el nombre del archivo de importación
import Persons from './component/persons'; // Corregido el nombre del archivo de importación
import './index.css';
import Notification from './component/alerta'; // Corregido el nombre del archivo de importación

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [modedit, setModEdit] = useState(false);
  const [personToUpdate, setPersonToUpdate] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    getContacts().then(initialPersons => {
      setPersons(initialPersons);
    }).catch(error => console.error(error)); // Manejo de errores
  }, []); // Agregado 'persons' como dependencia

  const updatePerson = (id, personObject) => {
    return updateContact(id, personObject)
      .then(returnedPerson => {
        setPersons(persons.map(person => person.id !== id ? person : returnedPerson));
        return returnedPerson;
      })
  };
  
  const addOrUpdatePerson = (event) => {
    event.preventDefault();
    if (modedit && personToUpdate) {
      const personExists = persons.find(person => person.id === personToUpdate.id);
      if (personExists) {
        const updatedPerson = { ...personToUpdate, name: newName, number: newNumber ? newNumber : personExists.number };
        updatePerson(personToUpdate.id, updatedPerson)
          .then(() => {
            setModEdit(false);
            setPersonToUpdate(null);
            setNewName('');
            setNewNumber('');
          })
          .catch(error => console.error(error));
      } else {
        setErrorMessage(`El contacto ya fue eliminado del servidor`);
        setTimeout(() => {
          setErrorMessage(null);
        }, 5000);
        setModEdit(false);
        setPersonToUpdate(null);
        setNewName('');
        setNewNumber('');
      }
    } else {
      const personExists = persons.find(person => person.name === newName);
      if (personExists) {
        setErrorMessage(`'${newName}' ya está en la agenda telefónica`);
        setTimeout(() => {
          setErrorMessage(null);
        }, 5000);
        const updatedPerson = { ...personExists, name: newName, number: newNumber ? newNumber : personExists.number };
        updatePerson(personExists.id, updatedPerson)
          .then(() => {
            setNewName('');
            setNewNumber('');
          })
          .catch(error => console.error(error));
      } else {
        const personObject = {
          name: newName,
          number: newNumber,
        };
        addContact(personObject)
          .then(returnedPerson => {
            setPersons(persons.concat(returnedPerson));
            setNewName('');
            setNewNumber('');
          })
          .catch(error => console.error(error));
      }
    }
  };
  
  
  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };
  
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };
  
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const edicion = (objeto) => {
    setNewName(objeto.name);
    setNewNumber(objeto.number);
    setModEdit(true);
    setPersonToUpdate(objeto);
  };

  const deletePerson = (id) => {
    deleteContact(id)
      .then(() => {
        setPersons(persons.filter(person => person.id !== id));
      })
      .catch(error => console.error(error));
  };
  
  return (
    <div>
      <h1>Phonebook</h1>
      <Notification message={errorMessage} />
      <div>
        <FilterComponent searchTerm={searchTerm} handleSearchChange={handleSearchChange}/>
      </div>
      <>
        <h2> ADD CONTACT </h2>
        <PersonForm
          newName={newName}
          newNumber={newNumber}
          handleNameChange={handleNameChange}
          handleNumberChange={handleNumberChange}
          addOrUpdatePerson={addOrUpdatePerson}
          modedit={modedit}
        />
      </>
      <h2>Numbers</h2>
      <Persons
        persons={persons}
        searchTerm={searchTerm}
        edicion={edicion}
        deletePerson={deletePerson}
      />
    </div>
  );
};

export default App;
