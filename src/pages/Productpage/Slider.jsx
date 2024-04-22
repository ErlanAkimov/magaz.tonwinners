import { Swiper, SwiperSlide } from 'swiper/react';
import styles from './productpage.module.scss';
import { LikeToggler } from '../../components/LikeToggler';

export const Slider = ({ productData }) => {


	return (
		<Swiper className={styles.swiper}>
			<LikeToggler top={20} right={20} width={38} />

			{productData.images.map((banner, index) => {
				return (
					<SwiperSlide key={index} className={styles.swiperSlide}>
						<img src={banner} alt="banner image" />
					</SwiperSlide>
				);
			})}
		</Swiper>
	);
};
