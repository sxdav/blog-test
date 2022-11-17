import React, { useEffect, useMemo } from 'react';
import './scss/app.scss'

import { PagesEnum } from './types/enums';

import { useAppDispatch, useAppSelector } from './redux/hooks';

import Header from './components/Header';
import Menu from './components/Menu';
import Pagination from './components/Pagination';
import InfiniteScroll from './components/InfiniteScroll';
import { resetFetchArticles } from './redux/slices/fetchArticlesSlice';





export default function App() {
	const dispatch = useAppDispatch();

	const { page, category } = useAppSelector(state => state.navigation);
	const { addedArticles } = useAppSelector(state => state.addedArticles);
	const { amountOfFetchedArticles, amountOfAllArticles, fetchedArticles, status } = useAppSelector(state => state.fetchArticles);


	useEffect(() => {dispatch(resetFetchArticles())}, [category, dispatch]);

	const articles = useMemo(() => {
		if (!category) {
			return [...addedArticles, ...fetchedArticles];
		} else {
			const filteredArticles = addedArticles.filter(article => article.category === category);
			return [...filteredArticles, ...fetchedArticles];
		}
		

	}, [addedArticles, category, fetchedArticles]);

	const skeletonLoaders = useMemo(() => {
		let returnArr: number[] = [];
		for (let i = 0; i < (amountOfFetchedArticles === 'All' ? 10 : amountOfFetchedArticles); i++) {
			returnArr = [...returnArr, i];
		}
		return returnArr
	}, [amountOfFetchedArticles])



	return (
		<div className="wrapper">
			<Header dispatch={dispatch} page={page} category={category} />

			<div className="main">
				{page === PagesEnum.Articles &&
					<div className="content-wrapper">
						<Menu amountOfFetchedArticles={amountOfFetchedArticles} />

						{amountOfFetchedArticles === 'All' ?
							<InfiniteScroll
								page={page}
								category={category}
								articles={articles}
								fetchedArticlesLength={fetchedArticles.length}
								amountOfAllArticles={amountOfAllArticles}
								status={status}
								skeletonLoaders={skeletonLoaders}
							/>
							:
							<Pagination
								articles={articles}
								amountOfFetchedArticles={amountOfFetchedArticles}
								fetchedArticlesLength={fetchedArticles.length}
								amountOfAllArticles={amountOfAllArticles}
								status={status}
								addedArticles={addedArticles}
								skeletonLoaders={skeletonLoaders}
							/>}
					</div>
				}

				{page === PagesEnum.Categories &&
					<div className="content-wrapper">
						<InfiniteScroll
							page={page}
							category={category}
							articles={articles}
							fetchedArticlesLength={fetchedArticles.length}
							amountOfAllArticles={amountOfAllArticles}
							status={status}
							skeletonLoaders={skeletonLoaders}
						/>
					</div>
				}
			</div>
		</div>
	);
}