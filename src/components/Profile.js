import React from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { fbAuth } from '../firebaseConfig';
import { authHandler } from '../modules/auth';
import Footer from './Footer';
import './Profile.scss';

function Profile() {
	const history = useHistory();
	const dispatch = useDispatch();

	const onSignOut = async () => {
		await fbAuth.signOut();
		dispatch(authHandler.setLogin());
		history.push('/');
	};

	return (
		<div className='Profile-wrapper'>
			<div className='Profile'>
				<div className='Profile-card' onClick={onSignOut}>
					Sign Out
				</div>
				<Footer />
			</div>
		</div>
	);
}

export default Profile;
