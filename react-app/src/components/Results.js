import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { listResults } from '../store/results';

const Results = () => {
    const dispatch = useDispatch();
    const results = useSelector(state => state.results)
    console.log('comp results', results)
    const resultsArr = Object.values(results)

    useEffect(() => {
        dispatch(listResults())
    }, [dispatch])

    return (
        <main>
            <div>
                {/* Hellooooooooooooooooooooooooooooooooooooo */}
                {resultsArr.map((result) => {
                    return result
                })}
            </div>
        </main>
    )
}

export default Results;
