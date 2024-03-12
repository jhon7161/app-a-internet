import React from 'react';

const Persons = ({ persons, searchTerm, edicion, deletePerson }) => {
  return (
    <div>
      {persons
        .filter(person => person.name.toLowerCase().includes(searchTerm.toLowerCase()))
        .map(person => (
          <div className="person" key={person.name}>
           <div className='pers'> {person.name} {person.number}</div>
            <button onClick={() => edicion(person)}>EDITAR</button>
            <button onClick={() => deletePerson(person.id)}>ELIMINAR</button>
          </div>
        ))}
    </div>
  );
};

export default Persons;