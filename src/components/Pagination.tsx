import React, { useEffect, useState } from 'react'
import '../scss/components/pagination.scss'

import { StatusEnum } from '../types/enums';
import { Article } from '../types/interfaces';

import ReactPaginate from 'react-paginate';
import { useAppDispatch } from '../redux/hooks';
import { fetchArticles } from '../redux/slices/fetchArticlesSlice';

import ArticleListItem from './ArticleListItem';
import ArticleListItemLoader from './ArticleListItemLoader';





interface Props {
    articles: Article[],
    amountOfFetchedArticles: number | "All",
    fetchedArticles: Article[],
    amountOfAllArticles: number,
    status: StatusEnum,
    addedArticles: Article[],
    skeletonLoaders: number[]
}
const Pagination = ({ articles, amountOfFetchedArticles, fetchedArticles, amountOfAllArticles, status, addedArticles, skeletonLoaders }: Props) => {
    const dispatch = useAppDispatch();

    const [currentItems, setCurrentItems] = useState<Article[] | null>(null);
	const [itemOffset, setItemOffset] = useState<number>(0);
	const [articlesLength, setArticlesLength] = useState<number>(0);

	useEffect(() => {
		if (articles.length - itemOffset < amountOfFetchedArticles && fetchedArticles.length !== amountOfAllArticles && status !== StatusEnum.LOADING) {
			if (amountOfAllArticles - fetchedArticles.length > amountOfFetchedArticles) {
				dispatch(fetchArticles(amountOfFetchedArticles));
			} else {
				dispatch(fetchArticles(amountOfAllArticles - fetchedArticles.length));
			}
		}

	}, [amountOfAllArticles, amountOfFetchedArticles, articles.length, dispatch, fetchedArticles.length, itemOffset, status])

	useEffect(() => {
		if (articles !== null) {
			const endOffset = amountOfFetchedArticles !== 'All' ? itemOffset + amountOfFetchedArticles : 0;
			setArticlesLength(amountOfAllArticles + addedArticles.length);
			setCurrentItems(articles.slice(itemOffset, endOffset));
		}

	}, [addedArticles.length, amountOfAllArticles, amountOfFetchedArticles, articles, itemOffset]);

	const handlePageClick = (selectedItem: { selected: number }) => {
		const newOffset = amountOfFetchedArticles !== 'All' ? (selectedItem.selected * amountOfFetchedArticles) % articlesLength : 0;
		setItemOffset(newOffset);
	}



    return (
        <>
            <div className="paginated-articles-wrapper">
                {articles.length - itemOffset > amountOfFetchedArticles || fetchedArticles.length === amountOfAllArticles ?
                    currentItems?.map((item) => (
                        <ArticleListItem
                            key={item.title}
                            title={item.title}
                            cover={item.cover}
                            text={item.text}
                            author={item.author}
                            category={item.category}
                        />
                    ))
                    :
                    skeletonLoaders.map(item => (
                        <ArticleListItemLoader key={item} />
                    ))
                }
            </div>

            <div className="pagination">
                <ReactPaginate
                    onPageChange={handlePageClick}
                    pageRangeDisplayed={3}
                    pageCount={amountOfFetchedArticles !== 'All' ? Math.ceil(articlesLength / amountOfFetchedArticles) : 0}

                    previousLabel={<div className="react-paginate__label">Prev</div>}
                    nextLabel={<div className="react-paginate__label">Next</div>}
                    breakLabel={<div className="react-paginate__label">...</div>}
                    containerClassName={'react-paginate-wrapper'}
                    pageClassName={'react-paginate__link'}
                    activeClassName={'react-paginate__link--active'}
                    disabledClassName={'react-paginate__label--disabled'}
                />
            </div>
        </>
    )
}





export default Pagination