import React, { useEffect, useState } from 'react';
import './Login.scss';
import { fbAuth } from '../firebaseConfig';
import firebase from '../firebaseConfig';
import { CgClose } from 'react-icons/cg';

function Login() {
	const [toggled, setToggled] = useState(false);
	const [account, setAccount] = useState({
		email: '',
		password: '',
	});
	const { email, password } = account;

	const onChange = (e) => {
		const { name, value } = e.target;
		setAccount((state) => ({
			...state,
			[name]: value,
		}));
	};
	const onSignIn = async (e) => {
		e.preventDefault();
		await fbAuth.signInWithEmailAndPassword(email, password);
	};
	const onSignUp = async (e) => {
		e.preventDefault();
		await fbAuth.createUserWithEmailAndPassword(email, password);
	};
	const onToggleForm = () => {
		setToggled((toggle) => !toggle);
	};
	const onAuthPopUp = async (e) => {
		const name = e.target.name;
		let provider;
		if (name === 'google') {
			provider = new firebase.auth.GoogleAuthProvider();
		} else if (name === 'github') {
			provider = new firebase.auth.GithubAuthProvider();
		}
		await fbAuth.signInWithPopup(provider);
	};

	useEffect(() => {
		setToggled(false);
	}, []);

	return (
		<>
			<div className='Login-container'>
				<div className='Login-card'>
					<img src='logo.png' alt='logo' />
					<form className='login-form' onSubmit={onSignIn}>
						<input
							type='email'
							name='email'
							onChange={onChange}
							autoComplete='off'
							autoFocus
						/>
						<input
							type='password'
							name='password'
							onChange={onChange}
						/>
						<button type='submit'>Sign In</button>
					</form>
					<div className='btn-group'>
						<button onClick={onToggleForm}>Create Account</button>
						<button onClick={onAuthPopUp} name='google'>
							Log in with Google
						</button>
						<button onClick={onAuthPopUp} name='github'>
							Log in with Github
						</button>
					</div>
				</div>
				<div className={`create-card ${toggled ? 'toggled' : ''}`}>
					<CgClose className='close-mark' onClick={onToggleForm} />
					<form className='create-form' onSubmit={onSignUp}>
						<input
							type='email'
							name='email'
							onChange={onChange}
							autoComplete='off'
							autoFocus
						/>
						<input
							type='password'
							name='password'
							onChange={onChange}
						/>
						<button type='submit'>Sign Up</button>
					</form>
				</div>
			</div>
		</>
	);
}

export default Login;
