import React, { useEffect, useState } from 'react';
import './Profile.scss';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { fbAuth } from '../firebaseConfig';
import { authHandler } from '../modules/auth';
import { BiArrowBack } from 'react-icons/bi';
import { MdEdit, MdSettings } from 'react-icons/md';
import Footer from './Footer';
import { FaPowerOff } from 'react-icons/fa';
import initializeAuth from '../util/initializeAuth';

function Profile() {
	const { userObj: user } = useSelector((state) => state.auth);
	const [toggled, setToggled] = useState(false);
	const [edited, setEdited] = useState(user.displayName || '');
	const history = useHistory();
	const dispatch = useDispatch();

	const onSignOut = async () => {
		await fbAuth.signOut();
		dispatch(authHandler.setLogin());
		history.push('/');
	};
	const ontoggle = () => {
		setToggled((state) => !state);
	};
	const onSubmit = async (e) => {
		e.preventDefault();
		await fbAuth.currentUser.updateProfile({ displayName: edited });
		initializeAuth(dispatch);
		setToggled((state) => !state);
	};
	const onChange = (e) => {
		setEdited(e.target.value);
	};

	useEffect(() => {
		if (!user.displayName) {
			setToggled((state) => !state);
		}
	}, [user.displayName]);

	return (
		<div className='Profile-wrapper'>
			<div className='Profile'>
				<div className='Profile-card'>
					<div className='section-settings'>
						<div
							className='settings-icon'
							onClick={() => history.push('/')}
						>
							<BiArrowBack />
						</div>
						<div className='settings-icon'>
							<MdSettings />
						</div>
					</div>
					<div className='Account-Detail'>
						<h2>Account detail</h2>
					</div>
					<div className='section-account'>
						<div className='img-container'>
							<img src='user-circle-solid.svg' alt='user' />
						</div>
						<div className='display-container'>
							{toggled && (
								<>
									<form
										onSubmit={onSubmit}
										className={`edit-form ${
											toggled && 'toggled'
										}`}
									>
										<input
											onChange={onChange}
											value={edited}
											className='edit-input'
											placeholder='Edit your name'
											type='text'
										/>
										<div className='input-edit-icon'>
											<MdEdit onClick={onSubmit} />
										</div>
									</form>
								</>
							)}
							<h4 className={`${toggled && 'toggled'}`}>
								{user.displayName}{' '}
								<MdEdit
									className='edit-icon'
									onClick={ontoggle}
								/>
							</h4>
							<p>{user.email}</p>
						</div>
						<div className='util-container'>
							<div className='btn-signout' onClick={onSignOut}>
								<FaPowerOff />
							</div>
						</div>
					</div>
					<div className='Account-Detail myposts'>
						<h2>My posts</h2>
					</div>
				</div>
				<Footer />
			</div>
		</div>
	);
}

export default Profile;
