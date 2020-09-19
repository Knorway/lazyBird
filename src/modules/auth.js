import { createAction, createReducer } from '@reduxjs/toolkit';

const initialState = {
	userObj: false,
	init: false,
};

const setLogin = createAction('auth/setLogin');
const setInit = createAction('auth/setInit');

const authReducer = createReducer(initialState, {
	[setLogin]: (state, { payload }) => ({
		...state,
		userObj: payload,
	}),
	[setInit]: (state, { payload }) => ({
		...state,
		init: payload,
	}),
});

export default authReducer;
export const authHandler = {
	setLogin,
	setInit,
};
