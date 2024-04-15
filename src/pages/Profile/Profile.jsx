import { useEffect } from 'react';
import { Nav } from '../../components/Nav/Nav';
import styles from './profile.module.scss'

import {TonConnectButton, useTonConnectUI} from '@tonconnect/ui-react'

function Profile () {
	const [tonConnectUI] = useTonConnectUI();

	useEffect(() => {
		console.log(tonConnectUI.connected)
	}, [])

	return <div className={styles.wrapper}>
		<TonConnectButton className={styles.connectButton} />
		<Nav />
	</div>
}

export default Profile;
