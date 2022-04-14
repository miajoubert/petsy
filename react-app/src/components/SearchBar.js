import React, { useEffect, useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { findResults } from '../store/results';

const SearchBar = () => {
    const products = useSelector(state => state.productsReducer)
    const [searchTerm, setSearchTerm] = useState('');
    const [listProducts, setListProducts] = useState([])
    const history = useHistory();
    const dispatch = useDispatch();

    let allProducts = Object.values(products)
    // useEffect(() => {
    //     if (searchTerm.length > 0) {
    //         filterProducts(searchTerm)
    //     }
    // }, [searchTerm])

    // const filterProducts = (searchTerm) => {
    //     let allProducts = Object.values(products)

    //     allProducts.forEach((product) => {
    //         console.log("SearchTerm!!!!!!!!!!", searchTerm)
    //         if (product?.name.toLowerCase().includes(searchTerm.toLowerCase())) {

    //             console.log("PRODUCT", product.name)
    //             setListProducts(product.name)
    //             console.log("HERE!!!!!!!!!", listProducts)

    //             // setListProducts(addToList)
    //             // console.log("##############", listProducts)
    //         }
    //     })
    // }

    const handleSubmit = (e) => {
        e.preventDefault()

        localStorage.setItem("search", searchTerm)

        dispatch(findResults(searchTerm))

        setSearchTerm("")

        history.push('/results');
    }

    let count = 0

    return (
        <>
            <form onSubmit={handleSubmit} className='search-form'>
                <input type='text'
                    placeholder='Search Products'
                    name='search'
                    value={searchTerm}
                    onChange={e => setSearchTerm(e.target.value)}
                    required
                />
                <button>
                    <i className="fas fa-search"></i>
                </button>
            </form>
            <div hidden={!searchTerm} className='search-bar-results-div'>
                {allProducts.map((product) => {
                    if (product?.name.toLowerCase().includes(searchTerm.toLowerCase())) {
                        count++
                        return (
                            <li>
                                <Link to={`/products/${product.id}`}
                                    onClick={() => setSearchTerm('')}
                                >
                                    {product.name}
                                </Link>
                            </li>)
                    }
                })}
                {!count ? <li> No results found </li> : null}
            </div>
        </>
    )
}

export default SearchBar;
