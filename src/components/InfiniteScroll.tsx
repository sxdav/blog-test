import React from 'react'

import { StatusEnum } from '../types/enums';
import { Article } from '../types/interfaces';

import { fetchArticles } from '../redux/slices/fetchArticlesSlice';
import { useAppDispatch } from '../redux/hooks';

import InfiniteScrollComponent from 'react-infinite-scroller';
import ArticleListItemLoader from './ArticleListItemLoader';
import ArticleItem from './Article';





interface Props {
    articles: Article[],
    fetchedArticlesLength: number,
    amountOfAllArticles: number,
    status: StatusEnum
}
const InfiniteScroll = ({ articles, fetchedArticlesLength, amountOfAllArticles, status }: Props) => {
    const dispatch = useAppDispatch();

    const getNewArticles = () => {
        if (fetchedArticlesLength !== amountOfAllArticles && status !== StatusEnum.LOADING) {
            dispatch(fetchArticles(10));
        }
    }



    return (
        <InfiniteScrollComponent
            loadMore={getNewArticles}
            hasMore={fetchedArticlesLength !== amountOfAllArticles}
            threshold={1000}
            // loader={<ArticleListItemLoader key={`${articles[0].title}1`} />}
        >
            {articles.map(article => (
                <ArticleItem
                    key={article.title}
                    title={article.title}
                    cover={article.cover}
                    text={article.text}
                    author={article.author}
                    category={article.category}
                />
            ))}
        </InfiniteScrollComponent>
    )
}





export default InfiniteScroll