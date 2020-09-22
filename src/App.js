import React, { useEffect } from 'react';
import './App.scss';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Login from './components/Login';
import initializeAuth from './util/initializeAuth';
import Profile from './components/Profile';
import Chat from './components/Chat';
import getPostsSnapShot from './util/getPostsSnapShot';
import Tweet from './components/Tweet';
import ErrorPage from './components/ErrorPage';

function App() {
	const { userObj, init } = useSelector((state) => state.auth);
	const dispatch = useDispatch();

	useEffect(() => {
		initializeAuth(dispatch);
		getPostsSnapShot(dispatch);
	}, [dispatch]);

	if (!init) return null;
	if (!userObj) return <Login />;

	return (
		<BrowserRouter>
			<Switch>
				<Route path='/' exact component={Tweet} />
				<Route path='/profile' component={Profile} />
				<Route path='/public-chat' component={Chat} />
				<Route component={ErrorPage} />
			</Switch>
		</BrowserRouter>
	);
}

export default App;
