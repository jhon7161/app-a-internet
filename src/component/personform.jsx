import React from 'react';

const PersonForm = ({
  newName,
  newNumber,
  handleNameChange,
  handleNumberChange,
  addOrUpdatePerson,
  modedit,
}) => {
  return (
    <form onSubmit={addOrUpdatePerson}>
      <div className='form'>
        name: <input className='form' value={newName} onChange={handleNameChange} />
      </div>
      <div className='form'>
        number: <input className='form' value={newNumber} onChange={handleNumberChange} />
      </div>
      <div className='person'>
        <button  type="submit">
          {modedit ? 'EDITAR' : 'add'}
        </button>
      </div>
    </form>
  );
};

export default PersonForm;