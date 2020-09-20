import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RiMapPinUserFill } from 'react-icons/ri';
import { GoPlus } from 'react-icons/go';
import Footer from './Footer';
import CreateTweet from './CreateTweet';

function TweetItem({ post }) {
	const { userObj: user } = useSelector((state) => state.auth);

	return (
		<div>
			<div className='Tweet-item'>
				<div className='username'>
					<RiMapPinUserFill />
					<h4>{user.displayName}</h4>
				</div>
				<div className='img-div'>
					<img
						src='https://source.unsplash.com/random/350x200'
						alt='pic'
					/>
				</div>
				<div className='tweet-body'>
					<span>{post.text}</span>
				</div>
			</div>
		</div>
	);
}

function Tweet() {
	const posts = useSelector((state) => state.posts);
	const [toggled, setToggled] = useState(true);
	const onToggle = () => {
		setToggled((state) => !state);
	};

	useEffect(() => {
		onToggle();
	}, []);

	return (
		<>
			<div className='Tweet-container'>
				<div className='Tweet'>
					{posts &&
						posts.map((post) => (
							<TweetItem key={post.id} post={post} />
						))}
					<div
						className={`create-mark ${toggled ? 'toggled' : null}`}
						onClick={onToggle}
					>
						<GoPlus className={`${toggled ? 'toggled' : null}`} />
					</div>
				</div>
				<Footer />
				<CreateTweet toggled={toggled} onToggle={onToggle} />
			</div>
		</>
	);
}

export default Tweet;
