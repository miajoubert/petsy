import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { listResults } from '../store/results';
import { Link } from 'react-router-dom';

const Results = () => {
    const dispatch = useDispatch();
    let res = useSelector(state => state.results)
    let results = Object.values(res)

    useEffect(() => {
        dispatch(listResults())
    }, [dispatch])

    if (!results.length) {
        return (
            <div> No results found!</div>
        )
    } else if (results) {
        return (
            <div className="all-products-container">
                {results.map((result) => (
                    <Link
                        key={`single_product_link_${result.id}`}
                        to={`/products/${result?.id}`}
                    >
                        <img
                            width={"auto"}
                            height={500}
                            alt={result?.name}
                            src={
                                result?.image_url
                                    ? result?.image_url
                                    : "https://media.istockphoto.com/vectors/no-image-available-sign-vector-id922962354?k=20&m=922962354&s=612x612&w=0&h=f-9tPXlFXtz9vg_-WonCXKCdBuPUevOBkp3DQ-i0xqo="
                            }
                        />
                    </Link>
                ))}
            </div>
        )
    }
}

export default Results;
