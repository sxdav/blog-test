import React from 'react'
import '../scss/components/articleListItemLoader.scss'





const ArticleListItemLoader = () => {
    return (
        <div className="articleListItem__wrapper d-flex">
            <div className="cover-loader skeleton" />

            <div className="text-wrapper">
                <div className="title-loader skeleton" />

                <div className="text-loader">
                    <div className="text-loader__item skeleton"></div>
                    <div className="text-loader__item skeleton"></div>
                    <div className="text-loader__item skeleton"></div>
                    <div className="text-loader__item skeleton"></div>
                    <div className="text-loader__item skeleton"></div>
                    <div className="text-loader__item skeleton"></div>
                </div>

                <div className="author-loader skeleton" />
            </div>
        </div>
    )
}





export default ArticleListItemLoader