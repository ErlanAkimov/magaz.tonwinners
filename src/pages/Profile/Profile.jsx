import { useEffect, useState } from 'react';
import { Nav } from '../../components/Nav/Nav';
import styles from './profile.module.scss';
import { useSelector } from 'react-redux';
import { TonConnectButton, useTonConnectUI } from '@tonconnect/ui-react';
import { recipientIcon, sub, vector } from '../CreateNewAddress/CreateNewAddress';
import { Link, useNavigate } from 'react-router-dom';
import { api_server } from '../../main';
import axios from 'axios';

function Profile() {
	const [tonConnectUI] = useTonConnectUI();
	const navigate = useNavigate();
	const user = useSelector((state) => state.user);
	const [orders, setOrders] = useState(null);

	useEffect(() => {
		window.scrollTo(0, 0);
		axios.post(`${api_server}/api/get-my-orders`, { orders: user.orders }).then((res) => {
			const cart = [];
			res.data.map((a) => {
				a.cart.map((item) => (item.date = a.date));
				cart.push(...a.cart);
			});
			setOrders(cart);
		});
	}, []);

	return (
		<div className={styles.wrapper} style={{ minHeight: window.innerHeight }}>
			{/* <div className={styles.header}>
				<div className={styles.avatar}>
					<img src="https://magaz.tonwinners.com/tonicon.png" alt="" />
				</div>

				<div className={styles.headerContent}>
					<h3>{user.first_name}</h3>
					<p className={styles.username}>@username</p>
				</div>

				<div className={styles.settings}>
					<CogIcon />
				</div>
			</div> */}
			<div style={{ marginTop: 10 }} className="text-13">
				{user.appLanguage === 'ru' ? 'Мои адреса' : 'My addresses'}
			</div>
			{user.savedAddresses.length > 0 ? (
				<div className={styles.myAddresses}>
					{user.savedAddresses.map((address) => {
						return (
							<div key={address.id} className={styles.address}>
								{sub()}
								<div
									className={styles.central}
									onClick={() => {
										dispatch(pickAddress(address));
										navigate('/payment');
									}}
								>
									<p className={styles.addressName}>{address.name}</p>
									<p className={styles.pick}>{user.appLanguage == 'ru' ? 'Выбрать' : 'Pick'}</p>
								</div>

								<button className={styles.changeBtn} onClick={() => navigate(`/change-my-address/${address.id}`)}>
									{user.appLanguage === 'ru' ? 'Изменить' : 'Change'}
									{vector()}
								</button>
							</div>
						);
					})}
				</div>
			) : (
				<div className={styles.noAddress}>{user.appLanguage === 'ru' ? 'Нет сохраненных адресов' : 'No saved addresses'}</div>
			)}
			<p className={styles.createNew}>
				<Link to="/create-new-address">{user.appLanguage === 'ru' ? 'Сохранить новый адрес' : 'Add new address'}</Link>
			</p>

			<div style={{ marginTop: 5 }} className="text-13">
				{user.appLanguage === 'ru' ? 'Сохранённые получатели' : 'Saved recipients'}
			</div>
			{user.savedRecipients?.length > 0 ? (
				<div className={styles.myAddresses}>
					{user.savedRecipients.map((recipient) => {
						return (
							<div key={recipient.id} className={styles.address}>
								{recipientIcon()}
								<div
									className={styles.central}
									onClick={() => {
										dispatch(pickRecipient(recipient));
										navigate('/payment');
									}}
								>
									<p className={styles.addressName}>{recipient.name}</p>
									<p className={styles.pick}>{user.appLanguage == 'ru' ? 'Выбрать' : 'Pick'}</p>
								</div>

								<button className={styles.changeBtn} onClick={() => navigate(`/change-my-recipient/${recipient.id}`)}>
									{user.appLanguage === 'ru' ? 'Изменить' : 'Change'}
									{vector()}
								</button>
							</div>
						);
					})}
				</div>
			) : (
				<div className={styles.noAddress}>{user.appLanguage === 'ru' ? 'Нет сохраненных получателей' : 'No saved recipients'}</div>
			)}
			<p className={styles.createNew}>
				<Link to="/create-new-recipient">{user.appLanguage === 'ru' ? 'Сохранить нового получателя' : 'Add new recipient'}</Link>
			</p>

			<div className={styles.orders}>
				<div className={styles.text}>{user.appLanguage === 'ru' ? 'История покупок' : 'history'}</div>

				{orders &&
					orders.map((orderItem, index) => {
						const mydate = new Date(orderItem.date);
						const months =
							user.appLanguage == 'ru'
								? [
										'Января',
										'Февраля',
										'Марта',
										'Апреля',
										'Мая',
										'Июня',
										'Июля',
										'Августа',
										'Сентября',
										'Октября',
										'Ноября',
										'Декабря',
								  ]
								: [
										'January',
										'February',
										'March',
										'April',
										'May',
										'June',
										'Jule',
										'August',
										'September',
										'October',
										'November',
										'December',
								  ];
						const date = `${mydate.getDate()} ${months[mydate.getMonth()]} ${mydate.getFullYear()} ${
							user.appLanguage === 'ru' ? 'г.' : 'year'
						}`;
						return (
							<div key={index} className={styles.orders_item}>
								<div className={styles.orders_item_leftside}>
									<div className={styles.image}>
										<img src={orderItem.image} alt="" />
									</div>

									<div className={styles.central}>
										<p className={styles.date}>{date}</p>
										<p className={styles.name}>{orderItem.name}</p>
										<p className={styles.price}>- {(orderItem.price * orderItem.counter).toFixed(2)} TON</p>
									</div>
								</div>

								<div className={styles.cashback}>
									<p>+ {orderItem.cashback || '0'} TON</p>
									<p>{user.appLanguage === 'ru' ? 'Кэшбек' : 'Cashback'}</p>
								</div>
							</div>
						);
					})}
			</div>
			<Nav />
		</div>
	);
}

