import { useState } from 'react';
import styles from './homepage.module.scss';
import { Swiper, SwiperSlide } from 'swiper/react';

//swiper banners import (в будущем надо запрашивать с сервера)
import banner1 from '../../assets/images/mainbanner1.png';
import banner2 from '../../assets/images/mainbanner2.png';
import banner3 from '../../assets/images/mainbanner3.png';
import { Quote } from '../../components/Quote';
import Modal from '../../components/Modal/Modal';

// asdf

const productData = {
	_id: 'drop-coin',
	name: 'DROP COINS',
	description: `Buy TON souvenir coins made of zinc alloy with a silver coating, and <strong>receive random drops</strong> in the wallet used for purchase. More coins mean more drops

	Don't miss the opportunity to get souvenirs at a low price`,
	type: 'souvenir',
	price: 5,
	total: 1000,
	sold: 570,
	deliveryHold: 5,
	deliverMin: 3,
	deliverMax: 4,
	//prettier-ignore
	specialQuote: 'We can ship souvenir coins globally, though delivery times may vary by location. For those purchasing coins solely for wallet drops, opt out of delivery; your wallet will still receive drops after payment.',
	properties: [{ weight: '6,5 g' }, { diameter: '36 mm' }, { thikness: '3,5 mm' }],
	banners: [banner1, banner2, banner3],
};

function Homepage() {
	const [modal, setModal] = useState(false);
	return (
		<div className={styles.wrapper}>
			<Swiper className={styles.swiper}>
				{productData.banners.map((banner, index) => {
					return (
						<SwiperSlide key={index} className={styles.swiperSlide}>
							<img src={banner} alt="banner image" />
						</SwiperSlide>
					);
				})}
			</Swiper>
			<div className="wrapper">
				<div className={styles.title}>
					<div>
						<h1>{productData.name}</h1>
						<span>{productData.type[0].toUpperCase() + productData.type.slice(1).toLowerCase()}</span>
					</div>
					<button>Price: {productData.price} TON</button>
				</div>

				<div className={styles.productInfo}>
					<div>
						<p>{`>${productData.sold}`}</p>
						<p>Items Sold</p>
					</div>
					<div>
						<p>
							{productData.deliverMin} to {productData.deliverMax}
						</p>
						<p>Weeks Arrival</p>
					</div>
				</div>

				<div className={styles.description}>
					<h3>Description</h3>
					<p dangerouslySetInnerHTML={{ __html: productData.description.replace(/\n/g, '<br />') }} />
				</div>
				<div className={styles.properties}>
					{productData.properties.map((propertyData, index) => {
						return (
							<div>
								<p>{Object.values(propertyData)}</p>
								<p>{Object.keys(propertyData)}</p>
							</div>
						);
					})}
				</div>

				<Quote text={productData.specialQuote} />

				<div>Yes, i want to deliver</div>

				<Modal props={{ modal, setModal }}></Modal>
			</div>
		</div>
	);
}
export default Homepage;
