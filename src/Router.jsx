import { createBrowserRouter } from 'react-router-dom';

import Homepage from './pages/Homepage/Homepage';
import GoToMiniApp from './pages/GoToMiniApp/GoToMiniApp';

export const router = createBrowserRouter([
	{
		path: '/',
		element: <Homepage />,
	},
]);

export const desktopRouter = createBrowserRouter([
	{
		path: '*',
		element: <GoToMiniApp />,
	},
]);