export default Profile;

function CogIcon() {
	return (
		<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
			<path d="M12 16c2.206 0 4-1.794 4-4s-1.794-4-4-4-4 1.794-4 4 1.794 4 4 4zm0-6c1.084 0 2 .916 2 2s-.916 2-2 2-2-.916-2-2 .916-2 2-2z"></path>
			<path d="m2.845 16.136 1 1.73c.531.917 1.809 1.261 2.73.73l.529-.306A8.1 8.1 0 0 0 9 19.402V20c0 1.103.897 2 2 2h2c1.103 0 2-.897 2-2v-.598a8.132 8.132 0 0 0 1.896-1.111l.529.306c.923.53 2.198.188 2.731-.731l.999-1.729a2.001 2.001 0 0 0-.731-2.732l-.505-.292a7.718 7.718 0 0 0 0-2.224l.505-.292a2.002 2.002 0 0 0 .731-2.732l-.999-1.729c-.531-.92-1.808-1.265-2.731-.732l-.529.306A8.1 8.1 0 0 0 15 4.598V4c0-1.103-.897-2-2-2h-2c-1.103 0-2 .897-2 2v.598a8.132 8.132 0 0 0-1.896 1.111l-.529-.306c-.924-.531-2.2-.187-2.731.732l-.999 1.729a2.001 2.001 0 0 0 .731 2.732l.505.292a7.683 7.683 0 0 0 0 2.223l-.505.292a2.003 2.003 0 0 0-.731 2.733zm3.326-2.758A5.703 5.703 0 0 1 6 12c0-.462.058-.926.17-1.378a.999.999 0 0 0-.47-1.108l-1.123-.65.998-1.729 1.145.662a.997.997 0 0 0 1.188-.142 6.071 6.071 0 0 1 2.384-1.399A1 1 0 0 0 11 5.3V4h2v1.3a1 1 0 0 0 .708.956 6.083 6.083 0 0 1 2.384 1.399.999.999 0 0 0 1.188.142l1.144-.661 1 1.729-1.124.649a1 1 0 0 0-.47 1.108c.112.452.17.916.17 1.378 0 .461-.058.925-.171 1.378a1 1 0 0 0 .471 1.108l1.123.649-.998 1.729-1.145-.661a.996.996 0 0 0-1.188.142 6.071 6.071 0 0 1-2.384 1.399A1 1 0 0 0 13 18.7l.002 1.3H11v-1.3a1 1 0 0 0-.708-.956 6.083 6.083 0 0 1-2.384-1.399.992.992 0 0 0-1.188-.141l-1.144.662-1-1.729 1.124-.651a1 1 0 0 0 .471-1.108z"></path>
		</svg>
	);
}
