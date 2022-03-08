import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { listResults } from '../store/results';

const SearchBar = () => {
    const [ searchTerm, setSearchTerm ] = useState('');
    const dispatch = useDispatch();

    const handleSubmit = async (e) => {
        e.preventDefault();

        setSearchTerm(e.target.value)

        const results = {
            results: searchTerm
        }

        const allResults = await dispatch(listResults(results))
        return allResults;
    }

    return (
        <form action='/results'>
            <input type='search' placeholder='Search Products' name='search' required value={searchTerm} onChange={handleSubmit}/>
            <button>Search</button>
        </form>
    )
}

export default SearchBar;
