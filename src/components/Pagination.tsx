import React, { useEffect, useMemo, useState } from 'react'
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
    fetchedArticlesLength: number,
    amountOfAllArticles: number,
    status: StatusEnum,
    addedArticles: Article[]
}
const Pagination = ({ articles, amountOfFetchedArticles, fetchedArticlesLength, amountOfAllArticles, status, addedArticles }: Props) => {
    const dispatch = useAppDispatch();

    const skeletonLoaders = useMemo(() => {
		let returnArr: number[] = [];
		for (let i = 0; i < (amountOfFetchedArticles === 'All' ? 10 : amountOfFetchedArticles); i++) {
			returnArr = [...returnArr, i];
		}
		return returnArr
	}, [amountOfFetchedArticles])

    const [currentItems, setCurrentItems] = useState<Article[] | null>(null);
	const [itemOffset, setItemOffset] = useState<number>(0);
	const [articlesLength, setArticlesLength] = useState<number>(0);

	useEffect(() => {
		if (articles.length - itemOffset < amountOfFetchedArticles && fetchedArticlesLength !== amountOfAllArticles && status !== StatusEnum.LOADING) {
			if (amountOfAllArticles - fetchedArticlesLength > amountOfFetchedArticles) {
				dispatch(fetchArticles(amountOfFetchedArticles));
			} else {
				dispatch(fetchArticles(amountOfAllArticles - fetchedArticlesLength));
			}
		}

	}, [amountOfAllArticles, amountOfFetchedArticles, articles.length, dispatch, fetchedArticlesLength, itemOffset, status])

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
                {articles.length - itemOffset > amountOfFetchedArticles || fetchedArticlesLength === amountOfAllArticles ?
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