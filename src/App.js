import React, { useEffect } from 'react';
import './App.scss';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Login from './components/Login';
import Home from './components/Home';
import initializeAuth from './util/initializeAuth';

function App() {
	const { userObj, init } = useSelector((state) => state.auth);
	const dispatch = useDispatch();

	useEffect(() => {
		initializeAuth(dispatch);
	}, [dispatch]);

	if (!init) return null;

	return (
		<BrowserRouter>
			<Switch>
				{!userObj && <Login />}
				<Route path='/' exact component={Home} />
			</Switch>
		</BrowserRouter>
	);
}

export default App;
