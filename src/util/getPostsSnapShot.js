import { fbStore } from '../firebaseConfig';
import { tweetHandler } from '../modules/tweet';

function getPostsSnapShot(dispatch) {
	fbStore
		.collection('posts')
		.orderBy('timeStamp', 'desc')
		.onSnapshot((shot) => {
			const newArray = shot.docs.map((doc) => ({
				id: doc.id,
				...doc.data(),
			}));
			dispatch(tweetHandler.add(newArray));
		});
}

export default getPostsSnapShot;
