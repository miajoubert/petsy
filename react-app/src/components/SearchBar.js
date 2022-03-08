import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { findResults } from '../store/results';

const SearchBar = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const history = useHistory();
    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();

        history.push('/results');
    }

    return (
        <form action='/results' method='POST'>
            <input type='text'
                placeholder='Search Products'
                name='search'
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                onSubmit={dispatch(findResults())}
                required
                />
            <button onClick={handleSubmit}>Search</button>
        </form>
    )
}

export default SearchBar;
