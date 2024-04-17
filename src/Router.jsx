import { createBrowserRouter } from 'react-router-dom';

import Homepage from './pages/Homepage/Homepage';
import GoToMiniApp from './pages/GoToMiniApp/GoToMiniApp';
import { S } from './pages/StillDev';
import Profile from './pages/Profile/Profile';

export const router = createBrowserRouter([
	{
		path: '/',
		element: <Homepage />,
	},
	{
		path: '/categories',
		element: <S />,
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
