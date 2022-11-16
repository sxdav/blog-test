import React, { useEffect } from 'react';
import './scss/app.scss'

import { StatusEnum } from './types/enums';

import { useAppDispatch, useAppSelector } from './redux/hooks';
import { fetchArticles } from './redux/slices/fetchArticlesSlice';
import ReactPaginate from 'react-paginate';

import Header from './components/Header';
import ArticleListItem from './components/ArticleListItem'
import Menu from './components/Menu';





export default function App() {
	const dispatch = useAppDispatch();

	const { page, category } = useAppSelector(state => state.navigation);
	const { addedArticles } = useAppSelector(state => state.addedArticles);
	const { amountOfFetchedArticles, fetchedArticles, status } = useAppSelector(state => state.fetchArticles);
	const { view } = useAppSelector(state => state.view);

	const articles = status === StatusEnum.SUCCESS ? [...addedArticles, ...fetchedArticles] : null;

	useEffect(() => { dispatch(fetchArticles(amountOfFetchedArticles)) }, [amountOfFetchedArticles, dispatch]);



	return (
		<div className="wrapper">
			<Header dispatch={dispatch} page={page} category={category} />

			<div className="main">
				<div className="content-wrapper">
					<Menu amountOfFetchedArticles={amountOfFetchedArticles} />
				</div>
			</div>


			{/* <ArticleListItem
				title={articles[0].title}
				cover={articles[0].cover}
				text={articles[0].text}
				author={articles[0].author}
				category={articles[0].category}
			/>

			<ReactPaginate
				breakLabel="..."
				nextLabel="Show more products >"
				previousLabel="Back"
				onPageChange={handlePageClick}
				pageRangeDisplayed={5}
				pageCount={pageCount}
				containerClassName="pagination"
				pageClassName="pagination__link"
				activeClassName="pagination__link--active"
				previousClassName="pagination__prev"
				nextClassName="pagination__next"
				disabledClassName="pagination__disabled"
			/> */}
		</div>
	);
}