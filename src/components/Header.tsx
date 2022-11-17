import React, { useState } from 'react'
import '../scss/components/header.scss'

import { CategoriesEnum, PagesEnum } from '../types/enums';

import { setCategory, setPage } from '../redux/slices/navigationSlice';





interface Props {
    dispatch: any,
    page: PagesEnum,
    category: CategoriesEnum | null
}
const Header = ({ dispatch, page, category }: Props) => {
    const [isMouseOnDropDown, setIsMouseOnDropDown] = useState<boolean>(false);

    const mouseEnterOnDropDownHandler = () => {
        setIsMouseOnDropDown(true);
    }
    const mouseLeaveOnDropDownHandler = () => {
        setIsMouseOnDropDown(false);
    }



    const categories = Object.keys(CategoriesEnum);
    
    const onPageClick = (dispatchPage: PagesEnum) => {
        dispatch(setPage(dispatchPage));
        dispatch(setCategory(null));
    }
    const onCategoryClick = (dispatchCategory: string) => {
        dispatch(setPage(PagesEnum.Categories));
        dispatch(setCategory(dispatchCategory));
    }



    return (
        <div className="header-wrapper">
            <div className="header-page">
                <h2 onClick={() => onPageClick(PagesEnum.Articles)} className={page === PagesEnum.Articles ? 'header-page__title active' : 'header-page__title'} >
                    Articles
                </h2>
            </div>

            <div className="header-logo" />

            <div className='header-page' >
                <h2
                    onClick={() => onPageClick(PagesEnum.Categories)}
                    onMouseEnter={mouseEnterOnDropDownHandler}
                    onMouseLeave={mouseLeaveOnDropDownHandler}
                    className={page === PagesEnum.Categories || isMouseOnDropDown ? 'header-page__title active' : 'header-page__title'}
                >
                    Categories
                </h2>

                <ul
                    onMouseEnter={mouseEnterOnDropDownHandler}
                    onMouseLeave={mouseLeaveOnDropDownHandler}
                    className={isMouseOnDropDown ? 'drop-down drop-down-active' : 'drop-down'}
                >
                    {categories.map(categoryItem => (
                        <li 
                            key={categoryItem}
                            onClick={() => onCategoryClick(categoryItem)}
                            className={category === categoryItem ? 'drop-down__item active' : 'drop-down__item'} 
                        >
                            {categoryItem}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}





export default Header