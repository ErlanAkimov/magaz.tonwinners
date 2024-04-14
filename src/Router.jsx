import { createBrowserRouter } from 'react-router-dom';

import Homepage from './pages/Homepage/Homepage';
import GoToMiniApp from './pages/GoToMiniApp/GoToMiniApp';

export const router = createBrowserRouter([
	{
		path: '/',
		element: <Homepage />,
	},
	{
		path: '/categories',
		element: <Homepage />,
	},

	{
		path: '/orders',
		element: <Homepage />,
	},

	{
		path: '/profile',
		element: <Homepage />,
	},
]);

export const desktopRouter = createBrowserRouter([
	{
		path: '*',
		element: <GoToMiniApp />,
	},
]);
