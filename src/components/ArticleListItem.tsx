import React from 'react'
import '../scss/components/articleListItem.scss'
import 'react-loading-skeleton/dist/skeleton.css'

import { LazyLoadImage } from 'react-lazy-load-image-component';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'





interface Props {
    title: string | null,
    cover: string | null,
    text: string | null,
    author: string | null,
    category: string | null
}
const ArticleListItem = ({ title, cover, text, author, category }: Props) => {
    const croppedText = text ? [...text.split('', 250), '...'].join('') : '';



    return (
        <div className="articleListItem__wrapper">
            <div className="articleListItem__cover-wrapper">
                {cover ?
                    <LazyLoadImage
                        src={require(`../assets/images/${cover}.webp`)}
                        alt={`${cover}`}
                        placeholder={<div className="cover-loader" />}
                        className='articleListItem__cover'
                    />
                    :
                    <div className="cover-loader" />
                }
            </div>

            <div className="articleListItem-content__wrapper">
                <SkeletonTheme baseColor="#a2a2a2" highlightColor="#d6d6d6">
                    <h2 className="articleListItem-content__title">{title || <Skeleton />}</h2>

                    <div className="articleListItem-content__text">{croppedText || <Skeleton count={10} />}</div>

                    <div className="articleListItem-content__author">{author || <Skeleton />}</div>
                </SkeletonTheme>
            </div>
        </div>
    )
}





export default ArticleListItem