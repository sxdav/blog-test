import React from 'react'
import '../scss/components/article.scss'

import { LazyLoadImage } from 'react-lazy-load-image-component'





interface Props {
    title: string,
    cover: string,
    text: string,
    author: string,
    category: string
}
const Article = ({ title, cover, text, author, category }: Props) => {
    return (
        <div className="article-wrapper">
            <div className="article__cover-wrapper">
                <LazyLoadImage
                    src={require(`../assets/images/${cover}.webp`)}
                    alt={`${cover}`}
                    placeholder={<div className="article-cover-loader skeleton" />}
                    className='article__cover'
                />
            </div>

            <div className="article-content-wrapper">
                <h2 className="article-content__title">{title}</h2>

                <div className="article-content__text">{text}</div>

                <div className="article-content__author">{author}</div>
            </div>
        </div>
    )
}





export default Article