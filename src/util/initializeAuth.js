import { fbAuth } from '../firebaseConfig';
import { authHandler } from '../modules/auth';

export default async function initializeAuth(dispatch) {
	await fbAuth.onAuthStateChanged((userObj) => {
		if (userObj) {
			dispatch(
				authHandler.setLogin({
					displayName: userObj.displayName,
					uid: userObj.uid,
				})
			);
		} else {
			dispatch(authHandler.setInit(false));
		}
		dispatch(authHandler.setInit(true));
	});
}
