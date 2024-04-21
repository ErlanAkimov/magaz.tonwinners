import { Swiper, SwiperSlide } from 'swiper/react';
import styles from './homepage.module.scss';
import { LikeToggler } from '../../components/LikeToggler';

export const Slider = ({ productData }) => {
	return (
		<Swiper className={styles.swiper}>
			<div
				style={{
					padding: '8px 10px',
					borderRadius: 100,
					backgroundColor: '#fff',
					position: 'absolute',
					top: 20,
					left: 20,
					zIndex: 100,
					fontSize: 15,
				}}
			>
				{`${productData.total - productData.sold}/${productData.total}`}
			</div>
			<LikeToggler top={20} right={20} width={38} />

			{productData.banners.map((banner, index) => {
				return (
					<SwiperSlide key={index} className={styles.swiperSlide}>
						<img src={banner} alt="banner image" />
					</SwiperSlide>
				);
			})}
		</Swiper>
	);
};
