import React from 'react'
import '../scss/components/articleListItem.scss'
import 'react-loading-skeleton/dist/skeleton.css'

import { LazyLoadImage } from 'react-lazy-load-image-component';





interface Props {
    title: string,
    cover: string,
    text: string,
    author: string,
    category: string
}
const ArticleListItem = ({ title, cover, text, author, category }: Props) => {
    const croppedText = text ? [...text.split('', 250), '...'].join('') : '';



    return (
        <div className="articleListItem__wrapper">
            <div className="articleListItem__cover-wrapper">
                <LazyLoadImage
                    src={require(`../assets/images/${cover}.webp`)}
                    alt={`${cover}`}
                    placeholder={<div className="cover-loader" />}
                    className='articleListItem__cover'
                />
            </div>

            <h2 className="articleListItem-content__title">{title}</h2>

            <div className="articleListItem-content__text">{croppedText}</div>

            <div className="articleListItem-content__author">{author}</div>
        </div>
    )
}





export default ArticleListItem