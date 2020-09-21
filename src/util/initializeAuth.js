import { fbAuth } from '../firebaseConfig';
import { authHandler } from '../modules/auth';

export default async function initializeAuth(dispatch) {
	await fbAuth.onAuthStateChanged((userObj) => {
		if (userObj) {
			dispatch(
				authHandler.setLogin({
					displayName: userObj.displayName,
					uid: userObj.uid,
					email: userObj.email,
				})
			);
		} else {
			dispatch(authHandler.setLogin(null));
		}
		dispatch(authHandler.setInit(true));
	});
}
