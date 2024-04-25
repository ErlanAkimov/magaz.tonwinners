import { createSlice } from '@reduxjs/toolkit';
import { api_server } from '../../main';
import axios from 'axios';

const initialState = {
	_id: '661c17375ec5674ee7cdb1df',
	id: 628122813,
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
	cart: [

	],
	savedAddresses: [
		{
			id: 1,
			name: 'Home address',
			country: 'USA',
			state: 'Florida',
			city: 'Miami',
			street: 'Lenin',
			zip: 'miami 1698',
		},
		{
			id: 2,
			name: 'Mother',
			country: 'USA',
			state: 'Florida',
			city: 'Miami',
			street: 'Lenin',
			zip: 'miami 1698',
		},
		{
			id: 3,
			name: 'Garage address',
			country: 'USA',
			state: 'Florida',
			city: 'Miami',
			street: 'Lenin',
			zip: 'miami 1698',
		},
	],
};

export const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		// deliveryInfoChange: (state, { payload }) => {

		// },
		pushWallet: (state, { payload }) => {
			state.wallets.push(payload);
			axios.post(`${api_server}/api/swrn`, { wallets: state.wallets, id: state.id });
		},
		changeInputValue: (state, { payload }) => {
			state.deliveryInfo[payload.input] = payload.value;
		},

		changeAppLanguage: (state, { payload }) => {
			state.appLanguage = payload;
		},
		setUser: (state, { payload }) => {
			return payload;
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
			axios.get(`${api_server}/api/save-data-change?id=${state.id}&flag=${!state.deliveryInfo.saveData}`);
			state.deliveryInfo.saveData = !state.deliveryInfo.saveData;
		},

		changeAddress: (state, { payload }) => {
			const newList = state.savedAddresses.filter((address) => address.id != payload.id);
			state.savedAddresses = [...newList, payload];
			axios.post(`${api_server}/api/change-saved-address`, { user: state.id, savedAddresses: state.savedAddresses });
		},
		addToCart: (state, { payload }) => {
			state.cart.push(payload);
			axios.post(`${api_server}/api/add-to-cart`, { id: state.id, product: payload})
		},
		removeFromCart: (state, { payload }) => {
			const indexToRemove = state.cart.findIndex((item) => item._id === payload._id);
			if (indexToRemove !== -1) {
				console.log(state.cart)
				state.cart.splice(indexToRemove, 1);
				console.log(state.cart)
			}	
			axios.post(`${api_server}/api/remove-from-cart`, { id: state.id, cart: state.cart})

		},
		emptyCart: (state, { payload }) => {
			state.cart = [];
		},
	},
});

export const { emptyCart, pushWallet, removeFromCart, addToCart, changeInputValue, setUser, likeToggler, saveDataChanger, changeAddress } =
	userSlice.actions;

export default userSlice.reducer;
