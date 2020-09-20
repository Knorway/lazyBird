import React, { useState } from 'react';
import { RiSendPlaneFill } from 'react-icons/ri';
import { FiPaperclip } from 'react-icons/fi';
import './CreateTweet.scss';
import { fbStore } from '../firebaseConfig';
import { useSelector } from 'react-redux';

function CreateTweet({ toggled, onToggle }) {
	const [text, setText] = useState('');
	const { userObj } = useSelector((state) => state.auth);
	const onSubmit = async (e) => {
		e.preventDefault();
		if (text === '') return;
		const post = {
			text,
			createdAt: Date.now(),
			uid: userObj.uid,
		};
		await fbStore.collection('posts').add(post);
		setText('');
		onToggle();
	};
	const onChange = (e) => {
		setText(e.target.value);
	};

	return (
		<div className={`CreateTweet ${toggled && 'toggled'}`}>
			<div className='img-holder'>img</div>
			<div className='form-container'>
				<form className='form' onSubmit={onSubmit}>
					<input type='text' onChange={onChange} value={text} />
					<button>
						<RiSendPlaneFill />
					</button>
					<button>
						<FiPaperclip />
					</button>
				</form>
			</div>
		</div>
	);
}

export default CreateTweet;
