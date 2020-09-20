import { combineReducers } from 'redux';
import authReducer from './auth';
import tweetReducer from './tweet';

const rootReducer = combineReducers({
	auth: authReducer,
	posts: tweetReducer,
});

export default rootReducer;
