import React, { useEffect, useState } from 'react'

import { CategoriesEnum, PagesEnum, StatusEnum } from '../types/enums';
import { Article } from '../types/interfaces';

import { fetchArticles } from '../redux/slices/fetchArticlesSlice';
import { useAppDispatch } from '../redux/hooks';

import InfiniteScrollComponent from 'react-infinite-scroller';
import ArticleItem from './Article';
import ArticleLoader from './ArticleLoader';





interface Props {
    page: PagesEnum,
    category: CategoriesEnum | null
    articles: Article[],
    fetchedArticlesLength: number,
    amountOfAllArticles: number,
    status: StatusEnum,
    skeletonLoaders: number[]
}
const InfiniteScroll = ({ skeletonLoaders, page, category, articles, fetchedArticlesLength, amountOfAllArticles, status }: Props) => {
    const dispatch = useAppDispatch();

    const getNewArticles = () => {
        if (fetchedArticlesLength !== amountOfAllArticles && status !== StatusEnum.LOADING) {
            dispatch(fetchArticles({ amountOfFetchedArticles: 10, category }));
        }
    }

    const [isFirstLoadingDone, setisFirstLoadingDone] = useState<boolean>(false);
    useEffect(() => {status === StatusEnum.SUCCESS && setisFirstLoadingDone(true)}, [])



    return (
        <InfiniteScrollComponent
            loadMore={getNewArticles}
            hasMore={fetchedArticlesLength !== amountOfAllArticles}
            threshold={1000}
        >
            {isFirstLoadingDone && articles.map(article => (
                <ArticleItem
                    key={article.title}
                    title={article.title}
                    cover={article.cover}
                    text={article.text}
                    author={article.author}
                    category={article.category}
                />
            ))}
            {status === StatusEnum.LOADING &&
                skeletonLoaders.map((article, index) => (
                    <ArticleLoader key={index} />
                ))
            }
        </InfiniteScrollComponent>
    )
}





export default InfiniteScroll