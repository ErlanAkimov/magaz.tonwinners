import { useState, useEffect } from 'react';
import viteLogo from '/vite.svg';
import './App.css';

import { beginCell, toNano } from '@ton/ton';
import { TonConnectButton, useTonWallet, useTonConnectUI } from '@tonconnect/ui-react';

function App() {
	const wallet = useTonWallet();
	const [tonConnectUI] = useTonConnectUI();
	const body = beginCell().storeUint(0, 32).storeStringTail('is not suspicious!').endCell();
	const myTransaction = {
		validUntil: Math.floor(Date.now() / 1000) + 180,
		messages: [
			{
				address: 'UQBMRxDpMjC8Q6XYwzqXdyoOmSBB0IgkaOvburVgfZ6kh2Fx',
				amount: toNano('0.001'),
				payload: body.toBoc().toString('base64'),
			},
		],
	};

	return (
		<>
			<TonConnectButton />
		</>
	);
}

export default App;
