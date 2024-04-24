import { createBrowserRouter } from 'react-router-dom';

import Productpage from './pages/Productpage/Productpage';
import Homepage from './pages/Homepage/Homepage';
import GoToMiniApp from './pages/GoToMiniApp/GoToMiniApp';
import Profile from './pages/Profile/Profile';
import { Categoriespage } from './pages/Categories/Categoriespage';
import { ChangeAddress } from './pages/ChangeAddress/ChangeAddress';



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
		path: '/product/:product-id',
		element: <Productpage />,
	},

	{
		path: '/change-address',
		element: <ChangeAddress />,
	},

	{
		path: '/create-new-address',
		element: <ChangeAddress />,
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
