import { createBrowserRouter } from 'react-router-dom';

import Productpage from './pages/Productpage/Productpage';
import Homepage from './pages/Homepage/Homepage';
import GoToMiniApp from './pages/GoToMiniApp/GoToMiniApp';
import Profile from './pages/Profile/Profile';
import { Categoriespage } from './pages/Categories/Categoriespage';
import { ChangeAddress } from './pages/ChangeAddress/ChangeAddress';
import { CreateNewAddress } from './pages/CreateNewAddress/CreateNewAddress';
import { Orderspage } from './pages/Cart/Orderspage';



export const router = createBrowserRouter([
	{
		path: '/',
		element: <Homepage />,
	},
	{
		path: '/categories',
		element: <Categoriespage />,
	},
	{
		path: '/product/:productId',
		element: <Productpage />,
	},

	{
		path: '/change-my-address/:addressId',
		element: <ChangeAddress />,
	},

	{
		path: '/create-new-address',
		element: <CreateNewAddress />,
	},
	{
		path: '/orders',
		element: <Orderspage />,
	},

	{
		path: '/profile',
		element: <Profile />,
	},
]);

export const desktopRouter = createBrowserRouter([
	{
		path: '*',
		element: <GoToMiniApp />,
	},
]);
