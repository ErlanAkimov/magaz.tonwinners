import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	modalIsOpen: false
};

export const appSlice = createSlice({
	name: 'appState',
	initialState,
	reducers: {
		openDeliveryInfoModal: state => state.deliveryInfoModalIsOpen = true,
		closeDeliveryInfoModal: state => state.deliveryInfoModalIsOpen = false,
		openOrderDetailsModal: state => state.orderDetailsModalIsOpen = true,
		closeOrderDetailsModal: state => state.orderDetailsModalIsOpen = false,

	},
});

export const { 
	openDeliveryInfoModal,
	closeDeliveryInfoModal,
	openOrderDetailsModal,
	closeOrderDetailsModal	
} = appSlice.actions;

export default appSlice.reducer;
