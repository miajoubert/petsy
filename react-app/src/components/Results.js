import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { listResults } from '../store/results';

const Results = () => {
    console.log("IN RESULTS COMP-----------------")
    const dispatch = useDispatch();
    const results = useSelector(state => state.results)
    console.log("MY RESULTS!!!!!!!!!!", results)
    const resultsArr = Object.values(results)

    useEffect(() => {
        dispatch(listResults())
    }, [])

    return (
        <main>
            <div>
                {resultsArr.map((result) => {
                    return result
                })}
            </div>
        </main>
    )
}

export default Results;
