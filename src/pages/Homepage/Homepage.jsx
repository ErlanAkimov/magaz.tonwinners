import styles from './homepage.module.scss';
import { Swiper, SwiperSlide } from 'swiper/react';
import mac from '../../assets/images/g93.png';
import g94 from '../../assets/images/g95.png';
import g95 from '../../assets/images/g94.png';

import macMini from '../../assets/images/mac mini.png';
import coins from '../../assets/images/coin mini.png';
import pods from '../../assets/images/pods.png';
import phones from '../../assets/images/iphones.png';
import sneak from '../../assets/images/sneakers.png';
import { ProductCard } from '../../components/ProductCard/ProductCard';
import { Nav } from '../../components/Nav/Nav';
import { ButtonDefault } from '../../components/ButtonDefault';

import { useTonConnectModal, useTonWallet } from '@tonconnect/ui-react';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

const cats = [
	{
		img: macMini,
		text: 'macbooks',
	},
	{
		img: coins,
		text: 'dropcoins',
	},
	{
		img: pods,
		text: 'headphones',
	},
	{
		img: phones,
		text: 'iphones',
	},
	{
		img: sneak,
		text: 'sneakers',
	},
];

function Homepage() {
	const wallet = useTonWallet();
	const { open } = useTonConnectModal();

	const productsList = useSelector((state) => state.products.productsList);

	useEffect(() => {
		window.scrollTo(0, 0);
		// window.Telegram.WebApp.BackButton.hide()
	}, []);

	return (
		<div className={styles.wrapper}>
			<Nav />
			<Swiper className={styles.banner} spaceBetween={30}>
				<SwiperSlide className={styles.bannerItem}>
					<img src={mac} alt="" />
				</SwiperSlide>
				<SwiperSlide className={styles.bannerItem}>
					<img src={g94} alt="" />
				</SwiperSlide>
				<SwiperSlide className={styles.bannerItem}>
					<img src={g95} alt="" />
				</SwiperSlide>
			</Swiper>

			{/* <div className={styles.categories}>
				{cats.map((cat) => {
					return (
						<div key={cat.text} className={styles.catItems}>
							<div className={styles.catImageBlock}>
								<img src={cat.img} alt="" />
							</div>
							<p className={styles.catText}>{cat.text}</p>
						</div>
					);
				})}
			</div> */}

			<h2 className={styles.catalogTitle}>New from MAGAZ</h2>
			<div className={styles.catalog}>
				{productsList.map((data, index) => (
					<ProductCard key={index} data={data} />
				))}
			</div>

			{!wallet && <ButtonDefault onClick={open}>Connect Wallet</ButtonDefault>}
		</div>
	);
}
export default Homepage;
