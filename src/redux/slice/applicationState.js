import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	product: {}
};

export const appSlice = createSlice({
	name: 'appState',
	initialState,
	reducers: {
		setProduct: (state, {payload}) => payload
	},
});

export const { 
	setProduct
} = appSlice.actions;

export default appSlice.reducer;
