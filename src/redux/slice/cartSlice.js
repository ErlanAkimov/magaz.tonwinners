import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	needDelivery: false,
};

export const cartSlice = createSlice({
	name: 'cart',
	initialState,
	reducers: {
		changeNeedDelivery: (state, { payload }) => {
			if (typeof payload === 'boolean' || payload === false) {
				payload === true ? state.needDelivery = true : state.needDelivery = false;
				
			} 

			if (payload === undefined) {
				state.needDelivery = !state.needDelivery;
			}
		},
	},
});

export const { changeNeedDelivery } = cartSlice.actions;

export default cartSlice.reducer;
