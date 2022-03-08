import React from 'react';

const SearchBar = () => {
    return (
        <form action='/results'>
            <input type='search' placeholder='Search Products' name='search' required />
            <button>Search</button>
        </form>
    )
}

export default SearchBar;
