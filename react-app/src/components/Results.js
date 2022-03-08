import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { listResults } from '../store/results';

const Results = () => {
    const dispatch = useDispatch();
    let res = useSelector(state => state.results)
    let results = Object.values(res)

    // useEffect(() => {
    //     dispatch(listResults())
    // }, [dispatch])

    if (!results.length) {
        return (
            <div> No results found!</div>
        )
    } else if (results) {
        return (
            <main>
                <div>
                    {results?.map((result) => {
                        return (
                            <div>
                                <div> {result?.name} </div>
                                <div> {result?.description} </div>
                            </div>
                        )
                    })}
                </div>
            </main>
        )
    }
}

export default Results;
