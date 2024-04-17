import { useEffect } from 'react';
import { Nav } from '../../components/Nav/Nav';
import styles from './profile.module.scss';
import { useSelector } from 'react-redux';
import Lottie from 'react-lottie';
import animationData from '../../assets/images/BOXLOTTIE.json';

import { TonConnectButton, useTonConnectUI } from '@tonconnect/ui-react';
import { ButtonDefault } from '../../components/ButtonDefault';
import { Link } from 'react-router-dom';

function Profile() {
	const [tonConnectUI] = useTonConnectUI();
	const user = useSelector((state) => state.user);

	const lottieOptions = {
		loop: false,
		autoplay: true,
		animationData: animationData,
		rendererSettings: {
			preserveAspectRatio: 'xMidYMid slice',
		},
	};

	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	return (
		<div className={styles.wrapper} >
			<div className={styles.header}>
				<p>@{user.username}</p>
				<TonConnectButton className={styles.connectButton} />
			</div>

			{user.orders &&
				user.orders.length > 0 &&
				user.orders.map((order) => {
					return (
						<div key={order.boc} className={styles.order}>
							<div>
								<p className={styles.productName}>
									{order.name}
									<span> x {order.orderAmount}</span>
								</p>
								<p className={styles.status}>transaction approved</p>
							</div>

							<div className={styles.rightside}>
								<p>{order.productPrice * order.orderAmount}</p>
								<svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
									<g clipPath="url(#clip0_189_7473)">
										<path
											d="M20 40C31.0457 40 40 31.0457 40 20C40 8.95429 31.0457 0 20 0C8.95429 0 0 8.95429 0 20C0 31.0457 8.95429 40 20 40Z"
											fill="#0098EA"
										/>
										<path
											d="M26.8288 11.1627H13.1705C10.6592 11.1627 9.06745 13.8716 10.3309 16.0615L18.7603 30.6721C19.3104 31.6261 20.6889 31.6261 21.239 30.6721L29.6701 16.0615C30.9318 13.8751 29.3401 11.1627 26.8305 11.1627H26.8288ZM18.7535 26.2906L16.9177 22.7377L12.4881 14.8153C12.1959 14.3082 12.5568 13.6584 13.1687 13.6584H18.7517V26.2923L18.7535 26.2906ZM27.5077 14.8136L23.0799 22.7394L21.2441 26.2906V13.6567H26.8271C27.439 13.6567 27.8 14.3065 27.5077 14.8136Z"
											fill="white"
										/>
									</g>
									<defs>
										<clipPath id="clip0_189_7473">
											<rect width="40" height="40" fill="white" />
										</clipPath>
									</defs>
								</svg>
							</div>
						</div>
					);
				})}

			{user.orders && user.orders.length === 0 && (
				<div className={styles.emptyOrders}>
					<div>
						<Lottie options={lottieOptions} className={styles.lottie} />
					</div>
					<Link to="/">
						<ButtonDefault>Back to Catalog</ButtonDefault>
					</Link>
				</div>
			)}

			<Nav />
		</div>
	);
}

export default Profile;
