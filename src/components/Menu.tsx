import React, { useState } from 'react'
import '../scss/components/menu.scss'

import { CategoriesEnum } from '../types/enums';
import { AddArticleFields } from '../types/interfaces';

import { HiOutlinePlusSm } from 'react-icons/hi'

import { useForm } from 'react-hook-form';
import { useAppDispatch } from '../redux/hooks';
import { setAmountOfFetchedArticles } from '../redux/slices/fetchArticlesSlice';
import { addArticle } from '../redux/slices/addedArticlesSlice';





interface Props {
    amountOfFetchedArticles: number | 'All'
}
const Menu = ({ amountOfFetchedArticles }: Props) => {
    const dispatch = useAppDispatch();



    const [isShownDropDownActive, setIsShownDropDownActive] = useState<boolean>(false);

    const mouseEnterShownDropDown = () => {
        setIsShownDropDownActive(true);

    }
    const mouseLeaveShownDropDown = () => {
        setIsShownDropDownActive(false);
    }
    const shownDropDownHandler = (amount: number | string) => {
        dispatch(setAmountOfFetchedArticles(amount));
    }



    const [isAddDropDownActive, setAddShownDropDownActive] = useState<boolean>(true);

    const addDropDownHandler = () => {
        setAddShownDropDownActive(!isAddDropDownActive)
    }



    const {
        register,
        formState: { errors },
        handleSubmit
    } = useForm<AddArticleFields>({
        mode: "onSubmit"
    });

    const [isCategoryDropDownActive, setIsCategoryDropDownActive] = useState<boolean>(true);
    const [choosedCategory, setChoosedCategory] = useState<string>('Recipes');

    const categoryDropDownMouseEnter = () => {
        setIsCategoryDropDownActive(true);
    }

    const onCategoryClick = (category: string) => {
        setChoosedCategory(category);
        setIsCategoryDropDownActive(false);
    }

    const onSubmit = (data: AddArticleFields) => {
        console.log(data);
        setAddShownDropDownActive(false);
        setIsCategoryDropDownActive(false);

        dispatch(addArticle({
            title: data.title,
            cover: choosedCategory,
            text: data.text,
            author: data.author,
            category: choosedCategory
        }))
    }



    return (
        <div className="menu">
            <div className="articles-to-show" onMouseEnter={mouseEnterShownDropDown} onMouseLeave={mouseLeaveShownDropDown} >
                <div className="articles-to-show_text" >
                    articles shown:
                </div>

                <div className="articles-to-show_text">
                    {amountOfFetchedArticles}
                </div>

                <ul
                    onMouseEnter={mouseEnterShownDropDown}
                    onMouseLeave={mouseLeaveShownDropDown}
                    className={isShownDropDownActive ? 'main-drop-down main-drop-down__active' : 'main-drop-down'}
                >
                    {[10, 15, 20, 25, 'All'].map((amount) =>
                        amount !== amountOfFetchedArticles &&
                        <li
                            key={amount}
                            onClick={() => shownDropDownHandler(amount)}
                            className="main-drop-down_item"
                        >
                            {amount}
                        </li>
                    )}
                </ul>
            </div>

            <div className="add-new-article">
                <div
                    onClick={addDropDownHandler}
                    className={isAddDropDownActive ? "add-new-article_button add-new-article_button__active" : "add-new-article_button"}
                >
                    <HiOutlinePlusSm />
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className={
                    isAddDropDownActive ? 'main-drop-down main-drop-down__add main-drop-down__active' : 'main-drop-down main-drop-down__add'
                }>
                    <input
                        type="text"
                        className="add-new-article_input"
                        placeholder='Title'
                        {...register('title', {
                            required: "The field is required",
                            minLength: {
                                value: 3,
                                message: 'At least three characters',
                            },
                            maxLength: {
                                value: 40,
                                message: 'Not more than fourty characters',
                            }
                        })}
                    />
                    {errors.title && <div className="add-new-article_error">{errors.title.message}</div>}

                    <input
                        type="text"
                        className="add-new-article_input"
                        placeholder='Author'
                        {...register('author', {
                            required: "The field is required",
                            minLength: {
                                value: 3,
                                message: 'At least three characters',
                            },
                            maxLength: {
                                value: 30,
                                message: 'Not more than thirty characters',
                            }
                        })}
                    />
                    {errors.author && <div className="add-new-article_error">{errors.author.message}</div>}

                    <textarea
                        className="add-new-article_input add-new-article_input__text"
                        placeholder='Content'
                        {...register('text', {
                            required: "The field is required",
                            minLength: {
                                value: 200,
                                message: 'At least two hundred characters',
                            },
                            maxLength: {
                                value: 1000,
                                message: 'Not more one thousand characters',
                            }
                        })}
                    />
                    {errors.text && <div className="add-new-article_error">{errors.text.message}</div>}

                    <div onMouseEnter={categoryDropDownMouseEnter} className="categories-dropdown_choosed">
                        Category: {choosedCategory}
                    </div>
                    <ul className={isCategoryDropDownActive ? "categories-dropdown categories-dropdown__active" : "categories-dropdown"}>
                        {Object.keys(CategoriesEnum).map((category) => category !== choosedCategory && (
                            <li key={category} onClick={() => onCategoryClick(category)} className="categories-dropdown_item">{category}</li>
                        ))}
                    </ul>

                    <button onClick={handleSubmit(onSubmit)} className="categories-dropdown_submit">
                        Add article
                    </button>
                </form>
            </div>
        </div>
    )
}





export default Menu