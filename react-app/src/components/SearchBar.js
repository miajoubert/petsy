import React, { useState } from 'react';

const SearchBar = () => {
    const [searchTerm, setSearchTerm] = useState('');

    return (
        <form action='/results'>
            <input type='search'
                placeholder='Search Products'
                name='search'
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                required />
            <button>Search</button>
        </form>
    )
}

export default SearchBar;
