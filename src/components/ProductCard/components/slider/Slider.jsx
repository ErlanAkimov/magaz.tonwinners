import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { useNavigate } from "react-router-dom";

import useSlider from "/src/hooks/useSlider";

import styles from "./slider.module.scss";

export const Slider = ({ id, photos }) => {
    const { images, setSlide, currentSlide } = useSlider({ images: photos });
    const navigate = useNavigate();

    return (
        <>
            <Swiper className={styles.imgBlock} onSlideChange={(s) => setSlide(s.activeIndex)} onClick={() => navigate(`/new-product/${id}`)}>
                {images.map((photo, index) => (
                    <SwiperSlide key={index}>
                        <img src={photo} loading="lazy" style={{ userSelect: "none" }} alt="" />
                    </SwiperSlide>
                ))}
            </Swiper>
            <div className={styles.dots}>
                {images.map((_, index) => (
                    <div
                        key={index}
                        className={styles.dot}
                        style={{
                            backgroundColor: currentSlide === index && "#a9a1a1",
                        }}
                    />
                ))}
            </div>
        </>
    );
};
