import React, { memo } from 'react';
import styles from './other.module.scss';
import { Swiper, SwiperSlide } from 'swiper/react';
import { ProductCard } from '../../../../components/ProductCard/ProductCard';

const OtherProducts = memo(({ data, currentProduct }) => {
	return (
		<div className={styles.productLine}>
			<h4 className={styles.prodTitle}>Other products</h4>
			<Swiper spaceBetween={8} slidesPerView={2} className={styles.productLineSwiper}>
				{data &&
					data
						.filter((a) => a.name !== currentProduct.name)
						.sort(() => Math.random() - 0.5)
						.map((product, index) => (
							<SwiperSlide key={index}>
								<ProductCard data={product} />
							</SwiperSlide>
						))}
			</Swiper>
		</div>
	);
});

export default OtherProducts;
