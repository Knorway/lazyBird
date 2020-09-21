import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { RiMapPinUserFill } from 'react-icons/ri';
import { GoPlus } from 'react-icons/go';
import Footer from './Footer';
import CreateTweet from './CreateTweet';
import { FiDelete, FiHeart } from 'react-icons/fi';
import { fbStore, fbStorage } from '../firebaseConfig';

function TweetItem({ post, user }) {
	const onDelete = async () => {
		const ok = window.confirm('Are you sure to delete this post?');
		if (ok) {
			await fbStore.doc(`posts/${post.id}`).delete();
			if (post.imgUrl) {
				fbStorage.refFromURL(post.imgUrl).delete();
			}
		}
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
				<div className='tweet-utilcons'>
					<FiHeart className='utilcon' />
					{user.uid === post.uid && (
						<FiDelete className='utilcon' onClick={onDelete} />
					)}
				</div>
				<div className='tweet-body'>
					<span>{post.text}</span>
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
						className={`create-mark ${toggled ? 'toggled' : null}`}
						onClick={onToggle}
					>
						<GoPlus className={`${toggled ? 'toggled' : null}`} />
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
		</>
	);
}

export default Tweet;
