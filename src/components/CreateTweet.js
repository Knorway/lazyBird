import React, { useState } from 'react';
import { RiSendPlaneFill } from 'react-icons/ri';
import { BsImageFill } from 'react-icons/bs';
import './CreateTweet.scss';
import { fbStore, fbStorage } from '../firebaseConfig';
import { useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';

function CreateTweet({ toggled, onToggle, onGoUp, onFileUpload, imgUrl }) {
	const [text, setText] = useState('');
	const { userObj } = useSelector((state) => state.auth);

	const onSubmit = async (e) => {
		e.preventDefault();
		if (text === '' || imgUrl === '') return;
		const fileRef = fbStorage.ref().child(`${userObj.uid}/${uuidv4()}`);
		const reponse = await fileRef.putString(imgUrl, 'data_url');
		const fileUrl = await reponse.ref.getDownloadURL();
		const post = {
			text,
			uid: userObj.uid,
			timeStamp: Date.now(),
			imgUrl: fileUrl,
		};
		await fbStore.collection('posts').add(post);
		setText('');
		onToggle();
		onGoUp();
	};
	const onChange = (e) => {
		setText(e.target.value);
	};

	return (
		<div className={`CreateTweet ${toggled && 'toggled'}`}>
			<div className='img-holder'>
				{imgUrl && <img src={imgUrl} alt='post' />}
			</div>
			<div className='form-container'>
				<form className='form' onSubmit={onSubmit}>
					<input type='text' onChange={onChange} value={text} />
					<button>
						<RiSendPlaneFill />
					</button>
					<input
						type='file'
						accept='image/*'
						id='file-upload-input'
						onChange={onFileUpload}
					/>
					<label htmlFor='file-upload-input'>
						<BsImageFill className='upload-icon' />
					</label>
				</form>
			</div>
		</div>
	);
}

export default CreateTweet;
