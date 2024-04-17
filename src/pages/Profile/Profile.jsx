import { useEffect, useState } from 'react';
import { Nav } from '../../components/Nav/Nav';
import styles from './profile.module.scss'
import buttonImg from './../../assets/images/Avatar.png'

import {TonConnectButton, useTonConnectUI} from '@tonconnect/ui-react'
import { useSelector } from 'react-redux';

function Profile() {
  const [tonConnectUI] = useTonConnectUI();
  const { username, orders } = useSelector(state => state.user);

  useEffect(() => {
    console.log(tonConnectUI.connected);
  }, []);

  return (
    <div className={styles.wrapper}>
      {tonConnectUI.connected && (
        <div>
			  <div className={styles.modalContent}>
                <div className={styles.header}>
                  <button className={styles.closeButton}>
                    Cancel
                  </button>
                  <div className={styles.logo}>
                    <h5>MAGAZ</h5>
                    <p>bot</p>
                  </div>
                  <div>
                    <button className={styles.additionally}><p>...</p></button>
                  </div>
                </div>
                <div className={styles.userInfo}>
                  <p>@{username}</p>
                  <TonConnectButton className={styles.connectButton} />
                </div>
                {orders.map(o => (
                  <div className={styles.tonCrads} key={o.id}>
                    <div className={styles.leftSide}>
                      <h4>{o.name}</h4>
                      <p>{o.status}</p>
                    </div>
                    <div className={styles.rightSide}>
                      <b>{o.productPrice}</b>
                      <a href='#!'><img src={buttonImg} /></a>
                    </div>
                  </div>
                ))}
				</div>
          	<Nav />
        </div>
      )}
    </div>
  );
}

export default Profile;
