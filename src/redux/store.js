import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slice/userSlice';
import cartReducer from './slice/cartSlice';
import appReducer from './slice/applicationState';

export const store = configureStore({
	reducer: {
		user: userReducer,
		cart: cartReducer,
		appState: appReducer,
	},
});
