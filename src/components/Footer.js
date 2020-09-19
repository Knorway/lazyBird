import React from 'react';
import './Footer.scss';
import { FaUserAlt } from 'react-icons/fa';
import { BsFillChatFill } from 'react-icons/bs';

function Footer() {
	return (
		<div className='Footer'>
			<div className='section section-user'>
				<FaUserAlt />
			</div>
			<div className='section'>
				<BsFillChatFill />
			</div>
		</div>
	);
}

export default Footer;
