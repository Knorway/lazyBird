import { createAction, createReducer } from '@reduxjs/toolkit';

const addTweet = createAction('tweet/addTweet');

export const tweetHandler = {
	add: addTweet,
};

const initialState = [];

const tweetReducer = createReducer(initialState, {
	[addTweet]: (state, { payload }) => [...payload],
});

export default tweetReducer;
