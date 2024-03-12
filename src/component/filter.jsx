import React, { useState } from 'react';

const FilterComponent = ({searchTerm,handleSearchChange}) => {
    return (
        <div>
            filter shown with <input value={searchTerm} onChange={handleSearchChange} />
        </div>
    );
}

export default FilterComponent;


