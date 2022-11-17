import React, { useMemo } from 'react';
import './scss/app.scss'

import { useAppDispatch, useAppSelector } from './redux/hooks';

import Header from './components/Header';
import Menu from './components/Menu';
import Pagination from './components/Pagination';
import InfiniteScroll from './components/InfiniteScroll';





export default function App() {
	const dispatch = useAppDispatch();

	const { page, category } = useAppSelector(state => state.navigation);
	const { addedArticles } = useAppSelector(state => state.addedArticles);
	const { amountOfFetchedArticles, amountOfAllArticles, fetchedArticles, status } = useAppSelector(state => state.fetchArticles);
	// const { view } = useAppSelector(state => state.view);



	const articles = useMemo(() => [...addedArticles, ...fetchedArticles], [addedArticles, fetchedArticles]);
	const skeletonLoaders = useMemo(() => {
		let returnArr: number[] = [];
		for (let i = 0; i < amountOfFetchedArticles; i++) {
			returnArr = [...returnArr, i];
		}
		return returnArr
	}, [amountOfFetchedArticles])



	return (
		<div className="wrapper">
			<Header dispatch={dispatch} page={page} category={category} />

			<div className="main">
				<div className="content-wrapper">
					<Menu amountOfFetchedArticles={amountOfFetchedArticles} />

					{amountOfFetchedArticles === 'All' ?
						<InfiniteScroll />
						:
						<Pagination
							articles={articles}
							amountOfFetchedArticles={amountOfFetchedArticles}
							fetchedArticles={fetchedArticles}
							amountOfAllArticles={amountOfAllArticles}
							status={status}
							addedArticles={addedArticles}
							skeletonLoaders={skeletonLoaders}
						/>
					}
				</div>
			</div>
		</div>
	);
}