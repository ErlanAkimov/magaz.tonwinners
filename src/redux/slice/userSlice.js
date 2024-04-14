import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios'
import { api_server } from '../../main';

const initialState = {
	appLanguage: 'en',
	likedProducts: [],
	deliveryInfo: {
		name: '',
		country: '',
		state: '',
		city: '',
		street: '',
		ZIPcode: '',
		phoneNumber: 0,
	},
	orders: [],
};

export const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		// Передается строка 'ru'/'en'
		changeAppLanguage: (state, { payload }) => {
			state.appLanguage = payload;
		},

		setUser: (state, { payload }) => {
			return payload;
		},

		likeToggler: (state, { payload }) => {
			if (state.likedProducts.includes(payload)) {
				console.log('содержит')
				state.likedProducts = state.likedProducts.filter(a => a !== payload)
				axios.get(`${api_server}/api/like?product_id=${payload}&user_id=${state.id}&command=${false}`)
			} else {
				state.likedProducts.push(payload)
				axios.get(`${api_server}/api/like?product_id=${payload}&user_id=${state.id}&command=${true}`)
			}
		}
	},
});

export const { setUser, likeToggler} = userSlice.actions;

export default userSlice.reducer;
