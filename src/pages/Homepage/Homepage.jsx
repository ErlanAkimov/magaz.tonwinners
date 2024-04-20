import styles from './homepage.module.scss';
import { Swiper, SwiperSlide } from 'swiper/react';
import mac from '../../assets/images/mac.png';

import macMini from '../../assets/images/mac mini.png';
import coins from '../../assets/images/coin mini.png';
import pods from '../../assets/images/pods.png';
import phones from '../../assets/images/iphones.png';
import sneak from '../../assets/images/sneakers.png';
import { ProductCard } from '../../components/ProductCard/ProductCard';

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

			<div className={styles.catalog}>
				<h2 className={styles.catalogTitle}>Neww from MAGAZ</h2>
				<ProductCard data={{
					name: 'dropcoin'
				}} />
			</div>
		</div>
	);
}
export default Homepage;
