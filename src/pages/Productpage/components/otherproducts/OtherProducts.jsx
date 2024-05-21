import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

import styles from './other.module.scss';

import { ProductCard } from '/src/components/ProductCard/ProductCard';
import { api_server } from '../../../../main';
import axios from 'axios';

export const OtherProducts = () => {
  const { productId } = useParams();
  const [products, setProducts] = useState(null)
  

  useEffect(() => {
    axios.get(`${api_server}/api/get-other-products?id=${productId}`).then(res => setProducts(res.data))
  }, [])
  
	return (
		<div className={styles.productLine}>
			<h4 className={styles.prodTitle}>Other products</h4>
			<Swiper spaceBetween={8} slidesPerView={2} className={styles.productLineSwiper}>
				{products &&
					products.map((product, index) => (
							<SwiperSlide key={index}>
								<ProductCard data={product} />
							</SwiperSlide>
						))}
			</Swiper>
		</div>
	);
};
