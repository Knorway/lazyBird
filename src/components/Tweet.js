import React from 'react';
import { useSelector } from 'react-redux';
import { RiMapPinUserFill } from 'react-icons/ri';
import Footer from './Footer';

function TweetItem() {
	const { userObj: user } = useSelector((state) => state.auth);
	return (
		<>
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
					<span>shouldn't build this like this</span>
				</div>
			</div>
		</>
	);
}

function Tweet() {
	return (
		<>
			<div className='Tweet-container'>
				<div className='Tweet'>
					<TweetItem />
				</div>
				<Footer />
			</div>
		</>
	);
}

export default Tweet;
