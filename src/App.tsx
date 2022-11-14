import React, { useEffect } from 'react';

import { Route, Routes } from 'react-router-dom';
import { useAppDispatch } from './redux/hooks';
import { fetchArticles } from './redux/slices/fetchArticlesSlice';

import Header from './components/Header';
import Articles from './pages/Articles';
import Categories from './pages/Categories';





export default function App() {
	const dispatch = useAppDispatch();

	useEffect(() => {dispatch(fetchArticles())}, [dispatch]);



	return (
		<Routes>
			<Route path='/' element={<Header />}>
				<Route index element={<Articles/>} />
				<Route path='/categories' element={<Categories/>} >
					<Route path=':id' element={<Categories />} />
				</Route>
			</Route>
		</Routes>
	);
}