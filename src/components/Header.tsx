import React, { useState } from 'react'
import '../scss/components/header.scss'

import { CategoriesEnum } from '../types/enums';

import { NavLink, useMatch } from 'react-router-dom';





const Header = () => {
    const articlesMatch = useMatch("/");
    const categoriesMatch = useMatch(`/categories/:${window.location.href.split(':').reverse()[0]}`);

    const categories = Object.keys(CategoriesEnum);


    const [isMouseOnDropDown, setIsMouseOnDropDown] = useState<boolean>(false);

    const mouseEnterOnDropDownHandler = () => {
        setIsMouseOnDropDown(true);
    }
    const mouseLeaveOnDropDownHandler = () => {
        setIsMouseOnDropDown(false);
    }



    return (
        <div className="header-wrapper">
            <div className="header-page">
                <NavLink to={'/'} >
                    <h2 className={Boolean(articlesMatch) ? 'header-page__title active' : 'header-page__title'} >
                        Articles
                    </h2>
                </NavLink>
            </div>

            <div className="header-logo" />

            <div className='header-page' >
                <h2 
                    className={Boolean(categoriesMatch) || isMouseOnDropDown ? 'header-page__title active' : 'header-page__title'} 
                    onMouseEnter={mouseEnterOnDropDownHandler} 
                    onMouseLeave={mouseLeaveOnDropDownHandler}
                >
                    Categories
                </h2>

                <ul 
                    className={isMouseOnDropDown ? 'drop-down drop-down-active' : 'drop-down'}
                    onMouseEnter={mouseEnterOnDropDownHandler} 
                    onMouseLeave={mouseLeaveOnDropDownHandler}
                >
                    {categories.map(categorie => (
                        <li key={categorie} className='drop-down__item' >
                            <NavLink to={`/categories/:${categorie}`} className="drop-down__categorie" >{categorie}</NavLink>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}





export default Header