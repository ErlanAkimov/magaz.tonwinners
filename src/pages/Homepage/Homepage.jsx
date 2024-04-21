import styles from './homepage.module.scss';
import { Swiper, SwiperSlide } from 'swiper/react';
import mac from '../../assets/images/mac.png';

import macMini from '../../assets/images/mac mini.png';
import coins from '../../assets/images/coin mini.png';
import pods from '../../assets/images/pods.png';
import phones from '../../assets/images/iphones.png';
import sneak from '../../assets/images/sneakers.png';
import { ProductCard } from '../../components/ProductCard/ProductCard';
import { Nav } from '../../components/Nav/Nav';

const data = {
	_id: 'drop-coin',
	name: 'TON Drop coins',
	description:
		"Buy TON souvenir coins made of zinc alloy with a silver coating, and <strong>receive random drops</strong> in the wallet used for purchase. More coins mean more drops\n\n\tDon't miss the opportunity to get souvenirs at a low price",
	type: 'souvenir',
	price: 5,
	total: 5000,
	currency: "TON",
	sold: 632,
	deliverMin: 4,
	deliverMax: 8,
	specialQuote:
		'We can ship souvenir coins globally, though delivery times may vary by location. For those purchasing coins solely for wallet drops, opt out of delivery; your wallet will still receive drops after payment.',
	properties: [
		{
			weight: '6,5 g',
		},
		{
			diameter: '36 mm',
		},
		{
			thikness: '3,5 mm',
		},
	],
	images: ['https://i.ibb.co/Yymtkb1/DROP-COINS-1.png', 'https://i.ibb.co/x2tM4j3/mainbanner2.png', 'https://i.ibb.co/C1Yw5qq/mainbanner1.png'],
	deliveryFee: 5,
};

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
	return (
		<div className={styles.wrapper}>
			<Nav />
			<Swiper className={styles.banner} spaceBetween={30}>
				<SwiperSlide className={styles.bannerItem}>
					<h2 className={styles.bannerTitle}>
						MacBook Pro <br /> Giveaway
					</h2>
					<p className={styles.bannerDesc}>
						- Make purchases from <br /> 15 TON and participate <br />
						in the draw
					</p>
					<img src={mac} alt="" />
				</SwiperSlide>
			</Swiper>

			<div className={styles.categories}>
				{cats.map((cat) => {
					return (
						<div className={styles.catItems}>
							<div className={styles.catImageBlock}>
								<img src={cat.img} alt="" />
							</div>
							<p className={styles.catText}>{cat.text}</p>
						</div>
					);
				})}
			</div>

			<h2 className={styles.catalogTitle}>New from MAGAZ</h2>
			<div className={styles.catalog}>
				<ProductCard data={data} />
				<ProductCard data={data} />
				<ProductCard data={data} />
				<ProductCard data={data} />
			</div>
		</div>
	);
}
export default Homepage;
