import { createBrowserRouter } from 'react-router-dom';

import Productpage from './pages/Productpage/Productpage';
import Homepage from './pages/Homepage/Homepage';
import GoToMiniApp from './pages/GoToMiniApp/GoToMiniApp';
import Profile from './pages/Profile/Profile';
import { Categoriespage } from './pages/Categories/Categoriespage';
import { ChangeAddress } from './pages/ChangeAddress/ChangeAddress';
import { CreateNewAddress } from './pages/CreateNewAddress/CreateNewAddress';
import { Orderspage } from './pages/Cart/Orderspage';
import { Paymentpage } from './pages/Paymentpage/Payment.page';
import { CreateNewRecipient } from './pages/CreateNewRecipient/CreateNewRecipitent';
import { ChangeRecipient } from './pages/ChangeRecipient/ChangeRecipient';
import { Bundlepage } from './pages/Bundlepage/Bundlepage'
import { Nftpage } from './pages/Nftpage/Nftpage'

export const router = createBrowserRouter([
	{
		path: '/',
		element: <Homepage />,
	},
    {
        path: "/bundles",
        element: <Bundlepage />,
    },
    {
        path: "/bundles/:bundleId",
        element: <Nftpage />,
    },
	{
		path: '/categories',
		element: <Categoriespage />,
	},
	{
		path: '/product/:productId',
		element: <Productpage />,
	},

	// Saved Addresses
	{
		path: '/create-new-address',
		element: <CreateNewAddress />,
	},

	{
		path: '/change-my-address/:addressId',
		element: <ChangeAddress />,
	},

	// Recipients
	{
		path: '/create-new-recipient',
		element: <CreateNewRecipient />,
	},
	{
		path: '/change-my-recipient/:recipientId',
		element: <ChangeRecipient />,
	},
	{
		path: '/orders',
		element: <Orderspage />,
	},

	{
		path: '/profile',
		element: <Profile />,
	},

	{
		path: '/payment',
		element: <Paymentpage />,
	},
]);

export const desktopRouter = createBrowserRouter([
	{
		path: '*',
		element: <GoToMiniApp />,
	},
]);
