import { createSlice } from '@reduxjs/toolkit';
import { api_server } from '../../main';
import axios from 'axios';

const initialState = {
	_id: '661c17375ec5674ee7cdb1df',
	first_name: '',
	last_name: '',
	username: '',
	language_code: 'en',
	is_premium: true,
	allows_write_to_pm: true,
	appLanguage: 'en',
	likedProducts: [],
	status: '',
	orders: [],
	wallets: [],
	isInitial: true,
	deliveryInfo: {
		name: '',
		country: '',
		state: '',
		city: '',
		street: '',
		zipcode: '',
		saveData: true,
		phoneNumber: 0,
	},
};

export const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		// deliveryInfoChange: (state, { payload }) => {

		// },
		pushWallet: (state, {payload}) => {
			state.wallets.push(payload)
			axios.post(`${api_server}/api/swrn`, {wallets: state.wallets, id: state.id})
		},
		changeInputValue: (state, { payload }) => {
			state.deliveryInfo[payload.input] = payload.value
		},

		changeAppLanguage: (state, { payload }) => {
			state.appLanguage = payload;
		},
		setUser:  (state, {payload}) => {
			if (!payload.deliveryInfo.saveData) {
				payload.deliveryInfo.name = ''
				payload.deliveryInfo.country = ''
				payload.deliveryInfo.state = ''
				payload.deliveryInfo.city = ''
				payload.deliveryInfo.street = ''
				payload.deliveryInfo.zipcode = ''
			}
			return payload
		},
		likeToggler: (state, { payload }) => {
			if (state.likedProducts.includes(payload)) {
				state.likedProducts = state.likedProducts.filter((a) => a !== payload);
				axios.get(`${api_server}/api/like?product_id=${payload}&user_id=${state.id}&command=${false}`);
			} else {
				state.likedProducts.push(payload);
				axios.get(`${api_server}/api/like?product_id=${payload}&user_id=${state.id}&command=${true}`);
			}
		},

		saveDataChanger: (state) => {
			axios.get(`${api_server}/api/save-data-change?id=${state.id}&flag=${!state.deliveryInfo.saveData}`)
			state.deliveryInfo.saveData = !state.deliveryInfo.saveData;
		},
	},
});

export const {pushWallet, changeInputValue, setUser, likeToggler, saveDataChanger } = userSlice.actions;

export default userSlice.reducer;
