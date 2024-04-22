import { createBrowserRouter } from 'react-router-dom';

import Productpage from './pages/Productpage/Productpage';
import Homepage from './pages/Homepage/Homepage';
import GoToMiniApp from './pages/GoToMiniApp/GoToMiniApp';
import { S } from './pages/StillDev';
import Profile from './pages/Profile/Profile';
import { Categoriespage } from './pages/Categories/Categoriespage';

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
		path: '/orders',
		element: <S />,
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
