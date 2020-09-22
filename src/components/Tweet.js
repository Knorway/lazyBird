import React, { useEffect, useRef, useState } from 'react';
import './Tweet.scss';
import Footer from './Footer';
import { useSelector } from 'react-redux';
import { RiMapPinUserFill, RiSendPlaneFill } from 'react-icons/ri';
import { GoPlus } from 'react-icons/go';
import { MdDeleteSweep } from 'react-icons/md';
import CreateTweet from './CreateTweet';
import { fbStore, fbStorage } from '../firebaseConfig';
import { FaRegEdit, FaRegHeart } from 'react-icons/fa';

function TweetItem({ post, user }) {
	const [newText, setNewText] = useState(post.text);
	const [toggled, setToggeld] = useState(false);
	const onDelete = async () => {
		const ok = window.confirm('Are you sure to delete this post?');
		if (ok) {
			await fbStore.doc(`posts/${post.id}`).delete();
			if (post.imgUrl) {
				fbStorage.refFromURL(post.imgUrl).delete();
			}
		}
	};
	const onEditPost = () => {
		setToggeld((state) => !state);
	};
	const onChange = (e) => setNewText(e.target.value);
	const onEditing = (e) => {
		e.preventDefault();
		fbStore.doc(`posts/${post.id}`).update({
			text: newText,
		});
		setToggeld(false);
	};

	return (
		<div>
			<div className='Tweet-item'>
				<div className='username'>
					<RiMapPinUserFill />
					<h4>{user.displayName}</h4>
				</div>
				<div className='img-div'>
					{post.imgUrl && <img src={`${post.imgUrl}`} alt='pic' />}
				</div>
				<div className='createdAt'>
					<span>Posted at </span>
					{post.createdAt}
				</div>
				<div className='tweet-utilcons'>
					<FaRegHeart className='utilcon' />
					{user.uid === post.uid && (
						<FaRegEdit className='utilcon' onClick={onEditPost} />
					)}
					{user.uid === post.uid && (
						<MdDeleteSweep className='utilcon' onClick={onDelete} />
					)}
				</div>
				<div className='tweet-body'>
					<span className={`${toggled && 'toggled'}`}>
						{post.text}
					</span>
					{toggled && (
						<>
							<form onSubmit={onEditing}>
								<input
									type='text'
									className='edit-post-input'
									value={newText}
									onChange={onChange}
								/>
							</form>
							<div className='input-edit-icon'>
								<RiSendPlaneFill className='edit-icon' />
							</div>
						</>
					)}
				</div>
			</div>
		</div>
	);
}

function Tweet() {
	const { userObj } = useSelector((state) => state.auth);
	const posts = useSelector((state) => state.posts);
	const [toggled, setToggled] = useState(true);
	const [imgUrl, setImgUrl] = useState('');
	const tweetNode = useRef();
	const onToggle = () => {
		setToggled((state) => !state);
		setImgUrl(null);
	};
	const onGoUp = () => {
		tweetNode.current.scrollTo(0, 0);
	};
	const onFileUpload = (e) => {
		const file = e.target.files[0];
		const reader = new FileReader();
		reader.onloadend = (e) => {
			setImgUrl(e.currentTarget.result);
		};
		reader.readAsDataURL(file);
	};

	useEffect(() => {
		onToggle();
	}, []);

	return (
		<>
			<div className='Tweet-wrapper'>
				<div className='Tweet-container'>
					<div className='Tweet' ref={tweetNode}>
						{posts &&
							posts.map((post) => (
								<TweetItem
									key={post.id}
									post={post}
									user={userObj}
								/>
							))}
						<div
							className={`create-mark ${
								toggled ? 'toggled' : null
							}`}
							onClick={onToggle}
						>
							<GoPlus
								className={`${toggled ? 'toggled' : null}`}
							/>
						</div>
					</div>
					<Footer />
					<CreateTweet
						toggled={toggled}
						onToggle={onToggle}
						onGoUp={onGoUp}
						onFileUpload={onFileUpload}
						imgUrl={imgUrl}
					/>
				</div>
			</div>
		</>
	);
}

export default Tweet;
