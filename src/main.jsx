import './global.scss';
import 'swiper/css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { router, desktopRouter } from './Router';
import { TonConnectUIProvider } from '@tonconnect/ui-react';

window.Telegram.WebApp.expand();
window.Telegram.WebApp.setHeaderColor('#fff');
window.Telegram.WebApp.setBackgroundColor('#fff');
export const api_server = 'https://magaz.tonwinners.com';

ReactDOM.createRoot(document.getElementById('root')).render(
	<TonConnectUIProvider manifestUrl={`${api_server}/tonconnect-manifest.json"`}>
		<React.StrictMode>
			<RouterProvider router={window.innerWidth > 575 ? desktopRouter : router} />
		</React.StrictMode>
	</TonConnectUIProvider>,
);
