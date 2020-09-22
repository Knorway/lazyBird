import React from 'react';
import './Chat.scss';
import Footer from './Footer';

function Chat() {
	return (
		<div className='chat-wrapper'>
			<div className='chat-container'>
				<div className='chat-room'>Public channel</div>
				<Footer />
			</div>
		</div>
	);
}

export default Chat;
