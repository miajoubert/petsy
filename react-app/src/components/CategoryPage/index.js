import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { getCategory } from '../../store/category';
import './CategoryPage.css';

const CategoryPage = () => {
    const { id } = useParams();
    const category = useSelector(state => state.categories[id]);
    const dispatch = useDispatch();
    console.log('kfdkjs', category)

    useEffect(() => {
        dispatch(getCategory(id));
    }, [dispatch]);

    return (
        <div>Hello</div>
    )
};

export default CategoryPage;
