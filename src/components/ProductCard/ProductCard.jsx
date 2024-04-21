import styles from './prodCard.module.scss';
import { useState } from 'react';
import { LikeToggler } from '../../components/LikeToggler';
import { Swiper, SwiperSlide } from 'swiper/react';

export const ProductCard = ({ data }) => {
	const [imageIndex, setImageIndex] = useState(0);
	return (
		<div className={styles.wrapper}>
			<Swiper className={styles.imgBlock} onSlideChange={(s) => setImageIndex(s.activeIndex)}>
				<LikeToggler top={10} right={12} width={30} />
				{data.images.map((image, index) => {
					return (
						<SwiperSlide key={index}>
							<img src={image} alt="" />
						</SwiperSlide>
					);
				})}
			</Swiper>
			<div className={styles.dots}>
				{data.images.map((image, index) => {
					return <div key={index} className={styles.dot} style={{ backgroundColor: imageIndex === index && '#a9a1a1' }}></div>;
				})}
			</div>

			<h3 className={styles.name}>{data.name}</h3>
			<div className={styles.price}>
				<svg width="21" height="20" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
					<path
						d="M10.5 0C4.9775 0 0.5 4.4775 0.5 10C0.5 15.5225 4.9775 20 10.5 20C16.0225 20 20.5 15.5225 20.5 10C20.5 4.4775 16.0225 0 10.5 0ZM7.085 5.58083H13.915C15.1692 5.58083 15.9667 6.9375 15.3358 8.03083L11.12 15.335C11.057 15.4436 10.9666 15.5338 10.8578 15.5965C10.749 15.6592 10.6256 15.6922 10.5 15.6922C10.3744 15.6922 10.251 15.6592 10.1422 15.5965C10.0334 15.5338 9.94299 15.4436 9.88 15.335L5.66583 8.03083C5.03417 6.93583 5.83 5.58083 7.085 5.58083ZM11.1217 6.8275V13.1442L12.04 11.3708L14.2533 7.4075C14.2872 7.3483 14.3049 7.2812 14.3045 7.21299C14.3042 7.14478 14.2858 7.07786 14.2513 7.01902C14.2168 6.96017 14.1674 6.91147 14.1081 6.87784C14.0487 6.84421 13.9815 6.82685 13.9133 6.8275H11.1217ZM7.08333 6.82917C7.01527 6.82843 6.94821 6.84567 6.88895 6.87915C6.82968 6.91263 6.78031 6.96117 6.74581 7.01985C6.71131 7.07853 6.69292 7.14527 6.69248 7.21334C6.69205 7.28141 6.70959 7.34838 6.74333 7.4075L8.95833 11.3692L9.87667 13.1442V6.82917H7.08333Z"
						fill="#06A5FF"
					/>
				</svg>

				{data.price} {data.currency}
			</div>
		</div>
	);
};
