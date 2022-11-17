import React from 'react'
import '../scss/components/articleLoader.scss'





const ArticleLoader = () => {
    return (
        <div className="article-wrapper">
            <div className="article-cover-loader skeleton" />

            <div className="article-content-loader-wrapper">
                <div className="article-loader__title skeleton" />

                <div className="article-loader__text">
                    <div className="article-loader__text__item  skeleton"></div>
                    <div className="article-loader__text__item  skeleton"></div>
                    <div className="article-loader__text__item  skeleton"></div>
                    <div className="article-loader__text__item  skeleton"></div>
                    <div className="article-loader__text__item  skeleton"></div>
                    <div className="article-loader__text__item  skeleton"></div>
                </div>

                <div className="article-loader__author skeleton" />
            </div>
        </div>
    )
}





export default ArticleLoader