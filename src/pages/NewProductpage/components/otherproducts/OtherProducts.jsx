import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

import styles from "./other.module.scss";

import { ProductCard } from "/src/components/ProductCard/ProductCard";

export const OtherProducts = () => {
  const { productId } = useParams();
  const products = useSelector((state) => state.products.productsList);
  const currentProduct = useSelector(
    (state) => state.products.productsList.filter((a) => a._id === productId)[0]
  );

  return (
    <div className={styles.productLine}>
      <h4 className={styles.prodTitle}>Other products</h4>
      <Swiper
        spaceBetween={8}
        slidesPerView={2}
        className={styles.productLineSwiper}
      >
        {products &&
          products
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
};
