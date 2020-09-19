import React from 'react';
import { FaUserAlt } from 'react-icons/fa';
import { BsFillChatFill } from 'react-icons/bs';
import { Link } from 'react-router-dom';

function Footer() {
	return (
		<div className='Footer'>
			<Link to='/profile' className='section section-user'>
				<div>
					<FaUserAlt />
				</div>
			</Link>
			<Link to='/chat' className='section'>
				<div>
					<BsFillChatFill />
				</div>
			</Link>
		</div>
	);
}

export default Footer;
