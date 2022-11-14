import React from 'react';

import { Route, Routes } from 'react-router-dom';

import Header from './components/Header';
import Articles from './pages/Articles';
import Categories from './pages/Categories';





export default function App() {
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